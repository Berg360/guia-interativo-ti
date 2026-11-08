import {
  collection,
  doc,
  enableNetwork,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type Firestore,
  type Unsubscribe,
} from 'firebase/firestore';
import { isProgressStorageKey } from '../data/progressKeys';
import {
  applyRemoteProgressValue as applyCloudValue,
  emitProgressUpdated,
  getBrowserLocalStorage as getStorage,
  SYNC_CHANGE_EVENT,
} from './storageBridge';
import { PROGRESS_SYNC_RETRY_EVENT } from './retrySignal';

export type CloudProgressStatus = 'unconfigured' | 'signed-out' | 'syncing' | 'synced' | 'offline' | 'error';
type ProgressStorageChange = { key: string; value: string | null };
type CloudProgressRecord = { key: string; value: string | null; updatedAtMs: number };
type PendingChanges = Record<string, number>;
type ProgressStep = (phase: string, completed: number, total: number) => void;

type InFlightCloudWrite = { value: string | null; startedAt: number; promise: Promise<void>; timedOut: boolean };
type InFlightCloudRead = { startedAt: number; promise: Promise<unknown>; timedOut: boolean };

const CHUNK_LENGTH = 180_000;
const MAX_VALUE_LENGTH = 20_000_000;
const SCHEMA_VERSION = 2;
const CLOUD_VERSION_PREFIX = 'nexo-cloud-versions-v1:';
const MAX_PARALLEL_RECORDS = 4;
const MAX_PARALLEL_PARTS = 12;
const MAX_PARALLEL_WRITES = 4;
const FIRESTORE_REQUEST_TIMEOUT_MS = 15_000;
const inFlightCloudWrites = new Map<string, InFlightCloudWrite>();
const inFlightCloudReads = new Map<string, InFlightCloudRead>();

class FirestoreRequestTimeoutError extends Error {
  code = 'unavailable';
  constructor() {
    super('O Firestore não respondeu em 15 segundos. O progresso segue salvo neste navegador e será sincronizado quando a conexão voltar.');
    this.name = 'FirestoreRequestTimeoutError';
  }
}

function waitForFirestore<T>(promise: Promise<T>, timeoutMs = FIRESTORE_REQUEST_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new FirestoreRequestTimeoutError()), timeoutMs);
    promise.then((value) => { window.clearTimeout(timeout); resolve(value); }, (error) => { window.clearTimeout(timeout); reject(error); });
  });
}

async function waitForCloudRead<T>(uid: string, path: string, request: () => Promise<T>): Promise<T> {
  const key = `${uid}\u0000${path}`;
  const existing = inFlightCloudReads.get(key);
  if (existing) {
    const remaining = FIRESTORE_REQUEST_TIMEOUT_MS - (Date.now() - existing.startedAt);
    if (remaining <= 0) { existing.timedOut = true; throw new FirestoreRequestTimeoutError(); }
    try { return await waitForFirestore(existing.promise as Promise<T>, remaining); }
    catch (error) {
      if (error instanceof FirestoreRequestTimeoutError) existing.timedOut = true;
      throw error;
    }
  }

  const operation = request();
  const entry: InFlightCloudRead = { startedAt: Date.now(), promise: operation, timedOut: false };
  inFlightCloudReads.set(key, entry);
  void operation.then(() => {
    if (inFlightCloudReads.get(key) === entry) inFlightCloudReads.delete(key);
    if (entry.timedOut) window.dispatchEvent(new Event(PROGRESS_SYNC_RETRY_EVENT));
  }, () => {
    if (inFlightCloudReads.get(key) === entry) inFlightCloudReads.delete(key);
  });
  try { return await waitForFirestore(operation); }
  catch (error) {
    if (error instanceof FirestoreRequestTimeoutError) entry.timedOut = true;
    throw error;
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, task: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  let failed = false;
  let failure: unknown;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length && !failed) {
      const index = nextIndex;
      nextIndex += 1;
      try { results[index] = await task(items[index], index); }
      catch (error) { failed = true; failure = error; }
    }
  }));
  if (failed) throw failure;
  return results;
}

function readCloudVersions(uid: string): Record<string, number> {
  try {
    const parsed = JSON.parse(getStorage()?.getItem(`${CLOUD_VERSION_PREFIX}${uid}`) ?? '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => Number.isFinite(value) && Number(value) >= 0)) as Record<string, number>;
  } catch { return {}; }
}

function writeCloudVersion(uid: string, key: string, updatedAtMs: number) {
  try {
    const storage = getStorage();
    if (!storage) return;
    const versions = readCloudVersions(uid);
    versions[key] = updatedAtMs;
    storage.setItem(`${CLOUD_VERSION_PREFIX}${uid}`, JSON.stringify(versions));
  } catch { /* A versão é só uma otimização; a sincronização continua sem esse cache. */ }
}

function errorCode(error: unknown) {
  return typeof error === 'object' && error && 'code' in error ? String(error.code).toLowerCase() : '';
}

function errorText(error: unknown) {
  return error instanceof Error ? error.message.toLowerCase() : String(error ?? '').toLowerCase();
}

function isTemporaryConnectionError(error: unknown) {
  const code = errorCode(error);
  const message = errorText(error);
  return !navigator.onLine || ['unavailable', 'deadline-exceeded', 'aborted'].some((part) => code.includes(part))
    || /client is offline|network|offline|webchannel|fetch failed|failed to get document/.test(message);
}

function readableSyncError(error: unknown, fallback: string) {
  if (error instanceof FirestoreRequestTimeoutError) return error.message;
  const code = errorCode(error);
  const message = errorText(error);
  if (code.includes('permission-denied') || message.includes('insufficient permissions')) {
    return 'A conta Google entrou, mas o Firestore recusou o acesso. Verifique as regras de segurança do banco.';
  }
  if (code.includes('unauthenticated')) return 'Sua sessão Google expirou. Saia e entre novamente para sincronizar.';
  if (isTemporaryConnectionError(error)) {
    return 'Não foi possível alcançar o Firestore agora. Seu progresso continua salvo neste navegador; verifique a conexão e tente novamente.';
  }
  return error instanceof Error ? error.message : fallback;
}

function progressCollection(db: Firestore, uid: string) {
  return collection(db, 'users', uid, 'progress');
}

function progressDocument(db: Firestore, uid: string, key: string) {
  const id = encodeURIComponent(key).replaceAll('%', '_');
  return doc(db, 'users', uid, 'progress', id);
}

function progressPartDocument(db: Firestore, uid: string, key: string, index: number) {
  const id = encodeURIComponent(key).replaceAll('%', '_');
  return doc(db, 'users', uid, 'progress', id, 'parts', String(index).padStart(4, '0'));
}

function pendingKey(uid: string) {
  return `nexo-cloud-pending-v1:${uid}`;
}

function readPending(uid: string): PendingChanges {
  try {
    const value = JSON.parse(getStorage()?.getItem(pendingKey(uid)) ?? '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value as PendingChanges : {};
  } catch { return {}; }
}

function writePending(uid: string, pending: PendingChanges) {
  try {
    const storage = getStorage();
    if (!storage) return;
    if (Object.keys(pending).length) storage.setItem(pendingKey(uid), JSON.stringify(pending));
    else storage.removeItem(pendingKey(uid));
  } catch { /* O progresso principal continua no armazenamento local. */ }
}

function markPending(uid: string, key: string) {
  const pending = readPending(uid);
  pending[key] = Date.now();
  writePending(uid, pending);
}

function clearPending(uid: string, key: string) {
  const pending = readPending(uid);
  delete pending[key];
  writePending(uid, pending);
}

function readLocalProgress() {
  const storage = getStorage();
  const result = new Map<string, string>();
  if (!storage) return result;
  try {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (!key || !isProgressStorageKey(key)) continue;
      const value = storage.getItem(key);
      if (value !== null) result.set(key, value);
    }
  } catch { /* Alguns navegadores podem bloquear a leitura do armazenamento. */ }
  return result;
}

function splitValue(value: string) {
  if (value.length > MAX_VALUE_LENGTH) throw new Error('Um registro local é grande demais para sincronizar com segurança. Exporte um backup antes de continuar.');
  const chunks: string[] = [];
  for (let start = 0; start < value.length;) {
    let end = Math.min(start + CHUNK_LENGTH, value.length);
    const lastUnit = value.charCodeAt(end - 1);
    const nextUnit = value.charCodeAt(end);
    if (lastUnit >= 0xd800 && lastUnit <= 0xdbff && nextUnit >= 0xdc00 && nextUnit <= 0xdfff) end -= 1;
    chunks.push(value.slice(start, end));
    start = end;
  }
  return chunks.length ? chunks : [''];
}

async function readCloudRecord(db: Firestore, uid: string, key: string, knownMetadata?: Record<string, unknown>): Promise<CloudProgressRecord | null> {
  let metadata = knownMetadata;
  if (!metadata) {
    const reference = progressDocument(db, uid, key);
    const snapshot = await waitForCloudRead(uid, reference.path, () => getDoc(reference));
    if (!snapshot.exists()) return null;
    metadata = snapshot.data();
  }
  if (metadata.key !== key) throw new Error('Um registro da nuvem não corresponde à chave de progresso solicitada.');
  const updatedAtMs = Number(metadata.updatedAtMs) || 0;
  if (metadata.deleted === true) return { key, value: null, updatedAtMs };
  const partCount = Number(metadata.partCount);
  if (!Number.isInteger(partCount) || partCount < 1 || partCount > 256) throw new Error(`O registro “${key}” está em um formato inválido na nuvem.`);
  const parts = await mapWithConcurrency(Array.from({ length: partCount }, (_, index) => index), MAX_PARALLEL_PARTS, (index) => {
    const reference = progressPartDocument(db, uid, key, index);
    return waitForCloudRead(uid, reference.path, () => getDoc(reference));
  });
  if (parts.some((part) => !part.exists() || typeof part.data().value !== 'string')) {
    throw new Error(`Não consegui carregar todos os blocos do progresso “${key}”. Tente novamente com conexão estável.`);
  }
  const value = parts.map((part) => part.get('value') as string).join('');
  return { key, value, updatedAtMs };
}

async function readCloudProgress(db: Firestore, uid: string, local: Map<string, string>, pending: PendingChanges, onProgress: ProgressStep) {
  const reference = progressCollection(db, uid);
  const snapshot = await waitForCloudRead(uid, reference.path, () => getDocs(reference));
  const versions = readCloudVersions(uid);
  let completed = 0;
  onProgress('Conferindo progresso na nuvem', completed, snapshot.docs.length);
  const records = await mapWithConcurrency(snapshot.docs, MAX_PARALLEL_RECORDS, async (item) => {
    const data = item.data();
    const key = String(data.key ?? '');
    const updatedAtMs = Number(data.updatedAtMs) || 0;
    const alreadyLocal = local.has(key);
    const alreadyDeleted = data.deleted === true && !alreadyLocal;
    if (pending[key] || (versions[key] === updatedAtMs && (alreadyLocal || alreadyDeleted))) {
      completed += 1;
      onProgress('Conferindo progresso na nuvem', completed, snapshot.docs.length);
      return { key, value: local.get(key) ?? null, updatedAtMs };
    }
    const record = await readCloudRecord(db, uid, key, data);
    completed += 1;
    onProgress('Baixando progresso da nuvem', completed, snapshot.docs.length);
    return record;
  });
  return new Map(records.filter((item): item is CloudProgressRecord => Boolean(item)).map((item) => [item.key, item]));
}

async function writeCloudValue(db: Firestore, uid: string, key: string, value: string | null) {
  if (!isProgressStorageKey(key)) return;
  const operationKey = `${uid}\u0000${key}`;
  const existing = inFlightCloudWrites.get(operationKey);
  if (existing) {
    const remaining = FIRESTORE_REQUEST_TIMEOUT_MS - (Date.now() - existing.startedAt);
    if (remaining <= 0) { existing.timedOut = true; throw new FirestoreRequestTimeoutError(); }
    try { await waitForFirestore(existing.promise, remaining); }
    catch (error) {
      if (error instanceof FirestoreRequestTimeoutError) existing.timedOut = true;
      throw error;
    }
    if (existing.value === value) return;
  }

  const operation = (async () => {
    const reference = progressDocument(db, uid, key);
    const previous = await getDoc(reference);
    const previousCount = Math.min(256, Number(previous.data()?.partCount) || 0);
    const batch = writeBatch(db);
    const updatedAtMs = Date.now();
    const chunks = value === null ? [] : splitValue(value);
    for (let index = 0; index < chunks.length; index += 1) {
      batch.set(progressPartDocument(db, uid, key, index), { value: chunks[index] });
    }
    for (let index = chunks.length; index < previousCount; index += 1) {
      batch.delete(progressPartDocument(db, uid, key, index));
    }
    batch.set(reference, {
      key,
      partCount: chunks.length,
      updatedAtMs,
      serverUpdatedAt: serverTimestamp(),
      schemaVersion: SCHEMA_VERSION,
      deleted: value === null,
    });
    await batch.commit();
    writeCloudVersion(uid, key, updatedAtMs);
  })();
  const entry: InFlightCloudWrite = { value, startedAt: Date.now(), promise: operation, timedOut: false };
  inFlightCloudWrites.set(operationKey, entry);
  void operation.then(() => {
    if (inFlightCloudWrites.get(operationKey) === entry) inFlightCloudWrites.delete(operationKey);
    if ((getStorage()?.getItem(key) ?? null) === value) clearPending(uid, key);
    if (entry.timedOut) window.dispatchEvent(new Event(PROGRESS_SYNC_RETRY_EVENT));
  }, () => {
    if (inFlightCloudWrites.get(operationKey) === entry) inFlightCloudWrites.delete(operationKey);
  });
  try { await waitForFirestore(operation); }
  catch (error) {
    if (error instanceof FirestoreRequestTimeoutError) entry.timedOut = true;
    throw error;
  }
}

export async function flushUserPendingProgress(db: Firestore, uid: string) {
  const pending = readPending(uid);
  if (Object.keys(pending).length && !navigator.onLine) throw new Error('Há progresso aguardando envio. Conecte-se à internet antes de sair desta conta.');
  for (const key of Object.keys(pending)) {
    if (!isProgressStorageKey(key)) { clearPending(uid, key); continue; }
    await writeCloudValue(db, uid, key, getStorage()?.getItem(key) ?? null);
    clearPending(uid, key);
  }
}

export function clearLocalProgressCache() {
  const storage = getStorage();
  if (!storage) return;
  try {
    const keys: string[] = [];
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key && isProgressStorageKey(key)) keys.push(key);
    }
    for (const key of keys) storage.removeItem(key);
  } catch { /* Logout still proceeds; the next account hydrates from its own UID. */ }
}

export class LocalMigrationCancelledError extends Error {
  constructor() { super('A migração foi cancelada; nada foi alterado.'); this.name = 'LocalMigrationCancelledError'; }
}

async function synchronizeInitialState(db: Firestore, uid: string, onProgress: ProgressStep) {
  const local = readLocalProgress();
  const pending = readPending(uid);
  const cloud = await readCloudProgress(db, uid, local, pending, onProgress);
  const hasLocalProgress = local.size > 0;
  if (cloud.size === 0 && hasLocalProgress && Object.keys(pending).length === 0) {
    const accepted = window.confirm('Encontramos progresso salvo neste navegador. Deseja transferi-lo para esta conta Google? Isso permitirá continuar em outros dispositivos.');
    if (!accepted) throw new LocalMigrationCancelledError();
    const entries = [...local.entries()];
    for (const [key] of entries) markPending(uid, key);
    let completed = 0;
    await mapWithConcurrency(entries, MAX_PARALLEL_WRITES, async ([key, value]) => {
      onProgress('Enviando progresso para sua conta', completed, entries.length);
      await writeCloudValue(db, uid, key, value);
      if (getStorage()?.getItem(key) === value) clearPending(uid, key);
      completed += 1;
      onProgress('Enviando progresso para sua conta', completed, entries.length);
    });
    emitProgressUpdated();
    return;
  }

  for (const record of cloud.values()) {
    if (!isProgressStorageKey(record.key) || readPending(uid)[record.key]) continue;
    const observedLocal = local.get(record.key) ?? null;
    const currentLocal = getStorage()?.getItem(record.key) ?? null;
    if (observedLocal !== currentLocal) continue;
    applyCloudValue(record.key, record.value);
    writeCloudVersion(uid, record.key, record.updatedAtMs);
  }
  const keysToUpload = [...new Set([
    ...[...local.keys()].filter((key) => !cloud.has(key)),
    ...Object.keys(readPending(uid)),
  ])];
  for (const key of keysToUpload) if (isProgressStorageKey(key)) markPending(uid, key);
  let completed = 0;
  await mapWithConcurrency(keysToUpload, MAX_PARALLEL_WRITES, async (key) => {
    onProgress('Enviando progresso para sua conta', completed, keysToUpload.length);
    if (!isProgressStorageKey(key)) {
      clearPending(uid, key);
      completed += 1;
      onProgress('Enviando progresso para sua conta', completed, keysToUpload.length);
      return;
    }
    const value = getStorage()?.getItem(key) ?? null;
    await writeCloudValue(db, uid, key, value);
    if ((getStorage()?.getItem(key) ?? null) === value) clearPending(uid, key);
    completed += 1;
    onProgress('Enviando progresso para sua conta', completed, keysToUpload.length);
  });
  emitProgressUpdated();
}

/** Starts account-scoped cloud sync and returns a function that stops listeners. */
export async function startProgressSync(
  db: Firestore,
  uid: string,
  onStatus: (status: CloudProgressStatus, message?: string) => void,
): Promise<Unsubscribe> {
  let disposed = false;
  let initializing = false;
  let initialized = false;
  let timer: number | undefined;
  let retryTimer: number | undefined;
  let retryAttempt = 0;
  let recovering = false;
  let flushRunning = false;
  let remoteUnsubscribe: Unsubscribe | undefined;
  const delayedKeys = new Set<string>();

  const clearRetry = () => {
    if (retryTimer !== undefined) window.clearTimeout(retryTimer);
    retryTimer = undefined;
  };

  const scheduleRetry = () => {
    if (disposed || !navigator.onLine || retryTimer !== undefined) return;
    const delay = Math.min(30_000, 1_500 * (2 ** Math.min(retryAttempt, 5)));
    retryAttempt += 1;
    retryTimer = window.setTimeout(() => {
      retryTimer = undefined;
      void recoverConnection();
    }, delay);
  };

  const installRemoteListener = () => {
    remoteUnsubscribe?.();
    remoteUnsubscribe = onSnapshot(progressCollection(db, uid), (snapshot) => {
      void (async () => {
        let changed = false;
        const versions = readCloudVersions(uid);
        await mapWithConcurrency(snapshot.docChanges(), MAX_PARALLEL_RECORDS, async (change) => {
          const pending = readPending(uid);
          const metadata = change.doc.data();
          const key = String(metadata.key ?? '');
          if (!isProgressStorageKey(key) || pending[key]) return;
          const updatedAtMs = Number(metadata.updatedAtMs) || 0;
          const localValue = getStorage()?.getItem(key) ?? null;
          if (versions[key] === updatedAtMs && (localValue !== null || metadata.deleted === true)) return;
          const record = await readCloudRecord(db, uid, key, metadata);
          if (!record) return;
          const currentValue = getStorage()?.getItem(key) ?? null;
          if (currentValue !== record.value) {
            applyCloudValue(key, record.value);
            changed = true;
          }
          writeCloudVersion(uid, key, record.updatedAtMs);
        });
        if (changed) emitProgressUpdated();
        if (Object.keys(readPending(uid)).length) void flush();
        else onStatus('synced', 'Progresso sincronizado com esta conta Google.');
      })().catch((error) => {
        const temporary = isTemporaryConnectionError(error);
        onStatus(temporary ? 'offline' : 'error', readableSyncError(error, 'Falha ao receber progresso da nuvem.'));
        if (temporary) scheduleRetry();
      });
    }, (error) => {
      const temporary = isTemporaryConnectionError(error);
      onStatus(temporary ? 'offline' : 'error', readableSyncError(error, 'Falha ao acompanhar o progresso na nuvem.'));
      if (temporary) scheduleRetry();
    });
  };

  const flush = async () => {
    if (!initialized || disposed || flushRunning) return;
    if (!navigator.onLine) { onStatus('offline', 'Sem internet · as alterações ficam pendentes neste dispositivo.'); return; }
    const pending = readPending(uid);
    const keys = new Set([...Object.keys(pending), ...delayedKeys]);
    delayedKeys.clear();
    if (!keys.size) { onStatus('synced', 'Progresso sincronizado com esta conta Google.'); return; }
    flushRunning = true;
    let completed = 0;
    let followUp = false;
    onStatus('syncing', `Enviando 0 de ${keys.size} atualizações…`);
    try {
      await mapWithConcurrency([...keys], MAX_PARALLEL_WRITES, async (key) => {
        if (!isProgressStorageKey(key)) clearPending(uid, key);
        else {
          const value = getStorage()?.getItem(key) ?? null;
          await writeCloudValue(db, uid, key, value);
          if ((getStorage()?.getItem(key) ?? null) === value) clearPending(uid, key);
          else { markPending(uid, key); followUp = true; }
        }
        completed += 1;
        onStatus('syncing', `Enviando ${completed} de ${keys.size} atualizações…`);
      });
      const hasChanges = Object.keys(readPending(uid)).length > 0 || delayedKeys.size > 0;
      if (hasChanges || followUp) {
        followUp = true;
        onStatus('syncing', 'Enviando as alterações mais recentes…');
      } else {
        retryAttempt = 0;
        onStatus('synced', 'Progresso sincronizado com esta conta Google.');
      }
    } catch (error) {
      const temporary = isTemporaryConnectionError(error);
      onStatus(temporary ? 'offline' : 'error', readableSyncError(error, 'Não foi possível sincronizar agora.'));
      if (temporary) scheduleRetry();
    } finally {
      flushRunning = false;
      if (followUp && !disposed) {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => { void flush(); }, 250);
      }
    }
  };

  async function recoverConnection() {
    if (disposed || recovering) return;
    if (!initialized && initializing) return;
    if (!navigator.onLine) {
      onStatus('offline', 'Sem internet · as alterações ficam pendentes neste dispositivo.');
      return;
    }
    recovering = true;
    onStatus('syncing', 'Tentando restabelecer a conexão com a nuvem…');
    try {
      await enableNetwork(db);
      if (!initialized) await begin();
      else {
        installRemoteListener();
        await flush();
      }
    } catch (error) {
      const temporary = isTemporaryConnectionError(error);
      onStatus(temporary ? 'offline' : 'error', readableSyncError(error, 'Não foi possível retomar a sincronização.'));
      if (temporary) scheduleRetry();
    } finally { recovering = false; }
  }

  const begin = async () => {
    if (initializing || initialized || disposed) return;
    initializing = true;
    onStatus('syncing', 'Carregando o progresso desta conta…');
    try {
      await synchronizeInitialState(db, uid, (phase, completed, total) => {
        const progress = total > 0 ? ` (${completed}/${total})` : '';
        onStatus('syncing', `${phase}${progress}…`);
      });
      if (disposed) return;
      initialized = true;
      retryAttempt = 0;
      installRemoteListener();
      await flush();
    } catch (error) {
      if (error instanceof LocalMigrationCancelledError) {
        onStatus('signed-out', 'A migração foi cancelada; o progresso local continua intacto.');
        throw error;
      }
      const temporary = isTemporaryConnectionError(error);
      onStatus(temporary ? 'offline' : 'error', readableSyncError(error, 'Não foi possível carregar o progresso da nuvem.'));
      if (temporary) scheduleRetry();
    } finally { initializing = false; }
  };

  const onLocalChange = (event: Event) => {
    const detail = (event as CustomEvent<ProgressStorageChange>).detail;
    if (!detail || !isProgressStorageKey(detail.key)) return;
    markPending(uid, detail.key);
    delayedKeys.add(detail.key);
    if (initialized) onStatus(navigator.onLine ? 'syncing' : 'offline', navigator.onLine ? 'Salvando seu progresso na nuvem…' : 'Sem internet · as alterações ficam pendentes neste dispositivo.');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { void flush(); }, 450);
  };
  const onOnline = () => { clearRetry(); retryAttempt = 0; void recoverConnection(); };
  const onManualRetry = () => { clearRetry(); retryAttempt = 0; void recoverConnection(); };
  window.addEventListener(SYNC_CHANGE_EVENT, onLocalChange);
  window.addEventListener('online', onOnline);
  window.addEventListener(PROGRESS_SYNC_RETRY_EVENT, onManualRetry);
  try { await begin(); }
  catch (error) {
    window.removeEventListener(SYNC_CHANGE_EVENT, onLocalChange);
    window.removeEventListener('online', onOnline);
    window.removeEventListener(PROGRESS_SYNC_RETRY_EVENT, onManualRetry);
    remoteUnsubscribe?.();
    throw error;
  }

  return () => {
    disposed = true;
    window.clearTimeout(timer);
    clearRetry();
    window.removeEventListener(SYNC_CHANGE_EVENT, onLocalChange);
    window.removeEventListener('online', onOnline);
    window.removeEventListener(PROGRESS_SYNC_RETRY_EVENT, onManualRetry);
    remoteUnsubscribe?.();
  };
}

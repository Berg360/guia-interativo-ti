import {
  collection,
  doc,
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

export type CloudProgressStatus = 'unconfigured' | 'signed-out' | 'syncing' | 'synced' | 'offline' | 'error';
type ProgressStorageChange = { key: string; value: string | null };
type CloudProgressRecord = { key: string; value: string | null; updatedAtMs: number };
type PendingChanges = Record<string, number>;

const CHUNK_LENGTH = 180_000;
const MAX_VALUE_LENGTH = 20_000_000;
const SCHEMA_VERSION = 2;

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

async function readCloudRecord(db: Firestore, uid: string, key: string): Promise<CloudProgressRecord | null> {
  const reference = progressDocument(db, uid, key);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists()) return null;
  const metadata = snapshot.data();
  if (metadata.key !== key) throw new Error('Um registro da nuvem não corresponde à chave de progresso solicitada.');
  if (metadata.deleted === true) return { key, value: null, updatedAtMs: Number(metadata.updatedAtMs) || 0 };
  const partCount = Number(metadata.partCount);
  if (!Number.isInteger(partCount) || partCount < 1 || partCount > 256) throw new Error(`O registro “${key}” está em um formato inválido na nuvem.`);
  const parts = await Promise.all(Array.from({ length: partCount }, (_, index) =>
    getDoc(progressPartDocument(db, uid, key, index))));
  if (parts.some((part) => !part.exists() || typeof part.data().value !== 'string')) {
    throw new Error(`Não consegui carregar todos os blocos do progresso “${key}”. Tente novamente com conexão estável.`);
  }
  const value = parts.map((part) => part.get('value') as string).join('');
  return { key, value, updatedAtMs: Number(metadata.updatedAtMs) || 0 };
}

async function readCloudProgress(db: Firestore, uid: string) {
  const metadata = await getDocs(progressCollection(db, uid));
  const records = await Promise.all(metadata.docs.map((item) => readCloudRecord(db, uid, String(item.data().key ?? ''))));
  return new Map(records.filter((item): item is CloudProgressRecord => Boolean(item)).map((item) => [item.key, item]));
}

async function writeCloudValue(db: Firestore, uid: string, key: string, value: string | null) {
  if (!isProgressStorageKey(key)) return;
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

async function synchronizeInitialState(db: Firestore, uid: string) {
  const [cloud, local] = await Promise.all([readCloudProgress(db, uid), Promise.resolve(readLocalProgress())]);
  const pending = readPending(uid);
  const hasLocalProgress = local.size > 0;
  if (cloud.size === 0 && hasLocalProgress && Object.keys(pending).length === 0) {
    const accepted = window.confirm('Encontramos progresso salvo neste navegador. Deseja transferi-lo para esta conta Google? Isso permitirá continuar em outros dispositivos.');
    if (!accepted) throw new LocalMigrationCancelledError();
    for (const [key, value] of local) await writeCloudValue(db, uid, key, value);
    emitProgressUpdated();
    return;
  }

  for (const record of cloud.values()) {
    if (!isProgressStorageKey(record.key) || readPending(uid)[record.key]) continue;
    const observedLocal = local.get(record.key) ?? null;
    const currentLocal = getStorage()?.getItem(record.key) ?? null;
    if (observedLocal !== currentLocal) continue;
    applyCloudValue(record.key, record.value);
  }
  const keysToUpload = new Set([
    ...[...local.keys()].filter((key) => !cloud.has(key)),
    ...Object.keys(readPending(uid)),
  ]);
  for (const key of keysToUpload) {
    if (!isProgressStorageKey(key)) { clearPending(uid, key); continue; }
    await writeCloudValue(db, uid, key, getStorage()?.getItem(key) ?? null);
    clearPending(uid, key);
  }
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
  let remoteUnsubscribe: Unsubscribe | undefined;
  const delayedKeys = new Set<string>();

  const flush = async () => {
    if (!initialized || disposed) return;
    if (!navigator.onLine) { onStatus('offline', 'Sem internet · as alterações ficam pendentes neste dispositivo.'); return; }
    const pending = readPending(uid);
    const keys = new Set([...Object.keys(pending), ...delayedKeys]);
    delayedKeys.clear();
    if (!keys.size) { onStatus('synced', 'Progresso sincronizado com esta conta Google.'); return; }
    onStatus('syncing', 'Enviando seu progresso para a nuvem…');
    try {
      for (const key of keys) {
        if (!isProgressStorageKey(key)) { clearPending(uid, key); continue; }
        await writeCloudValue(db, uid, key, getStorage()?.getItem(key) ?? null);
        clearPending(uid, key);
      }
      onStatus('synced', 'Progresso sincronizado com esta conta Google.');
    } catch (error) {
      onStatus(navigator.onLine ? 'error' : 'offline', error instanceof Error ? error.message : 'Não foi possível sincronizar agora.');
    }
  };

  const begin = async () => {
    if (initializing || initialized || disposed) return;
    initializing = true;
    onStatus('syncing', 'Carregando o progresso desta conta…');
    try {
      await synchronizeInitialState(db, uid);
      if (disposed) return;
      initialized = true;
      remoteUnsubscribe = onSnapshot(progressCollection(db, uid), (snapshot) => {
        void (async () => {
          let changed = false;
          const pending = readPending(uid);
          for (const change of snapshot.docChanges()) {
            const key = String(change.doc.data().key ?? '');
            if (!isProgressStorageKey(key) || pending[key]) continue;
            const record = await readCloudRecord(db, uid, key);
            if (!record) continue;
            const currentValue = getStorage()?.getItem(key) ?? null;
            if (currentValue === record.value) continue;
            applyCloudValue(key, record.value);
            changed = true;
          }
          if (changed) emitProgressUpdated();
          if (Object.keys(readPending(uid)).length) void flush();
          else onStatus('synced', 'Progresso sincronizado com esta conta Google.');
        })().catch((error) => onStatus('error', error instanceof Error ? error.message : 'Falha ao receber progresso da nuvem.'));
      }, (error) => onStatus('error', error.message || 'Falha ao acompanhar o progresso na nuvem.'));
      await flush();
    } catch (error) {
      if (error instanceof LocalMigrationCancelledError) {
        onStatus('signed-out', 'A migração foi cancelada; o progresso local continua intacto.');
        throw error;
      }
      onStatus(navigator.onLine ? 'error' : 'offline', error instanceof Error ? error.message : 'Não foi possível carregar o progresso da nuvem.');
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
  const onOnline = () => { if (!initialized) void begin(); else void flush(); };
  window.addEventListener(SYNC_CHANGE_EVENT, onLocalChange);
  window.addEventListener('online', onOnline);
  try { await begin(); }
  catch (error) {
    window.removeEventListener(SYNC_CHANGE_EVENT, onLocalChange);
    window.removeEventListener('online', onOnline);
    remoteUnsubscribe?.();
    throw error;
  }

  return () => {
    disposed = true;
    window.clearTimeout(timer);
    window.removeEventListener(SYNC_CHANGE_EVENT, onLocalChange);
    window.removeEventListener('online', onOnline);
    remoteUnsubscribe?.();
  };
}

const PLAIN_STORAGE_KEYS = new Set(['trilha-ti-recent-course-v1']);
const PYTHON_STORAGE_KEYS = new Set(['pyneuro_evolution_state_v2', 'pyneuro_evolution_backup_last_good']);

/** @returns {Storage|null} */
export function getBrowserStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

/** @param {string} key */
export function readStoredValue(key) {
  try {
    return getBrowserStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/** @param {string} key @param {string} value */
export function writeStoredValue(key, value) {
  try {
    const storage = getBrowserStorage();
    if (!storage) return false;
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** @param {string} key */
export function removeStoredValue(key) {
  try {
    const storage = getBrowserStorage();
    if (!storage) return false;
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/** @param {string|null} raw @param {object} fallback */
export function parseStoredObject(raw, fallback) {
  try {
    const value = raw ? JSON.parse(raw) : null;
    return value && typeof value === 'object' && !Array.isArray(value) ? { ...fallback, ...value } : fallback;
  } catch {
    return fallback;
  }
}

/** @param {unknown} data @param {string[]} allowedKeys @param {number} maxValueLength */
export function validateBackupEntries(data, allowedKeys, maxValueLength = 4_000_000) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('O backup não contém dados em um formato válido.');
  const entries = Object.entries(data);
  const permitted = new Set(allowedKeys);
  if (allowedKeys.some((key) => !Object.prototype.hasOwnProperty.call(data, key))) throw new Error('O backup está incompleto.');
  if (entries.some(([key]) => !permitted.has(key))) throw new Error('O backup contém campos que não pertencem a este curso.');

  for (const [key, value] of entries) {
    if (value === null) continue;
    if (typeof value !== 'string' || value.length > maxValueLength) throw new Error('Um item do backup está fora do formato esperado.');
    if (PLAIN_STORAGE_KEYS.has(key)) continue;
    let parsed;
    try { parsed = JSON.parse(value); } catch { throw new Error('Um item do backup contém JSON inválido.'); }
    if (PYTHON_STORAGE_KEYS.has(key) && (!parsed || parsed.version !== 2 || !Number.isFinite(parsed.xp) || !parsed.competencies || !Array.isArray(parsed.srsCards))) {
      throw new Error('O progresso de Python não passou pela validação.');
    }
  }
  return Object.fromEntries(entries);
}

/**
 * Applies a validated backup as one recoverable operation. If a write fails,
 * all touched keys are restored to their previous values before the error is returned.
 * @param {Storage|null|{getItem:(key:string)=>string|null,setItem:(key:string,value:string)=>void,removeItem:(key:string)=>void}} storage
 * @param {Record<string,string|null>} entries
 */
export function applyStorageTransaction(storage, entries) {
  if (!storage) throw new Error('O armazenamento deste navegador está indisponível.');
  const previous = new Map(Object.keys(entries).map((key) => [key, storage.getItem(key)]));
  try {
    for (const [key, value] of Object.entries(entries)) {
      if (value === null) storage.removeItem(key);
      else storage.setItem(key, value);
    }
  } catch {
    let restored = true;
    for (const [key, value] of [...previous.entries()].reverse()) {
      try {
        if (value === null) storage.removeItem(key);
        else storage.setItem(key, value);
      } catch { restored = false; }
    }
    throw new Error(restored
      ? 'Não foi possível gravar o backup. O progresso anterior foi restaurado.'
      : 'A restauração falhou e o navegador também bloqueou a recuperação automática. Não feche esta página; exporte os dados atuais antes de tentar novamente.');
  }
}

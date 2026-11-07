import { isProgressStorageKey } from '../data/progressKeys';

export const SYNC_CHANGE_EVENT = 'nexo:local-progress-change';
export const PROGRESS_UPDATED_EVENT = 'nexo:progress-updated';
let bridgeInstalled = false;
let suppressBridgeEvents = false;

export function getBrowserLocalStorage() {
  try { return window.localStorage; } catch { return null; }
}

export function installProgressStorageBridge() {
  if (bridgeInstalled || typeof window === 'undefined' || typeof Storage === 'undefined') return;
  bridgeInstalled = true;
  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;
  Storage.prototype.setItem = function (key: string, value: string) {
    const previous = this === getBrowserLocalStorage() ? this.getItem(key) : null;
    originalSetItem.call(this, key, value);
    if (!suppressBridgeEvents && this === getBrowserLocalStorage() && previous !== value && isProgressStorageKey(key)) {
      window.dispatchEvent(new CustomEvent(SYNC_CHANGE_EVENT, { detail: { key, value } }));
    }
  };
  Storage.prototype.removeItem = function (key: string) {
    const previous = this === getBrowserLocalStorage() ? this.getItem(key) : null;
    originalRemoveItem.call(this, key);
    if (!suppressBridgeEvents && this === getBrowserLocalStorage() && previous !== null && isProgressStorageKey(key)) {
      window.dispatchEvent(new CustomEvent(SYNC_CHANGE_EVENT, { detail: { key, value: null } }));
    }
  };
}

export function applyRemoteProgressValue(key: string, value: string | null) {
  const storage = getBrowserLocalStorage();
  if (!storage) return;
  suppressBridgeEvents = true;
  try {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  } finally { suppressBridgeEvents = false; }
}

export function emitProgressUpdated() {
  window.dispatchEvent(new Event(PROGRESS_UPDATED_EVENT));
}

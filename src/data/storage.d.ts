export type StorageSnapshot = Record<string, string | null>;
export function getBrowserStorage(): Storage | null;
export function readStoredValue(key: string): string | null;
export function writeStoredValue(key: string, value: string): boolean;
export function removeStoredValue(key: string): boolean;
export function parseStoredObject<T extends object>(raw: string | null, fallback: T): T;
export function validateBackupEntries(data: unknown, allowedKeys: string[], maxValueLength?: number): StorageSnapshot;
export function applyStorageTransaction(storage: Storage | null, entries: StorageSnapshot): void;

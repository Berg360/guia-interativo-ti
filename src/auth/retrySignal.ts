export const PROGRESS_SYNC_RETRY_EVENT = 'nexo:retry-progress-sync';

export function requestProgressSyncRetry() {
  window.dispatchEvent(new Event(PROGRESS_SYNC_RETRY_EVENT));
}

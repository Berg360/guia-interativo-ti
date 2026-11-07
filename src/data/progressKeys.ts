import {
  PYTHON_BACKUP_KEY,
  PYTHON_STATE_KEY,
  PROGRAM_CALENDAR_PREFIX,
  PROGRAM_PROGRESS_PREFIX,
  programCalendarKey,
  programProgressKey,
  studyPrograms,
} from './studyPrograms';

const fixedProgressKeys = new Set([
  'trilha-ti-reviews-v1',
  'trilha-ti-practice-v1',
  'trilha-ti-route-v1',
  'trilha-ti-quiz-v1',
  'trilha-ti-plan-v1',
  'trilha-ti-recent-course-v1',
  'nexo-study-program-selected-v1',
  PYTHON_STATE_KEY,
  PYTHON_BACKUP_KEY,
]);

for (const program of studyPrograms) {
  for (const key of program.storageKeys) fixedProgressKeys.add(key);
  fixedProgressKeys.add(programCalendarKey(program.id));
  fixedProgressKeys.add(programProgressKey(program.id));
}

/** New programs added to studyPrograms automatically join account sync. */
export function isProgressStorageKey(key: string) {
  return fixedProgressKeys.has(key)
    || key.startsWith(PROGRAM_CALENDAR_PREFIX)
    || key.startsWith(PROGRAM_PROGRESS_PREFIX);
}

export function getProgressStorageKeys() {
  return [...fixedProgressKeys];
}

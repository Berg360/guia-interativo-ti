/** @typedef {'courses'|'home'|'map'|'catalog'|'extras'|'study'|'progress'|'practice'|'planner'|'python'|'program'|'unit'} AppView */
/** @typedef {{view:AppView,courseId?:string,branchIndex?:number,topic?:string,programId?:string,unitId?:string,level?:number}} AppRoute */

const ROUTABLE_VIEWS = new Set([
  'courses', 'home', 'map', 'catalog', 'extras', 'study', 'progress',
  'practice', 'planner', 'python', 'program', 'unit',
]);

/**
 * Converts the current URL into a safe, validated application route.
 * Invalid or stale links fall back to the course catalog.
 * @param {string} search
 * @param {Array<{id:string,branches?:Array<{topics:string[]}>}>} courses
 * @param {Array<{id:string,units?:Array<{id:string,level?:number}>}>} programs
 * @returns {AppRoute}
 */
export function parseAppRoute(search, courses = [], programs = []) {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const viewValue = params.get('view') || 'courses';
  if (!ROUTABLE_VIEWS.has(viewValue)) return { view: 'courses' };

  const course = courses.find((item) => item.id === params.get('course'));
  const program = programs.find((item) => item.id === params.get('program'));
  const branchText = params.get('branch');
  const branchValue = branchText === null ? Number.NaN : Number(branchText);
  const branchIndex = Number.isInteger(branchValue) && branchValue >= 0 && course?.branches?.[branchValue]
    ? branchValue
    : undefined;
  const requestedTopic = params.get('topic') || undefined;
  const topic = requestedTopic && branchIndex !== undefined && course?.branches?.[branchIndex]?.topics.includes(requestedTopic)
    ? requestedTopic
    : undefined;
  const unitId = params.get('unit') || undefined;
  const unit = unitId && program?.units?.find((item) => item.id === unitId) ? unitId : undefined;
  const levelValue = Number(params.get('level'));
  const level = Number.isInteger(levelValue) && levelValue > 0 && levelValue <= 100 ? levelValue : undefined;

  if (viewValue === 'map' && !course) return { view: 'courses' };
  if (viewValue === 'practice' && !course) return { view: 'courses' };
  if (viewValue === 'program' && !program) return { view: 'courses' };
  if (viewValue === 'unit' && (!program || !unit)) return { view: 'courses' };
  if (viewValue === 'python' && !programs.some((item) => item.id === 'python-profissional')) return { view: 'courses' };

  return {
    view: /** @type {AppView} */ (viewValue),
    ...(course ? { courseId: course.id } : {}),
    ...(branchIndex !== undefined ? { branchIndex } : {}),
    ...(topic ? { topic } : {}),
    ...(program ? { programId: program.id } : {}),
    ...(unit ? { unitId: unit } : {}),
    ...(level ? { level } : {}),
  };
}

/** @param {{view:string,courseId?:string,branchIndex?:number,topic?:string,programId?:string,unitId?:string,level?:number}} route @param {string} baseUrl */
export function serializeAppRoute(route, baseUrl) {
  const url = new URL(baseUrl);
  url.search = '';
  if (route.view && route.view !== 'courses' && ROUTABLE_VIEWS.has(route.view)) url.searchParams.set('view', route.view);
  if (route.courseId) url.searchParams.set('course', route.courseId);
  if (Number.isInteger(route.branchIndex) && route.branchIndex >= 0) url.searchParams.set('branch', String(route.branchIndex));
  if (route.topic) url.searchParams.set('topic', route.topic);
  if (route.programId) url.searchParams.set('program', route.programId);
  if (route.unitId) url.searchParams.set('unit', route.unitId);
  if (Number.isInteger(route.level) && route.level > 0) url.searchParams.set('level', String(route.level));
  return `${url.pathname}${url.search}${url.hash}`;
}

export type AppView = 'courses' | 'home' | 'map' | 'catalog' | 'extras' | 'study' | 'progress' | 'practice' | 'planner' | 'python' | 'program' | 'unit';
export type AppRoute = {
  view: AppView;
  courseId?: string;
  branchIndex?: number;
  topic?: string;
  programId?: string;
  unitId?: string;
  level?: number;
};
export type RouteCourse = { id: string; branches?: Array<{ topics: string[] }> };
export type RouteProgram = { id: string; units?: Array<{ id: string; level?: number }> };
export function parseAppRoute(search: string, courses?: RouteCourse[], programs?: RouteProgram[]): AppRoute;
export function serializeAppRoute(route: AppRoute, baseUrl: string): string;

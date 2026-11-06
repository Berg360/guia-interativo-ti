import type { Course } from './curriculum';

export const REVIEW_KEY = 'trilha-ti-reviews-v1';
export const PRACTICE_KEY = 'trilha-ti-practice-v1';
export const ROUTE_KEY = 'trilha-ti-route-v1';
export const QUIZ_KEY = 'trilha-ti-quiz-v1';
export const PLAN_KEY = 'trilha-ti-plan-v1';

export type ReviewRecord = { repetitions: number; intervalDays: number; dueAt: number; lastReviewedAt: number };
export type PracticeRecord = { answer?: string; revealed?: boolean; rating?: 'review' | 'partial' | 'ready'; updatedAt?: number };
export type QuizRecord = { attempts: number; best: number; last: number; lastAt: string; missedBranches?: number[]; correctBranches?: number[] };
type StoredPlan = { goalMinutes?: number };

function readRecord<T>(key: string): Record<string, T> {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as Record<string, T> : {};
  } catch {
    return {};
  }
}

export type BranchLearningState = 'new' | 'learning' | 'applied' | 'review' | 'verified';

export type BranchEvidence = {
  totalTopics: number;
  retainedTopics: number;
  recallComplete: boolean;
  practiceRating?: PracticeRecord['rating'];
  quizCorrect: boolean;
  quizMissed: boolean;
  verified: boolean;
};

function evidenceForBranch(
  course: Course,
  branchIndex: number,
  reviews: Record<string, ReviewRecord>,
  practices: Record<string, PracticeRecord>,
  quizzes: Record<string, QuizRecord>,
): BranchEvidence {
  const branch = course.branches[branchIndex];
  if (!branch) return { totalTopics: 0, retainedTopics: 0, recallComplete: false, quizCorrect: false, quizMissed: false, verified: false };
  const retainedTopics = branch.topics.filter((_, index) => (reviews[[course.id, branch.id, index].join(':')]?.repetitions ?? 0) >= 3).length;
  const practiceRating = practices[course.id + ':' + branch.id]?.rating;
  const quiz = quizzes[course.id];
  const quizCorrect = quiz?.correctBranches?.includes(branchIndex) ?? false;
  const quizMissed = quiz?.missedBranches?.includes(branchIndex) ?? false;
  const recallComplete = branch.topics.length > 0 && retainedTopics === branch.topics.length;
  return {
    totalTopics: branch.topics.length,
    retainedTopics,
    recallComplete,
    practiceRating,
    quizCorrect,
    quizMissed,
    verified: recallComplete && practiceRating === 'ready' && quizCorrect && !quizMissed,
  };
}

export function getCourseEvidence(courses: Course[]) {
  const reviews = readRecord<ReviewRecord>(REVIEW_KEY);
  const practices = readRecord<PracticeRecord>(PRACTICE_KEY);
  const quizzes = readRecord<QuizRecord>(QUIZ_KEY);
  return courses.flatMap((course) => course.branches.map((branch, branchIndex) => ({
    course,
    branch,
    branchIndex,
    evidence: evidenceForBranch(course, branchIndex, reviews, practices, quizzes),
  })));
}

export function getBranchLearningState(course: Course, branchIndex: number): BranchLearningState {
  const branch = course.branches[branchIndex];
  if (!branch) return 'new';
  const evidence = getCourseEvidence([course]).find((item) => item.branchIndex === branchIndex)?.evidence;
  if (evidence?.verified) return 'verified';
  if (evidence?.practiceRating === 'review' || evidence?.quizMissed) return 'review';
  if (evidence?.practiceRating === 'ready') return 'applied';
  if (evidence?.practiceRating === 'partial' || (evidence?.retainedTopics ?? 0) > 0) return 'learning';
  return 'new';
}

export type LearningSnapshot = {
  recommendedCourse: Course;
  dueCount: number;
  reviewedToday: number;
  masteredTopics: number;
  totalTopics: number;
  verifiedBranches: number;
  practiceRated: number;
  quizAttempts: number;
  completedRouteSteps: number;
  goalMinutes: number;
  reason: string;
  suggestedBranchIndex: number;
};

export function getLearningSnapshot(courses: Course[], now = Date.now()): LearningSnapshot {
  const reviews = readRecord<ReviewRecord>(REVIEW_KEY);
  const practices = readRecord<PracticeRecord>(PRACTICE_KEY);
  const routes = readRecord<boolean>(ROUTE_KEY);
  const quizzes = readRecord<QuizRecord>(QUIZ_KEY);
  const plan = readRecord<number>(PLAN_KEY);
  const goalMinutes = Math.max(15, Math.min(60, Number((plan as StoredPlan).goalMinutes) || 25));
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const todayStart = today.getTime();

  const topicRows = courses.flatMap((course) => course.branches.flatMap((branch, branchIndex) => branch.topics.map((_, topicIndex) => ({
    id: [course.id, branch.id, topicIndex].join(':'),
    course,
    branch,
    branchIndex,
  }))));
  const dueCount = topicRows.filter(({ id }) => {
    const record = reviews[id];
    return !record || (record.dueAt <= now && record.lastReviewedAt < todayStart);
  }).length;
  const reviewedToday = topicRows.filter(({ id }) => (reviews[id]?.lastReviewedAt ?? 0) >= todayStart).length;
  const masteredTopics = topicRows.filter(({ id }) => (reviews[id]?.repetitions ?? 0) >= 3).length;
  const verifiedBranches = courses.reduce((sum, course) => sum + course.branches.filter((_, index) => evidenceForBranch(course, index, reviews, practices, quizzes).verified).length, 0);
  const practiceRated = courses.reduce((sum, course) => sum + course.branches.filter((branch) => Boolean(practices[course.id + ':' + branch.id]?.rating)).length, 0);
  const quizAttempts = Object.values(quizzes).reduce((sum, record) => sum + (record?.attempts ?? 0), 0);
  const completedRouteSteps = courses.reduce((sum, course) => sum + Array.from({ length: 5 }, (_, index) => Number(Boolean(routes[course.id + ':' + index]))).reduce((a, b) => a + b, 0), 0);

  const ranked = courses.map((course) => {
    const due = course.branches.reduce((sum, branch) => sum + branch.topics.filter((_, index) => {
      const record = reviews[[course.id, branch.id, index].join(':')];
      return !record || (record.dueAt <= now && record.lastReviewedAt < todayStart);
    }).length, 0);
    const quiz = quizzes[course.id];
    const weakBranches = new Set<number>(quiz?.missedBranches ?? []);
    course.branches.forEach((branch, index) => {
      const rating = practices[course.id + ':' + branch.id]?.rating;
      if (rating === 'review' || rating === 'partial') weakBranches.add(index);
    });
    const branchCandidates = course.branches.map((branch, index) => {
      const evidence = evidenceForBranch(course, index, reviews, practices, quizzes);
      const branchDue = branch.topics.filter((_, topicIndex) => {
        const review = reviews[[course.id, branch.id, topicIndex].join(':')];
        return !review || (review.dueAt <= now && review.lastReviewedAt < todayStart);
      }).length;
      const urgency = evidence.quizMissed || evidence.practiceRating === 'review' ? 100
        : evidence.practiceRating === 'partial' ? 90
          : branchDue > 0 ? 60 + Math.min(20, branchDue)
            : evidence.practiceRating !== 'ready' ? 40
              : !evidence.quizCorrect ? 30
                : !evidence.recallComplete ? 20 : -1;
      return { index, urgency };
    }).sort((a, b) => b.urgency - a.urgency);
    const branchToResume = branchCandidates[0]?.urgency === -1 ? 0 : branchCandidates[0]?.index ?? ([...weakBranches][0] ?? 0);
    const total = Math.max(1, course.branches.reduce((sum, branch) => sum + branch.topics.length, 0));
    const score = (due / total) + weakBranches.size * 1.6;
    return { course, due, weakBranches, branchToResume, score };
  }).sort((a, b) => b.score - a.score || b.due - a.due);

  const first = ranked[0] ?? { course: courses[0], due: 0, weakBranches: new Set<number>(), branchToResume: 0 };
  const focusEvidence = evidenceForBranch(first.course, first.branchToResume, reviews, practices, quizzes);
  const reason = focusEvidence.quizMissed || focusEvidence.practiceRating === 'review'
    ? `Retome ${first.course.branches[first.branchToResume]?.title ?? 'um ramo'}: a última tentativa indicou que vale reconstruir esse assunto.`
    : focusEvidence.practiceRating === 'partial'
      ? `Continue por ${first.course.branches[first.branchToResume]?.title ?? 'um ramo'}: sua autoavaliação marcou pontos para completar.`
      : focusEvidence.totalTopics > focusEvidence.retainedTopics
        ? `${first.course.branches[first.branchToResume]?.title ?? 'Este ramo'} ainda tem assuntos sem três revisões bem-sucedidas.`
        : !focusEvidence.practiceRating || !focusEvidence.quizCorrect
          ? `Complete as evidências de ${first.course.branches[first.branchToResume]?.title ?? 'um ramo'} com uma aplicação e um quiz.`
          : first.due
            ? `${first.due} assuntos estão prontos para uma revisão espaçada nesta disciplina.`
            : 'As revisões estão em dia. Faça uma sessão curta para conectar conceitos e praticar a aplicação.';

  return {
    recommendedCourse: first.course,
    dueCount,
    reviewedToday,
    masteredTopics,
    totalTopics: topicRows.length,
    verifiedBranches,
    practiceRated,
    quizAttempts,
    completedRouteSteps,
    goalMinutes,
    reason,
    suggestedBranchIndex: first.branchToResume,
  };
}

export function getCourseMastery(course: Course): { mastered: number; total: number; percent: number } {
  const reviews = readRecord<ReviewRecord>(REVIEW_KEY);
  const topics = course.branches.flatMap((branch) => branch.topics.map((_, index) => reviews[[course.id, branch.id, index].join(':')]));
  const total = topics.length;
  const mastered = topics.filter((record) => (record?.repetitions ?? 0) >= 3).length;
  return { mastered, total, percent: total ? Math.round(mastered / total * 100) : 0 };
}

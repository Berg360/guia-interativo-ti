import type { Course } from './data/curriculum';
import type { PracticeRecord, QuizRecord } from './data/learning';
import { getCourseEvidence } from './data/learning';

type ReviewRecord = { repetitions: number; intervalDays: number; dueAt: number; lastReviewedAt: number };
type CourseProgress = { course: Course; total: number; reviewed: number; mastered: number; due: number; unseen: number; percent: number };
type QuizAttempt = QuizRecord;

const STORAGE_KEY = 'trilha-ti-reviews-v1';
const PRACTICE_KEY = 'trilha-ti-practice-v1';
const ROUTE_KEY = 'trilha-ti-route-v1';
const QUIZ_KEY = 'trilha-ti-quiz-v1';
function readReviews(): Record<string, ReviewRecord> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as Record<string, ReviewRecord> : {};
  } catch {
    return {};
  }
}

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function makeProgress(course: Course, reviews: Record<string, ReviewRecord>, now: number, today: number): CourseProgress {
  const topics = course.branches.flatMap((branch) =>
    branch.topics.map((topic, index) => {
      const id = [course.id, branch.id, index].join(':');
      const review = reviews[id];
      return { review, topic };
    }),
  );
  const total = topics.length;
  const reviewed = topics.filter(({ review }) => Boolean(review)).length;
  const mastered = topics.filter(({ review }) => (review?.repetitions ?? 0) >= 3).length;
  const due = topics.filter(({ review }) => !review || (review.dueAt <= now && review.lastReviewedAt < today)).length;
  return {
    course,
    total,
    reviewed,
    mastered,
    due,
    unseen: total - reviewed,
    percent: total ? Math.round((mastered / total) * 100) : 0,
  };
}

type ProgressProps = {
  courses: Course[];
  onOpenCourse: (course: Course, branchIndex?: number) => void;
  onReviewCourse: (course: Course) => void;
  onPracticeCourse: (course: Course) => void;
};

export function Progress({ courses, onOpenCourse, onReviewCourse, onPracticeCourse }: ProgressProps) {
  const reviews = readReviews();
  const practiceRecords = readLocal<Record<string, PracticeRecord>>(PRACTICE_KEY, {});
  const routeRecords = readLocal<Record<string, boolean>>(ROUTE_KEY, {});
  const quizHistory = readLocal<Record<string, QuizAttempt>>(QUIZ_KEY, {});
  const now = Date.now();
  const today = startOfToday();
  const courseProgress = courses.map((course) => makeProgress(course, reviews, now, today));
  const evidenceItems = getCourseEvidence(courses);
  const verifiedBranches = evidenceItems.filter((item) => item.evidence.verified).length;
  const totalTopics = courseProgress.reduce((sum, item) => sum + item.total, 0);
  const reviewedTotal = courseProgress.reduce((sum, item) => sum + item.reviewed, 0);
  const masteredTotal = courseProgress.reduce((sum, item) => sum + item.mastered, 0);
  const dueTotal = courseProgress.reduce((sum, item) => sum + item.due, 0);
  const totalPracticeQuestions = courses.reduce((sum, course) => sum + course.branches.length, 0);
  const practiceEntries = courses.flatMap((course) => course.branches.map((branch) => practiceRecords[course.id + ':' + branch.id]));
  const practiceRated = practiceEntries.filter((record) => Boolean(record?.rating)).length;
  const practiceReady = practiceEntries.filter((record) => record?.rating === 'ready').length;
  const validRouteKeys = new Set(courses.flatMap((course) => Array.from({ length: 5 }, (_, index) => course.id + ':' + index)));
  const routeCompleted = [...validRouteKeys].filter((key) => Boolean(routeRecords[key])).length;
  const quizCourses = courses.filter((course) => (quizHistory[course.id]?.attempts ?? 0) > 0);
  const quizAttempts = quizCourses.reduce((sum, course) => sum + quizHistory[course.id].attempts, 0);
  const quizBestScore = quizCourses.reduce((sum, course) => sum + quizHistory[course.id].best, 0);
  const quizPossibleScore = quizCourses.reduce((sum, course) => sum + course.branches.length, 0);
  const quizBestPercent = quizPossibleScore ? Math.round((quizBestScore / quizPossibleScore) * 100) : 0;
  const recoveryItems = courses.flatMap((course) => course.branches.map((branch, branchIndex) => {
    const practice = practiceRecords[course.id + ':' + branch.id];
    const quizMissed = quizHistory[course.id]?.missedBranches?.includes(branchIndex) ?? false;
    if (!quizMissed && practice?.rating !== 'review' && practice?.rating !== 'partial') return null;
    return { course, branch, branchIndex, practice, quizMissed };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item)));
  const achievements = [
    { id: 'first-review', icon: '↻', title: 'Primeira revisão', detail: 'Você iniciou a recuperação espaçada.', earned: reviewedTotal > 0 },
    { id: 'first-practice', icon: '✎', title: 'Mão na massa', detail: 'Você avaliou uma resposta aberta.', earned: practiceRated > 0 },
    { id: 'first-quiz', icon: '✓', title: 'Primeiro desafio', detail: 'Você concluiu uma tentativa de quiz.', earned: quizAttempts > 0 },
    { id: 'ten-mastered', icon: '✦', title: 'Memória consistente', detail: 'Mantenha 10 assuntos retidos com revisões espaçadas.', earned: masteredTotal >= 10 },
  ];
  const reviewedToday = courseProgress.reduce((sum, item) => sum + item.course.branches.reduce((branchSum, branch) =>
    branchSum + branch.topics.filter((topic, index) => {
      const id = [item.course.id, branch.id, index].join(':');
      return (reviews[id]?.lastReviewedAt ?? 0) >= today;
    }).length, 0), 0);
  const suggested = [...courseProgress].filter((item) => item.total > 0).sort((a, b) =>
    (b.due / b.total) - (a.due / a.total) || b.unseen - a.unseen || a.percent - b.percent,
  )[0];
  return <section className="progress-page">
    <div className="page-title-row">
      <div><p className="eyebrow">SEU CAMINHO DE APRENDIZAGEM</p><h1>Progresso e próximos passos.</h1>
        <p className="welcome-copy">Retenção conta três ou mais lembranças bem-sucedidas. Um ramo só aparece como validado quando combina retenção, aplicação marcada como pronta e acerto no quiz mais recente.</p>
      </div>
    </div>
    <div className="progress-stat-grid">
      <article><span>Retidos</span><strong>{masteredTotal}</strong><small>assuntos com 3 ou mais lembranças bem-sucedidas</small></article>
      <article><span>Na fila de hoje</span><strong>{dueTotal}</strong><small>assuntos novos ou com revisão vencida</small></article>
      <article><span>Revisados hoje</span><strong>{reviewedToday}</strong><small>assuntos que você já praticou neste dia</small></article>
      <article><span>Temas iniciados</span><strong>{reviewedTotal} <i>/ {totalTopics}</i></strong><small>assuntos com pelo menos uma avaliação</small></article>
    </div>
    <section className="progress-learning-tools" aria-labelledby="guided-progress-title">
      <div className="progress-section-heading"><div><p className="eyebrow">PRÁTICA E AUTOCONFERÊNCIA</p><h2 id="guided-progress-title">Seu progresso nos estudos guiados</h2></div><small>Dados salvos neste navegador</small></div>
      <div className="guided-progress-grid">
        <article><span>Respostas discursivas avaliadas</span><strong>{practiceRated}<i> / {totalPracticeQuestions}</i></strong><small>{practiceReady} marcadas como “expliquei e apliquei”</small><div className="guided-progress-track"><i style={{ width: `${totalPracticeQuestions ? practiceRated / totalPracticeQuestions * 100 : 0}%` }} /></div></article>
        <article><span>Etapas do roteiro concluídas</span><strong>{routeCompleted}<i> / {validRouteKeys.size}</i></strong><small>Etapas marcadas nas disciplinas e componentes</small><div className="guided-progress-track"><i style={{ width: `${validRouteKeys.size ? routeCompleted / validRouteKeys.size * 100 : 0}%` }} /></div></article>
        <article><span>Quizzes concluídos</span><strong>{quizAttempts}<i> tentativas</i></strong><small>{quizCourses.length} disciplinas · média das melhores pontuações: {quizCourses.length ? quizBestPercent : 0}%</small><div className="guided-progress-track"><i style={{ width: `${quizCourses.length ? quizBestPercent : 0}%` }} /></div></article>
        <article><span>Ramos validados</span><strong>{verifiedBranches}<i> / {evidenceItems.length}</i></strong><small>Retenção completa + aplicação pronta + quiz correto</small><div className="guided-progress-track"><i style={{ width: `${evidenceItems.length ? verifiedBranches / evidenceItems.length * 100 : 0}%` }} /></div></article>
      </div>
    </section>
    <section className="achievement-section" aria-labelledby="achievement-title">
      <div className="progress-section-heading"><div><p className="eyebrow">MARCOS DE APRENDIZAGEM</p><h2 id="achievement-title">Conquistas no seu ritmo</h2></div><small>Sem sequência diária obrigatória</small></div>
      <div className="achievement-grid">{achievements.map((achievement) => <article className={achievement.earned ? 'achievement-card earned' : 'achievement-card'} key={achievement.id}>
        <span aria-hidden="true">{achievement.icon}</span><div><strong>{achievement.title}</strong><small>{achievement.detail}</small></div><b>{achievement.earned ? 'Conquistada' : 'Em aberto'}</b>
      </article>)}</div>
    </section>
    <section className="recovery-panel" aria-labelledby="recovery-title">
      <div className="progress-section-heading"><div><p className="eyebrow">RETOMADA INTELIGENTE</p><h2 id="recovery-title">Caderno de retomada</h2></div><small>{recoveryItems.length} ramos para revisitar</small></div>
      {recoveryItems.length ? <div className="recovery-list">{recoveryItems.slice(0, 8).map((item) => <article className="recovery-item" key={item.course.id + ':' + item.branch.id}>
        <div><span>{item.course.title}</span><strong>{item.branch.title}</strong><small>{item.branch.topics.join(' · ')}</small></div>
        <div className="recovery-signals">{item.quizMissed && <span>Quiz</span>}{item.practice?.rating && item.practice.rating !== 'ready' && <span>{item.practice.rating === 'partial' ? 'Resposta parcial' : 'Autoavaliação'}</span>}</div>
        <div className="recovery-actions"><button className="button-secondary" onClick={() => onOpenCourse(item.course, item.branchIndex)}>Abrir ramo <span>↗</span></button><button className="text-button" onClick={() => onPracticeCourse(item.course)}>Praticar <span>→</span></button></div>
      </article>)}</div> : <div className="recovery-empty"><strong>Nenhum ramo marcado para retomada.</strong><span>Quando uma resposta aberta ou um quiz indicar dificuldade, o assunto aparecerá aqui com atalhos para praticar.</span></div>}
    </section>
    {suggested && <section className="priority-study-card">
      <div><p className="eyebrow">SUGESTÃO PARA COMEÇAR</p><h2>{dueTotal ? suggested.course.title : 'Mantenha o ritmo de revisão'}</h2>
        <p>{dueTotal
          ? 'Esta disciplina tem ' + suggested.due + ' de ' + suggested.total + ' assuntos na fila. Priorize uma sessão curta e retorne aos mapas para aprofundar o que ainda estiver difícil.'
          : 'Não há revisões vencidas agora. Use uma sessão curta para manter os conceitos acessíveis à memória.'}</p>
      </div>
      <div className="priority-actions">
        {dueTotal > 0 && <span className="priority-count">{suggested.due} assuntos na fila</span>}
        <button className="button-primary" onClick={() => onReviewCourse(suggested.course)}>Revisar esta disciplina <span>→</span></button>
        <button className="button-secondary" onClick={() => onOpenCourse(suggested.course)}>Abrir o mapa <span>↗</span></button>
      </div>
    </section>}
    {reviewedTotal === 0 && <div className="progress-first-step"><strong>Seu histórico de revisão espaçada está começando agora.</strong><span>As práticas, etapas do roteiro e quizzes já aparecem acima quando você os conclui. Use “Revisão ativa” para iniciar os cartões e organizar as próximas revisões.</span></div>}
    <div className="progress-section-heading"><div><p className="eyebrow">VISÃO POR DISCIPLINA</p><h2>Retenção por disciplina</h2></div><small>Baseada em três ou mais revisões bem-sucedidas</small></div>
    <div className="discipline-progress-grid">
      {courseProgress.map((item) => <article className="discipline-progress-card" key={item.course.id}>
          <div className="discipline-progress-heading"><div><strong>{item.course.title}</strong><span>{item.mastered} de {item.total} assuntos retidos · {item.due} na fila</span></div><b>{item.percent}%</b></div>
          <div className="discipline-progress-track"><i style={{ width: item.percent + '%' }} /></div>
          <div className="discipline-progress-actions"><button className="progress-map-button" onClick={() => onOpenCourse(item.course)}>Abrir disciplina ↗</button><button className="text-button" onClick={() => onReviewCourse(item.course)}>Revisar →</button></div>
        </article>)}
    </div>
    <p className="progress-footnote">“Validado” é um sinal didático local: exige três ou mais revisões de cada tópico do ramo, autoavaliação de aplicação pronta e acerto no quiz mais recente. Não representa uma nota acadêmica.</p>
  </section>;
}


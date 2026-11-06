import { useEffect, useMemo, useState } from 'react';
import type { Course } from './data/curriculum';
import { modelAnswers } from './data/answers';

type Rating = 'again' | 'hard' | 'good';
type ReviewRecord = { repetitions: number; intervalDays: number; dueAt: number; lastReviewedAt: number };
type StudyCard = { id: string; course: Course; branch: string; branchIndex: number; topic: string; relatedTopics: string[] };

const STORAGE_KEY = 'trilha-ti-reviews-v1';
const DAY_MS = 24 * 60 * 60 * 1000;
const DAILY_GOAL = 10;

function readReviews(): Record<string, ReviewRecord> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as Record<string, ReviewRecord> : {};
  } catch {
    return {};
  }
}

function beginningOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function buildCards(courses: Course[]): StudyCard[] {
  const groups = courses.map((course) => course.branches.flatMap((branch, branchIndex) =>
    branch.topics.map((topic, index) => ({
      id: [course.id, branch.id, index].join(':'),
      course,
      branch: branch.title,
      branchIndex,
      topic,
      relatedTopics: branch.topics.filter((item, itemIndex) => itemIndex !== index),
    })),
  ));
  const interleaved: StudyCard[] = [];
  const longestGroup = Math.max(0, ...groups.map((group) => group.length));
  for (let index = 0; index < longestGroup; index += 1) {
    for (const group of groups) {
      if (group[index]) interleaved.push(group[index]);
    }
  }
  return interleaved;
}

type StudyProps = { courses: Course[]; initialCourseId?: string; onOpenCourse: (course: Course) => void };

export function Study({ courses, initialCourseId, onOpenCourse }: StudyProps) {
  const [reviews, setReviews] = useState<Record<string, ReviewRecord>>(readReviews);
  const [courseFilter, setCourseFilter] = useState(() => initialCourseId || 'all');
  const [revealed, setRevealed] = useState(false);
  const [continueSession, setContinueSession] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // O progresso continua disponível durante esta sessão mesmo se o navegador bloquear o armazenamento.
    }
  }, [reviews]);

  const cards = useMemo(() => buildCards(courses), [courses]);
  const scopedCards = cards.filter((card) => courseFilter === 'all' || card.course.id === courseFilter);
  const today = beginningOfToday();
  const reviewedToday = scopedCards.filter((card) => (reviews[card.id]?.lastReviewedAt ?? 0) >= today).length;
  const dueCards = scopedCards.filter((card) => {
    const review = reviews[card.id];
    return (!review || review.dueAt <= Date.now()) && (!review || review.lastReviewedAt < today);
  });
  const capacity = continueSession ? dueCards.length : Math.max(0, DAILY_GOAL - reviewedToday);
  const sessionCards = dueCards.slice(0, capacity);
  const activeCard = sessionCards[0];
  const masteredCount = scopedCards.filter((card) => (reviews[card.id]?.repetitions ?? 0) >= 3).length;
  const dueCount = dueCards.length;
  const progress = Math.min(100, Math.round((Math.min(reviewedToday, DAILY_GOAL) / DAILY_GOAL) * 100));

  function chooseCourse(value: string) {
    setCourseFilter(value);
    setRevealed(false);
    setContinueSession(false);
  }

  function rateCard(rating: Rating) {
    if (!activeCard) return;
    const previous = reviews[activeCard.id] ?? { repetitions: 0, intervalDays: 0, dueAt: 0, lastReviewedAt: 0 };
    const goodIntervals = [3, 7, 14, 30, 60];
    const intervalDays = rating === 'again'
      ? 1
      : rating === 'hard'
        ? Math.max(1, Math.round((previous.intervalDays || 1) * 1.2))
        : goodIntervals[Math.min(previous.repetitions, goodIntervals.length - 1)];
    const next: ReviewRecord = {
      repetitions: rating === 'again' ? 0 : rating === 'hard' ? previous.repetitions : previous.repetitions + 1,
      intervalDays,
      dueAt: Date.now() + intervalDays * DAY_MS,
      lastReviewedAt: Date.now(),
    };
    setReviews((current) => ({ ...current, [activeCard.id]: next }));
    setRevealed(false);
  }

  return <section className="study-page">
    <div className="page-title-row">
      <div><p className="eyebrow">APRENDIZAGEM ATIVA</p><h1>Revisão que fica na memória.</h1>
        <p className="welcome-copy">Tente recuperar a ideia antes de revelar o roteiro. Os cartões alternam entre disciplinas e voltam em intervalos espaçados.</p>
      </div>
    </div>
    <div className="study-controls">
      <label>Disciplina
        <select value={courseFilter} onChange={(event) => chooseCourse(event.target.value)}>
          <option value="all">Todas as disciplinas</option>
          {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
        </select>
      </label>
      <div className="study-stats">
        <div><strong>{dueCount}</strong><span>para revisar</span></div>
        <div><strong>{masteredCount}</strong><span>bem consolidados</span></div>
        <div><strong>{scopedCards.length}</strong><span>cartões no tema</span></div>
      </div>
    </div>
    <div className="study-progress-card">
      <div className="study-progress-heading"><div><strong>Meta de hoje</strong><span>{Math.min(reviewedToday, DAILY_GOAL)} de {DAILY_GOAL} cartões revisados</span></div><b>{progress}%</b></div>
      <div className="study-progress-track"><i style={{ width: progress + '%' }} /></div>
      <small>Seu progresso fica salvo neste navegador e funciona sem conexão depois que o aplicativo carregar.</small>
    </div>
    {activeCard ? <article className="flashcard">
      <div className="flashcard-top"><span>RECUPERAÇÃO ATIVA</span><span>{activeCard.course.title}</span></div>
      <p className="flashcard-branch">{activeCard.branch}</p>
      <h2>{activeCard.topic}</h2>
      <p className="flashcard-prompt">Sem consultar o mapa, explique este conceito com suas palavras, dê um exemplo e diga onde ele aparece em <strong>{activeCard.course.title}</strong>.</p>
      {revealed ? <div className="answer-guide">
        <p className="eyebrow">ROTEIRO PARA CONFERIR SUA RESPOSTA</p>
        <p><strong>Resposta de referência do ramo {activeCard.branch}:</strong> {modelAnswers[activeCard.course.id]?.[activeCard.branchIndex] ?? 'Defina o conceito com suas palavras e explique como ele se aplica à disciplina.'}</p>
        <p>Para o cartão “<strong>{activeCard.topic}</strong>”, verifique se explicou a ideia com suas palavras, deu um exemplo próprio e conectou o assunto à disciplina.</p>
        {activeCard.relatedTopics.length > 0 && <p><strong>Conecte também a:</strong> {activeCard.relatedTopics.join(' · ')}</p>}
        <p><strong>Critério de domínio da disciplina:</strong> {activeCard.course.mastery}</p>
        <button className="text-button" onClick={() => onOpenCourse(activeCard.course)}>Abrir o mapa desta disciplina <span>↗</span></button>
      </div> : <div className="recall-hint"><span>✦</span><p>Fale em voz alta ou anote a resposta antes de revelar o roteiro de conferência.</p></div>}
      {!revealed ? <button className="button-primary reveal-button" onClick={() => setRevealed(true)}>Revelar roteiro de conferência <span>↓</span></button>
        : <div className="rating-row"><span>Como foi lembrar?</span>
          <button className="rating-again" onClick={() => rateCard('again')}>Não lembrei</button>
          <button className="rating-hard" onClick={() => rateCard('hard')}>Com esforço</button>
          <button className="rating-good" onClick={() => rateCard('good')}>Lembrei bem</button>
        </div>}
    </article> : <div className="study-empty">
      <span className="study-empty-icon">{reviewedToday >= DAILY_GOAL && dueCount > 0 ? '✓' : '✦'}</span>
      <h2>{reviewedToday >= DAILY_GOAL && dueCount > 0 ? 'Meta de hoje concluída.' : 'Tudo em dia por aqui.'}</h2>
      <p>{reviewedToday >= DAILY_GOAL && dueCount > 0
        ? 'Você pode encerrar por hoje ou continuar com os próximos cartões pendentes.'
        : 'Não há cartões vencidos para esta seleção. Volte amanhã para a próxima revisão ou escolha outra disciplina.'}</p>
      {reviewedToday >= DAILY_GOAL && dueCount > 0 && <button className="button-secondary" onClick={() => setContinueSession(true)}>Continuar revisando <span>→</span></button>}
    </div>}
    <div className="study-method-note"><strong>Como funciona o intervalo:</strong> “Não lembrei” agenda para amanhã; “Com esforço” mantém um intervalo curto; “Lembrei bem” aumenta gradualmente o intervalo. Assim, os conceitos mais difíceis voltam antes.</div>
  </section>;
}


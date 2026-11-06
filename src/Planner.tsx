import { useEffect, useMemo, useState } from 'react';
import type { Course } from './data/curriculum';
import { BackupPanel } from './BackupPanel';
import {
  getStudyProgram,
  programCalendarKey,
  programProgressKey,
  studyPrograms,
  type StudyProgram,
  type StudyUnit,
} from './data/studyPrograms';

type SessionRecord = { date: string; unitId: string; completedAt: string };
type CalendarPlan = { goalMinutes: number; weekdays: number[]; completedDates: string[]; assignedUnits: Record<string, string>; history: SessionRecord[] };
type UnitProgress = { sessions: number; lastStudiedAt: string | null };
type ReviewRecord = { repetitions: number; intervalDays: number; dueAt: number; lastReviewedAt: number };
type Focus = { unit: StudyUnit; due: number; total: number; score: number; reason: string };
const DEFAULT_PLAN: CalendarPlan = { goalMinutes: 25, weekdays: [1, 2, 3, 4, 5], completedDates: [], assignedUnits: {}, history: [] };
const LEGACY_PLAN_KEY = 'trilha-ti-plan-v1';
const REVIEW_KEY = 'trilha-ti-reviews-v1';
const SELECTED_PROGRAM_KEY = 'nexo-study-program-selected-v1';
const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function parseObject<T>(raw: string | null, fallback: T): T {
  try { return raw ? { ...fallback, ...JSON.parse(raw) } as T : fallback; } catch { return fallback; }
}
function readPlan(programId: string): CalendarPlan {
  const raw = localStorage.getItem(programCalendarKey(programId)) ?? (programId === 'gestao-ti' ? localStorage.getItem(LEGACY_PLAN_KEY) : null);
  const value = parseObject<CalendarPlan>(raw, DEFAULT_PLAN);
  const goal = [15, 25, 40, 60].includes(Number(value.goalMinutes)) ? Number(value.goalMinutes) : DEFAULT_PLAN.goalMinutes;
  const weekdays = Array.isArray(value.weekdays) ? value.weekdays.map(Number).filter((day) => Number.isInteger(day) && day >= 0 && day <= 6) : DEFAULT_PLAN.weekdays;
  return {
    goalMinutes: goal,
    weekdays: weekdays.length ? [...new Set(weekdays)].sort() : [],
    completedDates: Array.isArray(value.completedDates) ? value.completedDates.filter((date) => typeof date === 'string') : [],
    assignedUnits: value.assignedUnits && typeof value.assignedUnits === 'object' ? value.assignedUnits : {},
    history: Array.isArray(value.history) ? value.history.filter((item) => item && typeof item.date === 'string' && typeof item.unitId === 'string').slice(-500) : [],
  };
}
function dateKey(date: Date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}
function dueForCourse(course: Course, reviews: Record<string, ReviewRecord>, now: number, today: number) {
  return course.branches.reduce((sum, branch) => sum + branch.topics.filter((_, index) => {
    const review = reviews[[course.id, branch.id, index].join(':')];
    return !review || (review.dueAt <= now && review.lastReviewedAt < today);
  }).length, 0);
}
function parsePythonState() {
  try {
    const raw = localStorage.getItem('pyneuro_evolution_state_v2');
    const value = raw ? JSON.parse(raw) : null;
    return value && value.version === 2 ? value : null;
  } catch { return null; }
}
function getFocuses(program: StudyProgram, courses: Course[], progress: Record<string, UnitProgress>, now: number, today: Date): Focus[] {
  const reviewMap = parseObject<Record<string, ReviewRecord>>(localStorage.getItem(REVIEW_KEY), {});
  const todayIso = dateKey(today);
  const python = program.kind === 'python' ? parsePythonState() : null;
  return program.units.map((unit) => {
    const previous = progress[unit.id] ?? { sessions: 0, lastStudiedAt: null };
    let due = 0; let total = 1; let reason = 'Conteúdo ainda não estudado'; let score = 4 - previous.sessions * 0.15;
    if (unit.course) {
      due = dueForCourse(unit.course, reviewMap, now, today.getTime());
      total = unit.course.branches.reduce((sum, branch) => sum + branch.topics.length, 0);
      const missed = Object.values(parseObject<Record<string, { rating?: string }>>(localStorage.getItem('trilha-ti-practice-v1'), {})).length;
      score = (due / Math.max(1, total)) * 8 + (previous.sessions === 0 ? 1.5 : 0);
      reason = due ? `${due} conceito(s) novo(s) ou vencido(s) na revisão` : `Reforce a retenção; ${missed ? 'há prática registrada na trilha' : 'prática e recuperação ativa recomendadas'}`;
    } else if (program.kind === 'python' && unit.level && python) {
      const cards = Array.isArray(python.srsCards) ? python.srsCards.filter((card: { level?: number }) => card.level === unit.level) : [];
      const dueCards = cards.filter((card: { nextReviewAt?: string }) => !card.nextReviewAt || String(card.nextReviewAt).slice(0, 10) <= todayIso);
      const competency = python.competencies?.[unit.level] ?? python.competencies?.[String(unit.level)];
      const dimensions = competency?.dimensions ? Object.values(competency.dimensions).filter(Boolean).length : 0;
      due = dueCards.length;
      total = Math.max(1, cards.length);
      score = (due / total) * 7 + (5 - dimensions) * 0.7 + (previous.sessions === 0 ? 0.7 : 0);
      if (competency?.status === 'dominado' && due === 0) score -= 5;
      reason = due ? `${due} cartão(ões) vencido(s) · ${dimensions}/5 evidências de domínio` : `${dimensions}/5 evidências de domínio · pratique explicação, código e depuração`;
    } else {
      const last = previous.lastStudiedAt ? Date.parse(previous.lastStudiedAt) : 0;
      const daysSince = last ? Math.max(0, (now - last) / 86_400_000) : 30;
      score = Math.min(6, daysSince / 7) + (previous.sessions === 0 ? 1 : 0);
      due = previous.sessions === 0 || daysSince >= 7 ? 1 : 0;
      reason = previous.sessions === 0 ? 'Primeiro contato recomendado' : daysSince >= 7 ? 'Revisão de manutenção recomendada' : `Próxima retomada em ${Math.max(1, 7 - Math.floor(daysSince))} dia(s)`;
    }
    return { unit, due, total, score, reason };
  }).sort((a, b) => b.score - a.score || (a.unit.level && b.unit.level ? a.unit.level - b.unit.level : a.unit.title.localeCompare(b.unit.title, 'pt-BR')));
}

type PlannerProps = {
  courses: Course[];
  onStartReview: (course: Course) => void;
  onStartPractice: (course: Course) => void;
  onOpenProgram?: (programId: string, unit: StudyUnit) => void;
};

export function Planner({ courses, onStartReview, onStartPractice, onOpenProgram }: PlannerProps) {
  const [selection, setSelection] = useState(() => {
    const storedId = (() => { try { return localStorage.getItem(SELECTED_PROGRAM_KEY); } catch { return null; } })();
    const initialId = studyPrograms.some((item) => item.id === storedId) ? storedId! : (studyPrograms[0]?.id ?? 'gestao-ti');
    return { programId: initialId, plan: readPlan(initialId) };
  });
  const program = getStudyProgram(selection.programId) ?? studyPrograms[0];
  const [unitProgress, setUnitProgress] = useState<Record<string, UnitProgress>>(() => parseObject(localStorage.getItem(programProgressKey(program.id)), {}));
  const plan = selection.plan;
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const focusList = useMemo(() => getFocuses(program, courses, unitProgress, Date.now(), todayStart), [program, courses, unitProgress, plan.history]);
  const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(todayStart); date.setDate(todayStart.getDate() + index); return date; });
  const scheduled = days.filter((date) => plan.weekdays.includes(date.getDay()));
  const weeklyCompleted = scheduled.filter((date) => plan.completedDates.includes(dateKey(date))).length;

  useEffect(() => {
    try { localStorage.setItem(programCalendarKey(selection.programId), JSON.stringify(selection.plan)); } catch { /* O calendário segue disponível nesta sessão. */ }
  }, [selection]);
  useEffect(() => {
    try { localStorage.setItem(programProgressKey(program.id), JSON.stringify(unitProgress)); } catch { /* O progresso segue disponível nesta sessão. */ }
  }, [program.id, unitProgress]);

  function changeProgram(programId: string) {
    try { localStorage.setItem(SELECTED_PROGRAM_KEY, programId); } catch { /* A seleção permanece nesta sessão. */ }
    setSelection({ programId, plan: readPlan(programId) });
    setUnitProgress(parseObject(localStorage.getItem(programProgressKey(programId)), {}));
  }
  function updatePlan(change: (current: CalendarPlan) => CalendarPlan) {
    setSelection((current) => ({ ...current, plan: change(current.plan) }));
  }
  function toggleWeekday(day: number) {
    updatePlan((current) => ({ ...current, weekdays: current.weekdays.includes(day) ? current.weekdays.filter((item) => item !== day) : [...current.weekdays, day].sort() }));
  }
  function markDone(key: string, focus: Focus) {
    if (plan.completedDates.includes(key)) return;
    const record: SessionRecord = { date: key, unitId: focus.unit.id, completedAt: new Date().toISOString() };
    updatePlan((current) => ({ ...current, completedDates: [...current.completedDates, key].slice(-400), assignedUnits: { ...current.assignedUnits, [key]: focus.unit.id }, history: [...current.history, record].slice(-500) }));
    setUnitProgress((current) => ({ ...current, [focus.unit.id]: { sessions: (current[focus.unit.id]?.sessions ?? 0) + 1, lastStudiedAt: record.completedAt } }));
  }
  function openFocus(focus: Focus, action: 'study' | 'review') {
    if (focus.unit.course) {
      if (action === 'review') onStartReview(focus.unit.course);
      else onStartPractice(focus.unit.course);
      return;
    }
    onOpenProgram?.(program.id, focus.unit);
  }

  return <section className="planner-page">
    <div className="page-title-row"><div><p className="eyebrow">ORGANIZAÇÃO DO ESTUDO</p><h1>Calendário adaptativo</h1>
      <p className="welcome-copy">Cada curso mantém seu próprio calendário. As sugestões priorizam revisões, domínio e sessões recentes; a agenda fica salva neste dispositivo.</p></div></div>
    <div className="planner-program-picker"><label htmlFor="planner-program">Curso</label><select id="planner-program" value={program.id} onChange={(event) => changeProgram(event.target.value)}>{studyPrograms.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select><span>{program.units.length} tópicos de estudo · progresso separado por curso</span></div>
    <div className="planner-settings"><label>Tempo por sessão
      <select value={plan.goalMinutes} onChange={(event) => updatePlan((current) => ({ ...current, goalMinutes: Number(event.target.value) }))}>
        <option value={15}>15 minutos</option><option value={25}>25 minutos</option><option value={40}>40 minutos</option><option value={60}>60 minutos</option>
      </select></label>
      <fieldset><legend>Quais dias quer reservar?</legend><div className="weekday-picker">{weekdayNames.map((name, day) =>
        <label key={name} className={plan.weekdays.includes(day) ? 'weekday-selected' : ''}><input type="checkbox" checked={plan.weekdays.includes(day)} onChange={() => toggleWeekday(day)} />{name}</label>)}</div></fieldset>
      <div className="planner-goal"><strong>{weeklyCompleted} / {scheduled.length}</strong><span>sessões desta semana concluídas</span></div>
    </div>
    <div className="planner-week-heading"><div><p className="eyebrow">PRÓXIMOS SETE DIAS · {program.title}</p><h2>Sua trilha sugerida</h2></div><small>O calendário se adapta às sessões que você registra.</small></div>
    {scheduled.length ? <div className="planner-day-list">{scheduled.map((date, index) => {
      const key = dateKey(date);
      const savedUnitId = plan.assignedUnits[key];
      const focus = (savedUnitId && focusList.find((item) => item.unit.id === savedUnitId)) || focusList[index % Math.max(1, focusList.length)];
      if (!focus) return null;
      const done = plan.completedDates.includes(key);
      return <article className={'planner-day-card ' + (done ? 'planner-day-done' : '')} key={key}>
        <div className="planner-date"><strong>{weekdayNames[date.getDay()]}</strong><span>{date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span></div>
        <div className="planner-session"><small>{plan.goalMinutes} MIN · {focus.due ? `${focus.due} NA FILA` : 'FOCO SUGERIDO'}</small><h3>{focus.unit.title}</h3><p>{focus.reason}{focus.unit.details ? ` · ${focus.unit.details}` : ''}</p></div>
        <div className="planner-actions">{focus.unit.course ? <><button className="button-primary" onClick={() => openFocus(focus, 'study')}>Prática guiada <span>→</span></button><button className="button-secondary" onClick={() => openFocus(focus, 'review')}>Revisar <span>↻</span></button></> : <button className="button-primary" onClick={() => openFocus(focus, 'study')}>Abrir conteúdo <span>→</span></button>}
          <button className="planner-done-button" onClick={() => markDone(key, focus)} disabled={done}>{done ? 'Sessão registrada ✓' : 'Marcar concluída'}</button></div>
      </article>;
    })}</div> : <div className="planner-empty">Selecione ao menos um dia para montar sua semana.</div>}
    <p className="planner-note">Dados armazenados localmente. Para cursos futuros, cadastre o programa e suas unidades em <code>src/data/studyPrograms.ts</code>.</p>
    <BackupPanel programId={program.id} />
  </section>;
}

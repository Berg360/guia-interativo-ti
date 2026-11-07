import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { courses, type Course, type CourseKind } from './data/curriculum';
import { Study } from './Study';
import { Progress } from './Progress';
import { Practice } from './Practice';
import { Planner } from './Planner';
import { getBranchLearningState, getLearningSnapshot } from './data/learning';
import { conceptGuideFor } from './data/concepts';
import { getStudyProgram, programProgressKey, studyPrograms, type StudyProgram, type StudyUnit } from './data/studyPrograms';
import { parseAppRoute, serializeAppRoute } from './data/routes.js';
import { parseStoredObject, readStoredValue } from './data/storage.js';

type View = 'courses' | 'home' | 'map' | 'catalog' | 'extras' | 'study' | 'progress' | 'practice' | 'planner' | 'python' | 'program' | 'unit';
const branchNames = ['Fundamentos', 'Estruturas e métodos', 'Aplicação', 'Validação e domínio'];
const kindLabel: Record<CourseKind, string> = { discipline: 'Disciplina', elective: 'Optativa', project: 'Projeto integrador', extension: 'Extensão', component: 'Componente' };
const kindClass: Record<CourseKind, string> = { discipline: 'kind-blue', elective: 'kind-violet', project: 'kind-amber', extension: 'kind-green', component: 'kind-gray' };
function getRecentCourse() {
  try {
    const id = localStorage.getItem('trilha-ti-recent-course-v1');
    return courses.find((course) => course.id === id);
  } catch {
    return undefined;
  }
}
function readAppRoute() {
  try { return parseAppRoute(window.location.search, courses, studyPrograms); }
  catch { return { view: 'courses' as const }; }
}
function pythonCourseUrl(targetLevel?: number) {
  const state: Record<string, string | null> = {
    pyneuro_evolution_state_v2: readStoredValue('pyneuro_evolution_state_v2'),
    pyneuro_evolution_backup_last_good: readStoredValue('pyneuro_evolution_backup_last_good'),
  };
  if (targetLevel && state.pyneuro_evolution_state_v2) {
    try {
      const saved = JSON.parse(state.pyneuro_evolution_state_v2);
      saved.lastAccessedLevelId = targetLevel;
      saved.lastActiveView = 'trilha';
      state.pyneuro_evolution_state_v2 = JSON.stringify(saved);
    } catch { /* O curso abre no último nível válido. */ }
  }
  const targetQuery = targetLevel ? `&level=${targetLevel}` : '';
  return '/python-course/index.html?embed=1' + targetQuery + '#' + encodeURIComponent(JSON.stringify(state));
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.5 4.5" /></svg>;
}
type IconName = 'home' | 'learn' | 'practice' | 'review' | 'plan' | 'progress' | 'more' | 'extras';
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9.5V21h14V9.5M9 21v-7h6v7" /></>,
    learn: <><circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M12 7.5v5m0 0-6 4m6-4 6 4" /></>,
    practice: <><path d="m4 20 4.4-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.4 16 4 20Z" /><path d="m14.8 6.2 3 3" /></>,
    review: <><path d="M20 7v5h-5" /><path d="M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.8-2L20 12M4 12l2.6 5a7 7 0 0 0 11.8-2" /></>,
    plan: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18M8 14h3m-3 3h3m3-3h2" /></>,
    progress: <><path d="M4 19V5m0 14h17" /><path d="m7 15 4-4 3 2 5-6" /><path d="M16 7h3v3" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    extras: <><path d="M12 3v18M3 12h18" /><path d="m5.6 5.6 12.8 12.8m0-12.8L5.6 18.4" /></>,
  };
  return <svg className="app-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const firstMoreItemRef = useRef<HTMLButtonElement>(null);
  const pythonFrameRef = useRef<HTMLIFrameElement>(null);
  const moreWasOpen = useRef(false);
  const [view, setView] = useState<View>(() => readAppRoute().view as View);
  const [activeId, setActiveId] = useState(() => readAppRoute().courseId ?? getRecentCourse()?.id ?? courses[0].id);
  const [query, setQuery] = useState('');
  const [studyCourseId, setStudyCourseId] = useState('all');
  const [practiceCourseId, setPracticeCourseId] = useState(() => readAppRoute().courseId ?? courses[0].id);
  const [practiceTarget, setPracticeTarget] = useState<{ branchIndex: number; topic: string } | null>(() => {
    const route = readAppRoute();
    return route.branchIndex !== undefined && route.topic ? { branchIndex: route.branchIndex, topic: route.topic } : null;
  });
  const [focusBranch, setFocusBranch] = useState(() => readAppRoute().branchIndex ?? 0);
  const [focusTopic, setFocusTopic] = useState(() => readAppRoute().topic ?? '');
  const [practiceGateChecked, setPracticeGateChecked] = useState(false);
  const [practiceGateOpen, setPracticeGateOpen] = useState(false);
  const [pythonFrameSrc, setPythonFrameSrc] = useState(() => readAppRoute().view === 'python' ? pythonCourseUrl(readAppRoute().level) : '');
  const [selectedProgramId, setSelectedProgramId] = useState(() => readAppRoute().programId ?? '');
  const [unitTarget, setUnitTarget] = useState<{ programTitle: string; unit: StudyUnit } | null>(() => {
    const route = readAppRoute();
    const program = route.programId ? getStudyProgram(route.programId) : undefined;
    const unit = program?.units.find((item) => item.id === route.unitId);
    return program && unit ? { programTitle: program.title, unit } : null;
  });
  const [moreOpen, setMoreOpen] = useState(false);
  const activeCourse = courses.find((course) => course.id === activeId) ?? courses[0];
  const searchShortcut = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';
  const learning = getLearningSnapshot(courses);
  const visibleCourses = useMemo(() => {
    const pool = view === 'extras' ? courses.filter((course) => course.kind === 'elective' || course.kind === 'component')
      : courses;
    const q = query.trim().toLocaleLowerCase('pt-BR');
    if (!q) return pool;
    return pool.filter((course) => {
      const conceptContent = course.branches.flatMap((branch, index) => branch.topics.flatMap((topic) => {
        const guide = conceptGuideFor(course, index, topic);
        return [topic, guide.explanation, guide.example, guide.recallPrompt, guide.memoryCue];
      }));
      return [course.title, course.module, course.prerequisites, course.practice, course.mastery, course.tools,
        ...course.branches.flatMap((branch) => [branch.title, ...branch.topics]), ...conceptContent]
        .join(' ').toLocaleLowerCase('pt-BR').includes(q);
    });
  }, [query, view]);
  const selectedBranch = activeCourse.branches[focusBranch] ?? activeCourse.branches[0];
  const selectedTopic = focusTopic || selectedBranch.topics[0] || activeCourse.title;
  const selectedConcept = conceptGuideFor(activeCourse, focusBranch, selectedTopic);

  useEffect(() => {
    function restoreFromAddress() {
      const route = readAppRoute();
      setView(route.view as View);
      setQuery('');
      setMoreOpen(false);
      setPracticeGateChecked(false);
      setPracticeGateOpen(false);
      setFocusBranch(route.branchIndex ?? 0);
      setFocusTopic(route.topic ?? '');
      setSelectedProgramId(route.programId ?? '');
      if (route.courseId) {
        setActiveId(route.courseId);
        setPracticeCourseId(route.courseId);
      }
      setPracticeTarget(route.branchIndex !== undefined && route.topic
        ? { branchIndex: route.branchIndex, topic: route.topic }
        : null);
      const program = route.programId ? getStudyProgram(route.programId) : undefined;
      const unit = program?.units.find((item) => item.id === route.unitId);
      setUnitTarget(program && unit ? { programTitle: program.title, unit } : null);
      if (route.view === 'python') setPythonFrameSrc(pythonCourseUrl(route.level));
    }
    window.addEventListener('popstate', restoreFromAddress);
    return () => window.removeEventListener('popstate', restoreFromAddress);
  }, []);

  useEffect(() => {
    function handleSearchShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, []);
  useEffect(() => {
    function closeMoreMenu(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        if (practiceGateOpen) { setPracticeGateOpen(false); setPracticeGateChecked(false); }
      }
    }
    window.addEventListener('keydown', closeMoreMenu);
    return () => window.removeEventListener('keydown', closeMoreMenu);
  }, [practiceGateOpen]);
  useEffect(() => {
    if (moreOpen) {
      moreWasOpen.current = true;
      firstMoreItemRef.current?.focus();
    } else if (moreWasOpen.current) {
      moreWasOpen.current = false;
      moreButtonRef.current?.focus();
    }
  }, [moreOpen]);
  useEffect(() => {
    const allowedKeys = new Set(['pyneuro_evolution_state_v2', 'pyneuro_evolution_backup_last_good']);
    function receivePythonStorage(event: MessageEvent) {
      if (event.source !== pythonFrameRef.current?.contentWindow) return;
      const message = event.data;
      if (!message || message.source !== 'pyneuro-course' || message.type !== 'storage:set' || !allowedKeys.has(message.key)) return;
      if (typeof message.value !== 'string' || message.value.length > 1_500_000) return;
      try {
        const candidate = JSON.parse(message.value);
        if (candidate?.version !== 2 || !Number.isFinite(candidate.xp) || !candidate.competencies || !Array.isArray(candidate.srsCards)) return;
        localStorage.setItem(message.key, message.value);
      } catch { /* Mensagens sem um estado válido não alteram o progresso local. */ }
    }
    window.addEventListener('message', receivePythonStorage);
    return () => window.removeEventListener('message', receivePythonStorage);
  }, []);
  function writeBrowserRoute(route: { view: View; courseId?: string; branchIndex?: number; topic?: string; programId?: string; unitId?: string; level?: number }, mode: 'push' | 'replace' = 'push') {
    const nextUrl = serializeAppRoute(route, window.location.href);
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;
    if (nextUrl === currentUrl) return;
    if (mode === 'replace') window.history.replaceState({ nexoRoute: route }, '', nextUrl);
    else window.history.pushState({ nexoRoute: route }, '', nextUrl);
  }
  function openPythonCourse(targetLevel?: number) {
    setPythonFrameSrc(pythonCourseUrl(targetLevel));
    writeBrowserRoute({ view: 'python', programId: 'python-profissional', ...(targetLevel ? { level: targetLevel } : {}) });
    setView('python'); setQuery(''); setMoreOpen(false);
  }
  function chooseCourse(course: Course, branchIndex = 0) {
    const nextBranch = Math.min(Math.max(branchIndex, 0), course.branches.length - 1);
    writeBrowserRoute({ view: 'map', courseId: course.id, branchIndex: nextBranch });
    setActiveId(course.id);
    try { localStorage.setItem('trilha-ti-recent-course-v1', course.id); } catch { /* A seleção permanece nesta sessão. */ }
    setFocusBranch(nextBranch); setFocusTopic(''); setPracticeGateChecked(false); setPracticeGateOpen(false); setView('map'); setQuery(''); setMoreOpen(false);
  }
  function startPractice(course: Course, branchIndex?: number, topic?: string) {
    writeBrowserRoute({ view: 'practice', courseId: course.id, ...(typeof branchIndex === 'number' ? { branchIndex } : {}), ...(topic ? { topic } : {}) });
    setPracticeCourseId(course.id);
    setPracticeTarget(typeof branchIndex === 'number' && topic ? { branchIndex, topic } : null);
    setView('practice'); setQuery(''); setMoreOpen(false);
  }
  function openPracticeConfirmation() {
    if (practiceGateChecked) setPracticeGateOpen(true);
  }
  function answerPracticeConfirmation(studied: boolean) {
    setPracticeGateOpen(false);
    if (!studied) {
      setPracticeGateChecked(false);
      window.requestAnimationFrame(() => document.getElementById('concept-study-content')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return;
    }
    startPractice(activeCourse, focusBranch, selectedTopic);
  }
  function navigate(nextView: View, routeExtras: { courseId?: string; programId?: string; unitId?: string } = {}) {
    const route = { view: nextView, ...(nextView !== 'courses' ? { courseId: activeId } : {}), ...routeExtras };
    writeBrowserRoute(route);
    setView(nextView); setQuery(''); setMoreOpen(false);
  }
  function openCatalogProgram(program: StudyProgram) {
    if (program.kind === 'curriculum') { navigate('home'); return; }
    if (program.kind === 'python') { openPythonCourse(); return; }
    setSelectedProgramId(program.id);
    navigate('program', { programId: program.id });
  }
  function openProgramUnit(program: StudyProgram, unit: StudyUnit) {
    setUnitTarget({ programTitle: program.title, unit });
    navigate('unit', { programId: program.id, unitId: unit.id });
  }
  function courseList(title: string, items: Course[]) {
    return <section className="course-list-section">
      <div className="section-heading"><div><p className="eyebrow">CURRÍCULO</p><h2>{title}</h2></div><span className="count-pill">{items.length} itens</span></div>
      <div className="course-list">{items.map((course) => <button key={course.id} className={'course-row ' + (activeId === course.id ? 'is-active' : '')} onClick={() => chooseCourse(course)}>
        <span className="course-index">{course.module.replace(/[A-Z]/g, '') || '↗'}</span>
        <span className="course-row-body"><strong>{course.title}</strong><span>{course.module ? 'Módulo ' + course.module : 'Conteúdo transversal'}</span></span>
        <span className={'kind-tag ' + kindClass[course.kind]}>{kindLabel[course.kind]}</span>
      </button>)}{!items.length && <div className="empty-state">Não encontrei tópicos com esse termo. Tente outra palavra.</div>}</div>
    </section>;
  }
  return <div className={'app-shell ' + (view === 'courses' ? 'catalog-shell' : '') + (view === 'python' ? ' python-course-shell' : '')}>
    <aside className="sidebar">
      <button className="brand-lockup" type="button" onClick={() => navigate('courses')} aria-label="Abrir catálogo de cursos"><img className="brand-mark" src="/marca.svg" alt="" /><span><strong>Nexo<span> Cursos</span></strong><small>PLATAFORMA DE APRENDIZAGEM</small></span></button>
      <button className="course-switch-button" type="button" onClick={() => navigate('courses')}>← Catálogo de cursos</button>
      <p className="side-label">SUA JORNADA</p>
      <button aria-current={view === 'home' ? 'page' : undefined} className={'side-link ' + (view === 'home' ? 'active' : '')} onClick={() => navigate('home')}><span className="side-symbol"><Icon name="home" /></span> Visão geral</button>
      <button aria-current={view === 'practice' ? 'page' : undefined} className={'side-link feature-nav-link ' + (view === 'practice' ? 'active' : '')} onClick={() => startPractice(learning.recommendedCourse)}><span className="side-symbol"><Icon name="practice" /></span> Prática guiada</button>
      <button aria-current={view === 'study' ? 'page' : undefined} className={'side-link study-nav-link ' + (view === 'study' ? 'active' : '')} onClick={() => { setStudyCourseId('all'); navigate('study'); }}><span className="side-symbol"><Icon name="review" /></span> Revisão espaçada</button>
      <p className="side-label side-label-spaced">ORGANIZAÇÃO</p>
      <button aria-current={view === 'planner' ? 'page' : undefined} className={'side-link feature-nav-link ' + (view === 'planner' ? 'active' : '')} onClick={() => navigate('planner')}><span className="side-symbol"><Icon name="plan" /></span> Calendário de estudos</button>
      <button aria-current={view === 'progress' ? 'page' : undefined} className={'side-link progress-nav-link ' + (view === 'progress' ? 'active' : '')} onClick={() => navigate('progress')}><span className="side-symbol"><Icon name="progress" /></span> Meu progresso</button>
      <p className="side-label side-label-spaced">DISCIPLINAS</p><div className="discipline-nav">{courses.map((course) => <button key={course.id} aria-current={view === 'map' && activeId === course.id ? 'page' : undefined} className={view === 'map' && activeId === course.id ? 'selected' : ''} onClick={() => chooseCourse(course)} title={course.title}><span>{course.title}</span><small>{kindLabel[course.kind]}</small></button>)}</div>
      <div className="sidebar-bottom"><div className={'offline-indicator ' + (import.meta.env.PROD ? 'offline-ready' : 'offline-development')}><span></span><div><strong>{import.meta.env.PROD ? 'Modo offline disponível' : 'Prévia de desenvolvimento'}</strong><small>{import.meta.env.PROD ? 'Após carregar o app uma vez' : 'Offline na versão instalada'}</small></div></div><p>Curso selecionado · Gestão da Tecnologia da Informação</p></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button type="button" className="platform-brand" onClick={() => navigate('courses')}><img src="/marca.svg" alt="" /><span>Nexo <b>Cursos</b></span></button>
        {view !== 'courses' && view !== 'python' && <><div className="breadcrumbs"><span>Curso</span><b>/</b><strong>{view === 'map' ? activeCourse.title : view === 'catalog' ? 'Todas as disciplinas' : view === 'extras' ? 'Optativas e atividades' : view === 'study' ? 'Revisão espaçada' : view === 'practice' ? 'Prática guiada' : view === 'planner' ? 'Calendário de estudos' : view === 'progress' ? 'Meu progresso' : view === 'unit' ? unitTarget?.unit.title ?? 'Conteúdo do curso' : view === 'program' ? getStudyProgram(selectedProgramId)?.title ?? 'Curso' : 'Visão geral'}</strong></div>
        <label className="search-box"><SearchIcon /><input ref={searchInputRef} value={query} onChange={(event) => { setQuery(event.target.value); if (event.target.value && view !== 'catalog') { writeBrowserRoute({ view: 'catalog', courseId: activeId }); setView('catalog'); } }} placeholder="Buscar disciplina ou assunto" aria-label="Buscar disciplina ou assunto" /><kbd>{searchShortcut}</kbd></label>
        <button className="course-switch-top" type="button" onClick={() => navigate('courses')}>Catálogo de cursos</button></>}
        {view === 'python' && <button className="python-catalog-button" type="button" onClick={() => navigate('courses')}>← Catálogo de cursos</button>}
        {view === 'courses' && <span className="catalog-topbar-label">Catálogo de cursos</span>}
      </header>
      <div className="page-content">
        {view === 'courses' && <section className="platform-catalog">
          <div className="platform-catalog-heading"><p className="eyebrow">NEXO CURSOS · APRENDIZAGEM ATIVA</p><h1>Um espaço para aprender com método.</h1><p>Escolha um curso para acessar suas disciplinas, mapas mentais, atividades e progresso.</p></div>
          <div className="program-card-grid">
            {studyPrograms.map((program) => <button key={program.id} className={'program-card available-program ' + (program.kind === 'python' ? 'python-program' : '')} type="button" onClick={() => openCatalogProgram(program)}>
              <span className={'program-card-mark ' + (program.kind === 'python' ? 'python-program-mark' : '')}>{program.kind === 'curriculum' ? <img src="/marca.svg" alt="" /> : program.catalog.mark}</span>
              <span className="program-status">CURSO DISPONÍVEL</span><strong>{program.title}</strong>
              <span className="program-description">{program.catalog.description}</span>
              <span className="program-card-footer"><span>{program.units.length} {program.catalog.metric}</span><b>Acessar curso <i>→</i></b></span>
            </button>)}
          </div>
        </section>}
        {view === 'program' && (() => {
          const program = getStudyProgram(selectedProgramId);
          if (!program || program.kind !== 'generic') return <div className="empty-state">Este curso ainda não tem unidades cadastradas.</div>;
          const progress = parseStoredObject(readStoredValue(programProgressKey(program.id)), {}) as Record<string, { sessions?: number }>;
          const practicedUnits = program.units.filter((unit) => (progress[unit.id]?.sessions ?? 0) > 0).length;
          const sessions = Object.values(progress).reduce((sum, item) => sum + Math.max(0, Number(item.sessions) || 0), 0);
          const completion = program.units.length ? Math.round(practicedUnits / program.units.length * 100) : 0;
          return <section className="generic-program-page"><div className="page-title-row"><div><p className="eyebrow">CURSO · {program.units.length} UNIDADES</p><h1>{program.title}</h1><p className="welcome-copy">{program.catalog.description}</p></div><button className="button-secondary" onClick={() => navigate('planner')}>Abrir calendário <span>→</span></button></div><section className="generic-progress-card" aria-label="Progresso deste curso"><div><small>PROGRESSO NESTE NAVEGADOR</small><strong>{practicedUnits} de {program.units.length} unidades praticadas</strong><span>{sessions} sessões registradas · {completion}% do conteúdo iniciado</span></div><div className="generic-progress-track"><i style={{ width: `${completion}%` }} /></div></section><div className="catalog-card"><div className="course-list-section"><div className="section-heading"><div><p className="eyebrow">CONTEÚDO</p><h2>Unidades de estudo</h2></div><span className="count-pill">{program.units.length} itens</span></div><div className="course-list">{program.units.map((unit) => <button className="course-row" key={unit.id} onClick={() => openProgramUnit(program, unit)}><span className="course-index">{String(unit.level ?? 0).padStart(2, '0')}</span><span className="course-row-body"><strong>{unit.title}</strong><span>{unit.details}</span></span><span aria-hidden="true">↗</span></button>)}</div></div></div></section>;
        })()}
        {view === 'python' && <section className="python-course-host" aria-label="Curso de Python">
          <iframe ref={pythonFrameRef} className="python-course-frame" src={pythonFrameSrc || '/python-course/index.html?embed=1'} title="PyNeuro Evolution — curso de Python" sandbox="allow-scripts allow-downloads" referrerPolicy="no-referrer" />
        </section>}
        {view === 'progress' && <Progress courses={courses} onOpenCourse={chooseCourse} onPracticeCourse={startPractice} onReviewCourse={(course) => { setStudyCourseId(course.id); navigate('study'); }} />}
        {view === 'practice' && <Practice courses={courses} initialCourseId={practiceCourseId} initialBranchIndex={practiceTarget?.branchIndex} initialTopic={practiceTarget?.topic} onOpenCourse={chooseCourse} onStartReview={(course) => { setStudyCourseId(course.id); navigate('study'); }} />}
        {view === 'planner' && <Planner courses={courses} onStartPractice={startPractice} onStartReview={(course) => { setStudyCourseId(course.id); navigate('study'); }} onOpenProgram={(programId, unit) => {
          if (programId === 'python-profissional') openPythonCourse(unit.level);
          else { const selectedProgram = getStudyProgram(programId); if (selectedProgram) openProgramUnit(selectedProgram, unit); }
        }} />}
        {view === 'unit' && unitTarget && <section className="generic-unit-page"><p className="eyebrow">{unitTarget.programTitle}</p><h1>{unitTarget.unit.title}</h1><p className="welcome-copy">Conteúdo direcionado pelo calendário adaptativo.</p><article className="generic-unit-card"><h2>Foco desta sessão</h2><p>{unitTarget.unit.details || 'Use a unidade registrada no curso como roteiro de leitura e prática.'}</p><h3>Como estudar este conteúdo</h3><ol><li>Leia procurando explicar a ideia central com suas próprias palavras.</li><li>Feche o material e recupere os pontos principais sem consultar.</li><li>Crie um exemplo e teste onde a explicação deixa de funcionar.</li><li>Registre uma dúvida ou erro para orientar a próxima revisão.</li></ol></article><button className="button-secondary" onClick={() => navigate('planner')}>← Voltar ao calendário</button></section>}
        {view === 'study' && <Study courses={courses} initialCourseId={studyCourseId} onOpenCourse={chooseCourse} />}
        {view === 'home' && <>
          <section className="welcome-row"><div><p className="eyebrow">CURSO · GESTÃO DA TECNOLOGIA DA INFORMAÇÃO</p><h1>Vamos avançar hoje?</h1><p className="welcome-copy">Sua jornada combina explicação, prática e revisão. Escolha um próximo passo que cabe no seu ritmo.</p></div><div className="welcome-stamp"><span>{courses.length}</span><small>DISCIPLINAS<br />E COMPONENTES</small></div></section>
          <section className="today-session-card" aria-labelledby="today-session-title">
            <div className="today-session-copy"><p className="eyebrow">SEU PRÓXIMO PASSO · {learning.goalMinutes} MIN</p><h2 id="today-session-title">{learning.recommendedCourse.title}</h2><p>{learning.reason}</p>
              <div className="today-session-flow" aria-label="Etapas da sessão"><span>Recuperar</span><b>→</b><span>Explorar</span><b>→</b><span>Aplicar</span><b>→</b><span>Conferir</span></div>
            </div><div className="today-session-actions"><button className="button-primary" onClick={() => startPractice(learning.recommendedCourse)}>Começar sessão guiada <span>→</span></button><button className="today-map-link" onClick={() => chooseCourse(learning.recommendedCourse, learning.suggestedBranchIndex)}>Ver ramo recomendado <span>↗</span></button><small>{learning.dueCount} assuntos na fila · {learning.reviewedToday} revisados hoje</small></div>
          </section>
          <div className="content-grid"><div>{courseList('Disciplinas e componentes', courses)}</div><aside className="right-rail"><div className="focus-card"><div className="card-topline"><span className={'kind-tag ' + kindClass[activeCourse.kind]}>{kindLabel[activeCourse.kind]}</span></div><p className="eyebrow">CONTINUE SEU APRENDIZADO</p><h3>{activeCourse.title}</h3><p className="focus-summary">{activeCourse.prerequisites}</p><div className="focus-meta"><span>▦ {activeCourse.module ? 'Módulo ' + activeCourse.module : 'Conteúdo transversal'}</span></div><button className="button-primary full" onClick={() => chooseCourse(activeCourse)}>Retomar disciplina <span>→</span></button></div><div className="micro-tip"><span className="tip-icon">✦</span><div><strong>Aprenda fazendo</strong><p>Depois de estudar um ramo, feche o material e explique a ideia com suas palavras.</p></div></div></aside></div>
        </>}
        {view === 'map' && <>
          <div className="page-title-row"><div><p className="eyebrow">MAPA MENTAL INTERATIVO</p><h1>{activeCourse.title}</h1><p className="welcome-copy">Selecione um ramo ou tópico para abrir seu foco de estudo.</p></div><button className="button-secondary" onClick={() => navigate('catalog')}>Ver todas as disciplinas <span>→</span></button></div>
          <div className="map-meta"><span className={'kind-tag ' + kindClass[activeCourse.kind]}>{kindLabel[activeCourse.kind]}</span><span>Disciplina selecionada</span><span className="recommended-label">CONTEÚDO DE APRENDIZAGEM</span></div>
          <div className="map-layout"><div className="map-area"><svg className="map-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="connectors-wide" d="M50 17 V29 M50 29 L12.5 43 M50 29 L37.5 43 M50 29 L62.5 43 M50 29 L87.5 43" /><path className="connectors-compact" d="M50 17 V28 M50 28 L25 39 M50 28 L75 39 M25 39 V72 M75 39 V72" /></svg><div className="map-center"><span className="map-center-orbit"></span><span className="map-center-inner">TI</span><strong>{activeCourse.title}</strong><small>IDEIA CENTRAL</small></div>
            <div className="branch-grid">{activeCourse.branches.map((branch, index) => {
              const branchState = getBranchLearningState(activeCourse, index);
              const stateLabel = branchState === 'verified' ? 'Verificado' : branchState === 'review' ? 'Retomar' : branchState === 'applied' ? 'Aplicado' : branchState === 'learning' ? 'Em estudo' : 'Novo';
              return <button key={branch.id} aria-pressed={focusBranch === index} className={'branch-card branch-' + index + (focusBranch === index ? ' branch-selected' : '')} onClick={() => { writeBrowserRoute({ view: 'map', courseId: activeId, branchIndex: index }, 'replace'); setFocusBranch(index); setFocusTopic(''); setPracticeGateChecked(false); }}><span className="branch-number">0{index + 1}</span><span className={'branch-status state-' + branchState}>{stateLabel}</span><strong>{branchNames[index] ?? branch.title}</strong><span className="branch-description">{branch.topics.slice(0, 3).join(' · ')}</span><span className="branch-count">{branch.topics.length} conceitos <b>↗</b></span></button>;
            })}</div>
            <div className="map-legend"><span><i className="legend-grade"></i> Dados da grade</span><span><i className="legend-recommendation"></i> Conteúdo recomendado</span></div>
          </div><aside className="map-detail"><p className="eyebrow">RAMO EM FOCO</p><h2>{branchNames[focusBranch] ?? selectedBranch.title}</h2><p className="detail-intro">Escolha um conceito para direcionar a leitura e a revisão.</p>
            <div className="topic-list">{selectedBranch.topics.map((topic, index) => <button key={topic + index} aria-pressed={selectedTopic === topic} className={'topic-chip ' + (selectedTopic === topic ? 'topic-active' : '')} onClick={() => { writeBrowserRoute({ view: 'map', courseId: activeId, branchIndex: focusBranch, topic }, 'replace'); setFocusTopic(topic); setPracticeGateChecked(false); }}><span>{String(index + 1).padStart(2, '0')}</span>{topic}</button>)}</div>
            <section id="concept-study-content" className="concept-study-card" aria-labelledby="concept-study-title">
              <div className="concept-study-heading"><p className="eyebrow">CONTEÚDO DO CONCEITO · {selectedBranch.title}</p><h3 id="concept-study-title">{selectedTopic}</h3><span className={'concept-study-origin origin-' + selectedConcept.origin}>{selectedConcept.origin === 'course-specific' ? 'CONTEÚDO ESPECÍFICO DA DISCIPLINA' : selectedConcept.origin === 'curated' ? 'BASE CONCEITUAL' : 'EXPLICAÇÃO CONTEXTUALIZADA'}</span></div>
              <div className="concept-study-block"><small>O QUE SIGNIFICA</small><p>{selectedConcept.explanation}</p></div>
              <div className="concept-study-grid"><article><small>EXEMPLO APLICADO</small><p>{selectedConcept.example}</p></article><article><small>RECUPERE DA MEMÓRIA</small><p>{selectedConcept.recallPrompt}</p></article></div>
              <div className="concept-memory-cue"><small>GANCHO DE MEMÓRIA</small><span>{selectedConcept.memoryCue}</span></div>
              {selectedConcept.related.length > 0 && <p className="concept-related"><strong>Conecte com:</strong> {selectedConcept.related.join(' · ')}</p>}
              <div className="practice-gate-card">
                <label className="practice-gate-check"><input type="checkbox" checked={practiceGateChecked} onChange={(event) => setPracticeGateChecked(event.target.checked)} /><span>Já estudei o conteúdo do conceito <strong>{selectedTopic}</strong>.</span></label>
                <p>Marque após ler a explicação e o exemplo acima. A próxima etapa praticará este mesmo conceito nesta disciplina.</p>
                <button className="button-primary" type="button" disabled={!practiceGateChecked} onClick={openPracticeConfirmation}>Prática guiada <span>→</span></button>
              </div>
            </section>
            <div className="detail-section"><small>PRÉ-REQUISITOS SUGERIDOS</small><p>{activeCourse.prerequisites}</p></div><div className="detail-section"><small>PRÁTICA PROPOSTA</small><p>{activeCourse.practice}</p></div><div className="detail-section"><small>CRITÉRIO DE DOMÍNIO</small><p>{activeCourse.mastery}</p></div><div className="detail-section"><small>FERRAMENTAS SUGERIDAS</small><p>{activeCourse.tools}</p></div>
          </aside></div>
        </>}
        {(view === 'catalog' || view === 'extras') && <><div className="page-title-row"><div><p className="eyebrow">{view === 'extras' ? 'OPTATIVAS E COMPONENTES' : 'CATÁLOGO DO CURSO'}</p><h1>{view === 'extras' ? 'Aprenda além da trilha.' : 'Todas as disciplinas.'}</h1><p className="welcome-copy">Escolha um item para abrir seu mapa e conteúdo de estudo.</p></div><span className="count-pill">{visibleCourses.length} itens</span></div><div className="catalog-card">{courseList(view === 'extras' ? 'Componentes e opções' : 'Curso completo', visibleCourses)}</div></>}
      </div>
    </main>
    {moreOpen && <button className="mobile-more-scrim" aria-label="Fechar menu Mais" onClick={() => setMoreOpen(false)} />}
    <nav id="mobile-more-menu" className="mobile-more-menu" aria-label="Mais áreas" aria-hidden={!moreOpen} hidden={!moreOpen}><strong>Organize sua jornada</strong>
      <button ref={firstMoreItemRef} onClick={() => navigate('progress')}><Icon name="progress" />Meu progresso</button><button onClick={() => navigate('planner')}><Icon name="plan" />Plano de estudos</button><button onClick={() => navigate('catalog')}><Icon name="learn" />Catálogo completo</button><button onClick={() => navigate('extras')}><Icon name="extras" />Optativas e atividades</button>
    </nav>
    <nav className="mobile-bottom-nav" aria-label="Navegação principal">
      <button aria-current={view === 'home' ? 'page' : undefined} className={view === 'home' ? 'mobile-tab active' : 'mobile-tab'} onClick={() => navigate('home')}><Icon name="home" />Hoje</button>
      <button aria-current={view === 'map' || view === 'catalog' ? 'page' : undefined} className={view === 'map' || view === 'catalog' ? 'mobile-tab active' : 'mobile-tab'} onClick={() => navigate('catalog')}><Icon name="learn" />Aprender</button>
      <button aria-current={view === 'practice' ? 'page' : undefined} className={view === 'practice' ? 'mobile-tab active' : 'mobile-tab'} onClick={() => startPractice(learning.recommendedCourse)}><Icon name="practice" />Prática</button>
      <button aria-current={view === 'study' ? 'page' : undefined} className={view === 'study' ? 'mobile-tab active' : 'mobile-tab'} onClick={() => { setStudyCourseId('all'); navigate('study'); }}><Icon name="review" />Revisar</button>
      <button ref={moreButtonRef} aria-expanded={moreOpen} aria-controls="mobile-more-menu" className={moreOpen || view === 'progress' || view === 'planner' || view === 'extras' ? 'mobile-tab active' : 'mobile-tab'} onClick={() => setMoreOpen((open) => !open)}><Icon name="more" />Mais</button>
    </nav>
    {practiceGateOpen && <div className="practice-gate-overlay" onClick={() => { setPracticeGateOpen(false); setPracticeGateChecked(false); }}><section className="practice-gate-dialog" role="dialog" aria-modal="true" aria-labelledby="practice-gate-title" onClick={(event) => event.stopPropagation()}><p className="eyebrow">CONFIRMAÇÃO DE ESTUDO</p><h2 id="practice-gate-title">Você já estudou “{selectedTopic}”?</h2><p>Se sim, vamos abrir a prática guiada diretamente neste conceito de <strong>{activeCourse.title}</strong>. Se ainda não, volte ao conteúdo e leia a explicação e o exemplo.</p><div className="practice-gate-dialog-actions"><button className="button-secondary" type="button" onClick={() => answerPracticeConfirmation(false)}>Ainda não, vou revisar</button><button className="button-primary" type="button" autoFocus onClick={() => answerPracticeConfirmation(true)}>Sim, iniciar prática <span>→</span></button></div></section></div>}
  </div>;
}
export default App;







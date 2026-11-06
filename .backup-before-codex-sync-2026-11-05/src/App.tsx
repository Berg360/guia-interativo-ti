import { useMemo, useState } from 'react';
import { courses, type Course, type CourseKind } from './data/curriculum';
import { references, type StudyReference } from './data/references';

type View = 'home' | 'map' | 'catalog' | 'extras';
const semesters = [
  { id: '1', short: '01', title: 'Fundamentos', note: 'Lógica, negócio e infraestrutura' },
  { id: '2', short: '02', title: 'Sistemas', note: 'Programação e arquitetura' },
  { id: '3', short: '03', title: 'Construção', note: 'Estruturas, engenharia e extensão' },
  { id: '4', short: '04', title: 'Inteligência', note: 'Dados, IA e governança' },
  { id: '5', short: '05', title: 'Entrega', note: 'Web, segurança e estratégia' },
];
const branchNames = ['Fundamentos', 'Estruturas e métodos', 'Aplicação', 'Validação e domínio'];
const kindLabel: Record<CourseKind, string> = { discipline: 'Disciplina', elective: 'Optativa', project: 'Projeto integrador', extension: 'Extensão', component: 'Componente' };
const kindClass: Record<CourseKind, string> = { discipline: 'kind-blue', elective: 'kind-violet', project: 'kind-amber', extension: 'kind-green', component: 'kind-gray' };
const categoryRefs: Record<string, string[]> = {
  programming: ['python', 'cs2023', 'git'], cloud: ['aws', 'nistcloud'], data: ['postgres', 'googleml', 'nistai'],
  web: ['mdn', 'owasp'], security: ['nistcsf', 'owasp', 'asvs'], governance: ['cobit', 'nistcsf'],
  projects: ['pmi', 'cs2023'], usability: ['iso9241', 'wcag'], inclusion: ['libras', 'law11645', 'environment'],
  learning: ['dunlosky', 'anki'], general: ['cs2023', 'python'],
};
function resourceGroup(course: Course) {
  const text = (course.title + ' ' + course.branches.flatMap((b) => b.topics).join(' ')).toLocaleLowerCase('pt-BR');
  if (/segurança|ameaça/.test(text)) return categoryRefs.security;
  if (/web|http|javascript|html/.test(text)) return categoryRefs.web;
  if (/banco|sql|dados|inteligência artificial|estatística/.test(text)) return categoryRefs.data;
  if (/nuvem|cloud/.test(text)) return categoryRefs.cloud;
  if (/governança|auditoria|contrato|gestão/.test(text)) return categoryRefs.governance;
  if (/projeto|requisito|engenharia/.test(text)) return categoryRefs.projects;
  if (/usabilidade|qualidade|acessibilidade/.test(text)) return categoryRefs.usability;
  if (/libras|direitos humanos|étnico|ambiental|sustentabilidade/.test(text)) return categoryRefs.inclusion;
  if (/program|algorit|estrutura|código|computador/.test(text)) return categoryRefs.programming;
  return categoryRefs.general;
}
function getReferences(course: Course): StudyReference[] {
  return resourceGroup(course).map((id) => references.find((ref) => ref.id === id)).filter((ref): ref is StudyReference => Boolean(ref)).slice(0, 3);
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.5 4.5" /></svg>;
}
function App() {
  const [view, setView] = useState<View>('home');
  const [semester, setSemester] = useState('1');
  const [activeId, setActiveId] = useState(courses.find((course) => course.semester === '1')?.id ?? courses[0].id);
  const [query, setQuery] = useState('');
  const [focusBranch, setFocusBranch] = useState(0);
  const [focusTopic, setFocusTopic] = useState('');
  const activeCourse = courses.find((course) => course.id === activeId) ?? courses[0];
  const semesterCourses = courses.filter((course) => course.semester === semester);
  const visibleCourses = useMemo(() => {
    const pool = view === 'extras' ? courses.filter((course) => course.kind === 'elective' || course.kind === 'component')
      : view === 'catalog' || query.trim() ? courses : semesterCourses;
    const q = query.trim().toLocaleLowerCase('pt-BR');
    if (!q) return pool;
    return pool.filter((course) => [course.title, course.module, course.prerequisites, course.practice,
      ...course.branches.flatMap((branch) => [branch.title, ...branch.topics])].join(' ').toLocaleLowerCase('pt-BR').includes(q));
  }, [query, semester, view, semesterCourses]);
  const currentSemester = semesters.find((item) => item.id === semester) ?? semesters[0];
  const selectedBranch = activeCourse.branches[focusBranch] ?? activeCourse.branches[0];
  function chooseSemester(id: string) {
    setSemester(id); const first = courses.find((course) => course.semester === id);
    if (first) setActiveId(first.id); setFocusBranch(0); setFocusTopic(''); setView('home'); setQuery('');
  }
  function chooseCourse(course: Course) {
    setActiveId(course.id); if (course.semester !== '1-5') setSemester(course.semester);
    setFocusBranch(0); setFocusTopic(''); setView('map');
  }
  function courseList(title: string, items: Course[]) {
    return <section className="course-list-section">
      <div className="section-heading"><div><p className="eyebrow">CURRÍCULO</p><h2>{title}</h2></div><span className="count-pill">{items.length} itens</span></div>
      <div className="course-list">{items.map((course) => <button key={course.id} className={'course-row ' + (activeId === course.id ? 'is-active' : '')} onClick={() => chooseCourse(course)}>
        <span className="course-index">{course.semester === '1-5' ? '↗' : course.module.replace(/[A-Z]/g, '')}</span>
        <span className="course-row-body"><strong>{course.title}</strong><span>{course.semester === '1-5' ? 'Transversal' : 'Semestre ' + course.semester + ' · Módulo ' + course.module}</span></span>
        <span className={'kind-tag ' + kindClass[course.kind]}>{kindLabel[course.kind]}</span><span className="row-hours">{course.hours.split(';')[0]}</span>
      </button>)}{!items.length && <div className="empty-state">Não encontrei tópicos com esse termo. Tente outra palavra.</div>}</div>
    </section>;
  }
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand-lockup"><div className="brand-mark">t<span>i</span></div><div><strong>trilha<span>TI</span></strong><small>GUIA DE APRENDIZAGEM</small></div></div>
      <button className={'side-link ' + (view === 'home' ? 'active' : '')} onClick={() => { setView('home'); setQuery(''); }}><span className="side-symbol">⌂</span> Visão geral</button>
      <p className="side-label">SEMESTRES</p><div className="semester-nav">{semesters.map((item) => <button key={item.id} className={semester === item.id && view !== 'extras' ? 'selected' : ''} onClick={() => chooseSemester(item.id)}><span className="sem-number">{item.short}</span><span>{item.title}</span><span className="nav-chevron">›</span></button>)}</div>
      <p className="side-label side-label-spaced">OUTROS COMPONENTES</p>
      <button className={'side-link ' + (view === 'extras' ? 'active' : '')} onClick={() => { setView('extras'); setQuery(''); }}><span className="side-symbol">✳</span> Optativas e atividades</button>
      <div className="sidebar-bottom"><div className="offline-indicator"><span></span><div><strong>Modo offline disponível</strong><small>Após carregar o app uma vez</small></div></div><p>Grade FASUL · 5 semestres</p></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button type="button" className="mobile-brand" onClick={() => { setView('home'); setQuery(''); }}>trilha<span>TI</span></button>
        <div className="breadcrumbs"><span>Curso</span><b>/</b><strong>{view === 'map' ? activeCourse.title : view === 'catalog' ? 'Todas as disciplinas' : view === 'extras' ? 'Optativas e atividades' : 'Visão geral'}</strong></div>
        <label className="search-box"><SearchIcon /><input value={query} onChange={(event) => { setQuery(event.target.value); if (event.target.value) setView('catalog'); }} placeholder="Buscar disciplina ou assunto" aria-label="Buscar disciplina ou assunto" /><kbd>⌘ K</kbd></label>
        <div className="profile-chip"><span>F</span><div><strong>FASUL</strong><small>ESTUDANTE</small></div></div>
      </header>
      <div className="page-content">
        {view === 'home' && <>
          <section className="welcome-row"><div><p className="eyebrow">TECNOLOGIA EM GESTÃO DA TI</p><h1>Seu mapa de aprendizagem.</h1><p className="welcome-copy">Explore a jornada, abra uma disciplina e transforme cada assunto em algo que você consegue explicar e fazer.</p></div><div className="welcome-stamp"><span>5</span><small>SEMESTRES<br />DE FORMAÇÃO</small></div></section>
          <section className="semester-strip" aria-label="Selecionar semestre">{semesters.map((item) => {
            const count = courses.filter((course) => course.semester === item.id).length;
            return <button key={item.id} className={'semester-card ' + (semester === item.id ? 'current' : '')} onClick={() => chooseSemester(item.id)}><span className="semester-card-top"><b>{item.short}</b><i>{count} tópicos</i></span><strong>{item.title}</strong><small>{item.note}</small><span className="semester-progress"><i style={{ width: (100 - (Number(item.id) - 1) * 13) + '%' }} /></span></button>;
          })}</section>
          <section className="semester-intro"><div className="semester-intro-icon">{currentSemester.short}</div><div><p className="eyebrow">SEMESTRE {semester} · {semesterCourses.length} DISCIPLINAS E COMPONENTES</p><h2>{currentSemester.title}</h2><p>{currentSemester.note}. Abra um item para ver o mapa mental, os conteúdos e uma prática sugerida.</p></div><button className="button-secondary" onClick={() => setView('map')}>Abrir mapa selecionado <span>↗</span></button></section>
          <div className="content-grid"><div>{courseList('Trilha do semestre', semesterCourses)}</div><aside className="right-rail"><div className="focus-card"><div className="card-topline"><span className={'kind-tag ' + kindClass[activeCourse.kind]}>{kindLabel[activeCourse.kind]}</span><span className="dot-menu">•••</span></div><p className="eyebrow">COMECE POR AQUI</p><h3>{activeCourse.title}</h3><p className="focus-summary">{activeCourse.prerequisites}</p><div className="focus-meta"><span>◷ {activeCourse.hours}</span><span>▦ Módulo {activeCourse.module}</span></div><button className="button-primary full" onClick={() => setView('map')}>Explorar disciplina <span>→</span></button></div><div className="micro-tip"><span className="tip-icon">✦</span><div><strong>Aprenda fazendo</strong><p>Depois de estudar um ramo, feche o material e explique a ideia com suas palavras.</p></div></div></aside></div>
        </>}
        {view === 'map' && <>
          <div className="page-title-row"><div><p className="eyebrow">MAPA MENTAL INTERATIVO</p><h1>{activeCourse.title}</h1><p className="welcome-copy">Selecione um ramo ou tópico para abrir seu foco de estudo.</p></div><button className="button-secondary" onClick={() => setView('catalog')}>Ver todas as disciplinas <span>→</span></button></div>
          <div className="map-meta"><span className={'kind-tag ' + kindClass[activeCourse.kind]}>{kindLabel[activeCourse.kind]}</span><span>Semestre {activeCourse.semester} · {activeCourse.hours}</span><span className="recommended-label">EXPANSÃO RECOMENDADA</span></div>
          <div className="map-layout"><div className="map-area"><div className="map-center"><span className="map-center-orbit"></span><span className="map-center-inner">TI</span><strong>{activeCourse.title}</strong><small>MAPA DA DISCIPLINA</small></div>
            <div className="branch-grid">{activeCourse.branches.map((branch, index) => <button key={branch.id} className={'branch-card branch-' + index + (focusBranch === index ? ' branch-selected' : '')} onClick={() => { setFocusBranch(index); setFocusTopic(''); }}><span className="branch-number">0{index + 1}</span><strong>{branchNames[index] ?? branch.title}</strong><span className="branch-description">{branch.topics.slice(0, 3).join(' · ')}</span><span className="branch-count">{branch.topics.length} conceitos <b>↗</b></span></button>)}</div>
            <div className="map-legend"><span><i className="legend-grade"></i> Dados da grade</span><span><i className="legend-recommendation"></i> Conteúdo recomendado</span></div>
          </div><aside className="map-detail"><p className="eyebrow">RAMO EM FOCO</p><h2>{branchNames[focusBranch] ?? selectedBranch.title}</h2><p className="detail-intro">Escolha um conceito para direcionar a leitura e a revisão.</p>
            <div className="topic-list">{selectedBranch.topics.map((topic, index) => <button key={topic + index} className={'topic-chip ' + (focusTopic === topic ? 'topic-active' : '')} onClick={() => setFocusTopic(topic)}><span>{String(index + 1).padStart(2, '0')}</span>{topic}</button>)}</div>
            <div className="focus-topic-card"><span className="focus-topic-icon">✦</span><div><small>ESTUDE AGORA</small><strong>{focusTopic || selectedBranch.topics[0] || activeCourse.title}</strong><p>Explique este conceito sem consultar. Depois, conecte-o a um exemplo da disciplina.</p></div></div>
            <div className="detail-section"><small>PRÉ-REQUISITOS SUGERIDOS</small><p>{activeCourse.prerequisites}</p></div><div className="detail-section"><small>PRÁTICA PROPOSTA</small><p>{activeCourse.practice}</p></div><div className="detail-section"><small>CRITÉRIO DE DOMÍNIO</small><p>{activeCourse.mastery}</p></div><div className="detail-section"><small>FERRAMENTAS SUGERIDAS</small><p>{activeCourse.tools}</p></div>
            <div className="reference-list"><small>FONTES PARA CONTINUAR</small>{getReferences(activeCourse).map((ref) => <a key={ref.id} href={ref.url} target="_blank" rel="noreferrer">{ref.title}<span>↗</span></a>)}</div><p className="source-note">Título, semestre e carga vêm da grade. Conteúdo e atividades são recomendações externas.</p>
          </aside></div>
        </>}
        {(view === 'catalog' || view === 'extras') && <><div className="page-title-row"><div><p className="eyebrow">{view === 'extras' ? 'OPTATIVAS E COMPONENTES' : 'CATÁLOGO DO CURSO'}</p><h1>{view === 'extras' ? 'Aprenda além da trilha.' : 'Todas as disciplinas.'}</h1><p className="welcome-copy">Escolha um item para abrir seu mapa e conteúdo de estudo.</p></div><span className="count-pill">{visibleCourses.length} itens</span></div><div className="catalog-card">{courseList(view === 'extras' ? 'Componentes e opções' : 'Curso completo', visibleCourses)}</div></>}
      </div>
    </main>
  </div>;
}
export default App;



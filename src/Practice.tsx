import { useEffect, useState } from 'react';
import type { Course } from './data/curriculum';
import { modelAnswers } from './data/answers';
import { Quiz } from './Quiz';
import { getBranchLearningState, getCourseEvidence, getLearningSnapshot } from './data/learning';
import { conceptGuideFor } from './data/concepts';

type Rating = 'review' | 'partial' | 'ready';
type PracticeRecord = { answer: string; revealed: boolean; rating?: Rating; updatedAt: number };
type Records = Record<string, PracticeRecord>;
type RouteRecord = Record<string, boolean>;
const STORAGE_KEY = 'trilha-ti-practice-v1';
const ROUTE_KEY = 'trilha-ti-route-v1';

function readRecords(): Records {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as Records : {};
  } catch {
    return {};
  }
}

function questionFor(course: Course, branchIndex: number, selectedTopic?: string) {
  const branch = course.branches[branchIndex];
  const topics = branch.topics.join(', ');
  if (selectedTopic) {
    const related = branch.topics.filter((topic) => topic !== selectedTopic);
    return `Sem consultar o mapa, explique “${selectedTopic}”: o que significa, qual papel cumpre em ${course.title} e como se aplica ao desafio “${course.practice}”.${related.length ? ' Conecte a resposta a: ' + related.join(', ') + '.' : ''}`;
  }
  if (branchIndex === 0) return 'Sem consultar o mapa, explique com suas palavras: ' + topics + '. Dê um exemplo concreto.';
  if (branchIndex === 1) return 'Como os conceitos ' + topics + ' se conectam? Descreva a relação entre eles e por que ela importa em ' + course.title + '.';
  if (branchIndex === 2) return 'Aplique ' + topics + ' ao desafio prático da disciplina: ' + course.practice;
  return 'Que evidência demonstraria domínio de ' + topics + '? Compare sua resposta com este critério: ' + course.mastery;
}

export function answerGuideFor(course: Course, branchIndex: number, selectedTopic?: string) {
  const branch = course.branches[branchIndex];
  const topics = selectedTopic || branch.topics.join(', ');
  const specificAnswer = modelAnswers[course.id]?.[branchIndex];
  if (branchIndex === 0) return {
    heading: 'Conceitos essenciais',
    answer: specificAnswer ?? `Uma resposta bem construída define ${topics}, explica a função de cada conceito e mostra como ele aparece em ${course.title}. Inclua um exemplo concreto relacionado a esta disciplina.`,
    checks: ['Definição correta de cada termo do ramo.', 'Diferenças ou relações entre os termos, quando houver.', `Exemplo conectado à prática: ${course.practice}`],
  };
  if (branchIndex === 1) return {
    heading: 'Relações e escolhas',
    answer: specificAnswer ?? `Explique como ${topics} se conectam, o que cada parte contribui e por que essa relação importa. Quando houver mais de uma abordagem, compare as opções e justifique a escolha com base no problema da disciplina.`,
    checks: ['Explicação da relação entre os conceitos, não apenas uma lista.', 'Justificativa de quando ou por que usar cada abordagem.', `Conexão com os pré-requisitos: ${course.prerequisites}`],
  };
  if (branchIndex === 2) return {
    heading: 'Aplicação prática',
    answer: specificAnswer ?? `Aplique ${topics} ao desafio da disciplina: “${course.practice}”. Descreva a sequência de decisões, o que você produziria e como usaria as ferramentas sugeridas (${course.tools}) para chegar a um resultado verificável.`,
    checks: ['Etapas em ordem lógica e ligadas ao desafio.', 'Uso justificado das ferramentas ou técnicas adequadas.', 'Resultado observável, exemplo ou artefato que permita conferir a solução.'],
  };
  return {
    heading: 'Evidência de domínio',
    answer: specificAnswer ?? `Para demonstrar domínio de ${topics}, apresente evidências que sustentem este critério: “${course.mastery}”. Explique como verificaria o resultado e que erro, limite ou caso extremo ainda precisaria considerar.`,
    checks: ['Critério de domínio interpretado de forma observável.', 'Evidência, teste, métrica ou artefato que sustente a conclusão.', 'Limites, erros possíveis e como corrigir ou revisar.'],
  };
}

const routeSteps = [
  { title: 'Preparar e diagnosticar', description: 'Leia os pré-requisitos e tente explicar, sem consultar, o que já sabe. Anote duas dúvidas para orientar a sessão.', branch: 0 },
  { title: 'Construir a base', description: 'Estude os conceitos do primeiro ramo no mapa. Feche o mapa e escreva definições curtas com um exemplo para cada conceito.', branch: 0 },
  { title: 'Conectar as ideias', description: 'Estude o segundo ramo e desenhe as relações entre os conceitos. Intercale a explicação com uma pergunta do primeiro ramo.', branch: 1 },
  { title: 'Aplicar em um desafio', description: 'Resolva a prática da disciplina usando as ferramentas sugeridas. Registre os passos, decisões e resultado para poder revisar.', branch: 2 },
  { title: 'Validar e recuperar', description: 'Responda às perguntas sem consultar. Abra as respostas de referência, compare com o critério de domínio e marque o que precisa rever.', branch: 3 },
];

const spacedReviews = [
  { label: '1 dia depois', detail: 'Recupere de memória os conceitos e corrija lacunas.' },
  { label: '3 dias depois', detail: 'Misture perguntas de fundamentos, relações e aplicação.' },
  { label: '7 dias depois', detail: 'Refaça o desafio sem olhar sua solução anterior.' },
  { label: '14 dias depois', detail: 'Explique o tema inteiro e confira o critério de domínio.' },
];

type PracticeProps = { courses: Course[]; initialCourseId?: string; initialBranchIndex?: number; initialTopic?: string; onOpenCourse: (course: Course, branchIndex?: number) => void; onStartReview: (course: Course) => void };

export function Practice({ courses, initialCourseId, initialBranchIndex, initialTopic, onOpenCourse, onStartReview }: PracticeProps) {
  const firstCourse = courses[0];
  const [courseId, setCourseId] = useState(initialCourseId || firstCourse.id);
  const [records, setRecords] = useState<Records>(readRecords);
  const [mode, setMode] = useState<'open' | 'quiz'>('open');
  const [routeProgress, setRouteProgress] = useState<RouteRecord>(() => {
    try { return JSON.parse(localStorage.getItem(ROUTE_KEY) ?? '{}') as RouteRecord; } catch { return {}; }
  });
  const course = courses.find((item) => item.id === courseId) ?? firstCourse;
  const targetBranchIndex = typeof initialBranchIndex === 'number'
    ? Math.min(Math.max(initialBranchIndex, 0), course.branches.length - 1)
    : undefined;
  const isFocusedConceptPractice = targetBranchIndex !== undefined && Boolean(initialTopic);
  const recommendedBranchIndex = targetBranchIndex ?? getLearningSnapshot([course]).suggestedBranchIndex;
  const recommendedBranch = course.branches[recommendedBranchIndex];
  const recommendedState = getBranchLearningState(course, recommendedBranchIndex);
  const branchEvidence = getCourseEvidence([course]).find((item) => item.branchIndex === recommendedBranchIndex)?.evidence;
  const completedSteps = routeSteps.filter((_, index) => routeProgress[course.id + ':' + index]).length;
  const practiceBranches = isFocusedConceptPractice && targetBranchIndex !== undefined
    ? [{ branch: course.branches[targetBranchIndex], index: targetBranchIndex }]
    : course.branches.map((branch, index) => ({ branch, index }));

  useEffect(() => {
    if (initialCourseId && courses.some((item) => item.id === initialCourseId)) setCourseId(initialCourseId);
  }, [initialCourseId, courses]);

  useEffect(() => {
    if (isFocusedConceptPractice) {
      window.requestAnimationFrame(() => document.getElementById('focused-practice-question')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, [initialCourseId, initialBranchIndex, initialTopic, isFocusedConceptPractice]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch { /* Mantém as respostas nesta sessão. */ }
  }, [records]);

  useEffect(() => {
    try { localStorage.setItem(ROUTE_KEY, JSON.stringify(routeProgress)); } catch { /* Mantém o roteiro nesta sessão. */ }
  }, [routeProgress]);

  function updateRecord(branchId: string, update: Partial<PracticeRecord>, conceptTopic?: string) {
    const branchKey = course.id + ':' + branchId;
    const key = conceptTopic ? branchKey + ':topic:' + encodeURIComponent(conceptTopic) : branchKey;
    setRecords((current) => {
      const previous = current[key] ?? { answer: '', revealed: false };
      const updatedAt = Date.now();
      const next = { ...current, [key]: { ...previous, ...update, updatedAt } };
      if (conceptTopic && update.rating) {
        const branchSummary = current[branchKey] ?? { answer: '', revealed: false };
        next[branchKey] = { ...branchSummary, rating: update.rating, updatedAt };
      }
      return next;
    });
  }

  function toggleRouteStep(index: number) {
    const key = course.id + ':' + index;
    setRouteProgress((current) => ({ ...current, [key]: !current[key] }));
  }

  return <section className="practice-page">
    <div className="page-title-row"><div><p className="eyebrow">PRÁTICA COM RECUPERAÇÃO ATIVA</p><h1>{isFocusedConceptPractice ? 'Pratique o conceito estudado.' : 'Explique, aplique e confira.'}</h1>
      <p className="welcome-copy">{isFocusedConceptPractice ? `Prática direcionada para “${initialTopic}” no ramo ${course.branches[targetBranchIndex!].title}.` : 'Estude com um roteiro por etapas, tente responder sem consultar e confira uma resposta comentada.'}</p></div></div>
    <div className="practice-toolbar"><label>Escolha a disciplina
      <select value={courseId} disabled={isFocusedConceptPractice} onChange={(event) => setCourseId(event.target.value)}>{courses.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select>
    </label><div className="practice-toolbar-actions"><span>{isFocusedConceptPractice ? '1 ramo · 1 conceito em foco' : `${course.branches.length} ramos disponíveis`}</span>
      <button className="button-secondary" onClick={() => onOpenCourse(course, isFocusedConceptPractice ? targetBranchIndex : undefined)}>Abrir mapa <span>↗</span></button>
      <button className="button-primary" onClick={() => onStartReview(course)}>Revisar cartões <span>→</span></button></div>
    </div>
    <article className="practice-challenge"><div><p className="eyebrow">DESAFIO APLICADO DA DISCIPLINA</p><p>{course.practice}</p></div>
      <small>{isFocusedConceptPractice ? `Aplique especificamente “${initialTopic}” neste desafio.` : 'Use o desafio para testar se consegue passar dos conceitos à prática.'}</small></article>
    {isFocusedConceptPractice && <div className="focused-practice-banner"><span>CONCEITO EM PRÁTICA</span><strong>{initialTopic}</strong><small>{course.title} · {course.branches[targetBranchIndex!].title}</small></div>}
    {!isFocusedConceptPractice && <section className="smart-route" aria-labelledby="smart-route-title">
      <div className="smart-route-heading"><div><p className="eyebrow">TRILHA ADAPTÁVEL · 5 ETAPAS</p><h2 id="smart-route-title">Roteiro inteligente de estudo</h2><p>Siga a sequência no seu ritmo; o Plano de estudos organiza o tempo das sessões. Seu progresso fica salvo neste navegador.</p></div><div className="route-progress"><strong>{completedSteps}/{routeSteps.length}</strong><span>etapas concluídas</span><i><b style={{ width: `${completedSteps / routeSteps.length * 100}%` }} /></i></div></div>
      {recommendedBranch && branchEvidence && <article className={'route-focus-card focus-' + recommendedState}>
        <div className="route-focus-main"><p className="eyebrow">FOCO PERSONALIZADO · {recommendedState === 'verified' ? 'AMPLIAR' : recommendedState === 'review' ? 'RETOMAR' : recommendedState === 'new' ? 'PRIMEIRO CONTATO' : 'PRÓXIMA EVIDÊNCIA'}</p><h3>{recommendedBranch.title}</h3>
          <p>{recommendedState === 'review' ? 'Uma resposta recente indicou que esse ramo precisa de uma nova tentativa. Releia os conceitos e explique a conexão com um exemplo.'
            : recommendedState === 'verified' ? 'Este ramo já tem evidências de retenção, aplicação e quiz correto. Amplie com outro exemplo ou conecte-o a um ramo relacionado.'
              : recommendedState === 'new' ? 'Este ramo ainda não tem atividade registrada. Comece pela recuperação inicial, abra os conceitos e teste uma aplicação curta.'
                : recommendedState === 'applied' ? 'Você marcou que conseguiu explicar e aplicar este ramo. Agora complete a revisão espaçada e confira a lembrança no quiz.'
                  : 'Continue fortalecendo este ramo. Compare a retenção dos assuntos, sua aplicação e o resultado mais recente do quiz.'}</p>
          <div className="route-evidence-list"><span className={branchEvidence.recallComplete ? 'evidence-done' : ''}>Retenção: {branchEvidence.retainedTopics}/{branchEvidence.totalTopics}</span><span className={branchEvidence.practiceRating === 'ready' ? 'evidence-done' : ''}>Aplicação: {branchEvidence.practiceRating === 'ready' ? 'marcada como pronta' : branchEvidence.practiceRating === 'partial' ? 'parcial' : branchEvidence.practiceRating === 'review' ? 'retomar' : 'pendente'}</span><span className={branchEvidence.quizCorrect ? 'evidence-done' : branchEvidence.quizMissed ? 'evidence-needs-work' : ''}>Quiz: {branchEvidence.quizCorrect ? 'correto' : branchEvidence.quizMissed ? 'retomar' : 'pendente'}</span></div>
        </div><button className="button-primary" onClick={() => onOpenCourse(course, recommendedBranchIndex)}>Abrir ramo recomendado <span>↗</span></button>
      </article>}
      <div className="route-step-list">{routeSteps.map((step, index) => {
        const key = course.id + ':' + index;
        const done = Boolean(routeProgress[key]);
        const branch = course.branches[step.branch];
        return <article className={'route-step ' + (done ? 'route-step-done' : '')} key={step.title}>
          <button className="route-check" type="button" aria-label={`${done ? 'Desmarcar' : 'Concluir'} etapa ${index + 1}`} aria-pressed={done} onClick={() => toggleRouteStep(index)}>{done ? '✓' : index + 1}</button>
          <div className="route-step-copy"><div className="route-step-meta"><span>Etapa {index + 1}</span><span>{branch.title}</span></div><h3>{step.title}</h3><p>{step.description}</p><small>Foco: {branch.topics.join(' · ')}</small><button className="route-open-topic" type="button" onClick={() => onOpenCourse(course, step.branch)}>Explorar este ramo no mapa <span>↗</span></button></div>
        </article>;
      })}</div>
      <div className="route-spaced"><div><p className="eyebrow">PARA FIXAR NA MEMÓRIA</p><h3>Revisões espaçadas sugeridas</h3><p>Agende as revisões abaixo depois de estudar a disciplina. Em cada retorno, tente lembrar antes de abrir as respostas.</p></div><div className="spaced-review-list">{spacedReviews.map((review) => <article key={review.label}><strong>{review.label}</strong><span>{review.detail}</span></article>)}</div></div>
    </section>}
    {!isFocusedConceptPractice && <div className="practice-mode-switch" role="tablist" aria-label="Formato de prática">
      <button type="button" role="tab" aria-selected={mode === 'open'} className={mode === 'open' ? 'selected' : ''} onClick={() => setMode('open')}>Resposta aberta</button>
      <button type="button" role="tab" aria-selected={mode === 'quiz'} className={mode === 'quiz' ? 'selected' : ''} onClick={() => setMode('quiz')}>Quiz com autocorreção</button>
    </div>}
    {!isFocusedConceptPractice && mode === 'quiz' ? <Quiz course={course} /> : <>
    <div className="practice-section-heading"><div><p className="eyebrow">{isFocusedConceptPractice ? 'PRÁTICA DO CONCEITO SELECIONADO' : 'RECUPERAÇÃO ATIVA'}</p><h2>{isFocusedConceptPractice ? `Recupere: ${initialTopic}` : 'Perguntas para praticar'}</h2><p>{isFocusedConceptPractice ? 'Explique sem consultar. Depois revele o roteiro específico deste conceito e compare com sua resposta.' : 'Tente responder primeiro. Depois compare com os conceitos esperados, a aplicação e a evidência de domínio.'}</p></div></div>
    <div className="practice-question-list">{practiceBranches.map(({ branch, index }) => {
      const focusedTopic = isFocusedConceptPractice && index === targetBranchIndex ? initialTopic : undefined;
      const conceptGuide = focusedTopic ? conceptGuideFor(course, index, focusedTopic) : undefined;
      const branchKey = course.id + ':' + branch.id;
      const key = focusedTopic ? branchKey + ':topic:' + encodeURIComponent(focusedTopic) : branchKey;
      const record = records[key] ?? { answer: '', revealed: false };
      return <article id={focusedTopic ? 'focused-practice-question' : undefined} className="practice-question" key={branch.id}>
        <div className="practice-question-heading"><span>0{index + 1}</span><div><small>{branch.title}</small><h2>{focusedTopic ?? branch.topics.slice(0, 3).join(' · ')}</h2></div>
          {record.rating && <b className={'practice-status status-' + record.rating}>{record.rating === 'ready' ? 'Consegui' : record.rating === 'partial' ? 'Parcial' : 'Rever'}</b>}</div>
        <p className="practice-prompt">{questionFor(course, index, focusedTopic)}</p>
        <label className="practice-answer-label">Sua resposta<textarea value={record.answer} onChange={(event) => updateRecord(branch.id, { answer: event.target.value, revealed: false, rating: undefined }, focusedTopic)} placeholder="Escreva uma explicação curta ou os passos da sua solução." rows={4} /></label>
        {!record.revealed ? <button className="button-secondary" onClick={() => updateRecord(branch.id, { revealed: true }, focusedTopic)}>{focusedTopic ? 'Revelar roteiro deste conceito' : 'Ver resposta comentada'} <span>↓</span></button>
          : <div className="practice-rubric"><strong>{conceptGuide ? `Roteiro de ${focusedTopic}` : answerGuideFor(course, index).heading + ' · resposta orientadora'}</strong>
            {conceptGuide ? <><p className="answer-reference">{conceptGuide.explanation}</p><p><strong>Exemplo aplicado:</strong> {conceptGuide.example}</p><p><strong>Gancho de memória:</strong> {conceptGuide.memoryCue}</p><p><strong>Critério de domínio da disciplina:</strong> {course.mastery}</p></>
              : <><p className="answer-reference">{answerGuideFor(course, index).answer}</p><strong>Pontos que devem aparecer</strong><ul>{answerGuideFor(course, index).checks.map((check) => <li key={check}>{check}</li>)}</ul></>}
            <p>Questões abertas podem ter respostas corretas diferentes. Use este gabarito comentado para comparar os conceitos, a aplicação e os critérios de domínio da disciplina.</p>
            <div className="practice-rating"><span>Como foi?</span>
              <button className={record.rating === 'review' ? 'chosen' : ''} onClick={() => updateRecord(branch.id, { rating: 'review' }, focusedTopic)}>Preciso rever</button>
              <button className={record.rating === 'partial' ? 'chosen' : ''} onClick={() => updateRecord(branch.id, { rating: 'partial' }, focusedTopic)}>Lembrei em parte</button>
              <button className={record.rating === 'ready' ? 'chosen' : ''} onClick={() => updateRecord(branch.id, { rating: 'ready' }, focusedTopic)}>Expliquei e apliquei</button>
            </div>
          </div>}
      </article>;
    })}</div>
    <p className="practice-privacy-note">Respostas e avaliações ficam salvas neste navegador e podem ser incluídas no backup do painel “Meu progresso”.</p>
    </>}
  </section>;
}


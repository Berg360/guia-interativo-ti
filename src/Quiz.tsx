import { useEffect, useState } from 'react';
import type { Course } from './data/curriculum';
import { modelAnswers } from './data/answers';

const QUIZ_KEY = 'trilha-ti-quiz-v1';
type Option = { text: string; branchIndex: number };
type Question = { branchIndex: number; prompt: string; options: Option[] };
type Attempt = { attempts: number; best: number; last: number; lastAt: string; missedBranches?: number[]; correctBranches?: number[] };
type History = Record<string, Attempt>;
type QuizProps = { course: Course };

function buildQuestions(course: Course): Question[] {
  const answers = modelAnswers[course.id] ?? [];
  return course.branches.map((branch, branchIndex) => {
    const options = course.branches.map((_, index) => ({ text: answers[index] ?? 'Revise este ramo e compare sua resposta com o roteiro de domínio.', branchIndex: index }));
    for (let index = options.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
    }
    return {
      branchIndex,
      prompt: `Qual resposta explica melhor “${branch.topics.join(', ')}” em ${course.title}?`,
      options,
    };
  });
}

function readHistory(): History {
  try { return JSON.parse(localStorage.getItem(QUIZ_KEY) ?? '{}') as History; } catch { return {}; }
}

function letter(index: number) {
  return String.fromCharCode(65 + index);
}

export function Quiz({ course }: QuizProps) {
  const [questions, setQuestions] = useState(() => buildQuestions(course));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState<History>(readHistory);

  useEffect(() => {
    setQuestions(buildQuestions(course));
    setQuestionIndex(0);
    setSelected(null);
    setResponses({});
    setSubmitted(false);
    setFinished(false);
  }, [course.id]);

  const question = questions[questionIndex];
  const attempt = history[course.id];
  const correctCount = questions.reduce((sum, item) => {
    const chosenBranch = item.options[responses[item.branchIndex]]?.branchIndex;
    return sum + Number(chosenBranch === item.branchIndex);
  }, 0);

  function confirmAnswer() {
    if (selected === null || !question || submitted) return;
    setResponses((current) => ({ ...current, [question.branchIndex]: selected }));
    setSubmitted(true);
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setSelected(null);
      setSubmitted(false);
      return;
    }
    const score = correctCount;
    const nextHistory = {
      ...history,
      [course.id]: {
        attempts: (attempt?.attempts ?? 0) + 1,
        best: Math.max(attempt?.best ?? 0, score),
        last: score,
        lastAt: new Date().toISOString(),
        missedBranches: questions.filter((item) => item.options[responses[item.branchIndex]]?.branchIndex !== item.branchIndex).map((item) => item.branchIndex),
        correctBranches: questions.filter((item) => item.options[responses[item.branchIndex]]?.branchIndex === item.branchIndex).map((item) => item.branchIndex),
      },
    };
    setHistory(nextHistory);
    try { localStorage.setItem(QUIZ_KEY, JSON.stringify(nextHistory)); } catch { /* O quiz continua disponível nesta sessão. */ }
    setFinished(true);
  }

  function restart() {
    setQuestions(buildQuestions(course));
    setQuestionIndex(0);
    setSelected(null);
    setResponses({});
    setSubmitted(false);
    setFinished(false);
  }

  if (finished) return <section className="quiz-card" aria-live="polite">
    <div className="quiz-result"><span className="quiz-result-icon">{correctCount >= Math.ceil(questions.length * .75) ? '✓' : '↻'}</span><p className="eyebrow">RESULTADO DA SESSÃO</p><h3>{correctCount} de {questions.length} corretas</h3><p>{correctCount === questions.length ? 'Ótimo domínio nesta rodada. Faça uma revisão espaçada para manter o conteúdo acessível.' : 'Revise as questões abaixo, abra o mapa nos ramos com erro e tente novamente mais tarde.'}</p><button className="button-primary" onClick={restart}>Refazer com alternativas em nova ordem <span>↻</span></button></div>
    <div className="quiz-result-review">{questions.map((item) => {
      const chosen = item.options[responses[item.branchIndex]];
      const correct = item.options.find((option) => option.branchIndex === item.branchIndex);
      const right = chosen?.branchIndex === item.branchIndex;
      return <article className={right ? 'quiz-review-item correct' : 'quiz-review-item incorrect'} key={item.branchIndex}><strong>{right ? '✓ Acertou' : '↻ Revise'} · {course.branches[item.branchIndex].title}</strong><p>{item.prompt}</p>{!right && chosen && <small>Sua escolha correspondia a: {course.branches[chosen.branchIndex].title}.</small>}<div><b>Resposta de referência:</b> {correct?.text}</div></article>;
    })}</div>
  </section>;

  if (!question) return <div className="quiz-card">Não há perguntas cadastradas para esta disciplina.</div>;
  const correctOptionIndex = question.options.findIndex((option) => option.branchIndex === question.branchIndex);
  const isCorrect = selected === correctOptionIndex;

  return <section className="quiz-card" aria-labelledby="quiz-title">
    <div className="quiz-heading"><div><p className="eyebrow">QUIZ COM AUTOCORREÇÃO</p><h3 id="quiz-title">Teste sua lembrança antes de revisar</h3><p>Quatro questões por disciplina. As alternativas são embaralhadas a cada tentativa.</p></div>{attempt && <div className="quiz-best-score"><strong>{attempt.best}/{course.branches.length}</strong><span>melhor resultado · {attempt.attempts} tentativa(s)</span></div>}</div>
    <div className="quiz-progress-row"><span>Questão {questionIndex + 1} de {questions.length}</span><i><b style={{ width: `${(questionIndex + 1) / questions.length * 100}%` }} /></i></div>
    <article className="quiz-question"><small>{course.branches[question.branchIndex].title} · {course.branches[question.branchIndex].topics.join(' · ')}</small><h4>{question.prompt}</h4>
      <fieldset className="quiz-options">
        <legend className="sr-only">Escolha uma resposta</legend>
        {question.options.map((option, index) => {
          const chosen = selected === index;
          const correct = option.branchIndex === question.branchIndex;
          const stateClass = submitted && correct ? ' option-correct' : submitted && chosen ? ' option-incorrect' : chosen ? ' option-selected' : '';
          return <label key={option.branchIndex} className={'quiz-option' + stateClass}>
            <input type="radio" name={`quiz-${course.id}-${questionIndex}`} checked={chosen} disabled={submitted} onChange={() => setSelected(index)} />
            <span className="quiz-option-letter">{letter(index)}</span><span>{option.text}</span>{submitted && correct && <b aria-label="Resposta correta">✓</b>}
          </label>;
        })}
      </fieldset>
    </article>
    {submitted && <div className={'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect')} role="status"><strong>{isCorrect ? 'Resposta correta.' : 'Ainda não. Compare com a resposta de referência:'}</strong><p>{question.options[correctOptionIndex]?.text}</p>{!isCorrect && selected !== null && <small>A alternativa marcada descreve outro ramo da disciplina. Repare no assunto destacado no enunciado.</small>}</div>}
    <div className="quiz-actions">{!submitted ? <button className="button-primary" disabled={selected === null} onClick={confirmAnswer}>Conferir resposta <span>→</span></button> : <button className="button-primary" onClick={nextQuestion}>{questionIndex === questions.length - 1 ? 'Ver resultado' : 'Próxima questão'} <span>→</span></button>}</div>
    <p className="quiz-note">O quiz é corrigido localmente e funciona sem internet. As questões verificam conceitos do mapa; use o roteiro de domínio e as práticas para aprofundar os pontos que exigem reforço.</p>
  </section>;
}

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const courseRoot = new URL('../public/python-course/', import.meta.url);
const courseJs = readFileSync(new URL('course.js', courseRoot), 'utf8');
const courseHtml = readFileSync(new URL('index.html', courseRoot), 'utf8');
const courseCss = readFileSync(new URL('course.css', courseRoot), 'utf8');
const serviceWorker = readFileSync(new URL('../sw.js', courseRoot), 'utf8');

function extractFunction(name) {
  const matcher = new RegExp(`function ${name}\\([^)]*\\) \\{[\\s\\S]*?^    \\}`, 'm');
  const match = courseJs.match(matcher);
  assert.ok(match, `A função ${name} precisa existir.`);
  return match[0];
}

test('os doze níveis do curso apresentam objetivo, pré-requisitos e três conceitos', () => {
  const start = courseJs.indexOf('const courseLevels = [');
  const end = courseJs.indexOf('// 2. MENTAL SIMULATOR', start);
  assert.ok(start >= 0 && end > start);
  const levels = courseJs.slice(start, end);
  assert.equal((levels.match(/^ {8}id: [0-9]+,/gm) || []).length, 12);
  assert.equal((levels.match(/^ {8}objective:/gm) || []).length, 12);
  assert.equal((levels.match(/^ {8}prerequisites:/gm) || []).length, 12);
  assert.equal((levels.match(/^ {12}name:/gm) || []).length, 36);
});

test('os 30 flashcards novos não aparecem como revisões atrasadas', () => {
  const createDeck = vm.runInNewContext(`(${extractFunction('createInitialSrsDeck')})`, { TODAY_ISO: '2026-11-08' });
  const cards = createDeck();
  assert.equal(cards.length, 30);
  assert.equal(new Set(cards.map(card => card.id)).size, 30);
  assert.ok(cards.every(card => card.nextReviewAt === null && card.reviewCount === 0 && card.status === 'new'));
  assert.ok(courseHtml.includes('Cartão 1 de 30'));
  const isDue = vm.runInNewContext(`(${extractFunction('isCardDueToday')})`, { TODAY_ISO: '2026-11-08' });
  assert.equal(isDue(cards[0]), false);
  assert.equal(isDue({ reviewCount: 1, nextReviewAt: '2026-11-08' }), true);
  assert.equal(isDue({ reviewCount: 1, nextReviewAt: '2026-11-09' }), false);
});

test('os intervalos iniciais da revisão correspondem aos rótulos da interface', () => {
  const addDaysToIso = (date, days) => {
    const result = new Date(`${date}T12:00:00Z`);
    result.setUTCDate(result.getUTCDate() + days);
    return result.toISOString().slice(0, 10);
  };
  const schedule = vm.runInNewContext(`(${extractFunction('computeNextSrsSchedule')})`, {
    TODAY_ISO: '2026-11-08',
    addDaysToIso,
  });
  const freshCard = { intervalDays: 0, masteryIndex: 0, easeFactor: 2.5 };
  assert.equal(schedule(freshCard, 'again').nextDate, '2026-11-08');
  assert.equal(schedule(freshCard, 'hard').nextInterval, 1);
  assert.equal(schedule(freshCard, 'good').nextInterval, 3);
  assert.equal(schedule(freshCard, 'easy').nextInterval, 21);
  assert.match(courseHtml, /rever novamente hoje/i);
  assert.ok(courseHtml.includes('Próximo intervalo inicial: +3 dias'));
});

test('calendário, rascunhos, mapa e links diretos estão conectados', () => {
  assert.ok(courseHtml.includes('id="course-start-panel"'));
  assert.ok(courseHtml.includes('id="learning-roadmap"'));
  assert.ok(courseHtml.includes('id="study-calendar"'));
  assert.ok(courseHtml.includes('saveCurrentLabExerciseCode(true)'));
  assert.ok(courseJs.includes('Array.from({ length: 7 }'));
  assert.ok(courseJs.includes('saveProjectDraft(${proj.id}, true)'));
  assert.ok(courseJs.includes("window.addEventListener('popstate', restoreCourseRouteFromUrl)"));
  assert.ok(courseJs.includes("openStudyCalendarTask('${task.kind}'"));
  assert.ok(courseCss.includes('.roadmap-grid'));
  assert.ok(serviceWorker.includes('nexo-cursos-v6'));
});

test('a ajuda de backup explica sincronização na nuvem, uso offline e restauração', () => {
  assert.ok(courseHtml.includes('sincronizadas na nuvem'));
  assert.ok(courseHtml.includes('Sem conexão, continuam salvas aqui'));
  assert.ok(courseHtml.includes('exportar e restaurar uma cópia do progresso'));
});

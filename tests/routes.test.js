import assert from 'node:assert/strict';
import test from 'node:test';
import { parseAppRoute, serializeAppRoute } from '../src/data/routes.js';

const courses = [{ id: 'course-01', branches: [{ topics: ['Decomposição'] }, { topics: ['Tipos'] }] }];
const programs = [{ id: 'gestao-ti', units: [{ id: 'course-01' }] }, { id: 'python-profissional', units: [{ id: 'level-1', level: 1 }] }];

test('restaura um link direto para um conceito válido do mapa', () => {
  assert.deepEqual(parseAppRoute('?view=map&course=course-01&branch=1&topic=Tipos', courses, programs), {
    view: 'map', courseId: 'course-01', branchIndex: 1, topic: 'Tipos',
  });
});

test('descarta rotas e conceitos inválidos com retorno seguro ao catálogo', () => {
  assert.deepEqual(parseAppRoute('?view=invalid&course=not-a-course', courses, programs), { view: 'courses' });
  assert.deepEqual(parseAppRoute('?view=map&course=course-01&branch=9&topic=Nope', courses, programs), {
    view: 'map', courseId: 'course-01',
  });
});

test('gera URL para uma unidade e preserva o fragmento atual da página', () => {
  assert.equal(serializeAppRoute({ view: 'unit', programId: 'gestao-ti', unitId: 'course-01' }, 'https://nexo.test/#top'), '/?view=unit&program=gestao-ti&unit=course-01#top');
});

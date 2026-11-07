import assert from 'node:assert/strict';
import test from 'node:test';
import { applyStorageTransaction, parseStoredObject, validateBackupEntries } from '../src/data/storage.js';

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

test('valida estrutura e recusa chaves de backup fora do curso selecionado', () => {
  assert.deepEqual(validateBackupEntries({ 'nexo-plan': '{"goalMinutes":25}' }, ['nexo-plan']), { 'nexo-plan': '{"goalMinutes":25}' });
  assert.throws(() => validateBackupEntries({ 'nexo-plan': 'quebrado' }, ['nexo-plan']), /JSON inválido/);
  assert.throws(() => validateBackupEntries({ 'nexo-plan': '{}', segredo: 'x' }, ['nexo-plan']), /não pertencem/);
});

test('restaura todas as chaves se uma gravação for bloqueada', () => {
  const storage = memoryStorage({ a: 'antigo-a', b: 'antigo-b' });
  const originalSet = storage.setItem;
  let failOnce = true;
  storage.setItem = (key, value) => {
    if (key === 'b' && value === 'novo-b' && failOnce) { failOnce = false; throw new Error('quota'); }
    originalSet(key, value);
  };
  assert.throws(() => applyStorageTransaction(storage, { a: 'novo-a', b: 'novo-b' }), /progresso anterior foi restaurado/);
  assert.equal(storage.getItem('a'), 'antigo-a');
  assert.equal(storage.getItem('b'), 'antigo-b');
});

test('parse de progresso danificado volta a um estado inicial seguro', () => {
  assert.deepEqual(parseStoredObject('{', { count: 0 }), { count: 0 });
  assert.deepEqual(parseStoredObject('[1]', { count: 0 }), { count: 0 });
});

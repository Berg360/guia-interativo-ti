import { courses, type Course } from './curriculum';

export type StudyUnit = {
  id: string;
  title: string;
  details: string;
  course?: Course;
  level?: number;
};

export type StudyProgram = {
  id: string;
  title: string;
  kind: 'curriculum' | 'python' | 'generic';
  description: string;
  units: StudyUnit[];
  storageKeys: string[];
};

export const PYTHON_STATE_KEY = 'pyneuro_evolution_state_v2';
export const PYTHON_BACKUP_KEY = 'pyneuro_evolution_backup_last_good';
export const PROGRAM_CALENDAR_PREFIX = 'nexo-study-calendar-v1:';
export const PROGRAM_PROGRESS_PREFIX = 'nexo-program-progress-v1:';

export function programCalendarKey(programId: string) {
  return PROGRAM_CALENDAR_PREFIX + programId;
}

export function programProgressKey(programId: string) {
  return PROGRAM_PROGRESS_PREFIX + programId;
}

const pythonUnits: StudyUnit[] = [
  { id: 'level-1', level: 1, title: 'Fundamentos, lógica e modelo de objetos', details: 'Variáveis, tipos, entrada e saída, operadores e strings.' },
  { id: 'level-2', level: 2, title: 'Controle de fluxo, loops e validação', details: 'Condições, repetição, interrupções e validação de dados.' },
  { id: 'level-3', level: 3, title: 'Estruturas de dados e comprehensions', details: 'Listas, tuplas, dicionários, conjuntos e compreensão de coleções.' },
  { id: 'level-4', level: 4, title: 'Funções, escopo e modularização', details: 'Parâmetros, retorno, LEGB, tipagem e organização de módulos.' },
  { id: 'level-5', level: 5, title: 'POO, arquivos e exceções', details: 'Classes, persistência, context managers e tratamento de erros.' },
  { id: 'level-6', level: 6, title: 'Iteradores, generators, async e testes', details: 'Iteração, decorators, concorrência e testes automatizados.' },
  { id: 'level-7', level: 7, title: 'Engenharia de projetos e clean code', details: 'Ambientes virtuais, logging, dependências e qualidade de código.' },
  { id: 'level-8', level: 8, title: 'Bancos relacionais, SQL e persistência', details: 'Modelagem, consultas e segurança contra SQL injection.' },
  { id: 'level-9', level: 9, title: 'Arquitetura, SOLID e refatoração', details: 'Responsabilidades, injeção de dependência e evolução segura.' },
  { id: 'level-10', level: 10, title: 'APIs REST com FastAPI', details: 'Rotas, contratos, validação e documentação de APIs.' },
  { id: 'level-11', level: 11, title: 'Automação, arquivos e web scraping', details: 'Automação idempotente, planilhas e coleta ética de dados.' },
  { id: 'level-12', level: 12, title: 'Dados, LLMs, RAG e agentes', details: 'Embeddings, recuperação de contexto e aplicações com IA.' },
];

/**
 * Cadastro único de cursos. Ao adicionar um curso futuro aqui, o calendário
 * e o painel de exportação/restauração passam a incluí-lo automaticamente.
 * storageKeys lista as chaves legadas ou próprias que guardam o progresso do curso.
 */
export const studyPrograms: StudyProgram[] = [
  {
    id: 'gestao-ti',
    title: 'Gestão da Tecnologia da Informação',
    kind: 'curriculum',
    description: 'Agenda por disciplina, adaptada às revisões e atividades pendentes.',
    units: courses.map((course) => ({ id: course.id, title: course.title, details: course.practice, course })),
    storageKeys: [
      'trilha-ti-reviews-v1',
      'trilha-ti-practice-v1',
      'trilha-ti-route-v1',
      'trilha-ti-quiz-v1',
      'trilha-ti-plan-v1',
      'trilha-ti-recent-course-v1',
    ],
  },
  {
    id: 'python-profissional',
    title: 'Python Profissional · PyNeuro Evolution',
    kind: 'python',
    description: 'Agenda por nível, adaptada ao domínio e aos cartões de revisão vencidos.',
    units: pythonUnits,
    storageKeys: [PYTHON_STATE_KEY, PYTHON_BACKUP_KEY],
  },
];

export function getStudyProgram(programId: string) {
  return studyPrograms.find((program) => program.id === programId);
}

export function getProgramBackupKeys(program: StudyProgram) {
  return [...new Set([...program.storageKeys, programCalendarKey(program.id), programProgressKey(program.id)])];
}

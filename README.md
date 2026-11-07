# Nexo Cursos

Plataforma de aprendizagem ativa preparada para reunir cursos independentes. O catálogo oferece Gestão da Tecnologia da Informação e uma trilha independente de Python profissional.

## Executar no Windows

Abra esta pasta no VS Code e use o terminal integrado:

    npm.cmd ci
    npm.cmd run dev

Abra o endereço local informado pelo Vite. Para preparar a versão instalada e o modo offline, use a prévia de produção (ela usa a porta 5173, igual ao endereço padrão do aplicativo):

    npm.cmd run verify
    npm.cmd run preview

Depois de abrir uma vez a versão de produção, navegadores compatíveis permitem instalá-la pelo menu do navegador. A instalação inicial dos pacotes requer conexão.

Antes de iniciar a prévia, encerre no terminal qualquer servidor antigo que já esteja usando a porta 5173 (`Ctrl+C`). A prévia conectada atualiza o cache da versão instalada e baixa os arquivos essenciais. Abra o laboratório Python uma vez enquanto estiver conectado para armazenar também o motor WebAssembly e a biblioteca padrão; depois disso, o laboratório pode ser usado offline neste navegador.

## Recursos do curso

- Catálogo de cursos com identidade própria e entrada para Gestão da Tecnologia da Informação.
- Curso PyNeuro Evolution integrado como uma segunda opção do catálogo, preservando os 12 níveis e as áreas de aprendizagem do material recebido.
- Laboratório Python com CPython WebAssembly empacotado localmente e interpretador de contingência para um subconjunto da linguagem.
- Progresso, avaliações, exercícios, projetos e cartões de revisão de Python salvos em chaves próprias e isolados do progresso de Gestão de TI.
- Navegação direta por disciplinas e componentes, com mapas mentais clicáveis.
- Conteúdos, pré-requisitos sugeridos, práticas, ferramentas e critérios de domínio.
- Conteúdo individual por conceito e acesso à prática guiada com confirmação de estudo para manter disciplina, ramo e conceito em foco.
- As fichas de conceito identificam se são específicas da disciplina, conceituais ou contextualizadas por modelo, para deixar a origem do apoio visível.
- Prática guiada, quiz com autocorreção e revisão espaçada.
- Calendário adaptativo separado por curso: a trilha de Gestão de TI considera tópicos novos e revisões; Python considera cartões vencidos e evidências de domínio.
- Preferências, sessões concluídas e histórico do calendário ficam separados por curso e salvos localmente.
- Backup individual por curso, incluindo o calendário; também aceita backups antigos de Gestão de TI e o JSON bruto de progresso exportado pelo curso Python.
- Rotas internas podem ser abertas, atualizadas ou retomadas pelo botão Voltar do navegador, inclusive em links para disciplinas, conceitos e unidades.
- Restaurações validam os dados antes de gravar e tentam recuperar o estado anterior se o navegador bloquear uma gravação intermediária.

As respostas, avaliações e preferências continuam disponíveis localmente. Ao entrar com uma conta Google, o aplicativo sincroniza o progresso com a nuvem para continuar em outro navegador ou dispositivo. O backup exportado continua sendo uma cópia separada que o aluno pode guardar.

## Ativar login Google e sincronização na nuvem

O código usa Firebase Authentication para login e Cloud Firestore para progresso individual. A conta é identificada pelo UID do Firebase; as regras em `firestore.rules` impedem que um aluno leia ou altere o progresso de outro. O login Google não acessa o Google Drive do aluno: os dados usam o armazenamento e a cota do projeto Firebase/Google Cloud da plataforma.

### Configuração atual

- Projeto Firebase: `nexo-cursos`; aplicativo Web: `Nexo Cursos Web`.
- Google Authentication está ativo. `localhost` e `guia-interativo-ti.vercel.app` estão autorizados para o login.
- O Firestore `default` foi criado no modo nativo Enterprise, na região `southamerica-east1` (São Paulo), com início em modo de produção.
- As regras de [`firestore.rules`](firestore.rules) foram publicadas no Firebase. Elas limitam o acesso ao UID autenticado, validam os campos e blocos gravados e negam os demais caminhos.
- As cinco variáveis `VITE_FIREBASE_*` foram configuradas no projeto Vercel para produção, preview e desenvolvimento. Um novo deployment é necessário para que o site publicado passe a usá-las.
- O projeto permanece no plano Spark. O Firestore oferece uma franquia gratuita; ultrapassá-la exige ativar faturamento para usar cotas pagas. Backups programados do Firestore não foram ativados, pois o Console exige o plano Blaze.

### Preparar outra cópia local

1. Copie `.env.example` para `.env.local` e preencha os cinco valores de configuração do aplicativo Web Firebase.
2. No PowerShell do Windows, inicie o site com `npm.cmd run dev` e abra o endereço local informado pelo Vite usando `localhost` (não `127.0.0.1`). `localhost` já está autorizado no Firebase.
3. Nunca coloque chaves de conta de serviço, credenciais administrativas ou senhas no arquivo `.env.local`, no navegador ou no repositório. A configuração Web Firebase é carregada no cliente; a proteção dos dados depende das regras de segurança.

Para publicar futuras alterações de regras a partir do projeto local, o alias `.firebaserc` aponta para `nexo-cursos`. Depois de autenticar o Firebase CLI, use `npx.cmd -y firebase-tools@latest deploy --only firestore:rules --project nexo-cursos`. Não habilite regras abertas em produção.

As telas indicam quando o usuário está conectado, sincronizando, sem internet ou com falha. Na primeira conta sem dados na nuvem, se houver progresso neste navegador, o aplicativo pede autorização antes de transferi-lo. O progresso sem login continua apenas neste navegador; a sincronização entre dispositivos começa depois do login e da configuração do Firebase.

## Estrutura do projeto

- src/data/curriculum.ts: disciplinas, tópicos e material de estudo.
- src/data/answers.ts: respostas conceituais usadas no roteiro e nas atividades.
- src/App.tsx: catálogo da plataforma, navegação, painel e mapas.
- src/Practice.tsx e src/Quiz.tsx: prática e autocorreção.
- src/Study.tsx e src/Progress.tsx: revisão espaçada e progresso por disciplina.
- src/Planner.tsx: calendário adaptativo; seus dados usam chaves locais separadas para cada curso.
- src/BackupPanel.tsx: exportação e restauração isoladas por curso.
- src/data/studyPrograms.ts: cadastro central dos cursos e unidades usados pelo calendário e pelos backups.
- src/data/routes.js e src/data/storage.js: rotas compartilháveis e acesso local resiliente, com operações de backup transacionais.
- tests/: testes automatizados das rotas, validação de backups e recuperação após falhas de armazenamento.
- src/styles.css: interface responsiva e identidade visual.
- public/manifest.webmanifest e public/marca.svg: instalação e identidade da plataforma.
- public/sw.js: cache da versão instalada para uso offline.
- public/python-course/index.html, course.css e course.js: estrutura, estilos e comportamento do curso Python separados para facilitar manutenção.
- scripts/prepare-python-course.mjs: gera o CSS e copia as bibliotecas locais do curso.

`npm.cmd run verify` executa os testes automatizados e depois gera a versão de produção. As dependências diretas estão fixadas no manifesto e no arquivo de lock para que instalações reproduzam as versões verificadas.

Ao executar `npm.cmd ci`, o passo de preparação gera o CSS local e copia apenas os arquivos de runtime necessários do Chart.js e do Pyodide. O laboratório pode demorar alguns segundos na primeira inicialização do motor WebAssembly. Caso o motor completo não esteja disponível, o código inclui um interpretador local de contingência com suporte limitado a construções comuns de Python.

### Adicionar um curso ao calendário e aos backups

Cadastre o programa em `src/data/studyPrograms.ts` com `id` exclusivo, `title`, `kind`, `description`, `catalog` (descrição, métrica e marca), `units` e `storageKeys`. Para um curso novo, use `kind: 'generic'` e descreva o conteúdo de cada unidade. A partir desse cadastro, o curso aparece no catálogo, abre uma página de unidades, entra no calendário adaptativo e ganha backup e progresso isolados pelo `id`.

Esse registro genérico fornece a estrutura comum. Para mapas mentais, quiz e prática com conteúdo próprio, os conceitos também precisam ser escritos no formato de disciplina em `src/data/curriculum.ts`, com materiais em `src/data/concepts.ts` e respostas em `src/data/answers.ts`. Python mantém seu adaptador dedicado porque o laboratório e o motor de execução são específicos desse curso.

O indicador de ramo validado é didático e local; não representa nota acadêmica ou certificação.

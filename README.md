# Nexo Cursos

Plataforma de aprendizagem ativa preparada para reunir cursos independentes. O catálogo oferece Gestão da Tecnologia da Informação e uma trilha independente de Python profissional.

## Executar no Windows

Abra esta pasta no VS Code e use o terminal integrado:

    npm.cmd install
    npm.cmd run dev

Abra o endereço local informado pelo Vite. Para preparar a versão instalada e o modo offline, use a prévia de produção (ela usa a porta 5173, igual ao endereço padrão do aplicativo):

    npm.cmd run build
    npm.cmd run preview

Depois de abrir uma vez a versão de produção, navegadores compatíveis permitem instalá-la pelo menu do navegador. A instalação inicial dos pacotes requer conexão.

Antes de iniciar a prévia, encerre no terminal qualquer servidor antigo que já esteja usando a porta 5173 (`Ctrl+C`). A prévia conectada atualiza o cache da versão instalada e baixa os arquivos essenciais; depois, abra o aplicativo mais uma vez antes de usá-lo offline.

## Recursos do curso

- Catálogo de cursos com identidade própria e entrada para Gestão da Tecnologia da Informação.
- Curso PyNeuro Evolution integrado como uma segunda opção do catálogo, preservando os 12 níveis e as áreas de aprendizagem do material recebido.
- Laboratório Python com CPython WebAssembly empacotado localmente e interpretador de contingência para um subconjunto da linguagem.
- Progresso, avaliações, exercícios, projetos e cartões de revisão de Python salvos em chaves próprias e isolados do progresso de Gestão de TI.
- Navegação direta por disciplinas e componentes, com mapas mentais clicáveis.
- Conteúdos, pré-requisitos sugeridos, práticas, ferramentas e critérios de domínio.
- Conteúdo individual por conceito e acesso à prática guiada com confirmação de estudo para manter disciplina, ramo e conceito em foco.
- Prática guiada, quiz com autocorreção e revisão espaçada.
- Calendário adaptativo separado por curso: a trilha de Gestão de TI considera tópicos novos e revisões; Python considera cartões vencidos e evidências de domínio.
- Preferências, sessões concluídas e histórico do calendário ficam separados por curso e salvos localmente.
- Backup individual por curso, incluindo o calendário; também aceita backups antigos de Gestão de TI e o JSON bruto de progresso exportado pelo curso Python.

As respostas, avaliações e preferências ficam neste navegador. Nenhuma conta é necessária; exporte um backup para manter uma cópia separada.

## Estrutura do projeto

- src/data/curriculum.ts: disciplinas, tópicos e material de estudo.
- src/data/answers.ts: respostas conceituais usadas no roteiro e nas atividades.
- src/App.tsx: catálogo da plataforma, navegação, painel e mapas.
- src/Practice.tsx e src/Quiz.tsx: prática e autocorreção.
- src/Study.tsx e src/Progress.tsx: revisão espaçada e progresso por disciplina.
- src/Planner.tsx: calendário adaptativo; seus dados usam chaves locais separadas para cada curso.
- src/BackupPanel.tsx: exportação e restauração isoladas por curso.
- src/data/studyPrograms.ts: cadastro central dos cursos e unidades usados pelo calendário e pelos backups.
- src/styles.css: interface responsiva e identidade visual.
- public/manifest.webmanifest e public/marca.svg: instalação e identidade da plataforma.
- public/sw.js: cache da versão instalada para uso offline.
- public/python-course/index.html: curso independente de Python integrado no catálogo.
- scripts/prepare-python-course.mjs: gera o CSS e copia as bibliotecas locais do curso.

Ao executar `npm.cmd install`, o passo `postinstall` prepara os arquivos locais de Tailwind, Chart.js e Pyodide para o curso Python. A compilação também funciona com os recursos offline já incluídos, mesmo antes de instalar esses pacotes opcionais. O laboratório pode demorar alguns segundos na primeira inicialização do motor WebAssembly. Caso o motor completo não esteja disponível, o código inclui um interpretador local de contingência com suporte limitado a construções comuns de Python.

### Adicionar um curso ao calendário e aos backups

Cadastre o programa e suas unidades em `src/data/studyPrograms.ts`. Assim que estiver nessa lista, ele aparece automaticamente no seletor do calendário e no seletor de exportação/restauração, com agenda e progresso isolados por `id`. Para um curso novo, use `kind: 'generic'`, descreva cada unidade e indique suas chaves locais em `storageKeys`; a plataforma aplica a priorização padrão com base no histórico de sessões. Cursos com lógica própria, como Python, podem fornecer um adaptador de progresso para usar seus dados de domínio e revisão na priorização.

O indicador de ramo validado é didático e local; não representa nota acadêmica ou certificação.

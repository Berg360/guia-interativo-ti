# Trilha TI — guia interativo

Primeira etapa do guia de estudos do curso Superior de Tecnologia em Gestão da Tecnologia da Informação da FASUL.

Inclui painel para cinco semestres, catálogo, mapas clicáveis por disciplina, optativas, projetos e componentes, conteúdo recomendado, atividades, critérios de domínio, ferramentas e referências. Nomes, módulos, semestres e cargas vêm do cronograma; expansão didática é recomendação externa.

## Executar no VS Code

Requer Node.js e npm instalados (Vite atual requer Node.js 20.19+ ou 22.12+). Abra esta pasta no VS Code e execute no terminal integrado:

    npm install
    npm run dev

Abra o endereço localhost informado pelo Vite.

## Conferir o modo offline

O service worker é ativado em compilação de produção:

    npm run build
    npm run preview

Abra o endereço local do preview, carregue o conteúdo uma vez e então teste sem conexão. Em navegadores compatíveis, instale pelo menu do navegador. O conteúdo do curso vem no pacote; a instalação inicial das dependências npm requer conexão.

## Estrutura

- src/data/curriculum.ts — disciplinas e tópicos
- src/data/references.ts — fontes externas
- src/App.tsx — painel, catálogo e mapas
- src/styles.css — interface responsiva
- public/sw.js — cache offline


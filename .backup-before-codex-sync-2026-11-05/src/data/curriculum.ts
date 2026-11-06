export type CourseKind = 'discipline' | 'elective' | 'project' | 'extension' | 'component';
export interface Course {
  id: string; semester: string; module: string; title: string; hours: string;
  prerequisites: string; branches: { id: string; title: string; topics: string[] }[];
  practice: string; mastery: string; tools: string; kind: CourseKind;
}
export const courses: Course[] = [
  {
    "id": "course-01",
    "semester": "1",
    "module": "1A",
    "title": "Algoritmos e Programação",
    "hours": "80 h",
    "prerequisites": "Raciocínio logico; nenhum requisito formal",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Decomposição",
          "entradas/saidas"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Tipos",
          "variáveis",
          "operadores"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Selecao",
          "repetição",
          "coleções"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Funcoes",
          "testes",
          "depuração"
        ]
      }
    ],
    "practice": "Resolva em pseudocódigo e Python; teste vazio, limite e duplicata.",
    "mastery": "Explica fluxo, escolhe estrutura, passa casos extremos, depura com evidência.",
    "tools": "Python, terminal, pytest",
    "kind": "discipline"
  },
  {
    "id": "course-02",
    "semester": "1",
    "module": "1A",
    "title": "Negócios Eletrônicos",
    "hours": "60 h",
    "prerequisites": "Internet e processos organizacionais",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "B2C",
          "B2B",
          "marketplace",
          "assinatura"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Proposta de valor e jornada"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Catalogo",
          "pedidos",
          "pagamentos"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Conversao",
          "retenção",
          "fraude",
          "confiança"
        ]
      }
    ],
    "practice": "Mapeie compra de loja virtual; encontre abandono e defina métricas e experimento.",
    "mastery": "Liga modelo ao valor; mapeia operação ponta a ponta; define indicador com formula.",
    "tools": "Planilha, diagrama, analytics",
    "kind": "discipline"
  },
  {
    "id": "course-03",
    "semester": "1",
    "module": "1A",
    "title": "Computação em Nuvem",
    "hours": "80 h",
    "prerequisites": "Redes, sistemas operacionais, fundamentos TI",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "IaaS",
          "PaaS",
          "SaaS; público/privado"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Regioes",
          "redes",
          "computação",
          "storage"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Identidade",
          "escala",
          "disponibilidade"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Custos",
          "backup",
          "observabilidade"
        ]
      }
    ],
    "practice": "Desenhe app de 3 camadas; estime custo; compare VM e serviço gerenciado.",
    "mastery": "Escolhe por requisito; explica responsabilidade compartilhada, falha, custo e segurança.",
    "tools": "AWS/Azure Learn, draw.io",
    "kind": "discipline"
  },
  {
    "id": "course-04",
    "semester": "1",
    "module": "1B",
    "title": "Gestão da Tecnologia da Informação",
    "hours": "60 h",
    "prerequisites": "Processos de negócio e serviços TI",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Alinhamento",
          "valor",
          "risco"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Catalogo",
          "SLA",
          "incidentes"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Ativos",
          "papeis",
          "capacidades"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Indicadores e melhoria"
        ]
      }
    ],
    "practice": "Mapeie help desk, cliente, fluxo, SLA, indicador e causa recorrente.",
    "mastery": "Traduz necessidade em serviço, responsabilidade, nivel e indicador acionavel.",
    "tools": "BPMN, RACI, ITSM",
    "kind": "discipline"
  },
  {
    "id": "course-05",
    "semester": "1",
    "module": "1B",
    "title": "Gestão de Projetos em TI",
    "hours": "60 h",
    "prerequisites": "Comunicação e organização",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Objetivo",
          "justificativa",
          "stakeholders"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Escopo",
          "entregas",
          "cronograma"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Custos",
          "riscos",
          "qualidade",
          "equipe"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Mudancas",
          "aceite",
          "licoes"
        ]
      }
    ],
    "practice": "Crie termo, EAP, cronograma, matriz de risco e critérios de aceite.",
    "mastery": "Entregas verificaveis; dependencias coerentes; riscos com dono/resposta; avalia mudanças.",
    "tools": "Trello, Gantt, RACI",
    "kind": "discipline"
  },
  {
    "id": "course-06",
    "semester": "1",
    "module": "1B",
    "title": "Estatística",
    "hours": "60 h",
    "prerequisites": "Aritmética, fracoes e porcentagem",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Media",
          "mediana",
          "dispersao"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Probabilidade",
          "eventos"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Amostra",
          "vies",
          "inferencia"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Graficos",
          "incerteza",
          "causalidade"
        ]
      }
    ],
    "practice": "Análise dados públicos, compare grupos, declare limites de conclusão.",
    "mastery": "Escolhe medida adequada, detecta vies, interpreta incerteza e nao confunde associacao/causa.",
    "tools": "Planilha, Python/pandas",
    "kind": "discipline"
  },
  {
    "id": "course-07",
    "semester": "2",
    "module": "2A",
    "title": "Técnicas de Programação",
    "hours": "80 h",
    "prerequisites": "Algoritmos e Programação",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Funcoes",
          "modulos",
          "contratos"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Procedural",
          "objetos",
          "funcional"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Coesao",
          "acoplamento",
          "refatoracao"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Teste unitario/integração",
          "depuração"
        ]
      }
    ],
    "practice": "Implemente agenda modular; teste e refatore duplicacao.",
    "mastery": "Decompoe responsabilidades; protege invariantes; testes reproduzem defeitos.",
    "tools": "Python, Git, pytest",
    "kind": "discipline"
  },
  {
    "id": "course-08",
    "semester": "2",
    "module": "2A",
    "title": "Sistemas Operacionais",
    "hours": "80 h",
    "prerequisites": "Arquitetura basica e uso do computador",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Processos",
          "threads",
          "escalonamento"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Memória virtual",
          "heap",
          "pilha"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Arquivos",
          "permissões",
          "sistemas"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Shell",
          "serviços",
          "chamadas",
          "logs"
        ]
      }
    ],
    "practice": "Em Linux isolado, investigue processo, permissões e log de serviço.",
    "mastery": "Distingue processo/thread; explica memória e permissões; coleta evidência antes de agir.",
    "tools": "Linux VM, shell, ps/top, journalctl",
    "kind": "discipline"
  },
  {
    "id": "course-09",
    "semester": "2",
    "module": "2A",
    "title": "Empreendedorismo",
    "hours": "40 h",
    "prerequisites": "Observacao de problemas e comunicação",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Problema",
          "usuário",
          "oportunidade"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Entrevista",
          "hipótese",
          "prototipo"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Modelo",
          "receita",
          "custos",
          "canal"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "MVP",
          "caixa",
          "impacto"
        ]
      }
    ],
    "practice": "Crie Lean Canvas e roteiro de entrevistas sem induzir respostas; revise hipótese.",
    "mastery": "Separa fato e hipótese; valida demanda; identifica custo, risco, impacto.",
    "tools": "Lean Canvas, planilha",
    "kind": "discipline"
  },
  {
    "id": "course-10",
    "semester": "2",
    "module": "2B",
    "title": "Arquitetura e Organização de Computadores",
    "hours": "80 h",
    "prerequisites": "Lógica booleana e algebra elementar",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Binario",
          "hexadecimal",
          "complemento"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "CPU",
          "registradores",
          "ALU",
          "controle"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Hierarquia",
          "RAM",
          "cache",
          "disco"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Pipeline",
          "latência",
          "throughput"
        ]
      }
    ],
    "practice": "Converta bases, simule ciclo de instrucao, compare cache hit/miss.",
    "mastery": "Converte sem erro; explica caminho da instrucao, gargalo e localidade.",
    "tools": "Simulador logico/CPUlator",
    "kind": "discipline"
  },
  {
    "id": "course-11",
    "semester": "2",
    "module": "2B",
    "title": "Redes de Computadores",
    "hours": "80 h",
    "prerequisites": "Sistemas operacionais e enderecamento",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Camadas TCP/IP",
          "encapsulamento"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "IP",
          "CIDR",
          "subnet",
          "gateway",
          "DNS"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "TCP",
          "UDP",
          "portas",
          "TLS"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Roteamento",
          "DHCP",
          "NAT",
          "diagnostico"
        ]
      }
    ],
    "practice": "Desenhe rede, calcule sub-rede e diagnostique DNS/rota em laboratorio.",
    "mastery": "Explica encapsulamento; calcula enderecos; localiza falha por camada com evidência.",
    "tools": "Packet Tracer, Wireshark",
    "kind": "discipline"
  },
  {
    "id": "course-12",
    "semester": "2",
    "module": "2B",
    "title": "Optativa: IA e Engenharia de Prompt para Negócios",
    "hours": "40 h",
    "prerequisites": "Alfabetizacao digital e objetivo de negócio",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Tarefa",
          "contexto",
          "formato",
          "exemplos"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Rubrica",
          "conjunto de teste",
          "erro"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Vies",
          "alucinacao",
          "privacidade",
          "IP"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Humano no loop",
          "registro",
          "automacao"
        ]
      }
    ],
    "practice": "Teste classificador em 20 casos ficticios; registre erros; nunca envie dado pessoal.",
    "mastery": "Avalia por rubrica; detecta falha; protege dados; valida saida independentemente.",
    "tools": "Modelo acessível, planilha",
    "kind": "elective"
  },
  {
    "id": "course-13",
    "semester": "2",
    "module": "2B",
    "title": "Optativa: Informatica e Ferramentas de Produtividade",
    "hours": "40 h",
    "prerequisites": "Uso basico de computador",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Pastas",
          "formatos",
          "versoes"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Documento",
          "estilos",
          "acessibilidade"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Planilha",
          "formulas",
          "validação"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Apresentação",
          "visualizacao",
          "nuvem"
        ]
      }
    ],
    "practice": "Produza relatório, planilha auditavel e apresentação rastreavel.",
    "mastery": "Arquivos acessiveis, organizados e reproduziveis; premissas claras.",
    "tools": "Office/LibreOffice, nuvem",
    "kind": "elective"
  },
  {
    "id": "course-14",
    "semester": "2",
    "module": "2B",
    "title": "Optativa: Libras",
    "hours": "40 h",
    "prerequisites": "Nenhum; respeitar comunidade e variação",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Cultura surda",
          "identidade"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Configuracao",
          "movimento",
          "orientacao"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Expressao facial",
          "espaco",
          "turnos"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Acesso e etiqueta comunicativa"
        ]
      }
    ],
    "practice": "Estude materiais de instituicoes e falantes surdos; pratique com feedback.",
    "mastery": "Comunicação basica respeitosa; reconhece variação; nao reduz Libras a gestos.",
    "tools": "Materiais oficiais em video",
    "kind": "elective"
  },
  {
    "id": "course-15",
    "semester": "2",
    "module": "2B",
    "title": "Optativa: Ingles",
    "hours": "40 h",
    "prerequisites": "Nivel inicial e prática frequente",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Leitura de documentacao tecnica"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Tempos",
          "modais",
          "conectores"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Escuta",
          "pergunta",
          "resumo"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Vocabulario de software e redes"
        ]
      }
    ],
    "practice": "Leia documentacao semanal; glossario contextual; explique projeto em 2 minutos.",
    "mastery": "Extrai instrucao, pergunta e resume; usa contexto sem traducao palavra a palavra.",
    "tools": "Docs técnicas, dicionario",
    "kind": "elective"
  },
  {
    "id": "course-16",
    "semester": "2",
    "module": "2B",
    "title": "Optativa: Espanhol",
    "hours": "40 h",
    "prerequisites": "Nivel inicial; observar falsos cognatos",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Leitura tecnica e contexto"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Pronomes",
          "tempos",
          "conectores"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Sotaques e ideia principal"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Resumo oral e vocabulario TI"
        ]
      }
    ],
    "practice": "Leia texto tecnico, identifique falsos cognatos e apresente resumo.",
    "mastery": "Compreende ideia/detalhes; evita falsos cognatos; comunica duvida e síntese.",
    "tools": "Texto aberto, audio",
    "kind": "elective"
  },
  {
    "id": "course-17",
    "semester": "3",
    "module": "3A",
    "title": "Estrutura de Dados",
    "hours": "60 h",
    "prerequisites": "Programação e recursao basica",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Lista",
          "pilha",
          "fila",
          "conjunto",
          "mapa"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Árvore",
          "heap",
          "hash"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Busca",
          "ordenacao",
          "percurso"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Complexidade tempo e memória"
        ]
      }
    ],
    "practice": "Implemente busca, pilha e fila; compare custo e escolha estrutura.",
    "mastery": "Escolhe por operações; explica invariantes/complexidade; testa extremos.",
    "tools": "Python, visualizador, pytest",
    "kind": "discipline"
  },
  {
    "id": "course-18",
    "semester": "3",
    "module": "3A",
    "title": "Engenharia de Software",
    "hours": "60 h",
    "prerequisites": "Programação e Git",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Requisitos",
          "casos",
          "critérios"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Arquitetura",
          "interface",
          "dados"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Iteração",
          "revisão",
          "CI"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Teste",
          "manutencao",
          "configuração"
        ]
      }
    ],
    "practice": "Crie requisito testavel, diagrama, backlog, pipeline e revisão de código.",
    "mastery": "Rastreia requisito a teste; comunica tradeoffs; integra mudança reproduzivel.",
    "tools": "Git, UML, CI",
    "kind": "discipline"
  },
  {
    "id": "course-19",
    "semester": "3",
    "module": "3A",
    "title": "Projeto Integrador I",
    "hours": "80 h presencial",
    "prerequisites": "Programação e gestão inicial",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Problema real e público"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Escopo",
          "objetivos",
          "riscos"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Prototipo e validação inicial"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Diario",
          "demo",
          "retrospectiva"
        ]
      }
    ],
    "practice": "Proponha e teste prototipo de baixa fidelidade para problema delimitado.",
    "mastery": "Problema baseado em evidência; escopo viavel; feedback documentado e aplicado.",
    "tools": "Git, tarefas, diagrama",
    "kind": "project"
  },
  {
    "id": "course-20",
    "semester": "3",
    "module": "3A",
    "title": "Atividades de Extensão I",
    "hours": "60 h presencial",
    "prerequisites": "Escuta comunitaria e ética",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Atores",
          "territorio",
          "consentimento"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Cocriação acessível"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Plano",
          "papeis",
          "recursos"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Participacao",
          "reflexão",
          "devolutiva"
        ]
      }
    ],
    "practice": "Planeje oficina de cidadania digital com parceiro; minimize coleta.",
    "mastery": "Acao cocriada; devolutiva e participação registradas; impacto descrito honestamente.",
    "tools": "Plano, formulario anonimo",
    "kind": "extension"
  },
  {
    "id": "course-21",
    "semester": "3",
    "module": "3B",
    "title": "Gestão de Contratos",
    "hours": "60 h",
    "prerequisites": "Aquisicao e comunicação",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Necessidade e requisito"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Escopo",
          "SLA",
          "preço",
          "prazo"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Aceite",
          "mudança",
          "evidência"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Risco fornecedor",
          "dados",
          "saida"
        ]
      }
    ],
    "practice": "Compare propostas SaaS com matriz, SLA, aceite e saida.",
    "mastery": "Critérios objetivos; aceite e escalonamento definidos; dependencia reconhecida.",
    "tools": "Matriz, RACI, checklist",
    "kind": "discipline"
  },
  {
    "id": "course-22",
    "semester": "3",
    "module": "3B",
    "title": "Gestão do Conhecimento e Inteligencia Competitiva",
    "hours": "40 h",
    "prerequisites": "Pesquisa e síntese",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Conhecimento tácito/explícito"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Busca",
          "validação",
          "atualizacao"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Fonte",
          "sinal",
          "análise",
          "decisão"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Licenca",
          "vies",
          "privacidade"
        ]
      }
    ],
    "practice": "Crie dossie de tendencias com fonte, data, evidência e confiança.",
    "mastery": "Rastreia afirmacoes; separa fato/inferencia; recomenda decisão ética.",
    "tools": "Zotero, planilha",
    "kind": "discipline"
  },
  {
    "id": "course-23",
    "semester": "3",
    "module": "3B",
    "title": "Meio Ambiente, Desenvolvimento e Sustentabilidade",
    "hours": "40 h",
    "prerequisites": "Sistemas sóciotecnicos",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Dimensoes ambiental/social/econômica"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Energia",
          "agua",
          "hardware",
          "resíduos"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Ciclo de vida e circularidade"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Indicador",
          "equidade",
          "impacto"
        ]
      }
    ],
    "practice": "Inventarie equipamentos; proponha extensão de vida e descarte responsavel.",
    "mastery": "Distingue impactos; justifica indicador; propoe acao factivel e inclusiva.",
    "tools": "Planilha, dados públicos",
    "kind": "discipline"
  },
  {
    "id": "course-24",
    "semester": "4",
    "module": "4A",
    "title": "Banco de Dados",
    "hours": "60 h",
    "prerequisites": "Estruturas, requisitos e modelagem",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "ER",
          "cardinalidade",
          "chaves"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Normalizacao e integridade"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "SQL",
          "joins",
          "agregacao"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Transacao",
          "indice",
          "backup",
          "acesso"
        ]
      }
    ],
    "practice": "Modele pedidos, normalize, crie SQL e consultas JOIN; teste rollback.",
    "mastery": "Regras preservadas; consultas corretas; explica chave/indice/transação; protege dado.",
    "tools": "PostgreSQL, pgAdmin/DBeaver",
    "kind": "discipline"
  },
  {
    "id": "course-25",
    "semester": "4",
    "module": "4A",
    "title": "Governanca e Auditoria em TI",
    "hours": "40 h",
    "prerequisites": "Gestão, risco, processos, controles",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Valor",
          "alinhamento",
          "responsabilizacao"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "COBIT",
          "CSF",
          "politicas"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Escopo",
          "critério",
          "evidência"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Achado",
          "recomendação",
          "controle"
        ]
      }
    ],
    "practice": "Mapeie risco-controle-evidência e crie roteiro de auditoria simples.",
    "mastery": "Achado tem critério/condicao/causa/efeito; evidência suficiente; recomendação proporcional.",
    "tools": "COBIT, matriz de risco",
    "kind": "discipline"
  },
  {
    "id": "course-26",
    "semester": "4",
    "module": "4A",
    "title": "Projeto Integrador II",
    "hours": "80 h presencial",
    "prerequisites": "PI I, engenharia e dados",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Descoberta e prioridade"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Arquitetura e integração"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "MVP",
          "teste",
          "revisão"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Demo",
          "aceite",
          "retrospectiva"
        ]
      }
    ],
    "practice": "Evolua prototipo a MVP com backlog, testes e aceite do usuário.",
    "mastery": "MVP atende critérios; repositório reproduz; riscos e feedback atualizados.",
    "tools": "Git, Kanban, testes",
    "kind": "project"
  },
  {
    "id": "course-27",
    "semester": "4",
    "module": "4A",
    "title": "Atividades de Extensão II",
    "hours": "80 h presencial",
    "prerequisites": "Extensão I e parceria",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Acordo e corresponsabilidade"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Inclusão",
          "acessibilidade",
          "privacidade"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Oficina",
          "suporte",
          "manutencao"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Feedback e continuidade"
        ]
      }
    ],
    "practice": "Execute oficinas de inclusão digital; avalie resultados com instrumento minimo.",
    "mastery": "Parceiro valida relevancia; acessibilidade considerada; continuidade e limites registrados.",
    "tools": "Materiais acessiveis, checklist",
    "kind": "extension"
  },
  {
    "id": "course-28",
    "semester": "4",
    "module": "4B",
    "title": "Inteligencia Artificial",
    "hours": "60 h",
    "prerequisites": "Estatística, programação, dados",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Dados",
          "features",
          "treino",
          "teste"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Regressao",
          "classificacao",
          "cluster"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Baseline",
          "overfit",
          "métricas"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Vies",
          "privacidade",
          "explicabilidade"
        ]
      }
    ],
    "practice": "Treine modelo simples com dados públicos; compare baseline e matriz de confusao.",
    "mastery": "Sem vazamento; métrica adequada ao erro; compara baseline; comunica limites.",
    "tools": "Python, scikit-learn, NIST AI RMF",
    "kind": "discipline"
  },
  {
    "id": "course-29",
    "semester": "4",
    "module": "4B",
    "title": "Qualidade e Usabilidade do Software",
    "hours": "40 h",
    "prerequisites": "Engenharia e requisitos",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Confiabilidade",
          "desempenho",
          "segurança"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Eficacia",
          "eficiencia",
          "satisfacao"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Tarefa",
          "observacao",
          "severidade"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Teclado",
          "contraste",
          "WCAG"
        ]
      }
    ],
    "practice": "Teste prototipo com voluntarios; registre obstaculos e priorize correcoes.",
    "mastery": "Achados baseados em evidência; separa opiniao e desempenho; valida acessibilidade.",
    "tools": "Figma, WCAG, roteiro",
    "kind": "discipline"
  },
  {
    "id": "course-30",
    "semester": "4",
    "module": "4B",
    "title": "Análise de Dados para Decisoes Estratégicas",
    "hours": "40 h",
    "prerequisites": "Estatística, planilha, negócio",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Decisão e definicao operacional"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Qualidade",
          "vies",
          "linhagem"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Limpeza",
          "resumo",
          "segmentacao"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Visualizacao",
          "recomendação",
          "monitoramento"
        ]
      }
    ],
    "practice": "Análise CSV público; documente limpeza, 3 graficos, recomendação e ressalvas.",
    "mastery": "Calculo reproduzivel; grafico responde pergunta; acao ligada a evidência.",
    "tools": "Planilha, SQL, pandas, BI",
    "kind": "discipline"
  },
  {
    "id": "course-31",
    "semester": "5",
    "module": "5A",
    "title": "Desenvolvimento de Software para Web",
    "hours": "60 h",
    "prerequisites": "Programação, redes, banco, Git",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "HTTP",
          "URL",
          "cliente-servidor",
          "API"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "HTML semantico",
          "CSS",
          "JavaScript"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Rotas",
          "validação",
          "auth",
          "persistencia"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Teste",
          "acessibilidade",
          "segurança",
          "deploy"
        ]
      }
    ],
    "practice": "Crie CRUD responsivo com API, validação server-side, banco e testes; dados ficticios.",
    "mastery": "Fluxo ponta a ponta; entrada validada; erros tratados; segurança/acessibilidade checadas.",
    "tools": "MDN, Node/Python, PostgreSQL",
    "kind": "discipline"
  },
  {
    "id": "course-32",
    "semester": "5",
    "module": "5A",
    "title": "Planejamento Estrategico de TI",
    "hours": "40 h",
    "prerequisites": "Governanca e análise organizacional",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Diagnostico",
          "ambiente",
          "capacidade"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Objetivos e iniciativas"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Portfolio",
          "beneficio",
          "custo",
          "risco"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Metas",
          "indicadores",
          "adaptacao"
        ]
      }
    ],
    "practice": "Crie mapa TI-negócio e priorize por valor, esforco, risco e capacidade.",
    "mastery": "Dono, beneficio e medida por iniciativa; plano ligado a estratégia e restricoes.",
    "tools": "OKR, portfolio, SWOT baseada em evidência",
    "kind": "discipline"
  },
  {
    "id": "course-33",
    "semester": "5",
    "module": "5A",
    "title": "Projeto Integrador III",
    "hours": "60 h presencial",
    "prerequisites": "PI II e competencias anteriores",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Validacao e evidência de valor"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Qualidade",
          "segurança",
          "acessibilidade"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Deploy",
          "suporte",
          "custo",
          "continuidade"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Demo",
          "limites",
          "próximo passo"
        ]
      }
    ],
    "practice": "Entregue solução demonstravel, manual, testes e plano de continuidade.",
    "mastery": "Solucao reproduzivel; documentacao clara; riscos e alegacoes baseados em evidência.",
    "tools": "Git, CI, testes",
    "kind": "project"
  },
  {
    "id": "course-34",
    "semester": "5",
    "module": "5A",
    "title": "Atividades de Extensão III",
    "hours": "80 h presencial",
    "prerequisites": "Extensoes I/II, parceria, avaliação",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Necessidade e capacidade local"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Transferencia",
          "formação",
          "autonomia"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Indicador",
          "resultado",
          "limites"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Consentimento",
          "autoria",
          "prestacao de contas"
        ]
      }
    ],
    "practice": "Transfira material/sistema ao parceiro; treine equipe; combine manutencao.",
    "mastery": "Parceiro continua uso; artefato acessível; impacto com evidências e ressalvas.",
    "tools": "Manual, checklist",
    "kind": "extension"
  },
  {
    "id": "course-35",
    "semester": "5",
    "module": "5B",
    "title": "Segurança da Informação",
    "hours": "60 h",
    "prerequisites": "Redes, SO, desenvolvimento e governanca",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Ativo",
          "ameaca",
          "vulnerabilidade",
          "risco"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Identidade",
          "privilegio minimo",
          "crypto"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Prevenir",
          "detectar",
          "responder",
          "recuperar"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Modelagem",
          "teste e evidência"
        ]
      }
    ],
    "practice": "Modele ameacas e controles; teste somente laboratorio autorizado.",
    "mastery": "Prioriza risco; controle testavel; preserva evidências; respeita escopo autorizado.",
    "tools": "NIST CSF, OWASP ASVS/WSTG",
    "kind": "discipline"
  },
  {
    "id": "course-36",
    "semester": "5",
    "module": "5B",
    "title": "Computação para Dispositivos Moveis",
    "hours": "60 h",
    "prerequisites": "Programação, API, dados, UX",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Ciclo de vida",
          "permissões"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Navegacao",
          "acessibilidade",
          "telas"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "API",
          "cache",
          "sync",
          "offline"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Testes",
          "privacidade",
          "bateria"
        ]
      }
    ],
    "practice": "Crie app offline-first; teste sem rede, rotacao, telas e permissões.",
    "mastery": "Trata offline/erro; justifica permissao; interface acessível em varios tamanhos.",
    "tools": "Android/Kotlin ou Flutter",
    "kind": "discipline"
  },
  {
    "id": "course-37",
    "semester": "5",
    "module": "5B",
    "title": "Direitos Humanos e Relações Étnico-Raciais",
    "hours": "40 h",
    "prerequisites": "Leitura critica, dialogo",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Dignidade",
          "igualdade",
          "diversidade"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "História afro-brasileira e indígena"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Vies",
          "acesso",
          "vigilancia",
          "representacao"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Inclusão",
          "consulta",
          "responsabilidade"
        ]
      }
    ],
    "practice": "Análise caso público de tecnologia sob perspectiva de direitos e grupos afetados.",
    "mastery": "Fontes confiaveis; distingue intencao/impacto; propoe participação e responsabilizacao.",
    "tools": "Leis indicadas, mapa de impacto",
    "kind": "discipline"
  },
  {
    "id": "course-38",
    "semester": "1-5",
    "module": "Componente",
    "title": "Atividades Complementares I, II e III",
    "hours": "40 h cada; total 120 h",
    "prerequisites": "Confirmar regras de aproveitamento institucionais",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "Curadoria relevante"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "Comprovantes",
          "data",
          "reflexão"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "Integracao curso/prática"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "Planejamento por semestre"
        ]
      }
    ],
    "practice": "Mantenha portfolio de atividade, objetivo, evidência e reflexão; valide regulamento.",
    "mastery": "Portfolio rastreavel; horas segundo regra institucional; aprendizagem demonstravel.",
    "tools": "Portfolio, calendario",
    "kind": "component"
  },
  {
    "id": "course-39",
    "semester": "1-5",
    "module": "Componente",
    "title": "Certificacoes Intermediarias",
    "hours": "Semestres 1 a 5",
    "prerequisites": "Cronograma traz titulos; critério oficial nao detalhado",
    "branches": [
      {
        "id": "branch-0",
        "title": "Fundamentos",
        "topics": [
          "1 Analista de Suporte em TI"
        ]
      },
      {
        "id": "branch-1",
        "title": "Estruturas e métodos",
        "topics": [
          "2 Assistente de Gestão em TI"
        ]
      },
      {
        "id": "branch-2",
        "title": "Aplicação",
        "topics": [
          "3 Analista de Sistemas Junior"
        ]
      },
      {
        "id": "branch-3",
        "title": "Validação e domínio",
        "topics": [
          "4 Analista de Governanca; 5 Assistente de Segurança"
        ]
      }
    ],
    "practice": "Use titulos como mapa de competencias; confirme regras da FASUL; guarde artefatos.",
    "mastery": "Confirma critérios oficiais; demonstra tarefas por portfolio; nao presume certificacao externa.",
    "tools": "Portfolio e rubrica",
    "kind": "component"
  }
];

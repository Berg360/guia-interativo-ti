
    // =========================================================================
    // 1. CURRICULUM DATA: 12 PROGRESSIVE LEVELS WITH TECHNICAL RIGOR & 5 DIMENSIONS
    // =========================================================================
    const courseLevels = [
      {
        id: 1,
        tag: "Nível 1 • Fundamentos",
        title: "Fundamentos, Lógica & Modelo de Objetos",
        subtitle: "Sintaxe, print(), input(), Variáveis como referências, Tipos, Conversões, Operadores, Strings e f-strings",
        objective: "Compreender como o Python representa dados como objetos em memória e construir scripts de entrada, processamento aritmético/textual e saída formatada.",
        prerequisites: "Nenhum pré-requisito. Ponto de partida da formação.",
        analogyTitle: "🏷️ Modelo Mental & Rigor Técnico: Variáveis são nomes (referências) vinculados a objetos!",
        analogyBody: "Analogia didática: pense em variáveis como etiquetas ligadas a objetos. Explicação técnica exata: em Python, todo dado (int, float, str, bool) é um objeto alocado no heap com três características: Identidade única (id()), Tipo (type()) e Valor. O operador '=' não copia bytes para uma caixa fixa; ele vincula um identificador (nome) à referência daquele objeto.",
        spiralConnection: "Base de toda a linguagem: tudo em Python é objeto e possui tipo bem definido (tipagem dinâmica e forte).",
        topics: [
          {
            name: "Variáveis, Tipos Primitivos & Operadores",
            why: "Armazenar referências a números inteiros (int), ponto flutuante (float), textos (str) e booleanos (bool), aplicando operadores aritméticos (+, -, *, /, //, %, **).",
            syntax: "preco_unitario = 49.90\nquantidade = 3\ntotal = preco_unitario * quantidade  # 149.7",
            anatomy: [
              { part: "preco_unitario", role: "Identificador em snake_case (PEP 8)", color: "text-sky-300" },
              { part: "=", role: "Operador de atribuição (vincula nome ao objeto)", color: "text-amber-300" },
              { part: "// e %", role: "Divisão inteira (//) e resto da divisão/módulo (%)", color: "text-emerald-300" }
            ]
          },
          {
            name: "Strings, f-strings, Formatação & Comentários (#)",
            why: "Interpolar expressões dentro de literais de texto com f-strings e documentar trechos importantes com #.",
            syntax: "# Calcula desconto de 10%\ncliente = 'Ana'\nprint(f'Cliente: {cliente.upper()} | Total: R$ {total * 0.9:.2f}')",
            anatomy: [
              { part: "f'...'", role: "Formatted string literal avaliada em tempo de execução", color: "text-amber-300" },
              { part: "{total * 0.9:.2f}", role: "Expressão avaliada e formatada com 2 casas decimais", color: "text-sky-300" },
              { part: "# comentário", role: "Ignorado pelo interpretador; explica o porquê do código", color: "text-emerald-300" }
            ]
          },
          {
            name: "Entrada (input), Saída (print) & Conversão Explícita",
            why: "A função input() lê uma linha da entrada padrão (stdin) e SEMPRE retorna um objeto str. Para cálculos numéricos, usa-se int() ou float().",
            syntax: "idade_str = input('Idade: ')\nidade = int(idade_str)\nprint('Ano que vem terá:', idade + 1)",
            anatomy: [
              { part: "input(...)", role: "Lê texto do usuário e retorna sempre str", color: "text-purple-300" },
              { part: "int(idade_str)", role: "Instancia um novo int a partir da string válida", color: "text-emerald-300" },
              { part: "print(...)", role: "Escreve representação textual em sys.stdout e retorna None", color: "text-sky-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Qual é a diferença técnica exata entre o tipo retornado por input('Digite 10: ') e o literal 10?",
            options: [
              "input() retorna sempre uma string ('10'), enquanto 10 é um objeto int; somar '10' + 5 gera TypeError.",
              "input() converte automaticamente para int se o usuário digitar apenas dígitos.",
              "Ambos são números na memória, pois Python possui tipagem fraca.",
              "O literal 10 é mutável e o resultado de input() é uma lista."
            ],
            correct: 0,
            explanation: "Python tem tipagem forte: '10' (str) e 10 (int) não são somados implicitamente; é preciso converter com int()."
          },
          interpretation: {
            q: "Qual será a saída exata impressa pelo código: x = 17 // 5; y = 17 % 5; print(f'{x}-{y}')?",
            options: ["3-2", "3.4-2", "3-3.4", "2-3"],
            correct: 0,
            explanation: "17 // 5 é a divisão inteira (quociente 3) e 17 % 5 é o resto da divisão de 17 por 5 (resto 2)."
          },
          debugging: {
            q: "Um aluno escreveu: preco = input('Preço: '); print(preco * 2) e digitou 50, mas saiu '5050' em vez de 100. Como corrigir?",
            options: [
              "Converter a entrada com float(input('Preço: ')) ou int(input('Preço: ')) antes de multiplicar.",
              "Trocar o operador * por **.",
              "Usar print(str(preco * 2)).",
              "Remover o print() e deixar apenas input()."
            ],
            correct: 0,
            explanation: "Multiplicar uma string por 2 ('50' * 2) repete o texto ('5050'). Converter com float() ou int() realiza a multiplicação numérica."
          }
        },
        exerciseId: "ex_lvl_1",
        projectId: 1
      },
      {
        id: 2,
        tag: "Nível 2 • Controle de Fluxo",
        title: "Controle de Fluxo, Loops & Validação de Entradas",
        subtitle: "if, elif, else, Operadores Relacionais e Lógicos, for, while, range(), break, continue e pass",
        objective: "Controlar desvios condicionais e repetições iterativas ou baseadas em estado, validando entradas de usuários com segurança.",
        prerequisites: "Nível 1 (Variáveis, tipos booleanos e conversões).",
        analogyTitle: "🔀 Modelo Mental: Iteração Definida (for sobre Iteráveis) vs Repetição Condicional (while)",
        analogyBody: "Em Python, o laço 'for' não é um contador manual estilo C: ele solicita o próximo elemento de qualquer objeto iterável (lista, string, range). Já o 'while' avalia uma expressão booleana antes de cada ciclo, sendo ideal para validação de entradas até que um estado válido seja atingido.",
        spiralConnection: "Integra expressões booleanas e conversões do Nível 1 dentro de blocos indentados.",
        topics: [
          {
            name: "Condicionais (if / elif / else) & Curto-Circuito Lógico",
            why: "Avaliar regras de negócio mutuamente exclusivas. Operadores 'and' e 'or' usam avaliação de curto-circuito (param assim que o resultado é conhecido).",
            syntax: "if renda >= 3000 and score >= 700:\n    status = 'Aprovado'\nelif renda >= 2000:\n    status = 'Análise Manual'\nelse:\n    status = 'Recusado'",
            anatomy: [
              { part: "if / elif / else", role: "Apenas o primeiro ramo verdadeiro é executado", color: "text-amber-300" },
              { part: "and / or / not", role: "Operadores lógicos booleanos com curto-circuito", color: "text-purple-300" },
              { part: "Indentação (4 espaços)", role: "Delimita sintaticamente o bloco subordinado", color: "text-sky-300" }
            ]
          },
          {
            name: "Laço for & Objeto range(inicio, fim, passo)",
            why: "Percorrer sequências de forma legível. range(n) gera inteiros de 0 até n-1 sob demanda sem alocar uma lista inteira.",
            syntax: "soma = 0\nfor num in range(1, 6):  # 1, 2, 3, 4, 5\n    soma += num",
            anatomy: [
              { part: "for num in ...", role: "Atribui cada item produzido pelo iterável à variável num", color: "text-sky-300" },
              { part: "range(1, 6)", role: "Limite superior (6) é exclusivo: para em 5", color: "text-emerald-300" }
            ]
          },
          {
            name: "while, break, continue, pass & Validação",
            why: "Controlar interrupções imediatas (break), pular rodadas inválidas (continue) ou demarcar blocos vazios (pass).",
            syntax: "for valor in [10, -5, 20, 0, 999]:\n    if valor < 0:\n        continue  # Ignora negativos\n    if valor == 999:\n        break     # Encerra o loop imediatamente",
            anatomy: [
              { part: "continue", role: "Pula o restante da rodada atual e vai para a próxima", color: "text-amber-300" },
              { part: "break", role: "Interrompe o laço mais interno imediatamente", color: "text-rose-300" },
              { part: "pass", role: "Operação nula usada como espaço reservado sintático", color: "text-slate-400" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Quais números são gerados por list(range(2, 10, 3))?",
            options: ["[2, 5, 8]", "[2, 5, 8, 10]", "[2, 3, 10]", "[3, 6, 9]"],
            correct: 0,
            explanation: "Inicia em 2, avança de 3 em 3 (2, 5, 8) e para antes de atingir ou ultrapassar o limite exclusivo 10."
          },
          interpretation: {
            q: "O que este código imprime? total = 0; for n in [2, 4, 6, 8]: (se n == 4: continue; se n == 8: break; total += n); print(total)",
            options: ["8", "12", "20", "6"],
            correct: 0,
            explanation: "Soma 2 (total=2), pula o 4 com continue, soma 6 (total=8) e encerra no 8 com break antes de somar."
          },
          debugging: {
            q: "Por que 'while tentativas < 3:' entra em loop infinito se esquecermos 'tentativas += 1' dentro do bloco?",
            options: [
              "Porque a condição 'tentativas < 3' permanece sempre True se a variável de estado nunca for atualizada.",
              "Porque o while só aceita variáveis booleanas.",
              "Porque faltou usar pass no final do while.",
              "Porque o Python reinicia variáveis inteiras a cada ciclo."
            ],
            correct: 0,
            explanation: "Todo laço while precisa de uma atualização de estado ou condição de parada (break) alcançável."
          }
        },
        exerciseId: "ex_lvl_2",
        projectId: 2
      },
      {
        id: 3,
        tag: "Nível 3 • Estruturas de Dados",
        title: "Estruturas de Dados, Mutabilidade & Comprehensions",
        subtitle: "Listas, Tuplas, Dicionários, Sets, Índices, Slicing, List/Dict Comprehension, Ordenação, Busca e Mutabilidade",
        objective: "Selecionar e manipular a estrutura de dados adequada quanto à complexidade algorítmica e mutabilidade.",
        prerequisites: "Níveis 1 e 2 (Tipos e Laços de Repetição).",
        analogyTitle: "🗄️ Rigor Técnico: Mutabilidade, Aliasing e Complexidade de Busca O(1) vs O(n)",
        analogyBody: "Listas ([ ]) são sequências mutáveis: se você fizer 'b = a' e executar 'b.append(99)', a lista 'a' também muda porque ambas referenciam o mesmo objeto na memória (aliasing)! Tuplas (( )) são imutáveis. Dicionários ({k: v}) e Sets ({k}) usam tabelas hash, oferecendo busca com complexidade média O(1) (tempo constante), enquanto buscar um item com 'x in lista' custa O(n) (linear). Além disso, dicts preservam a ordem de inserção (Python 3.7+), enquanto sets não garantem ordem.",
        spiralConnection: "Potencializa os loops do Nível 2 permitindo filtrar, ordenar e agrupar coleções em memória.",
        topics: [
          {
            name: "Listas Mutáveis [ ], Tuplas Imutáveis ( ) & Slicing",
            why: "Acessar fatias com lista[inicio:fim:passo] e proteger registros constantes em tuplas.",
            syntax: "dados = [10, 20, 30, 40, 50]\nfatia = dados[1:4]     # [20, 30, 40]\ninvertida = dados[::-1] # Cópia invertida",
            anatomy: [
              { part: "dados[1:4]", role: "Slicing do índice 1 até 3 (o índice 4 é exclusivo)", color: "text-sky-300" },
              { part: "dados.copy() ou dados[:]", role: "Cria cópia rasa (evita modificar a lista original por aliasing)", color: "text-emerald-300" }
            ]
          },
          {
            name: "Dicionários {'k': v} e Sets {x} (Tabelas Hash O(1))",
            why: "Associar chaves imutáveis a valores com busca média O(1) e usar conjuntos (set) para operações de união, interseção e deduplicação.",
            syntax: "precos = {'cafe': 15.0, 'cha': 10.0}\nvalor = precos.get('suco', 0.0)\ntags_unicas = {'python', 'sql', 'python'}  # {'python', 'sql'}",
            anatomy: [
              { part: ".get('suco', 0.0)", role: "Evita KeyError retornando valor padrão se a chave ausente", color: "text-emerald-300" },
              { part: "set", role: "Coleção mutável de elementos únicos e hashables (sem ordem garantida)", color: "text-purple-300" }
            ]
          },
          {
            name: "List Comprehension & Dict Comprehension",
            why: "Construir novas listas ou dicionários de forma declarativa e concisa.",
            syntax: "quadrados_pares = [n ** 2 for n in range(6) if n % 2 == 0]\nmapa_dobro = {n: n * 2 for n in [1, 2, 3]}",
            anatomy: [
              { part: "[expr for item in iter if cond]", role: "Sintaxe de List Comprehension", color: "text-sky-300" },
              { part: "{k: v for ...}", role: "Sintaxe de Dict Comprehension", color: "text-amber-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Sobre Sets e Dicionários em Python 3.7+, qual afirmação é tecnicamente verdadeira?",
            options: [
              "Dicionários preservam a ordem de inserção das chaves e têm busca média O(1); Sets não garantem ordem e eliminam duplicatas.",
              "Sets mantêm os elementos sempre ordenados em ordem alfabética automaticamente.",
              "Buscar uma chave em um dicionário com 1 milhão de itens tem a mesma lentidão O(n) que buscar numa lista.",
              "Listas podem ser usadas diretamente como chaves de um dicionário."
            ],
            correct: 0,
            explanation: "Dicts preservam a ordem de inserção desde o Python 3.7 e usam tabela hash (busca média O(1)); Sets não garantem ordem."
          },
          interpretation: {
            q: "Qual o resultado de: a = [1, 2]; b = a; b.append(3); print(len(a))?",
            options: ["3", "2", "1", "Gera erro de mutabilidade"],
            correct: 0,
            explanation: "Como 'b = a' copia apenas a referência para a mesma lista mutável (aliasing), b.append(3) altera o único objeto lista compartilhado."
          },
          debugging: {
            q: "Ao executar d = {'a': 1}; print(d['b']), ocorre KeyError. Qual é a forma idiomática de ler a chave retornando 0 caso não exista?",
            options: ["d.get('b', 0)", "d.find('b', 0)", "d['b', 0]", "d.has_key('b')"],
            correct: 0,
            explanation: "O método dict.get(chave, padrao) retorna o valor padrão sem levantar KeyError."
          }
        },
        exerciseId: "ex_lvl_3",
        projectId: 3
      },
      {
        id: 4,
        tag: "Nível 4 • Funções & Modularização",
        title: "Funções, Escopo LEGB, Tipagem & Modularização",
        subtitle: "def, Parâmetros vs Argumentos, return vs print, Escopo LEGB, Lambda, Recursividade, Type Hints, Docstrings e Módulos",
        objective: "Estruturar lógica reutilizável, desacoplada e documentada através de funções puras, anotações de tipo e módulos.",
        prerequisites: "Níveis 1 a 3.",
        analogyTitle: "🍹 Rigor Técnico: Parâmetros vs Argumentos, print() vs return e Regra LEGB",
        analogyBody: "Parâmetros são as variáveis declaradas na assinatura do 'def'; Argumentos são os valores reais passados na chamada da função. Cuidado: 'print()' apenas envia texto para a saída padrão (stdout) como efeito colateral e retorna None; já 'return' encerra o frame de execução da função e devolve a referência do objeto resultante ao chamador. A resolução de nomes segue a regra LEGB: Local -> Enclosing -> Global -> Built-in.",
        spiralConnection: "Transforma algoritmos dos Níveis 2 e 3 em blocos testáveis, tipados e importáveis.",
        topics: [
          {
            name: "def, Parâmetros, Argumentos, Type Hints & Docstrings",
            why: "Definir contratos claros de entrada e saída facilitando leitura, autocompletar de IDEs e análise estática.",
            syntax: "def calcular_juros(capital: float, taxa: float = 0.05) -> float:\n    \"\"\"Retorna o rendimento simples sobre o capital.\"\"\"\n    return capital * taxa",
            anatomy: [
              { part: "capital: float", role: "Parâmetro com Type Hint indicativo", color: "text-sky-300" },
              { part: "-> float", role: "Indica o tipo retornado pelo return", color: "text-emerald-300" },
              { part: "\"\"\"Docstring\"\"\"", role: "Documentação oficial acessível via help()", color: "text-amber-300" }
            ]
          },
          {
            name: "Escopo LEGB, Funções Lambda & Recursividade",
            why: "Compreender visibilidade de variáveis, criar funções anônimas curtas para ordenação e resolver problemas recursivos com caso-base.",
            syntax: "fatorial = lambda n: 1 if n <= 1 else n * fatorial(n - 1)",
            anatomy: [
              { part: "n <= 1", role: "Caso-base obrigatório que impede recursão infinita (RecursionError)", color: "text-rose-300" },
              { part: "lambda", role: "Cria função anônima de uma única expressão", color: "text-purple-300" }
            ]
          },
          {
            name: "Módulos & Imports (Biblioteca Padrão)",
            why: "Organizar código em múltiplos arquivos .py e importar apenas o necessário (math, datetime, collections).",
            syntax: "from math import sqrt\nfrom datetime import date\nprint(sqrt(144), date.today())",
            anatomy: [
              { part: "from math import sqrt", role: "Importa símbolo específico do módulo math para o namespace atual", color: "text-emerald-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Qual é a diferença exata entre Parâmetro e Argumento em uma função Python?",
            options: [
              "Parâmetro é o nome definido na declaração def f(x):; Argumento é o valor passado na chamada f(42).",
              "Parâmetro é sempre obrigatório e argumento é sempre opcional.",
              "Argumento fica dentro do return e parâmetro fica dentro do print.",
              "Não existe diferença; ambos significam variável global."
            ],
            correct: 0,
            explanation: "Na definição 'def somar(a, b):', 'a' e 'b' são parâmetros. Na chamada 'somar(10, 20)', 10 e 20 são os argumentos."
          },
          interpretation: {
            q: "Se uma função executa apenas 'print(10 + 20)' sem instrução return, qual é o valor guardado em 'r = minha_funcao()'?",
            options: ["None", "30", "'30'", "0"],
            correct: 0,
            explanation: "Toda função Python que chega ao fim sem executar um 'return valor' retorna implicitamente o objeto singleton None."
          },
          debugging: {
            q: "Uma função recursiva levantou 'RecursionError: maximum recursion depth exceeded'. Qual é a causa clássica?",
            options: [
              "Ausência de um caso-base alcançável que encerre as chamadas recursivas.",
              "Uso de Type Hints na assinatura da função.",
              "Uso de return em vez de print.",
              "Falta de importação do módulo math."
            ],
            correct: 0,
            explanation: "Sem um caso-base (condição de parada) ou se o passo recursivo não convergir para ele, a pilha de chamadas estoura."
          }
        },
        exerciseId: "ex_lvl_4",
        projectId: 4
      },
      {
        id: 5,
        tag: "Nível 5 • POO, Arquivos & Erros",
        title: "POO, Persistência em Arquivos & Tratamento de Exceções",
        subtitle: "Classes, Objetos, self, __init__, Herança, Encapsulamento, Polimorfismo, with open, JSON, CSV e try/except/finally",
        objective: "Modelar entidades de domínio com Orientação a Objetos, persistir dados em JSON/CSV e tratar falhas com segurança.",
        prerequisites: "Níveis 1 a 4.",
        analogyTitle: "🏗️ Rigor Técnico: Instanciação, Referência 'self', Pilares de POO e Context Managers",
        analogyBody: "Uma classe é um molde que define atributos de estado e métodos de comportamento. O parâmetro 'self' recebe explicitamente a referência da instância que invocou o método. Com Herança e Polimorfismo, subclasses especializam comportamentos mantendo a mesma interface. Para arquivos, o protocolo Context Manager ('with open(...)') garante a execução do método '__exit__', fechando o descritor de arquivo mesmo se ocorrer uma exceção.",
        spiralConnection: "Une funções (métodos) e estruturas de dados (atributos e JSON) com persistência em disco.",
        topics: [
          {
            name: "Classes, __init__, self & Encapsulamento",
            why: "Agrupar estado e validações dentro de objetos coesos.",
            syntax: "class ContaBancaria:\n    def __init__(self, titular: str, saldo: float = 0.0):\n        self.titular = titular\n        self._saldo = saldo  # Convenção de atributo protegido\n\n    def depositar(self, valor: float) -> None:\n        if valor > 0:\n            self._saldo += valor",
            anatomy: [
              { part: "__init__", role: "Inicializador chamado após a criação da instância", color: "text-amber-300" },
              { part: "self", role: "Referência explícita à instância atual do objeto", color: "text-sky-300" },
              { part: "self._saldo", role: "Prefixo _ indica atributo interno (encapsulamento por convenção)", color: "text-emerald-300" }
            ]
          },
          {
            name: "Herança, super() & Polimorfismo",
            why: "Reaproveitar código da classe base e sobrescrever métodos em classes filhas.",
            syntax: "class ContaCorrente(ContaBancaria):\n    def __init__(self, titular: str, saldo: float = 0.0, limite: float = 500.0):\n        super().__init__(titular, saldo)\n        self.limite = limite",
            anatomy: [
              { part: "(ContaBancaria)", role: "Indica que ContaCorrente herda de ContaBancaria", color: "text-purple-300" },
              { part: "super().__init__(...)", role: "Delega a inicialização dos atributos base à superclasse", color: "text-emerald-300" }
            ]
          },
          {
            name: "Arquivos (with, JSON, CSV) & try / except / finally",
            why: "Persistir dados estruturados e capturar exceções específicas sem mascarar bugs inesperados.",
            syntax: "import json\ntry:\n    with open('config.json', 'r', encoding='utf-8') as f:\n        cfg = json.load(f)\nexcept FileNotFoundError:\n    cfg = {'modo': 'padrao'}\nfinally:\n    print('Leitura finalizada.')",
            anatomy: [
              { part: "with open(...)", role: "Gerenciador de contexto que fecha o arquivo automaticamente", color: "text-emerald-300" },
              { part: "except FileNotFoundError:", role: "Captura apenas a exceção esperada", color: "text-rose-300" },
              { part: "finally:", role: "Bloco executado sempre, ocorrendo erro ou não", color: "text-amber-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Qual é o papel do bloco 'finally' em uma estrutura try/except/finally?",
            options: [
              "Executar sempre ao final, independentemente de uma exceção ter sido lançada ou não (ideal para liberação de recursos).",
              "Executar somente quando nenhuma exceção ocorre.",
              "Suprimir silenciosamente todos os erros de sintaxe do arquivo.",
              "Substituir o método __init__ de uma classe."
            ],
            correct: 0,
            explanation: "O bloco 'finally' sempre roda na saída do bloco try, enquanto o bloco 'else' roda apenas quando não há exceção."
          },
          interpretation: {
            q: "Se a classe PagamentoPix herda de Pagamento e sobrescreve o método processar(), como chamamos o fato de podermos invocar p.processar() em diferentes subclasses?",
            options: ["Polimorfismo", "Compilação Estática", "Slicing", "Recursividade"],
            correct: 0,
            explanation: "Polimorfismo permite que objetos de diferentes classes respondam à mesma mensagem (assinatura de método) de maneira específica."
          },
          debugging: {
            q: "Por que capturar 'except Exception: pass' sem registrar nem tratar o erro é considerado uma má prática grave?",
            options: [
              "Porque silencia falhas reais e deixa o programa em estado inconsistente sem pistas para depuração.",
              "Porque o Python proíbe usar pass dentro de except.",
              "Porque torna o arquivo JSON duas vezes maior.",
              "Porque apaga as variáveis globais."
            ],
            correct: 0,
            explanation: "Engolir exceções genericamente esconde bugs críticos; deve-se capturar exceções específicas e tratá-las ou registrá-las."
          }
        },
        exerciseId: "ex_lvl_5",
        projectId: 5
      },
      {
        id: 6,
        tag: "Nível 6 • Python Avançado",
        title: "Iteradores, Generators, Decorators, Async & Testes",
        subtitle: "Iteradores, Generators, yield, Closures, Decorators, Context Managers, HTTP/APIs, Async/Await e Pytest",
        objective: "Dominar avaliação preguiçosa (lazy evaluation), metaprogramação com decorators, concorrência assíncrona e testes automatizados.",
        prerequisites: "Níveis 1 a 5.",
        analogyTitle: "⚡ Rigor Técnico: Diferença real entre return e yield, Closures e Concorrência Async",
        analogyBody: "Correção técnica essencial: 'return' não carrega necessariamente uma coleção na memória — ele simplesmente encerra a função e devolve qualquer objeto único (como um int ou uma lista já criada). Porém, quando precisamos produzir uma sequência de milhões de itens, criar uma lista inteira para retorná-la consome memória O(n), enquanto uma função com 'yield' retorna um objeto Generator (iterador preguiçoso) que produz um item por vez sob demanda com consumo de memória constante O(1), suspendendo seu estado entre chamadas de next().",
        spiralConnection: "Conecta funções de primeira classe (Nível 4) e protocolo de contexto (Nível 5) a código assíncrono e testável.",
        topics: [
          {
            name: "Iteradores, Generators & yield (Avaliação Lazy)",
            why: "Processar fluxos de dados extensos sob demanda mantendo apenas o item atual em memória.",
            syntax: "def gerar_pares(limite: int):\n    for n in range(0, limite, 2):\n        yield n  # Suspende o frame e entrega n ao iterador",
            anatomy: [
              { part: "yield n", role: "Produz um valor por chamada de next() e preserva o estado local da função", color: "text-cyan-300" }
            ]
          },
          {
            name: "Closures & Decorators (@functools.wraps)",
            why: "Estender o comportamento de funções (logging, cache, medição de tempo) sem modificar seu código interno.",
            syntax: "def log_chamada(func):\n    def wrapper(*args, **kwargs):\n        print(f'Chamando {func.__name__}')\n        return func(*args, **kwargs)\n    return wrapper",
            anatomy: [
              { part: "*args, **kwargs", role: "Aceita quaisquer argumentos posicionais e nomeados", color: "text-amber-300" },
              { part: "return wrapper", role: "Closure que retém a referência à função original 'func'", color: "text-purple-300" }
            ]
          },
          {
            name: "Async / Await & Testes Automatizados (pytest)",
            why: "Executar múltiplas operações de I/O (como chamadas HTTP) concorrentemente no Event Loop e validar regras com assert.",
            syntax: "async def buscar_status(url: str) -> int:\n    # Aguarda I/O de rede de forma não-bloqueante\n    return 200\n\ndef test_gerar_pares():\n    assert list(gerar_pares(6)) == [0, 2, 4]",
            anatomy: [
              { part: "async def / await", role: "Corrotina cooperativa para tarefas limitadas por I/O (I/O-bound)", color: "text-sky-300" },
              { part: "assert expr == esperado", role: "Verifica invariantes de teste automatizado no pytest", color: "text-emerald-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Qual é a diferença exata entre uma função que usa 'return' e uma função que usa 'yield'?",
            options: [
              "'return' encerra a execução da função devolvendo um valor único; 'yield' transforma a função num gerador que produz valores sob demanda e suspende seu estado local.",
              "'return' sempre aloca gigabytes de memória RAM, mesmo ao retornar um número inteiro.",
              "'yield' executa todas as iterações em paralelo usando todas as placas de vídeo.",
              "Não há diferença; yield é apenas um apelido para return em Python 3."
            ],
            correct: 0,
            explanation: "O comportamento do return depende do objeto retornado, mas ele encerra o frame da função. Já yield cria um Generator que pausa e retoma o frame a cada next()."
          },
          interpretation: {
            q: "O que acontece no exato momento em que executamos 'g = gerar_pares(10)' (onde gerar_pares contém yield), antes de qualquer chamada a next(g)?",
            options: [
              "O corpo da função ainda não é executado; ela retorna imediatamente um objeto generator pronto para iterar.",
              "Todos os números pares até 10 são impressos na tela.",
              "Ocorre um erro StopIteration imediato.",
              "O Python bloqueia a thread por 10 segundos."
            ],
            correct: 0,
            explanation: "Chamar uma generator function apenas instancia o objeto gerador; o código interno só avança quando next() ou um loop for solicita itens."
          },
          debugging: {
            q: "Um desenvolvedor criou um decorator mas percebeu que a função decorada não aceita argumentos e levanta TypeError. Como o wrapper interno deve ser declarado?",
            options: [
              "def wrapper(*args, **kwargs): return func(*args, **kwargs)",
              "def wrapper(): return func()",
              "def wrapper(self): yield func",
              "async def wrapper(): pass"
            ],
            correct: 0,
            explanation: "Usar *args e **kwargs no wrapper permite repassar qualquer combinação de argumentos posicionais e nomeados para a função original."
          }
        },
        exerciseId: "ex_lvl_6",
        projectId: 6
      },
      {
        id: 7,
        tag: "Nível 7 • Python Profissional",
        title: "Engenharia de Projetos, Ambientes Virtuais, Logging & Clean Code",
        subtitle: "Estrutura de diretórios, venv, pip, gerenciamento de dependências, logging, debugging, Git/GitHub, PEP 8 e Clean Code",
        objective: "Organizar projetos Python profissionais com isolamento de dependências, rastreabilidade via logging, controle de versão Git e código limpo.",
        prerequisites: "Níveis 1 a 6.",
        analogyTitle: "📦 Modelo Mental: Ambiente Virtual (venv) é um Contêiner Isolado por Projeto",
        analogyBody: "Instalar pacotes com pip direto no Python global do sistema operacional causa conflito de versões entre projetos diferentes ('dependency hell'). O módulo 'venv' cria um diretório isolado com seu próprio binário Python e biblioteca de pacotes, documentado em 'requirements.txt' ou 'pyproject.toml'. Além disso, em produção substituímos 'print()' pelo módulo 'logging', que permite filtrar níveis de severidade (DEBUG, INFO, WARNING, ERROR, CRITICAL) e gravar em arquivos rotativos.",
        spiralConnection: "Padroniza os módulos e pacotes criados nos Níveis 4 a 6 para trabalho em equipe.",
        topics: [
          {
            name: "Estrutura de Diretórios, venv & Dependências (pip)",
            why: "Garantir que qualquer desenvolvedor ou servidor reproduza exatamente o mesmo ambiente de execução.",
            syntax: "# Comandos de terminal:\n# python -m venv .venv\n# source .venv/bin/activate\n# pip install -r requirements.txt",
            anatomy: [
              { part: "python -m venv .venv", role: "Cria ambiente virtual isolado na pasta .venv", color: "text-emerald-300" },
              { part: "requirements.txt / pyproject.toml", role: "Manifesto de dependências com versões fixadas (pinning)", color: "text-sky-300" }
            ]
          },
          {
            name: "Logging Estruturado vs print() & Debugging",
            why: "Registrar eventos com carimbo de tempo, módulo de origem e nível de severidade sem poluir a saída padrão.",
            syntax: "import logging\nlogging.basicConfig(level=logging.INFO, format='%(levelname)s:%(message)s')\nlogging.warning('Tentativa de login inválida para usuário=%s', usuario)",
            anatomy: [
              { part: "logging.INFO / WARNING / ERROR", role: "Níveis hierárquicos de severidade de eventos", color: "text-amber-300" },
              { part: "breakpoint()", role: "Aciona o depurador interativo (pdb) na linha exata", color: "text-purple-300" }
            ]
          },
          {
            name: "PEP 8, Clean Code & Fluxo Git/GitHub",
            why: "Manter nomes expressivos, funções com responsabilidade única e commits atômicos rastreáveis.",
            syntax: "# Ruim: def calc(d, t): return d * t\n# Clean Code + PEP 8:\ndef calcular_frete_expresso(distancia_km: float, tarifa_km: float) -> float:\n    return distancia_km * tarifa_km",
            anatomy: [
              { part: "Nomes reveladores de intenção", role: "Elimina a necessidade de adivinhar o que 'd' e 't' significam", color: "text-emerald-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Por que sistemas em produção utilizam o módulo 'logging' em vez de 'print()' para monitoramento?",
            options: [
              "Porque logging permite configurar níveis de severidade (INFO, ERROR), formatos com timestamp e múltiplos destinos (arquivo, console, rede) sem alterar o código de negócio.",
              "Porque print() não funciona dentro de funções ou classes.",
              "Porque logging deixa os cálculos matemáticos 10 vezes mais rápidos.",
              "Porque a PEP 8 proíbe o uso de strings no Python."
            ],
            correct: 0,
            explanation: "O módulo logging desacopla a emissão da mensagem de seu roteamento, formatação e filtragem por severidade."
          },
          interpretation: {
            q: "Se o nível do logger está configurado como 'level=logging.WARNING', quais chamadas abaixo serão efetivamente registradas?",
            options: [
              "Apenas logging.warning(...), logging.error(...) e logging.critical(...).",
              "Apenas logging.debug(...) e logging.info(...).",
              "Todas as chamadas, incluindo debug.",
              "Nenhuma chamada."
            ],
            correct: 0,
            explanation: "O logger processa mensagens de severidade igual ou superior ao nível configurado (WARNING < ERROR < CRITICAL)."
          },
          debugging: {
            q: "Um colega clonou seu repositório do GitHub, mas ao rodar o projeto recebeu ModuleNotFoundError. Qual artefato faltou atualizar ou instalar no ambiente virtual?",
            options: [
              "Faltou declarar os pacotes no requirements.txt (ou pyproject.toml) e executar pip install -r requirements.txt dentro do venv.",
              "Faltou subir a pasta __pycache__ para o GitHub.",
              "Faltou apagar o arquivo __init__.py.",
              "Faltou usar variáveis globais."
            ],
            correct: 0,
            explanation: "A pasta .venv não deve ser versionada no Git; em vez disso, versionamos o manifesto requirements.txt/pyproject.toml."
          }
        },
        exerciseId: "ex_lvl_7",
        projectId: 7
      },
      {
        id: 8,
        tag: "Nível 8 • Banco de Dados",
        title: "Bancos de Dados Relacionais, SQL & Persistência Segura",
        subtitle: "SQL, SQLite, PostgreSQL, CRUD, Conexões, Consultas Parametrizadas, Relacionamentos e Integração com Python",
        objective: "Projetar tabelas relacionais, executar operações CRUD seguras contra SQL Injection e integrar bancos de dados ao Python.",
        prerequisites: "Níveis 1 a 7.",
        analogyTitle: "🛡️ Rigor Técnico: Consultas Parametrizadas (?) Protegem Contra SQL Injection!",
        analogyBody: "Jamais monte queries SQL concatenando strings ou usando f-strings com dados do usuário (ex: f\"SELECT * FROM users WHERE nome = '{entrada}'\"), pois um atacante pode injetar comandos SQL destrutivos. Use sempre marcadores de parâmetros ('?' no sqlite3 ou '%s' no psycopg/PostgreSQL) passando os valores em uma tupla separada: o driver do banco trata os dados estritamente como valores literais e nunca como código executável.",
        spiralConnection: "Evolui a persistência em arquivos JSON (Nível 5) para armazenamento transacional ACID com consultas relacionais.",
        topics: [
          {
            name: "Conexão sqlite3, Context Manager & DDL (CREATE TABLE)",
            why: "Criar tabelas tipadas com chave primária (PRIMARY KEY) e gerenciar transações com commit/rollback automático.",
            syntax: "import sqlite3\nwith sqlite3.connect(':memory:') as conn:\n    conn.execute('CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL)')",
            anatomy: [
              { part: "with sqlite3.connect(...)", role: "Confirma (commit) a transação no sucesso ou faz rollback se houver exceção", color: "text-emerald-300" },
              { part: "PRIMARY KEY", role: "Identificador único indexado de cada linha na tabela", color: "text-sky-300" }
            ]
          },
          {
            name: "CRUD Seguro com Queries Parametrizadas",
            why: "Inserir, consultar, atualizar e remover registros separando a estrutura do comando SQL dos parâmetros de dados.",
            syntax: "cursor = conn.cursor()\ncursor.execute('INSERT INTO produtos (nome, preco) VALUES (?, ?)', ('Teclado', 199.90))\ncursor.execute('SELECT nome, preco FROM produtos WHERE preco > ?', (100.0,))\nlinhas = cursor.fetchall()",
            anatomy: [
              { part: "(?, ?)", role: "Placeholders seguros avaliados pelo motor do banco", color: "text-amber-300" },
              { part: "(100.0,)", role: "Tupla de 1 elemento (note a vírgula obrigatória)", color: "text-purple-300" }
            ]
          },
          {
            name: "Relacionamentos (FOREIGN KEY), JOIN & PostgreSQL",
            why: "Relacionar entidades (ex: Clientes e Pedidos) sem duplicar dados cadastrais.",
            syntax: "SELECT c.nome, p.total\nFROM pedidos p\nINNER JOIN clientes c ON p.cliente_id = c.id\nWHERE p.total >= 500;",
            anatomy: [
              { part: "INNER JOIN ... ON", role: "Combina linhas de duas tabelas quando a chave estrangeira coincide com a primária", color: "text-sky-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Por que devemos usar 'cursor.execute(\"SELECT * FROM usuarios WHERE email = ?\", (email,))' em vez de uma f-string?",
            options: [
              "Para prevenir ataques de SQL Injection, garantindo que o driver trate o valor de 'email' apenas como dado literal e nunca como comando SQL.",
              "Porque o Python não permite o caractere '@' dentro de f-strings.",
              "Porque queries com f-string não retornam colunas numéricas.",
              "Apenas por estética visual."
            ],
            correct: 0,
            explanation: "Queries parametrizadas separam a compilação da árvore sintática SQL do envio dos parâmetros de dados."
          },
          interpretation: {
            q: "Na chamada cursor.execute('SELECT * FROM itens WHERE id = ?', (5,)), por que há uma vírgula após o 5 em (5,)?",
            options: [
              "Porque o segundo argumento de execute() deve ser uma sequência (como uma tupla), e em Python (5) sem vírgula é apenas o inteiro 5 entre parênteses.",
              "Para converter o número 5 em ponto flutuante.",
              "Para buscar os 5 primeiros registros.",
              "É um erro de sintaxe; tuplas não usam vírgula."
            ],
            correct: 0,
            explanation: "Em Python, uma tupla de um único elemento exige a vírgula final: (5,)."
          },
          debugging: {
            q: "Um script inseriu dados num banco SQLite sem usar 'with conn:' e fechou a conexão sem chamar 'conn.commit()'. O que aconteceu com os dados inseridos?",
            options: [
              "As alterações da transação pendente foram perdidas (não persistidas em disco).",
              "Os dados foram salvos normalmente em formato CSV.",
              "A tabela inteira foi apagada com DROP TABLE.",
              "O banco converteu os dados para variáveis globais."
            ],
            correct: 0,
            explanation: "Em transações SQLite, alterações DML (INSERT/UPDATE/DELETE) exigem commit explícito ou o uso de 'with conn:' como gerenciador de transação."
          }
        },
        exerciseId: "ex_lvl_8",
        projectId: 8
      },
      {
        id: 9,
        tag: "Nível 9 • Engenharia de Software",
        title: "Arquitetura de Software, SOLID, Testes & Refatoração",
        subtitle: "Arquitetura em camadas, Testes Unitários e de Integração, Refatoração, Princípios SOLID, Tratamento de Erros de Domínio e SemVer",
        objective: "Projetar sistemas desacoplados, fáceis de manter e cobertos por testes unitários e de integração.",
        prerequisites: "Níveis 1 a 8.",
        analogyTitle: "🏛️ Modelo Mental: Separação de Responsabilidades e Inversão de Dependência (SOLID)",
        analogyBody: "Um software difícil de manter geralmente mistura leitura de banco de dados, cálculo de imposto e formatação de tela dentro da mesma função de 300 linhas. Aplicando o Princípio da Responsabilidade Única (SRP) e a Inversão de Dependência (DIP), isolamos as regras de negócio puras (Domínio) dos detalhes externos (Banco, HTTP, UI). Assim, podemos testar toda a lógica de negócio em milissegundos usando objetos dublês (Mocks/Fakes) sem precisar subir um servidor real.",
        spiralConnection: "Eleva as classes do Nível 5 e o banco do Nível 8 a uma arquitetura profissional em camadas.",
        topics: [
          {
            name: "Princípios SOLID em Python (SRP, OCP, DIP)",
            why: "Evitar classes gigantes ('God Objects') e permitir trocar o meio de pagamento ou banco de dados sem reescrever as regras de negócio.",
            syntax: "from typing import Protocol\n\nclass Notificador(Protocol):\n    def enviar(self, destino: str, msg: str) -> bool: ...\n\nclass ServicoPedido:\n    def __init__(self, notificador: Notificador):\n        self.notificador = notificador",
            anatomy: [
              { part: "Protocol", role: "Define uma interface estrutural (Duck Typing tipado)", color: "text-purple-300" },
              { part: "Injeção de Dependência", role: "ServicoPedido recebe a abstração Notificador no construtor", color: "text-emerald-300" }
            ]
          },
          {
            name: "Testes Unitários vs Testes de Integração",
            why: "Testes unitários validam regras de negócio isoladas em memória; testes de integração validam a comunicação real com banco ou APIs.",
            syntax: "class NotificadorFake:\n    def __init__(self):\n        self.enviados = []\n    def enviar(self, destino: str, msg: str) -> bool:\n        self.enviados.append((destino, msg))\n        return True",
            anatomy: [
              { part: "NotificadorFake", role: "Dublê de teste em memória que evita disparar e-mails reais durante os testes", color: "text-sky-300" }
            ]
          },
          {
            name: "Exceções de Domínio Customizadas & Refatoração",
            why: "Expressar falhas de negócio claramente (ex: SaldoInsuficienteError) e melhorar a estrutura interna do código preservando os testes verdes.",
            syntax: "class SaldoInsuficienteError(Exception):\n    pass",
            anatomy: [
              { part: "class ... (Exception):", role: "Cria exceção semântica específica da regra de negócio", color: "text-rose-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Qual é o objetivo central de injetar uma abstração (ou Protocol) no construtor de uma classe de serviço em vez de instanciar o cliente de banco/e-mail diretamente dentro dela?",
            options: [
              "Desacoplar a regra de negócio da infraestrutura concreta, permitindo substituir a implementação ou usar Fakes/Mocks em testes unitários rápidos.",
              "Aumentar o consumo de memória RAM do servidor.",
              "Impedir o uso de métodos __init__.",
              "Evitar o uso de funções em Python."
            ],
            correct: 0,
            explanation: "A Inversão e Injeção de Dependência tornam o núcleo de negócio independente de detalhes de infraestrutura e altamente testável."
          },
          interpretation: {
            q: "No versionamento semântico (SemVer) '2.4.1', o que indica o incremento do primeiro número (MAJOR, para 3.0.0)?",
            options: [
              "Mudanças incompatíveis na API pública (breaking changes).",
              "Apenas correção de um pequeno erro de digitação.",
              "Adição de funcionalidade mantendo total compatibilidade retroativa.",
              "Quantidade de desenvolvedores na equipe."
            ],
            correct: 0,
            explanation: "No formato MAJOR.MINOR.PATCH, MAJOR indica mudança incompatível, MINOR indica nova funcionalidade compatível e PATCH indica correção de bug."
          },
          debugging: {
            q: "Durante uma refatoração para extrair funções menores, como garantimos com confiança que não alteramos o comportamento externo do sistema?",
            options: [
              "Executando a suíte de testes automatizados antes e depois de cada pequeno passo de refatoração.",
              "Apagando os testes antigos antes de mexer no código.",
              "Olhando apenas se o código não tem linhas sublinhadas no editor.",
              "Trocando todos os nomes de variáveis para uma única letra."
            ],
            correct: 0,
            explanation: "Refatoração segura apoia-se em uma rede de testes automatizados que validam que entradas e saídas permanecem idênticas."
          }
        },
        exerciseId: "ex_lvl_9",
        projectId: 9
      },
      {
        id: 10,
        tag: "Nível 10 • Desenvolvimento de APIs",
        title: "Desenvolvimento de APIs REST com FastAPI & Validação Pydantic",
        subtitle: "HTTP, REST, FastAPI, Rotas, Endpoints, Autenticação, Validação Pydantic e Consumo de APIs Externas",
        objective: "Construir e consumir APIs HTTP RESTful com validação automática de contratos JSON, códigos de status semânticos e autenticação.",
        prerequisites: "Níveis 1 a 9.",
        analogyTitle: "🌐 Modelo Mental: Contrato HTTP REST e Validação de Fronteira com Pydantic",
        analogyBody: "Uma API REST expõe recursos através de URLs (endpoints) operados por verbos HTTP padronizados: GET (leitura idempotente), POST (criação), PUT/PATCH (atualização) e DELETE (remoção), respondendo com códigos de status claros (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 422 Unprocessable Entity). No FastAPI, modelos Pydantic validam e convertem o payload JSON na fronteira de entrada antes que dados inválidos cheguem à sua lógica de negócio.",
        spiralConnection: "Expõe os serviços do Nível 9 e o banco do Nível 8 para clientes web e mobile via JSON.",
        topics: [
          {
            name: "FastAPI, Rotas, Verbos HTTP & Status Codes",
            why: "Declarar endpoints assíncronos ou síncronos com geração automática de documentação OpenAPI (Swagger).",
            syntax: "from fastapi import FastAPI, status\napp = FastAPI()\n\n@app.get('/saude', status_code=status.HTTP_200_OK)\ndef verificar_saude():\n    return {'status': 'operacional'}",
            anatomy: [
              { part: "@app.get('/saude')", role: "Decorator que registra a função como handler de requisições GET em /saude", color: "text-emerald-300" },
              { part: "return {'status': ...}", role: "FastAPI serializa automaticamente o dicionário/modelo para JSON", color: "text-sky-300" }
            ]
          },
          {
            name: "Validação de Entrada com Pydantic (BaseModel)",
            why: "Rejeitar automaticamente payloads malformados com erro 422 detalhando exatamente qual campo falhou.",
            syntax: "from pydantic import BaseModel, Field\n\nclass NovoProduto(BaseModel):\n    nome: str = Field(min_length=2)\n    preco: float = Field(gt=0)\n\n@app.post('/produtos', status_code=201)\ndef criar_produto(item: NovoProduto):\n    return {'criado': item.nome, 'preco': item.preco}",
            anatomy: [
              { part: "BaseModel", role: "Classe base do Pydantic que valida tipos e restrições em tempo de execução", color: "text-purple-300" },
              { part: "Field(gt=0)", role: "Garante que o preço seja estritamente maior que zero", color: "text-amber-300" }
            ]
          },
          {
            name: "Autenticação Bearer/JWT & Consumo de APIs Externas",
            why: "Proteger rotas privadas com tokens de acesso e consumir serviços externos tratando timeouts e erros de rede.",
            syntax: "import httpx\n\ndef consultar_cep(cep: str) -> dict:\n    resp = httpx.get(f'https://viacep.com.br/ws/{cep}/json/', timeout=5.0)\n    resp.raise_for_status()\n    return resp.json()",
            anatomy: [
              { part: "timeout=5.0", role: "Impede que a aplicação fique travada indefinidamente se o servidor externo não responder", color: "text-rose-300" },
              { part: "resp.raise_for_status()", role: "Lança exceção caso o status HTTP seja 4xx ou 5xx", color: "text-emerald-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Em uma API REST bem projetada com FastAPI, qual verbo HTTP e código de status são mais adequados ao criar um novo recurso com sucesso?",
            options: [
              "Verbo POST retornando status 201 Created.",
              "Verbo GET retornando status 404 Not Found.",
              "Verbo DELETE retornando status 500 Internal Server Error.",
              "Verbo GET enviando senha na URL para criar usuário."
            ],
            correct: 0,
            explanation: "POST é o verbo padrão para criação não-idempotente de recursos e 201 Created confirma que o recurso foi instanciado."
          },
          interpretation: {
            q: "O que o FastAPI faz automaticamente quando um cliente envia {\"nome\": \"TV\", \"preco\": \"texto_invalido\"} para um endpoint tipado com Pydantic onde preco: float?",
            options: [
              "Interrompe a requisição antes de entrar na função e retorna HTTP 422 (Unprocessable Entity) com o detalhe do erro de validação.",
              "Converte 'texto_invalido' para 999.99 silenciosamente.",
              "Derruba o servidor web inteiro.",
              "Salva o texto no banco de dados ignorando o tipo."
            ],
            correct: 0,
            explanation: "O Pydantic tenta fazer o parsing/validação e, se não for conversível para float, o FastAPI responde com HTTP 422 padronizado."
          },
          debugging: {
            q: "Uma integração que consome uma API externa de pagamentos às vezes trava a thread por vários minutos quando o serviço parceiro fica lento. Qual parâmetro essencial faltou na chamada HTTP?",
            options: [
              "Definir um timeout explícito (ex: timeout=5.0) e tratar a exceção de Timeout.",
              "Trocar https por ftp.",
              "Remover o cabeçalho Content-Type.",
              "Usar print() antes da chamada."
            ],
            correct: 0,
            explanation: "Toda chamada de rede em produção deve especificar um timeout explícito para evitar exaustão de conexões e workers."
          }
        },
        exerciseId: "ex_lvl_10",
        projectId: 10
      },
      {
        id: 11,
        tag: "Nível 11 • Automação Profissional",
        title: "Automação de Processos, Sistema de Arquivos, Planilhas & Web Scraping Ético",
        subtitle: "Automação de tarefas, pathlib, diretórios, planilhas CSV/Excel, web scraping responsável, integrações e agendamentos",
        objective: "Automatizar fluxos operacionais repetitivos envolvendo arquivos em lote, relatórios tabulares, extração ética de dados e rotinas agendadas.",
        prerequisites: "Níveis 1 a 10.",
        analogyTitle: "🤖 Modelo Mental: Idempotência em Scripts de Automação e Manipulação com pathlib",
        analogyBody: "Um bom robô de automação precisa ser idempotente: se ele rodar duas vezes seguidas sobre a mesma pasta ou planilha (por exemplo, após uma falha de rede), ele não deve duplicar faturas nem corromper arquivos já movidos. Utilizamos a biblioteca orientada a objetos 'pathlib.Path' para manipular caminhos de arquivos de forma independente de sistema operacional (Windows/Linux/macOS).",
        spiralConnection: "Combina manipulação de arquivos (Nível 5), HTTP (Nível 10) e tratamento de erros em pipelines autônomos.",
        topics: [
          {
            name: "Manipulação Moderna de Arquivos & Diretórios (pathlib)",
            why: "Percorrer pastas, filtrar extensões e mover arquivos sem concatenar barras '/' ou '\\' manualmente.",
            syntax: "from pathlib import Path\n\npasta = Path('relatorios_brutos')\nfor arq in pasta.glob('*.csv'):\n    destino = Path('processados') / arq.name",
            anatomy: [
              { part: "Path('...') / arq.name", role: "O operador / une caminhos de forma segura em qualquer sistema operacional", color: "text-emerald-300" },
              { part: ".glob('*.csv')", role: "Itera sobre todos os arquivos que correspondem ao padrão", color: "text-sky-300" }
            ]
          },
          {
            name: "Automação de Planilhas & Saneamento de Dados Tabulares",
            why: "Ler lotes de planilhas, padronizar colunas, remover linhas vazias e gerar consolidados gerenciais.",
            syntax: "import csv\nwith open('vendas.csv', 'r', encoding='utf-8') as f:\n    leitor = csv.DictReader(f)\n    total = sum(float(linha['valor']) for linha in leitor if linha['valor'])",
            anatomy: [
              { part: "csv.DictReader(f)", role: "Lê cada linha da planilha como um dicionário indexado pelo cabeçalho", color: "text-amber-300" }
            ]
          },
          {
            name: "Web Scraping Responsável, Rate Limiting & Agendamento",
            why: "Extrair informações públicas respeitando 'robots.txt', aplicando intervalos entre requisições (rate limiting) e preferindo APIs oficiais quando disponíveis.",
            syntax: "from bs4 import BeautifulSoup\n\nsoup = BeautifulSoup(html_pagina, 'html.parser')\ntitulos = [h2.get_text(strip=True) for h2 in soup.select('article h2')]",
            anatomy: [
              { part: "soup.select('article h2')", role: "Localiza elementos HTML usando seletores CSS", color: "text-purple-300" },
              { part: "get_text(strip=True)", role: "Extrai o conteúdo textual limpo sem tags HTML", color: "text-emerald-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "O que significa construir uma rotina de automação 'idempotente'?",
            options: [
              "Garantir que executar o script uma ou várias vezes para o mesmo lote produza o mesmo estado final sem duplicar registros ou efeitos colaterais indesejados.",
              "Executar o script sem usar funções nem classes.",
              "Fazer o máximo possível de requisições por segundo sem pausa.",
              "Apagar todos os logs do servidor após a execução."
            ],
            correct: 0,
            explanation: "Idempotência é fundamental em automações agendadas (cron/workers), pois reexecuções por falha parcial são comuns."
          },
          interpretation: {
            q: "Qual vantagem o 'csv.DictReader' oferece sobre o 'csv.reader' tradicional ao automatizar planilhas?",
            options: [
              "Permite acessar os valores de cada linha pelo nome da coluna (ex: linha['preco']) em vez de depender de índices numéricos frágeis (linha[3]).",
              "Converte automaticamente arquivos PDF em imagens.",
              "Dispensa a abertura do arquivo.",
              "Altera o arquivo original no disco sem permissão."
            ],
            correct: 0,
            explanation: "Acessar colunas por nome torna o script resiliente caso a ordem das colunas mude na planilha."
          },
          debugging: {
            q: "Um script de automação funciona no Linux, mas quebra no Windows porque os caminhos foram montados com 'pasta + \"/\" + arquivo'. Qual é a solução recomendada na biblioteca padrão?",
            options: [
              "Utilizar pathlib.Path (ex: Path(pasta) / arquivo), que resolve o separador nativo de cada sistema operacional.",
              "Duplicar todo o código com if sys.platform == 'win32'.",
              "Salvar todos os arquivos na pasta raiz C:\\.",
              "Não usar subpastas em projetos Python."
            ],
            correct: 0,
            explanation: "pathlib.Path abstrai diferenças entre caminhos POSIX (/) e Windows (\\) com uma API orientada a objetos."
          }
        },
        exerciseId: "ex_lvl_11",
        projectId: 11
      },
      {
        id: 12,
        tag: "Nível 12 • Python Aplicado à IA",
        title: "Ciência de Dados, LLMs, Embeddings, RAG & Agentes de IA",
        subtitle: "NumPy, Pandas, Manipulação de Dados, APIs de LLMs, Tokens, Embeddings, Vetores, RAG, Function Calling, Agentes e Avaliação",
        objective: "Manipular dados vetorizados com NumPy/Pandas e desenvolver aplicações modernas de Inteligência Artificial com LLMs, busca semântica (RAG), chamada de ferramentas e avaliação rigorosa.",
        prerequisites: "Níveis 1 a 11.",
        analogyTitle: "🧠 Modelo Mental: Embeddings Vetoriais, RAG (Geração Aumentada por Recuperação) e Function Calling",
        analogyBody: "Modelos de Linguagem (LLMs) processam texto dividido em Tokens e não possuem acesso nativo aos dados privados ou atualizados da sua empresa. Para evitar alucinações sem precisar re-treinar o modelo, usamos RAG: convertemos documentos em vetores numéricos de significado (Embeddings), calculamos a Similaridade de Cosseno usando álgebra vetorial (NumPy) para recuperar os trechos mais relevantes e os injetamos no prompt como contexto fundamentado. Com Function Calling, o modelo devolve um JSON estruturado solicitando a execução de uma função Python real.",
        spiralConnection: "Ápice da trilha: integra estruturas de dados, POO, APIs REST, validação Pydantic e automação em sistemas inteligentes.",
        topics: [
          {
            name: "Vetorização com NumPy & Análise Tabular com Pandas",
            why: "Executar cálculos matriciais em código compilado C (sem loops Python lentos) e filtrar/agregar tabelas com DataFrames.",
            syntax: "import numpy as np\n\n# Similaridade de cosseno entre dois vetores de embedding:\ndef similaridade_cosseno(v1: np.ndarray, v2: np.ndarray) -> float:\n    return float(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))",
            anatomy: [
              { part: "np.dot(v1, v2)", role: "Produto escalar vetorizado entre dois arrays NumPy", color: "text-emerald-300" },
              { part: "np.linalg.norm(...)", role: "Norma euclidiana (magnitude) do vetor", color: "text-sky-300" }
            ]
          },
          {
            name: "Tokens, Embeddings, Busca Vetorial & Arquitetura RAG",
            why: "Fundamentar respostas de LLMs em documentos verificados recuperados por proximidade semântica.",
            syntax: "def montar_prompt_rag(pergunta: str, trechos_recuperados: list[str]) -> str:\n    contexto = '\\n---\\n'.join(trechos_recuperados)\n    return f'Responda APENAS com base no contexto abaixo:\\n{contexto}\\n\\nPergunta: {pergunta}'",
            anatomy: [
              { part: "trechos_recuperados", role: "Chunks de documentos mais próximos do embedding da pergunta", color: "text-amber-300" },
              { part: "Restrição de Grounding", role: "Instrução explícita para reduzir alucinações fora do contexto", color: "text-purple-300" }
            ]
          },
          {
            name: "Function Calling (Tools), Agentes & Avaliação de Saídas",
            why: "Permitir que o LLM acione funções Python determinísticas (ex: consultar estoque no SQL) e medir qualidade com métricas objetivas.",
            syntax: "ferramentas = {\n    'consultar_preco': lambda sku: {'sku': sku, 'preco': 149.90}\n}\n# Quando o modelo solicita tool_call={'name': 'consultar_preco', 'args': {'sku': 'A1'}}:\nresultado_tool = ferramentas['consultar_preco']('A1')",
            anatomy: [
              { part: "ferramentas[nome](**args)", role: "Despacho seguro para funções registradas em um dicionário permitido (allowlist)", color: "text-emerald-300" }
            ]
          }
        ],
        dimensions: {
          conceptual: {
            q: "Qual problema fundamental a arquitetura RAG (Retrieval-Augmented Generation) resolve em aplicações corporativas com LLMs?",
            options: [
              "Permite que o LLM responda com base em documentos privados ou atualizados recuperados por busca semântica/vetorial, reduzindo alucinações sem precisar re-treinar os pesos do modelo.",
              "Elimina a necessidade de usar tokens na comunicação com a API.",
              "Substitui completamente o interpretador Python por código HTML.",
              "Faz com que matrizes NumPy ocupem zero bytes na memória."
            ],
            correct: 0,
            explanation: "O RAG combina recuperação de informação (via embeddings/busca híbrida) com geração condicionada ao contexto recuperado."
          },
          interpretation: {
            q: "Se dois vetores de embedding não-nulos têm exatamente a mesma direção e sentido no espaço vetorial, qual será o valor da Similaridade de Cosseno entre eles?",
            options: ["1.0", "0.0", "-1.0", "100.0"],
            correct: 0,
            explanation: "O cosseno do ângulo 0° é 1.0 (máxima similaridade direcional); vetores ortogonais têm cosseno 0.0 e opostos têm -1.0."
          },
          debugging: {
            q: "Ao implementar Function Calling para um Agente de IA, por que NUNCA devemos passar a string retornada pelo LLM diretamente para eval() em Python?",
            options: [
              "Porque permite execução de código arbitrário (Remote Code Execution) via Prompt Injection; devemos validar o JSON com Pydantic e despachar apenas para funções cadastradas numa allowlist.",
              "Porque eval() não aceita strings em Python 3.",
              "Porque eval() consome tokens dobrados na API.",
              "Porque dicionários não podem conter funções."
            ],
            correct: 0,
            explanation: "Segurança em IA exige validar os argumentos estruturados e invocar exclusivamente ferramentas pré-autorizadas no mapa de funções."
          }
        },
        exerciseId: "ex_lvl_12",
        projectId: 12
      }
    ];

    // =========================================================================
    // 2. MENTAL SIMULATOR SCENARIOS (10 SCENARIOS: 6 PRESERVED + 4 NEW)
    // =========================================================================
    const simScenarios = {
      variaveis: {
        title: "Variáveis como Referências a Objetos Imutáveis",
        scope: "Global",
        lines: [
          "preco = 100",
          "promo = preco",
          "preco = 80",
          "print(f'Preco: {preco}, Promo: {promo}')"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "O Python instancia o objeto int(100) no Heap e vincula o nome 'preco' à referência desse objeto.",
            vars: [{ name: "preco", val: "100 (id: 0x10A)", type: "int (imutável)", highlight: true }],
            output: ""
          },
          {
            lineIdx: 1,
            explanation: "'promo = preco' copia a referência do objeto atual: agora tanto 'preco' quanto 'promo' apontam para o mesmo objeto int(100).",
            vars: [
              { name: "preco", val: "100 (id: 0x10A)", type: "int", highlight: false },
              { name: "promo", val: "100 (id: 0x10A)", type: "int", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 2,
            explanation: "Como int é imutável, 'preco = 80' cria/referencia o objeto int(80) e redireciona apenas o nome 'preco'. 'promo' continua apontando para 100!",
            vars: [
              { name: "preco", val: "80 (id: 0x10B)", type: "int", highlight: true },
              { name: "promo", val: "100 (id: 0x10A)", type: "int", highlight: false }
            ],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "A f-string avalia as expressões atuais e print() envia o texto formatado para sys.stdout.",
            vars: [
              { name: "preco", val: "80 (id: 0x10B)", type: "int", highlight: false },
              { name: "promo", val: "100 (id: 0x10A)", type: "int", highlight: false }
            ],
            output: "Preco: 80, Promo: 100"
          }
        ]
      },
      loop_filtro: {
        title: "Iteração com Loop For + Filtro Condicional If",
        scope: "Global",
        lines: [
          "vendas = [40, 120, 250]",
          "metas_batidas = []",
          "for v in vendas:",
          "    if v >= 100:",
          "        metas_batidas.append(v)",
          "print(metas_batidas)"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "Aloca um objeto list mutável referenciado por 'vendas' contendo três elementos.",
            vars: [{ name: "vendas", val: "[40, 120, 250]", type: "list", highlight: true }],
            output: ""
          },
          {
            lineIdx: 1,
            explanation: "Cria uma nova lista vazia 'metas_batidas' para acumular os itens filtrados.",
            vars: [
              { name: "vendas", val: "[40, 120, 250]", type: "list", highlight: false },
              { name: "metas_batidas", val: "[]", type: "list", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "1ª Iteração: o iterador da lista entrega 40 para 'v'. A condição '40 >= 100' avalia para False.",
            vars: [
              { name: "v (iteração 1)", val: "40", type: "int", highlight: true },
              { name: "metas_batidas", val: "[]", type: "list", highlight: false }
            ],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "2ª Iteração: 'v' recebe 120. '120 >= 100' é True! O método .append(120) muta a lista 'metas_batidas' in-place.",
            vars: [
              { name: "v (iteração 2)", val: "120", type: "int", highlight: true },
              { name: "metas_batidas", val: "[120]", type: "list", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "3ª Iteração: 'v' recebe 250. '250 >= 100' é True! 250 é anexado ao final de 'metas_batidas'.",
            vars: [
              { name: "v (iteração 3)", val: "250", type: "int", highlight: true },
              { name: "metas_batidas", val: "[120, 250]", type: "list", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 5,
            explanation: "O iterador esgota a lista (StopIteration tratado internamente pelo for) e print() exibe a lista final.",
            vars: [{ name: "metas_batidas", val: "[120, 250]", type: "list", highlight: false }],
            output: "[120, 250]"
          }
        ]
      },
      dicionario: {
        title: "Dicionário: Tabela Hash com Busca Média O(1)",
        scope: "Global",
        lines: [
          "estoque = {'teclado': 5, 'mouse': 12}",
          "estoque['teclado'] += 3",
          "estoque['monitor'] = 4",
          "print(estoque)"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "Cria um dict (tabela hash que preserva ordem de inserção) mapeando chaves hashables ('teclado', 'mouse') aos seus valores.",
            vars: [{ name: "estoque", val: "{'teclado': 5, 'mouse': 12}", type: "dict", highlight: true }],
            output: ""
          },
          {
            lineIdx: 1,
            explanation: "Calcula hash('teclado') em tempo médio O(1), lê o valor 5 e atualiza a chave para apontar para 8.",
            vars: [{ name: "estoque", val: "{'teclado': 8, 'mouse': 12}", type: "dict", highlight: true }],
            output: ""
          },
          {
            lineIdx: 2,
            explanation: "Insere uma nova entrada 'monitor': 4 mantendo a ordem de inserção das chaves.",
            vars: [{ name: "estoque", val: "{'teclado': 8, 'mouse': 12, 'monitor': 4}", type: "dict", highlight: true }],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "Exibe a representação textual do dicionário no terminal.",
            vars: [{ name: "estoque", val: "{'teclado': 8, 'mouse': 12, 'monitor': 4}", type: "dict", highlight: false }],
            output: "{'teclado': 8, 'mouse': 12, 'monitor': 4}"
          }
        ]
      },
      mutabilidade_aliasing: {
        title: "Mutabilidade (List) vs Imutabilidade (Tuple) & Aliasing",
        scope: "Global",
        lines: [
          "lista_a = [10, 20]",
          "lista_b = lista_a",
          "lista_b.append(30)",
          "tupla_fixa = (10, 20)",
          "print(lista_a, tupla_fixa)"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "Cria o objeto mutável list [10, 20] no endereço de memória 0x200 e vincula 'lista_a' a ele.",
            vars: [{ name: "lista_a", val: "[10, 20] (id: 0x200)", type: "list (mutável)", highlight: true }],
            output: ""
          },
          {
            lineIdx: 1,
            explanation: "ATENÇÃO (Aliasing): 'lista_b = lista_a' NÃO clona a lista! Ambos os nomes apontam para o MESMO objeto 0x200.",
            vars: [
              { name: "lista_a", val: "[10, 20] (id: 0x200)", type: "list", highlight: false },
              { name: "lista_b", val: "[10, 20] (id: 0x200)", type: "list (alias)", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 2,
            explanation: "Como list é mutável, 'lista_b.append(30)' altera o objeto 0x200 in-place. Por isso 'lista_a' também passa a ver [10, 20, 30]!",
            vars: [
              { name: "lista_a", val: "[10, 20, 30] (id: 0x200)", type: "list", highlight: true },
              { name: "lista_b", val: "[10, 20, 30] (id: 0x200)", type: "list", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "Já 'tupla_fixa = (10, 20)' cria uma tuple imutável: ela não possui método .append() e garante integridade constante.",
            vars: [
              { name: "lista_a", val: "[10, 20, 30]", type: "list", highlight: false },
              { name: "tupla_fixa", val: "(10, 20)", type: "tuple (imutável)", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "Imprime 'lista_a' (modificada pelo alias) e a tupla imutável.",
            vars: [
              { name: "lista_a", val: "[10, 20, 30]", type: "list", highlight: false },
              { name: "tupla_fixa", val: "(10, 20)", type: "tuple", highlight: false }
            ],
            output: "[10, 20, 30] (10, 20)"
          }
        ]
      },
      funcao_escopo: {
        title: "Função: Parâmetros, Frame Local e Return",
        scope: "Global / Local",
        lines: [
          "def aplicar_cupom(valor, desc=10):",
          "    liquido = valor - desc",
          "    return liquido",
          "final = aplicar_cupom(150, 30)",
          "print(f'Pagar: R$ {final}')"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "O interpretador compila o bloco 'def' e vincula o nome 'aplicar_cupom' ao objeto function no escopo Global.",
            vars: [{ name: "aplicar_cupom", val: "<function(valor, desc=10)>", type: "function", highlight: true }],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "Ao chamar aplicar_cupom(150, 30), os argumentos 150 e 30 são atribuídos aos parâmetros 'valor' e 'desc' em um novo Stack Frame Local.",
            vars: [
              { name: "[Frame Local] valor", val: "150", type: "int", highlight: true },
              { name: "[Frame Local] desc", val: "30", type: "int", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 1,
            explanation: "A variável local 'liquido' recebe 120. Ela existe exclusivamente dentro do namespace local desta execução.",
            vars: [
              { name: "[Frame Local] liquido", val: "120", type: "int", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 2,
            explanation: "'return liquido' devolve a referência do objeto 120 para o chamador e destrói o Stack Frame Local.",
            vars: [{ name: "Valor Retornado", val: "120", type: "int (return)", highlight: true }],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "No escopo Global, 'final' recebe 120 e print() escreve o texto no console.",
            vars: [{ name: "[Global] final", val: "120", type: "int", highlight: true }],
            output: "Pagar: R$ 120"
          }
        ]
      },
      escopo_legb: {
        title: "Regra de Resolução de Escopo LEGB (Local vs Global)",
        scope: "LEGB",
        lines: [
          "taxa = 10  # Escopo Global",
          "def calcular(base):",
          "    taxa = 25  # Escopo Local (sombra)",
          "    return base + taxa",
          "res = calcular(100)",
          "print(res, taxa)"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "Define a variável 'taxa = 10' no namespace Global (G).",
            vars: [{ name: "[Global] taxa", val: "10", type: "int", highlight: true }],
            output: ""
          },
          {
            lineIdx: 2,
            explanation: "Dentro de calcular(100), 'taxa = 25' cria uma nova variável 'taxa' no escopo Local (L), sem alterar a variável Global 'taxa'!",
            vars: [
              { name: "[Global] taxa", val: "10", type: "int", highlight: false },
              { name: "[Local] base", val: "100", type: "int", highlight: false },
              { name: "[Local] taxa", val: "25", type: "int", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "Pela regra LEGB, 'base + taxa' busca 'taxa' primeiro no escopo Local (25) e retorna 125.",
            vars: [
              { name: "[Global] taxa", val: "10", type: "int", highlight: false },
              { name: "Retorno", val: "125", type: "int", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 5,
            explanation: "Fora da função, 'res' vale 125 e a variável Global 'taxa' permanece intacta valendo 10!",
            vars: [
              { name: "[Global] res", val: "125", type: "int", highlight: true },
              { name: "[Global] taxa", val: "10", type: "int", highlight: true }
            ],
            output: "125 10"
          }
        ]
      },
      poo_objeto: {
        title: "POO: Instanciação, __init__ e Referência self",
        scope: "Heap / Objetos",
        lines: [
          "class Heroi:",
          "    def __init__(self, nome, energia):",
          "        self.nome = nome",
          "        self.energia = energia",
          "h1 = Heroi('Link', 100)",
          "h2 = Heroi('Zelda', 150)"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "Cria o objeto de classe 'Heroi' contendo o método inicializador __init__.",
            vars: [{ name: "Heroi", val: "<class 'Heroi'>", type: "type", highlight: true }],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "Aloca uma nova instância (0x301) e invoca Heroi.__init__(0x301, 'Link', 100), onde 'self' referencia 0x301.",
            vars: [
              { name: "self (em __init__)", val: "Instância 0x301 (h1)", type: "Heroi", highlight: true },
              { name: "h1.__dict__", val: "{'nome': 'Link', 'energia': 100}", type: "dict", highlight: true }
            ],
            output: ""
          },
          {
            lineIdx: 5,
            explanation: "Aloca uma segunda instância independente (0x302) onde 'self' agora referencia h2.",
            vars: [
              { name: "h1 (0x301)", val: "Heroi(nome='Link', energia=100)", type: "Heroi", highlight: false },
              { name: "h2 (0x302)", val: "Heroi(nome='Zelda', energia=150)", type: "Heroi", highlight: true }
            ],
            output: "Duas instâncias independentes alocadas no Heap."
          }
        ]
      },
      heranca_polimorfismo: {
        title: "POO: Herança, super() e Despacho Polimórfico",
        scope: "Classes & MRO",
        lines: [
          "class Frete:",
          "    def calcular(self, peso): return peso * 2",
          "class FreteExpresso(Frete):",
          "    def calcular(self, peso): return super().calcular(peso) + 15",
          "f = FreteExpresso()",
          "print(f.calcular(10))"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "Define a superclasse Frete com a implementação base de calcular(peso).",
            vars: [{ name: "Frete", val: "<class 'Frete'>", type: "type", highlight: true }],
            output: ""
          },
          {
            lineIdx: 2,
            explanation: "Define a subclasse FreteExpresso herdando de Frete e sobrescrevendo o método calcular.",
            vars: [{ name: "FreteExpresso", val: "<subclass of Frete>", type: "type", highlight: true }],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "Instancia 'f' como objeto de FreteExpresso.",
            vars: [{ name: "f", val: "<FreteExpresso instance>", type: "FreteExpresso", highlight: true }],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "Ao chamar f.calcular(10), super().calcular(10) executa o método da classe base (10 * 2 = 20) e soma a taxa expressa (+ 15 = 35).",
            vars: [
              { name: "super().calcular(10)", val: "20", type: "int", highlight: true },
              { name: "Retorno Final", val: "35", type: "int", highlight: true }
            ],
            output: "35"
          }
        ]
      },
      generator: {
        title: "Generator (yield): Avaliação Lazy e Suspensão de Frame",
        scope: "Generator Frame",
        lines: [
          "def gerar_senhas():",
          "    yield 'A-01'",
          "    yield 'A-02'",
          "fila = gerar_senhas()",
          "print(next(fila))",
          "print(next(fila))"
        ],
        steps: [
          {
            lineIdx: 3,
            explanation: "Chamar gerar_senhas() retorna um objeto generator com o frame suspenso antes da linha 1 (nenhum código interno rodou ainda).",
            vars: [{ name: "fila", val: "<generator state: CREATED>", type: "generator", highlight: true }],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "O primeiro next(fila) executa até 'yield \"A-01\"', entrega o valor 'A-01' e suspende o frame exatamente na linha 2.",
            vars: [{ name: "fila", val: "<generator state: SUSPENDED @ line 2>", type: "generator", highlight: true }],
            output: "A-01"
          },
          {
            lineIdx: 5,
            explanation: "O segundo next(fila) retoma da linha 2, avança até 'yield \"A-02\"', entrega 'A-02' e suspende na linha 3.",
            vars: [{ name: "fila", val: "<generator state: SUSPENDED @ line 3>", type: "generator", highlight: true }],
            output: "A-01\nA-02"
          }
        ]
      },
      async_event_loop: {
        title: "Execução Assíncrona (async/await) no Event Loop",
        scope: "Event Loop",
        lines: [
          "async def buscar_api(id_req):",
          "    # Cede controle no await I/O",
          "    return f'Dados-{id_req}'",
          "res = await buscar_api(1)",
          "print(res)"
        ],
        steps: [
          {
            lineIdx: 0,
            explanation: "'async def' declara uma função de corrotina. Quando chamada, ela retorna um objeto coroutine para ser agendado no Event Loop.",
            vars: [{ name: "buscar_api", val: "<coroutine function>", type: "async def", highlight: true }],
            output: ""
          },
          {
            lineIdx: 3,
            explanation: "A expressão 'await buscar_api(1)' suspende a corrotina atual enquanto aguarda a operação de I/O, liberando o Event Loop para outras tarefas.",
            vars: [{ name: "Event Loop", val: "Executando buscar_api(1) de forma não-bloqueante", type: "asyncio", highlight: true }],
            output: ""
          },
          {
            lineIdx: 4,
            explanation: "Quando a corrotina conclui, o resultado 'Dados-1' é atribuído a 'res' e impresso.",
            vars: [{ name: "res", val: "'Dados-1'", type: "str", highlight: true }],
            output: "Dados-1"
          }
        ]
      }
    };

    // =========================================================================
    // 3. PYTHON LAB EXERCISES (12 REAL CODING EXERCISES WITH EXPECTED OUTPUT)
    // =========================================================================
    const labExercises = [
      {
        id: "ex_lvl_1",
        level: 1,
        title: "Nível 1: Calculadora de Desconto com f-string",
        desc: "Crie uma variável 'preco = 200' e uma variável 'desconto = 30'. Calcule o valor final na variável 'final' e imprima exatamente: Total a pagar: R$ 170",
        starterCode: "preco = 200\ndesconto = 30\nfinal = preco - desconto\nprint(f'Total a pagar: R$ {final}')",
        stdin: "",
        expectedOutput: "Total a pagar: R$ 170",
        hint: "Use f'Total a pagar: R$ {final}' dentro de print()."
      },
      {
        id: "ex_lvl_2",
        level: 2,
        title: "Nível 2: Filtro de Números Pares com Loop For",
        desc: "Percorra os números de 1 a 6 usando range(1, 7) e imprima apenas os números pares (2, 4 e 6), um por linha.",
        starterCode: "for n in range(1, 7):\n    if n % 2 == 0:\n        print(n)",
        stdin: "",
        expectedOutput: "2\n4\n6",
        hint: "Use o operador módulo (n % 2 == 0) dentro do bloco for."
      },
      {
        id: "ex_lvl_3",
        level: 3,
        title: "Nível 3: List Comprehension & Dicionário de Preços",
        desc: "Dada a lista 'precos = [50, 120, 80, 200]', crie uma lista 'acimade100' apenas com os valores maiores que 100 usando List Comprehension e imprima-a.",
        starterCode: "precos = [50, 120, 80, 200]\nacimade100 = [p for p in precos if p > 100]\nprint(acimade100)",
        stdin: "",
        expectedOutput: "[120, 200]",
        hint: "Sintaxe: [p for p in precos if p > 100]"
      },
      {
        id: "ex_lvl_4",
        level: 4,
        title: "Nível 4: Função Pura com Valor Padrão e Return",
        desc: "Defina uma função 'calcular_frete(peso, taxa=5)' que retorne 'peso * taxa'. Chame a função para peso 8 e imprima o resultado (40).",
        starterCode: "def calcular_frete(peso, taxa=5):\n    return peso * taxa\n\nresultado = calcular_frete(8)\nprint(resultado)",
        stdin: "",
        expectedOutput: "40",
        hint: "Certifique-se de usar 'return peso * taxa' dentro da função e 'print(resultado)' fora."
      },
      {
        id: "ex_lvl_5",
        level: 5,
        title: "Nível 5: Classe Produto & Tratamento de Exceções",
        desc: "Crie uma classe 'Produto' com __init__(self, nome, preco) e um método 'resumo(self)' que retorna f'{self.nome}: R$ {self.preco}'. Instancie Produto('Livro', 60) e imprima o resumo.",
        starterCode: "class Produto:\n    def __init__(self, nome, preco):\n        self.nome = nome\n        self.preco = preco\n\n    def resumo(self):\n        return f'{self.nome}: R$ {self.preco}'\n\np = Produto('Livro', 60)\nprint(p.resumo())",
        stdin: "",
        expectedOutput: "Livro: R$ 60",
        hint: "Guarde os atributos em self.nome e self.preco e retorne a f-string no método resumo(self)."
      },
      {
        id: "ex_lvl_6",
        level: 6,
        title: "Nível 6: Generator com yield & Teste com assert",
        desc: "Crie uma função geradora 'contar_lotes(n)' que use 'yield i * 10' para i em range(1, n + 1). Converta 'contar_lotes(3)' em lista e imprima o resultado.",
        starterCode: "def contar_lotes(n):\n    for i in range(1, n + 1):\n        yield i * 10\n\nlotes = list(contar_lotes(3))\nassert lotes == [10, 20, 30]\nprint(lotes)",
        stdin: "",
        expectedOutput: "[10, 20, 30]",
        hint: "Use 'yield i * 10' dentro do loop for e 'list(contar_lotes(3))' para consumir o gerador."
      },
      {
        id: "ex_lvl_7",
        level: 7,
        title: "Nível 7: Formatação de Log Estruturado & Clean Code",
        desc: "Crie uma função limpa 'formatar_log(nivel, mensagem)' que retorne f'[{nivel.upper()}] {mensagem.strip()}'. Imprima o resultado para ('info', ' Servico iniciado ').",
        starterCode: "def formatar_log(nivel, mensagem):\n    return f'[{nivel.upper()}] {mensagem.strip()}'\n\nprint(formatar_log('info', ' Servico iniciado '))",
        stdin: "",
        expectedOutput: "[INFO] Servico iniciado",
        hint: "Combine .upper() no nível e .strip() na mensagem."
      },
      {
        id: "ex_lvl_8",
        level: 8,
        title: "Nível 8: Validador de Query Parametrizada SQL",
        desc: "Crie uma função 'montar_insert_seguro(nome, preco)' que retorne uma tupla contendo a query parametrizada 'INSERT INTO itens VALUES (?, ?)' e a tupla de parâmetros (nome, preco). Imprima a tupla de parâmetros para ('Mouse', 90).",
        starterCode: "def montar_insert_seguro(nome, preco):\n    sql = 'INSERT INTO itens VALUES (?, ?)'\n    params = (nome, preco)\n    return sql, params\n\nsql, prm = montar_insert_seguro('Mouse', 90)\nprint(prm)",
        stdin: "",
        expectedOutput: "('Mouse', 90)",
        hint: "Retorne a tupla (nome, preco) separada da string SQL."
      },
      {
        id: "ex_lvl_9",
        level: 9,
        title: "Nível 9: Injeção de Dependência & Teste Unitário",
        desc: "Implemente uma função 'processar_pedido(valor, calc_imposto)' que recebe o valor e uma função injetada 'calc_imposto', retornando 'valor + calc_imposto(valor)'. Teste com valor 100 e uma lambda que calcula 15%.",
        starterCode: "def processar_pedido(valor, calc_imposto):\n    return valor + calc_imposto(valor)\n\ntotal = processar_pedido(100, lambda v: int(v * 0.15))\nassert total == 115\nprint(total)",
        stdin: "",
        expectedOutput: "115",
        hint: "Invoque calc_imposto(valor) e some ao valor base."
      },
      {
        id: "ex_lvl_10",
        level: 10,
        title: "Nível 10: Validador de Payload de API REST",
        desc: "Crie uma função 'validar_payload_produto(dados)' que retorna '(201, \"Criado\")' se 'nome' existir em dados e 'dados.get(\"preco\", 0) > 0', ou '(422, \"Invalido\")' caso contrário. Imprima para {'nome': 'Monitor', 'preco': 850}.",
        starterCode: "def validar_payload_produto(dados):\n    if 'nome' in dados and dados.get('preco', 0) > 0:\n        return (201, 'Criado')\n    return (422, 'Invalido')\n\nprint(validar_payload_produto({'nome': 'Monitor', 'preco': 850}))",
        stdin: "",
        expectedOutput: "(201, 'Criado')",
        hint: "Verifique 'nome' in dados e dados.get('preco', 0) > 0."
      },
      {
        id: "ex_lvl_11",
        level: 11,
        title: "Nível 11: Automação e Limpeza Idempotente de Lote",
        desc: "Dada a lista 'arquivos = [\"rel_01.csv\", \"temp.txt\", \"rel_01.csv\", \"rel_02.csv\"]', filtre apenas os terminados em '.csv' sem duplicatas (mantendo ordem de aparição) e imprima a lista resultante.",
        starterCode: "arquivos = ['rel_01.csv', 'temp.txt', 'rel_01.csv', 'rel_02.csv']\nprocessados = []\nfor arq in arquivos:\n    if arq.endswith('.csv') and arq not in processados:\n        processados.append(arq)\nprint(processados)",
        stdin: "",
        expectedOutput: "['rel_01.csv', 'rel_02.csv']",
        hint: "Use arq.endswith('.csv') e verifique se arq not in processados antes do append."
      },
      {
        id: "ex_lvl_12",
        level: 12,
        title: "Nível 12: Produto Escalar & Ranking de Contexto RAG",
        desc: "Dados os vetores 'v_pergunta = [1, 2, 3]' e 'v_doc = [4, 5, 6]', calcule o produto escalar (soma de a*b para cada posição) usando sum() e zip(), e imprima o valor (32).",
        starterCode: "v_pergunta = [1, 2, 3]\nv_doc = [4, 5, 6]\nproduto_escalar = sum(a * b for a, b in zip(v_pergunta, v_doc))\nprint(produto_escalar)",
        stdin: "",
        expectedOutput: "32",
        hint: "1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32."
      }
    ];

    // =========================================================================
    // 4. SPACED REPETITION DECK (24 CARDS WITH FULL TEMPORAL SCHEDULING FIELDS)
    // =========================================================================
    const TODAY_ISO = new Date().toISOString().slice(0, 10);

    function createInitialSrsDeck() {
      const raw = [
        { id: 1, level: 1, topic: "sintaxe", difficulty: "Básico", q: "Como interpolar variáveis e expressões dentro de uma string de forma legível e rápida?", a: "Use f-strings (formatted string literals) prefixando as aspas com f e colocando expressões entre {chaves}.", mental: "A letra 'f' antes das aspas avalia qualquer expressão Python válida dentro de { } em tempo de execução.", code: "nome = 'Bia'\nprint(f'Olá {nome}, 2 + 2 = {2 + 2}')" },
        { id: 2, level: 1, topic: "sintaxe", difficulty: "Básico", q: "Por que 'idade = input()' levanta TypeError ao executarmos 'idade + 5'?", a: "Porque input() retorna sempre um objeto str; Python tem tipagem forte e não soma str com int implicitamente.", mental: "Envolva a leitura com int(input(...)) ou float(input(...)) para instanciar um tipo numérico.", code: "idade = int(input('Sua idade: '))\nprint(idade + 5)" },
        { id: 3, level: 1, topic: "sintaxe", difficulty: "Básico", q: "O que acontece na memória quando executamos 'a = 10' e em seguida 'b = a'?", a: "Tanto o nome 'a' quanto o nome 'b' passam a referenciar o mesmo objeto int(10) na memória.", mental: "Variáveis em Python são referências (nomes) vinculadas a objetos no Heap, não caixas de memória estáticas.", code: "a = 10\nb = a  # 'b' referencia o mesmo objeto 10" },
        { id: 4, level: 2, topic: "fluxo", difficulty: "Básico", q: "Como testar múltiplas condições mutuamente exclusivas garantindo que apenas o primeiro ramo verdadeiro execute?", a: "Use a estrutura if / elif / else.", mental: "Assim que um teste booleano resulta em True, seu bloco roda e todos os demais ramos elif/else são ignorados.", code: "if pts >= 1000:\n    nivel = 'Ouro'\nelif pts >= 500:\n    nivel = 'Prata'\nelse:\n    nivel = 'Comum'" },
        { id: 5, level: 2, topic: "fluxo", difficulty: "Básico", q: "Quando escolher o laço 'for' e quando escolher o laço 'while'?", a: "Use 'for' para percorrer qualquer objeto iterável (listas, strings, range); use 'while' para repetir enquanto uma condição de estado for verdadeira.", mental: "'for' consome itens de um iterador automaticamente; 'while' depende da mudança de uma condição booleana.", code: "for item in lista:\n    processar(item)\nwhile tentativas < 3:\n    tentativas += 1" },
        { id: 6, level: 2, topic: "fluxo", difficulty: "Intermediário", q: "Qual a diferença exata entre 'break' e 'continue' dentro de um loop?", a: "'break' encerra o loop imediatamente; 'continue' interrompe apenas a iteração atual e salta para a próxima.", mental: "'break' sai da estrutura de repetição; 'continue' pula o resto do bloco atual e volta ao topo do loop.", code: "for n in [1, -2, 99, 4]:\n    if n < 0: continue\n    if n == 99: break" },
        { id: 7, level: 3, topic: "estruturas", difficulty: "Intermediário", q: "Qual a diferença técnica entre List [ ], Tuple ( ), Dict {'k': v} e Set {x}?", a: "List: sequência mutável; Tuple: sequência imutável; Dict: mapeamento chave->valor com busca média O(1) e ordem preservada; Set: coleção mutável de itens únicos sem ordem garantida.", mental: "Escolha pelo problema: mutabilidade sequencial (list), integridade fixa (tuple), busca por chave O(1) (dict) ou deduplicação/conjuntos (set).", code: "lista = [1, 2]\ntupla = (-5.79, -35.2)\ndict_ = {'id': 10}\nconj = {1, 2}" },
        { id: 8, level: 3, topic: "estruturas", difficulty: "Intermediário", q: "Como ler uma chave de um dicionário fornecendo um valor padrão caso ela não exista, sem levantar KeyError?", a: "Utilize o método dict.get(chave, valor_padrao).", mental: "Enquanto d['chave'] lança KeyError se ausente, d.get('chave', 0) retorna 0 com segurança.", code: "preco = tabela.get('produto_x', 0.0)" },
        { id: 9, level: 3, topic: "estruturas", difficulty: "Intermediário", q: "Como filtrar e transformar elementos de um iterável em uma nova lista usando uma única linha declarativa?", a: "Use List Comprehension: [expressao for item in iteravel if condicao].", mental: "Combina mapeamento (expressão inicial) e filtragem (if final) em uma construção otimizada.", code: "dobro_pares = [n * 2 for n in numeros if n % 2 == 0]" },
        { id: 10, level: 4, topic: "funcoes", difficulty: "Intermediário", q: "Qual a diferença técnica entre usar 'print(valor)' e 'return valor' dentro de uma função?", a: "'print()' escreve texto na saída padrão (stdout) como efeito colateral e retorna None; 'return' encerra a função e devolve a referência do objeto ao chamador.", mental: "Funções sem instrução return explícita devolvem sempre None.", code: "def calcular_imc(peso, altura):\n    return peso / (altura ** 2)" },
        { id: 11, level: 4, topic: "funcoes", difficulty: "Intermediário", q: "O que significa a regra LEGB na resolução de nomes de variáveis em Python?", a: "É a ordem de busca de escopos: Local -> Enclosing (função externa) -> Global (módulo) -> Built-in (nomes nativos do Python).", mental: "O Python procura o nome do escopo mais interno até o mais externo.", code: "taxa = 0.1  # Global\ndef calc(v):\n    return v * taxa  # Encontra taxa no escopo Global" },
        { id: 12, level: 4, topic: "funcoes", difficulty: "Intermediário", q: "Como ordenar uma lista de dicionários pelo campo 'preco' usando uma função anônima?", a: "Passe 'key=lambda item: item[\"preco\"]' para sort() ou sorted().", mental: "A função key é chamada para cada elemento e devolve o critério de comparação.", code: "produtos.sort(key=lambda item: item['preco'])" },
        { id: 13, level: 5, topic: "poo_arquivos", difficulty: "Intermediário", q: "Qual é a função do parâmetro 'self' nos métodos de instância de uma classe?", a: "'self' recebe explicitamente a referência para a instância específica que invocou o método.", mental: "Quando fazemos obj.metodo(), o Python traduz para Classe.metodo(obj), passando obj como self.", code: "class Conta:\n    def __init__(self, titular):\n        self.titular = titular" },
        { id: 14, level: 5, topic: "poo_arquivos", difficulty: "Intermediário", q: "Por que devemos abrir arquivos usando o gerenciador de contexto 'with open(...) as f:'?", a: "Porque o protocolo Context Manager (__enter__ / __exit__) garante o fechamento automático do arquivo mesmo se ocorrer uma exceção dentro do bloco.", mental: "Evita vazamento de descritores de arquivo (file descriptors).", code: "with open('dados.json', 'r', encoding='utf-8') as f:\n    dados = json.load(f)" },
        { id: 15, level: 5, topic: "poo_arquivos", difficulty: "Intermediário", q: "Como estruturar o tratamento de exceções para capturar erros específicos e executar limpeza garantida?", a: "Use try para o código arriscado, except TipoEspecifico para tratar o erro esperado e finally para limpeza garantida.", mental: "Evite 'except:' genérico sem especificar a classe de exceção.", code: "try:\n    val = int(texto)\nexcept ValueError:\n    val = 0\nfinally:\n     liberar_recurso()" },
        { id: 16, level: 6, topic: "avancado", difficulty: "Avançado", q: "Qual é a diferença real entre retornar uma sequência com 'return lista' e produzi-la com 'yield item'?", a: "'return' encerra a função e devolve o objeto único (se for uma lista completa, todos os itens já estão na RAM); 'yield' cria um Generator que calcula e entrega um item por vez sob demanda (lazy evaluation), pausando o frame da função.", mental: "Generators mantêm consumo de memória O(1) para sequências extensas.", code: "def ler_stream(linhas):\n    for l in linhas:\n        yield l.strip()" },
        { id: 17, level: 6, topic: "avancado", difficulty: "Avançado", q: "Como funciona tecnicamente um Decorator (@decorador) em Python?", a: "É uma função de ordem superior (closure) que recebe uma função como argumento e retorna uma nova função embrulhada (wrapper).", mental: "@dec acima de def f() equivale a fazer f = dec(f).", code: "def meu_decorator(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper" },
        { id: 18, level: 6, topic: "avancado", difficulty: "Avançado", q: "Para qual tipo de carga de trabalho o modelo 'async / await' do Python (asyncio) traz ganho real de desempenho?", a: "Para cargas limitadas por Entrada/Saída (I/O-bound), como dezenas de requisições HTTP ou consultas de rede concorrentes.", mental: "Enquanto uma tarefa aguarda resposta da rede no 'await', o Event Loop executa outra tarefa sem bloquear a thread.", code: "async def buscar_dados(cliente, url):\n    resp = await cliente.get(url)\n    return resp.json()" },
        { id: 19, level: 7, topic: "avancado", difficulty: "Intermediário", q: "Por que projetos profissionais usam ambientes virtuais (venv) e o módulo logging?", a: "O venv isola dependências por projeto evitando conflitos de versão; o logging permite filtrar severidades (INFO, ERROR) e gravar auditoria estruturada.", mental: "Nunca instale bibliotecas de projeto diretamente no Python global do sistema.", code: "import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info(' Serviço inicializado')" },
        { id: 20, level: 8, topic: "avancado", difficulty: "Intermediário", q: "Como prevenir ataques de SQL Injection ao executar consultas SQL no Python?", a: "Utilizando sempre queries parametrizadas com placeholders ('?' no sqlite3 ou '%s' no psycopg) e passando os valores em uma tupla separada.", mental: "Jamais concatene entradas do usuário com f-strings dentro da string SQL.", code: "cursor.execute('SELECT * FROM clientes WHERE id = ?', (cliente_id,))" },
        { id: 21, level: 9, topic: "avancado", difficulty: "Avançado", q: "Como a Injeção de Dependência (SOLID) facilita a criação de testes unitários rápidos?", a: "Ao receber uma abstração (como um repositório ou notificador) no construtor, podemos passar um objeto Fake/Mock em memória durante os testes sem depender de banco ou rede externa.", mental: "Separe regras de negócio puras dos detalhes de infraestrutura.", code: "class Servico:\n    def __init__(self, repo):\n        self.repo = repo" },
        { id: 22, level: 10, topic: "avancado", difficulty: "Avançado", q: "Qual é o papel do Pydantic (BaseModel) em endpoints FastAPI?", a: "Validar e converter automaticamente os tipos e restrições do payload JSON de entrada, retornando HTTP 422 se os dados violarem o contrato.", mental: "Garante que dados inválidos sejam barrados na fronteira HTTP.", code: "class Item(BaseModel):\n    nome: str\n    preco: float = Field(gt=0)" },
        { id: 23, level: 11, topic: "avancado", difficulty: "Intermediário", q: "Por que scripts profissionais de automação utilizam pathlib.Path e são projetados para serem idempotentes?", a: "pathlib trata caminhos de forma portável entre Windows/Linux, e a idempotência garante que reexecutar o script não duplique efeitos colaterais.", mental: "Sempre verifique se o item já foi processado antes de aplicar a ação.", code: "from pathlib import Path\narquivo = Path('dados') / 'relatorio.csv'" },
        { id: 24, level: 12, topic: "avancado", difficulty: "Avançado", q: "Como funcionam Embeddings e RAG (Retrieval-Augmented Generation) em sistemas com LLMs?", a: "Embeddings convertem textos em vetores numéricos densos; o RAG busca os vetores mais próximos (ex: por similaridade de cosseno) e injeta os trechos relevantes no prompt do LLM.", mental: "Ancora a resposta do modelo em fatos verificados sem precisar re-treinar o LLM.", code: "sim = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))" }
      ];

      return raw.map(item => ({
        ...item,
        createdAt: TODAY_ISO,
        lastReviewedAt: null,
        nextReviewAt: TODAY_ISO, // Due immediately
        reviewCount: 0,
        intervalDays: 0,
        easeFactor: 2.5,
        masteryIndex: 0,
        history: [],
        status: "due"
      }));
    }

    // =========================================================================
    // 5. PRACTICAL PROJECTS DATA (12 PROGRESSIVE PROJECTS + PORTFOLIO)
    // =========================================================================
    const practicalProjects = [
      {
        id: 1,
        level: 1,
        title: "Calculadora Financeira & Conversor de Unidades",
        objective: "Construir uma calculadora que converte moedas, aplica descontos percentuais e formata um recibo detalhado com f-strings.",
        requirements: ["Definir variáveis para valor em reais, taxa de câmbio e percentual de desconto.", "Calcular o valor com desconto e converter para dólares.", "Exibir o resultado formatado com 2 casas decimais."],
        knowledgeNeeded: "Variáveis, operadores aritméticos, f-strings e print().",
        challenges: "Garantir precedência correta de parênteses no cálculo percentual.",
        steps: ["Declarar valor_brl = 500.0 e cotacao_usd = 5.0", "Aplicar 10% de desconto sobre valor_brl", "Converter o valor líquido para USD e imprimir no formato 'USD: 90.00'"],
        criteria: "O código deve calcular e imprimir 'USD: 90.00'.",
        expectedOutput: "USD: 90.00",
        starterCode: "valor_brl = 500.0\ncotacao_usd = 5.0\nvalor_liquido = valor_brl * 0.90\nvalor_usd = valor_liquido / cotacao_usd\nprint(f'USD: {valor_usd:.2f}')"
      },
      {
        id: 2,
        level: 2,
        title: "Sistema de Notas & Validador de Aprovação Escolar",
        objective: "Processar uma sequência de notas, ignorar valores inválidos negativos com continue e classificar a média final do aluno.",
        requirements: ["Percorrer lista de notas com loop for.", "Ignorar notas menores que zero usando continue.", "Calcular a média das notas válidas e imprimir 'Status: Aprovado' se média >= 7."],
        knowledgeNeeded: "if/elif/else, for, continue, acumuladores.",
        challenges: "Contar apenas a quantidade de notas válidas ao dividir a soma.",
        steps: ["Filtrar notas negativas no loop", "Calcular soma / validas", "Avaliar com if media >= 7 e imprimir o status"],
        criteria: "Para [8.0, -1.0, 7.0, 9.0], deve imprimir 'Media: 8.0 | Status: Aprovado'.",
        expectedOutput: "Media: 8.0 | Status: Aprovado",
        starterCode: "notas = [8.0, -1.0, 7.0, 9.0]\nsoma = 0.0\nvalidas = 0\nfor n in notas:\n    if n < 0:\n        continue\n    soma += n\n    validas += 1\nmedia = soma / validas\nstatus = 'Aprovado' if media >= 7.0 else 'Recuperacao'\nprint(f'Media: {media:.1f} | Status: {status}')"
      },
      {
        id: 3,
        level: 3,
        title: "Motor de Controle de Estoque & Deduplicador",
        objective: "Consolidar itens de estoque usando dicionários, remover códigos duplicados e listar produtos em falta com List Comprehension.",
        requirements: ["Armazenar estoque em um dicionário {produto: quantidade}.", "Atualizar quantidades e identificar itens com estoque menor que 5.", "Imprimir a lista de reposição urgente."],
        knowledgeNeeded: "Listas, Dicionários, .items(), List Comprehension.",
        challenges: "Iterar sobre chave e valor simultaneamente com .items().",
        steps: ["Definir dicionário de estoque", "Filtrar com [k for k, v in estoque.items() if v < 5]", "Imprimir a lista resultante"],
        criteria: "Deve imprimir \"Repor: ['teclado', 'webcam']\".",
        expectedOutput: "Repor: ['teclado', 'webcam']",
        starterCode: "estoque = {'mouse': 15, 'teclado': 3, 'monitor': 8, 'webcam': 2}\nrepor = [prod for prod, qtd in estoque.items() if qtd < 5]\nprint(f'Repor: {repor}')"
      },
      {
        id: 4,
        level: 4,
        title: "Gerenciador Modular de Tarefas com Funções Puras",
        objective: "Criar funções modulares e tipadas para adicionar, concluir e resumir tarefas sem depender de efeitos colaterais globais.",
        requirements: ["Criar função criar_tarefa(titulo, prioridade=1) retornando dict.", "Criar função filtrar_pendentes(lista) retornando apenas não concluídas.", "Imprimir o total de pendentes."],
        knowledgeNeeded: "def, parâmetros padrão, return, list comprehension.",
        challenges: "Retornar novas estruturas a partir das funções.",
        steps: ["Implementar criar_tarefa", "Implementar filtrar_pendentes", "Validar a contagem impressa"],
        criteria: "Deve imprimir 'Pendentes: 2'.",
        expectedOutput: "Pendentes: 2",
        starterCode: "def criar_tarefa(titulo, concluida=False):\n    return {'titulo': titulo, 'concluida': concluida}\n\ndef contar_pendentes(tarefas):\n    return len([t for t in tarefas if not t['concluida']])\n\nlista = [criar_tarefa('Estudar Python'), criar_tarefa('Revisar SRS', True), criar_tarefa('Fazer Projeto')]\nprint(f'Pendentes: {contar_pendentes(lista)}')"
      },
      {
        id: 5,
        level: 5,
        title: "Gerenciador Financeiro Orientado a Objetos",
        objective: "Modelar uma Carteira Financeira com classe, validação de saques com exceções e exportação de resumo estruturado.",
        requirements: ["Criar classe Carteira com titular e saldo.", "Implementar depositar() e sacar() com validação de saldo.", "Imprimir o saldo final após operações."],
        knowledgeNeeded: "class, __init__, self, métodos, try/except.",
        challenges: "Impedir que um saque maior que o saldo deixe a conta negativa.",
        steps: ["Definir classe Carteira", "Depositar 300 e sacar 120", "Imprimir o saldo resultante"],
        criteria: "Deve imprimir 'Titular: Ana | Saldo: R$ 180'.",
        expectedOutput: "Titular: Ana | Saldo: R$ 180",
        starterCode: "class Carteira:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n    def depositar(self, v):\n        self.saldo += v\n    def sacar(self, v):\n        if v > self.saldo:\n            raise ValueError('Saldo insuficiente')\n        self.saldo -= v\n\nc = Carteira('Ana', 0)\nc.depositar(300)\nc.sacar(120)\nprint(f'Titular: {c.titular} | Saldo: R$ {c.saldo}')"
      },
      {
        id: 6,
        level: 6,
        title: "Pipeline de Streaming de Logs com Generators",
        objective: "Processar linhas de log sob demanda usando Generators (yield) para extrair apenas eventos de erro crítico sem carregar tudo na RAM.",
        requirements: ["Criar generator filtrar_erros(linhas) usando yield.", "Consumir o gerador e contar quantos erros foram encontrados.", "Validar o resultado com assert."],
        knowledgeNeeded: "Generators, yield, manipulação de strings, assert.",
        challenges: "Usar yield apenas quando a linha começar com 'ERROR:'.",
        steps: ["Definir def filtrar_erros(linhas)", "Aplicar yield linha nas linhas com ERROR", "Imprimir a lista de erros extraídos"],
        criteria: "Deve imprimir \"['ERROR: Falha DB', 'ERROR: Timeout']\".",
        expectedOutput: "['ERROR: Falha DB', 'ERROR: Timeout']",
        starterCode: "def filtrar_erros(linhas):\n    for l in linhas:\n        if l.startswith('ERROR:'):\n            yield l\n\nlogs = ['INFO: Login OK', 'ERROR: Falha DB', 'WARN: Disco 80%', 'ERROR: Timeout']\nerros = list(filtrar_erros(logs))\nassert len(erros) == 2\nprint(erros)"
      },
      {
        id: 7,
        level: 7,
        title: "Auditor de Eventos & Sanitizador Clean Code",
        objective: "Construir um formatador padronizado de auditoria seguindo PEP 8, nomes expressivos e níveis de severidade.",
        requirements: ["Criar função registrar_auditoria(usuario, acao, nivel='INFO').", "Normalizar espaços e letras maiúsculas.", "Retornar string de log auditável."],
        knowledgeNeeded: "PEP 8, Clean Code, funções com argumentos padrão.",
        challenges: "Garantir formatação consistente para qualquer entrada.",
        steps: ["Padronizar nivel.upper()", "Limpar usuario.strip()", "Imprimir a linha de auditoria"],
        criteria: "Deve imprimir 'AUDIT [WARNING] user=admin action=reset_senha'.",
        expectedOutput: "AUDIT [WARNING] user=admin action=reset_senha",
        starterCode: "def registrar_auditoria(usuario, acao, nivel='INFO'):\n    return f'AUDIT [{nivel.upper()}] user={usuario.strip()} action={acao.strip()}'\n\nprint(registrar_auditoria(' admin ', 'reset_senha', 'warning'))"
      },
      {
        id: 8,
        level: 8,
        title: "Repositório de Dados Parametrizado (Padrão SQL)",
        objective: "Construir uma camada Repository que gera queries SQL parametrizadas seguras para operações CRUD.",
        requirements: ["Criar classe ProdutoRepository.", "Implementar método buscar_por_faixa(min_p, max_p) que retorna a query SQL com '?' e a tupla de parâmetros.", "Imprimir a query e os parâmetros."],
        knowledgeNeeded: "SQL parametrizado, tuplas, POO.",
        challenges: "Nunca interpolar min_p ou max_p direto na string SQL.",
        steps: ["Escrever query com WHERE preco BETWEEN ? AND ?", "Retornar tupla (min_p, max_p)", "Imprimir resultado validado"],
        criteria: "Deve imprimir \"SELECT * FROM produtos WHERE preco BETWEEN ? AND ? | (50, 200)\".",
        expectedOutput: "SELECT * FROM produtos WHERE preco BETWEEN ? AND ? | (50, 200)",
        starterCode: "class ProdutoRepository:\n    def buscar_por_faixa(self, min_p, max_p):\n        sql = 'SELECT * FROM produtos WHERE preco BETWEEN ? AND ?'\n        params = (min_p, max_p)\n        return f'{sql} | {params}'\n\nrepo = ProdutoRepository()\nprint(repo.buscar_por_faixa(50, 200))"
      },
      {
        id: 9,
        level: 9,
        title: "Motor de Regras de Negócio com SOLID & Testes",
        objective: "Aplicar o Princípio Aberto/Fechado (OCP) e Injeção de Dependência para calcular frete com diferentes estratégias testáveis.",
        requirements: ["Criar função fechar_compra(valor, estrategia_frete).", "Testar com duas estratégias (normal e expresso) usando assert.", "Imprimir os dois totais calculados."],
        knowledgeNeeded: "SOLID, funções de ordem superior, testes unitários com assert.",
        challenges: "Desacoplar o cálculo do frete da função principal.",
        steps: ["Definir fechar_compra", "Passar estratégias via função/lambda", "Validar com assert e imprimir"],
        criteria: "Deve imprimir 'Normal: 110 | Expresso: 125'.",
        expectedOutput: "Normal: 110 | Expresso: 125",
        starterCode: "def fechar_compra(valor, estrategia_frete):\n    return valor + estrategia_frete(valor)\n\nnormal = fechar_compra(100, lambda v: 10)\nexpresso = fechar_compra(100, lambda v: 25)\nassert normal == 110 and expresso == 125\nprint(f'Normal: {normal} | Expresso: {expresso}')"
      },
      {
        id: 10,
        level: 10,
        title: "Simulador de Endpoint REST & Validador de Schema",
        objective: "Implementar um controlador REST que valida o corpo JSON de uma requisição POST, aplica status HTTP semântico e retorna resposta estruturada.",
        requirements: ["Validar presença de 'cliente' e 'valor' > 0.", "Retornar status 201 para dados válidos e 422 para inválidos.", "Imprimir o status e payload de resposta."],
        knowledgeNeeded: "HTTP Status Codes, validação de schema, dicionários.",
        challenges: "Tratar payloads incompletos sem levantar KeyError.",
        steps: ["Testar campos obrigatórios com .get()", "Retornar dicionário com status e mensagem", "Imprimir o resultado do teste"],
        criteria: "Deve imprimir \"Status: 201 | {'status': 'criado', 'cliente': 'Leo'}\".",
        expectedOutput: "Status: 201 | {'status': 'criado', 'cliente': 'Leo'}",
        starterCode: "def endpoint_criar_pedido(payload):\n    cliente = payload.get('cliente', '')\n    valor = payload.get('valor', 0)\n    if not cliente or valor <= 0:\n        return 422, {'erro': 'Payload invalido'}\n    return 201, {'status': 'criado', 'cliente': cliente}\n\ncode, body = endpoint_criar_pedido({'cliente': 'Leo', 'valor': 199.0})\nprint(f'Status: {code} | {body}')"
      },
      {
        id: 11,
        level: 11,
        title: "Robô de Saneamento & Consolidação de Planilha CSV",
        objective: "Automatizar a limpeza de registros brutos de vendas, removendo linhas duplicadas ou corrompidas e somando a receita líquida.",
        requirements: ["Ignorar registros repetidos pelo ID da venda (idempotência).", "Converter valores válidos e somar o faturamento total.", "Imprimir a quantidade de vendas únicas e o total."],
        knowledgeNeeded: "Automação idempotente, sets/listas, manipulação de strings.",
        challenges: "Garantir que o ID 'V1' não seja somado duas vezes.",
        steps: ["Rastrear IDs já processados", "Somar valores únicos", "Imprimir resumo consolidado"],
        criteria: "Deve imprimir 'Unicas: 2 | Receita: R$ 350.00'.",
        expectedOutput: "Unicas: 2 | Receita: R$ 350.00",
        starterCode: "linhas_csv = [('V1', 150.0), ('V2', 200.0), ('V1', 150.0)]\nvistos = []\nreceita = 0.0\nfor id_venda, valor in linhas_csv:\n    if id_venda not in vistos:\n        vistos.append(id_venda)\n        receita += valor\nprint(f'Unicas: {len(vistos)} | Receita: R$ {receita:.2f}')"
      },
      {
        id: 12,
        level: 12,
        title: "Assistente RAG: Busca Vetorial & Prompt Fundamentado",
        objective: "Implementar o núcleo de um sistema RAG que ranqueia documentos por produto escalar de embeddings e monta o prompt fundamentado para o LLM.",
        requirements: ["Calcular score de similaridade entre o vetor da pergunta e cada documento.", "Selecionar o documento de maior score.", "Montar o prompt final injetando o contexto vencedor."],
        knowledgeNeeded: "Vetores, Embeddings, RAG, funções e compreensão de listas.",
        challenges: "Selecionar automaticamente o documento com maior pontuação semântica.",
        steps: ["Calcular produto escalar para cada documento", "Encontrar o documento de maior score", "Imprimir o contexto selecionado e score"],
        criteria: "Deve imprimir 'Melhor Doc: Politica de Reembolso (Score: 14)'.",
        expectedOutput: "Melhor Doc: Politica de Reembolso (Score: 14)",
        starterCode: "pergunta_vec = [2, 3]\ndocs = [\n    {'titulo': 'Horario de Atendimento', 'vec': [1, 1]},\n    {'titulo': 'Politica de Reembolso', 'vec': [4, 2]}\n]\nmelhor_titulo = ''\nmaior_score = -1\nfor d in docs:\n    score = sum(a * b for a, b in zip(pergunta_vec, d['vec']))\n    if score > maior_score:\n        maior_score = score\n        melhor_titulo = d['titulo']\nprint(f'Melhor Doc: {melhor_titulo} (Score: {maior_score})')"
      }
    ];

    // =========================================================================
    // 6. INTENT-BASED VISUAL CHEAT SHEET (EXPANDED TO 15 CARDS ACROSS ALL 12 LEVELS)
    // =========================================================================
    const intentCards = [
      {
        cat: "dados",
        intent: "Quero guardar vários itens em ordem e adicionar novos depois",
        dontMemorize: "Não decore: list methods isolados",
        mentalAnchor: "Sequência mutável entre colchetes [ ]; .append() anexa ao final",
        code: "tarefas = ['Estudar', 'Treinar']\ntarefas.append('Dormir')\nprimeira = tarefas[0]"
      },
      {
        cat: "dados",
        intent: "Quero buscar informações rapidamente por nome ou ID (Chave → Valor)",
        dontMemorize: "Não percorra uma lista inteira O(n)",
        mentalAnchor: "Dicionário {'chave': valor} usa tabela hash com busca média O(1)",
        code: "cliente = {'nome': 'Leo', 'vip': True}\npontos = cliente.get('pontos', 0)"
      },
      {
        cat: "dados",
        intent: "Quero eliminar todos os itens repetidos de uma coleção",
        dontMemorize: "Não escreva loops manuais de deduplicação",
        mentalAnchor: "Converta para set() (conjunto de elementos únicos, sem ordem garantida)",
        code: "cpfs = ['111', '222', '111']\ncpfs_unicos = list(set(cpfs))"
      },
      {
        cat: "fluxo",
        intent: "Quero repetir uma ação para cada item de uma sequência",
        dontMemorize: "Não use contadores manuais i = 0; i < len()",
        mentalAnchor: "Iteração direta: 'for item in iteravel:'",
        code: "for email in lista_emails:\n    enviar_boas_vindas(email)"
      },
      {
        cat: "fluxo",
        intent: "Quero filtrar uma lista ou transformar itens em 1 linha legível",
        dontMemorize: "Não complique com map() + filter() aninhados",
        mentalAnchor: "List Comprehension: [EXPRESSAO for ITEM in ITERAVEL if CONDICAO]",
        code: "aprovados = [n for n in notas if n >= 7.0]"
      },
      {
        cat: "fluxo",
        intent: "Quero repetir algo até que o usuário digite um valor válido",
        dontMemorize: "Não crie variáveis booleanas confusas",
        mentalAnchor: "Laço 'while True:' validando a entrada e saindo com 'break'",
        code: "while True:\n    resp = input('Continuar (s/n)? ')\n    if resp in ('s', 'n'):\n        break"
      },
      {
        cat: "funcoes",
        intent: "Quero reaproveitar um cálculo e receber o resultado de volta",
        dontMemorize: "Não confunda print() (efeito na tela) com return (valor devolvido)",
        mentalAnchor: "Defina com 'def' e devolva a referência do objeto com 'return'",
        code: "def converter_dolar(reais: float, cotacao: float = 5.0) -> float:\n    return reais / cotacao"
      },
      {
        cat: "funcoes",
        intent: "Quero agrupar estado (dados) e comportamento (métodos) de uma entidade",
        dontMemorize: "Não passe 10 variáveis soltas entre funções",
        mentalAnchor: "Crie uma Classe; 'self' referencia a instância atual",
        code: "class Pedido:\n    def __init__(self, total: float):\n        self.total = total"
      },
      {
        cat: "mundo_real",
        intent: "Quero ler ou salvar um arquivo garantindo seu fechamento automático",
        dontMemorize: "Não chame f.close() manualmente correndo risco de exceção",
        mentalAnchor: "Protocolo Context Manager: 'with open(...) as f:'",
        code: "with open('notas.txt', 'r', encoding='utf-8') as f:\n    conteudo = f.read()"
      },
      {
        cat: "mundo_real",
        intent: "Quero impedir que uma entrada inválida ou falha de I/O derrube o programa",
        dontMemorize: "Não capture 'except:' genérico ocultando bugs",
        mentalAnchor: "Bloco 'try:' com 'except ExcecaoEspecifica:'",
        code: "try:\n    num = int(texto_usuario)\nexcept ValueError:\n    num = 0"
      },
      {
        cat: "mundo_real",
        intent: "Quero produzir uma sequência gigante sob demanda sem esgotar a memória RAM",
        dontMemorize: "Não aloque milhões de itens numa lista de uma só vez",
        mentalAnchor: "Use 'yield' para criar um Generator com avaliação preguiçosa (lazy)",
        code: "def gerar_quadrados(limite: int):\n    for n in range(limite):\n        yield n ** 2"
      },
      {
        cat: "mundo_real",
        intent: "Quero obter o índice e o valor simultaneamente num loop for",
        dontMemorize: "Não incremente 'i += 1' manualmente fora do laço",
        mentalAnchor: "Envolva o iterável com enumerate(colecao, start=1)",
        code: "for pos, nome in enumerate(ranking, start=1):\n    print(f'{pos}º lugar: {nome}')"
      },
      {
        cat: "engenharia_ia",
        intent: "Quero consultar ou inserir dados em banco SQL sem risco de SQL Injection",
        dontMemorize: "JAMAIS use f-string dentro de comandos SQL",
        mentalAnchor: "Use placeholders '?' (sqlite3) e passe os valores numa tupla separada",
        code: "cursor.execute(\n    'SELECT nome FROM clientes WHERE id = ?',\n    (cliente_id,)\n)"
      },
      {
        cat: "engenharia_ia",
        intent: "Quero validar dados JSON recebidos numa rota de API REST (FastAPI)",
        dontMemorize: "Não escreva dezenas de ifs checando tipos manualmente",
        mentalAnchor: "Declare um schema herdando de pydantic.BaseModel",
        code: "class CadastroInput(BaseModel):\n    email: str\n    idade: int = Field(ge=18)"
      },
      {
        cat: "engenharia_ia",
        intent: "Quero fundamentar respostas de uma IA (LLM) nos documentos da minha empresa",
        dontMemorize: "Não tente re-treinar (fine-tuning) o modelo para fatos dinâmicos",
        mentalAnchor: "Arquitetura RAG: recupere trechos por similaridade de Embeddings e injete no prompt",
        code: "score = np.dot(emb_pergunta, emb_doc) / (\n    np.linalg.norm(emb_pergunta) * np.linalg.norm(emb_doc)\n)"
      }
    ];

    // =========================================================================
    // 7. PERSISTENT STUDENT MEMORY & STATE ENGINE (localStorage + Validation + Recovery)
    // =========================================================================
    const STORAGE_KEY = "pyneuro_evolution_state_v2";
    const BACKUP_GOOD_KEY = "pyneuro_evolution_backup_last_good";
    const isEmbeddedCourse = new URLSearchParams(window.location.search).get("embed") === "1";
    const embeddedCourseStorage = new Map();
    if (isEmbeddedCourse) {
      try {
        const incoming = JSON.parse(decodeURIComponent(window.location.hash.slice(1) || "{}"));
        [STORAGE_KEY, BACKUP_GOOD_KEY].forEach((key) => {
          if (typeof incoming[key] === "string") embeddedCourseStorage.set(key, incoming[key]);
        });
      } catch (_) { /* Uma transferência inválida inicia um progresso limpo. */ }
    }

    function getCourseStorageItem(key) {
      return isEmbeddedCourse ? (embeddedCourseStorage.get(key) || null) : localStorage.getItem(key);
    }

    function setCourseStorageItem(key, value) {
      if (!isEmbeddedCourse) {
        localStorage.setItem(key, value);
        return;
      }
      embeddedCourseStorage.set(key, value);
      window.parent.postMessage({ source: "pyneuro-course", type: "storage:set", key, value }, "*");
    }

    function createDefaultStudentState() {
      const competencies = {};
      courseLevels.forEach(lvl => {
        competencies[lvl.id] = {
          status: "nao_iniciado", // nao_iniciado | em_aprendizagem | em_pratica | em_avaliacao | dominado
          dimensions: {
            conceptual: false,     // 1. Compreensão conceitual
            interpretation: false, // 2. Interpretação de código
            construction: false,   // 3. Construção de código (Lab exercise)
            debugging: false,      // 4. Depuração e resolução de erros
            application: false     // 5. Aplicação prática (Project)
          },
          attempts: 0,
          correctCount: 0,
          lastUpdated: null
        };
      });

      const projectsState = {};
      practicalProjects.forEach(p => {
        projectsState[p.id] = {
          status: "nao_iniciado", // nao_iniciado | em_andamento | concluido
          userCode: p.starterCode,
          completedSteps: [],
          passedChecks: false,
          completedAt: null
        };
      });

      const exerciseResponses = {};
      labExercises.forEach(ex => {
        exerciseResponses[ex.id] = {
          userCode: ex.starterCode,
          passed: false,
          lastOutput: "",
          updatedAt: null
        };
      });

      return {
        version: 2,
        xp: 0,
        studyTimeSeconds: 0,
        lastAccessedLevelId: 1,
        lastActiveView: "trilha",
        activeLessonSubtab: "aula", // aula | avaliacao
        preferences: {
          dailyPaceMinutes: "60",
          simSpeedMs: 1100
        },
        competencies,
        projects: projectsState,
        exerciseResponses,
        errorHistory: [],
        studySessions: [],
        srsCards: createInitialSrsDeck()
      };
    }

    function validateAndSanitizeState(candidate) {
      if (!candidate || typeof candidate !== "object") return null;
      if (typeof candidate.xp !== "number" || isNaN(candidate.xp) || candidate.xp < 0) return null;
      if (!candidate.competencies || typeof candidate.competencies !== "object") return null;
      if (!Array.isArray(candidate.srsCards) || candidate.srsCards.length === 0) return null;

      // Merge safely with default structure so any newly added levels/cards exist
      const base = createDefaultStudentState();
      base.xp = Math.floor(candidate.xp);
      base.studyTimeSeconds = typeof candidate.studyTimeSeconds === "number" && candidate.studyTimeSeconds >= 0
        ? Math.floor(candidate.studyTimeSeconds) : 0;
      base.lastAccessedLevelId = courseLevels.some(l => l.id === candidate.lastAccessedLevelId)
        ? candidate.lastAccessedLevelId : 1;
      if (candidate.preferences && typeof candidate.preferences === "object") {
        if (["30", "60", "90"].includes(String(candidate.preferences.dailyPaceMinutes))) {
          base.preferences.dailyPaceMinutes = String(candidate.preferences.dailyPaceMinutes);
        }
      }

      // Restore competencies
      Object.keys(base.competencies).forEach(lvlId => {
        const savedComp = candidate.competencies[lvlId];
        if (savedComp && typeof savedComp === "object" && savedComp.dimensions) {
          base.competencies[lvlId].dimensions = {
            conceptual: Boolean(savedComp.dimensions.conceptual),
            interpretation: Boolean(savedComp.dimensions.interpretation),
            construction: Boolean(savedComp.dimensions.construction),
            debugging: Boolean(savedComp.dimensions.debugging),
            application: Boolean(savedComp.dimensions.application)
          };
          base.competencies[lvlId].attempts = Number(savedComp.attempts) || 0;
          base.competencies[lvlId].correctCount = Number(savedComp.correctCount) || 0;
          base.competencies[lvlId].lastUpdated = savedComp.lastUpdated || null;
          recalculateCompetencyStatus(base, Number(lvlId));
        }
      });

      // Restore projects
      if (candidate.projects && typeof candidate.projects === "object") {
        Object.keys(base.projects).forEach(pid => {
          const sp = candidate.projects[pid];
          if (sp && typeof sp === "object") {
            base.projects[pid].status = ["nao_iniciado", "em_andamento", "concluido"].includes(sp.status) ? sp.status : "nao_iniciado";
            base.projects[pid].userCode = typeof sp.userCode === "string" ? sp.userCode : base.projects[pid].userCode;
            base.projects[pid].completedSteps = Array.isArray(sp.completedSteps) ? sp.completedSteps : [];
            base.projects[pid].passedChecks = Boolean(sp.passedChecks);
            base.projects[pid].completedAt = sp.completedAt || null;
          }
        });
      }

      // Restore exercise responses
      if (candidate.exerciseResponses && typeof candidate.exerciseResponses === "object") {
        Object.keys(base.exerciseResponses).forEach(exId => {
          const se = candidate.exerciseResponses[exId];
          if (se && typeof se === "object") {
            base.exerciseResponses[exId].userCode = typeof se.userCode === "string" ? se.userCode : base.exerciseResponses[exId].userCode;
            base.exerciseResponses[exId].passed = Boolean(se.passed);
            base.exerciseResponses[exId].lastOutput = typeof se.lastOutput === "string" ? se.lastOutput : "";
            base.exerciseResponses[exId].updatedAt = se.updatedAt || null;
          }
        });
      }

      // Restore SRS cards
      const savedCardMap = {};
      candidate.srsCards.forEach(c => {
        if (c && typeof c.id === "number") savedCardMap[c.id] = c;
      });
      base.srsCards = base.srsCards.map(defaultCard => {
        const sc = savedCardMap[defaultCard.id];
        if (!sc) return defaultCard;
        return {
          ...defaultCard,
          lastReviewedAt: sc.lastReviewedAt || null,
          nextReviewAt: typeof sc.nextReviewAt === "string" ? sc.nextReviewAt : TODAY_ISO,
          reviewCount: Number(sc.reviewCount) || 0,
          intervalDays: Number(sc.intervalDays) || 0,
          easeFactor: Number(sc.easeFactor) || 2.5,
          masteryIndex: Math.min(100, Math.max(0, Number(sc.masteryIndex) || 0)),
          history: Array.isArray(sc.history) ? sc.history.slice(-20) : [],
          status: sc.status || "due"
        };
      });

      base.errorHistory = Array.isArray(candidate.errorHistory) ? candidate.errorHistory.slice(-50) : [];
      base.studySessions = Array.isArray(candidate.studySessions) ? candidate.studySessions.slice(-60) : [];

      return base;
    }

    function loadStudentState() {
      try {
        const raw = getCourseStorageItem(STORAGE_KEY);
        if (!raw) return createDefaultStudentState();
        const parsed = JSON.parse(raw);
        const valid = validateAndSanitizeState(parsed);
        if (valid) return valid;
        throw new Error("Schema inválido no estado principal");
      } catch (err) {
        // Attempt corruption recovery from last known good backup
        try {
          const backupRaw = getCourseStorageItem(BACKUP_GOOD_KEY);
          if (backupRaw) {
            const recovered = validateAndSanitizeState(JSON.parse(backupRaw));
            if (recovered) {
              setTimeout(() => showToast("Dados corrompidos detectados: estado recuperado do backup automático!", "🛡️"), 600);
              return recovered;
            }
          }
        } catch (_) {}
        return createDefaultStudentState();
      }
    }

    function saveStudentState() {
      try {
        const serialized = JSON.stringify(studentState);
        setCourseStorageItem(STORAGE_KEY, serialized);
        setCourseStorageItem(BACKUP_GOOD_KEY, serialized);
      } catch (_) {
        // Safe fallback when storage quota or iframe restrictions apply
      }
      updateProgressHeader();
    }

    function recordStudentError(levelId, category, description) {
      studentState.errorHistory.unshift({
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
        levelId,
        category,
        description
      });
      if (studentState.errorHistory.length > 50) {
        studentState.errorHistory.pop();
      }
      saveStudentState();
    }

    function recalculateCompetencyStatus(stateObj, levelId) {
      const comp = stateObj.competencies[levelId];
      if (!comp) return;
      const d = comp.dimensions;
      const count = [d.conceptual, d.interpretation, d.construction, d.debugging, d.application].filter(Boolean).length;

      if (count === 5) {
        comp.status = "dominado";
      } else if (count >= 3) {
        comp.status = "em_avaliacao";
      } else if (d.construction || d.application || count === 2) {
        comp.status = "em_pratica";
      } else if (count === 1 || comp.attempts > 0) {
        comp.status = "em_aprendizagem";
      } else {
        comp.status = "nao_iniciado";
      }

      const lvl = courseLevels.find(l => l.id === Number(levelId));
      if (lvl) {
        lvl.completed = comp.status === "dominado";
      }
    }

    // Initialize global state
    let studentState = loadStudentState();
    const requestedLevelId = Number(new URLSearchParams(window.location.search).get("level"));
    let activeLevelId = courseLevels.some(level => level.id === requestedLevelId)
      ? requestedLevelId
      : (studentState.lastAccessedLevelId || 1);
    if (courseLevels.some(level => level.id === requestedLevelId)) studentState.lastAccessedLevelId = requestedLevelId;
    let activeLessonSubtab = "aula";
    let activeSimKey = "variaveis";
    let activeSimStep = 0;
    let simAutoPlayTimer = null;
    let activeProjectId = 1;
    let activeLabExerciseId = "ex_lvl_1";

    let filteredSrsDeck = [];
    let currentSrsIndex = 0;
    let isSrsFlipped = false;
    let activeIntentCategory = "all";

    // Chart.js instances
    let competenciesChartInstance = null;
    let srsChartInstance = null;

    // Sync courseLevels completed flags
    courseLevels.forEach(l => recalculateCompetencyStatus(studentState, l.id));

    // =========================================================================
    // 8. NAVIGATION, HEADER METRICS & STUDY TIMER
    // =========================================================================
    function switchView(viewName) {
      const views = ['trilha', 'lab', 'python-lab', 'srs', 'projetos', 'dashboard', 'cheat', 'metodo'];
      views.forEach(v => {
        const sec = document.getElementById('view-' + v);
        const btn = document.getElementById('tab-btn-' + v);
        if (!sec || !btn) return;
        if (v === viewName) {
          sec.classList.remove('hidden');
          btn.className = "nav-tab nav-link is-active";
          btn.setAttribute('aria-current', 'page');
        } else {
          sec.classList.add('hidden');
          btn.className = "nav-tab nav-link";
          btn.removeAttribute('aria-current');
        }
      });

      const activeButton = document.getElementById('tab-btn-' + viewName);
      const currentLabel = document.getElementById('mobile-current-section');
      if (activeButton && currentLabel) currentLabel.textContent = activeButton.dataset.label || activeButton.textContent.trim();
      const sidebar = document.getElementById('course-sidebar');
      const menuToggle = document.getElementById('mobile-course-menu-toggle');
      if (sidebar && menuToggle && sidebar.classList.contains('mobile-menu-open')) {
        sidebar.classList.remove('mobile-menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }

      studentState.lastActiveView = viewName;
      saveStudentState();

      if (viewName === 'dashboard') {
        refreshDashboardView();
      } else if (viewName === 'projetos') {
        renderProjectsSection();
      } else if (viewName === 'srs') {
        renderSrsCard();
      } else if (viewName === 'metodo') {
        renderAdaptiveSchedule();
      }
    }

    function toggleMobileCourseMenu() {
      const sidebar = document.getElementById('course-sidebar');
      const menuToggle = document.getElementById('mobile-course-menu-toggle');
      if (!sidebar || !menuToggle) return;
      const isOpen = sidebar.classList.toggle('mobile-menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    }

    function showToast(msg, icon = "✨") {
      const toast = document.getElementById('toast');
      document.getElementById('toast-msg').textContent = msg;
      document.getElementById('toast-icon').textContent = icon;
      toast.classList.remove('hidden');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
      }, 3400);
    }

    function computeGlobalMetrics() {
      let dominatedCount = 0;
      let inProgressCount = 0;
      let totalAttempts = 0;
      let totalCorrect = 0;

      Object.keys(studentState.competencies).forEach(k => {
        const c = studentState.competencies[k];
        if (c.status === "dominado") dominatedCount++;
        else if (c.status !== "nao_iniciado") inProgressCount++;
        totalAttempts += c.attempts || 0;
        totalCorrect += c.correctCount || 0;
      });

      const accuracyPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
      const completedProjects = Object.values(studentState.projects).filter(p => p.status === "concluido").length;

      return {
        dominatedCount,
        inProgressCount,
        totalAttempts,
        totalCorrect,
        accuracyPct,
        completedProjects
      };
    }

    function updateProgressHeader() {
      const m = computeGlobalMetrics();
      document.getElementById('xp-counter').textContent = studentState.xp;
      document.getElementById('completed-counter').textContent = `${m.dominatedCount}/${courseLevels.length}`;
      const accEl = document.getElementById('accuracy-counter');
      if (accEl) accEl.textContent = `${m.accuracyPct}%`;

      const sidebarSummary = document.getElementById('sidebar-mastery-summary');
      if (sidebarSummary) sidebarSummary.textContent = `${m.dominatedCount}/${courseLevels.length} Dominados`;

      const pct = Math.round((m.dominatedCount / courseLevels.length) * 100);
      document.getElementById('header-progress-bar').style.width = `${pct}%`;

      const mins = Math.floor(studentState.studyTimeSeconds / 60);
      const secs = studentState.studyTimeSeconds % 60;
      const pill = document.getElementById('study-timer-pill');
      if (pill) {
        pill.textContent = `⏱ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }

    // Real Study Time Ticker (increments every 5 seconds while page is visible)
    setInterval(() => {
      if (!document.hidden) {
        studentState.studyTimeSeconds += 5;
        saveStudentState();
      }
    }, 5000);

    // =========================================================================
    // 9. BACKUP, IMPORT, EXPORT & RESET MODAL FUNCTIONS
    // =========================================================================
    function openBackupModal() {
      const modal = document.getElementById('backup-modal');
      modal.classList.remove('hidden');
      document.getElementById('backup-json-textarea').value = JSON.stringify(studentState, null, 2);
      document.getElementById('backup-validation-msg').textContent = "Estado íntegro e validado.";
    }

    function closeBackupModal() {
      document.getElementById('backup-modal').classList.add('hidden');
      document.getElementById('reset-confirm-box').classList.add('hidden');
    }

    function exportProgressBackup() {
      const dataStr = JSON.stringify(studentState, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pyneuro_backup_${TODAY_ISO}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Arquivo de backup (.json) exportado com sucesso!", "💾");
    }

    function copyBackupToClipboard() {
      const textarea = document.getElementById('backup-json-textarea');
      textarea.value = JSON.stringify(studentState, null, 2);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast("Backup JSON copiado para a área de transferência!", "📋");
      } catch (_) {
        showToast("Selecione o texto na caixa e pressione Ctrl+C.", "ℹ️");
      }
    }

    function handleBackupFileUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('backup-json-textarea').value = e.target.result;
        importBackupFromTextarea();
      };
      reader.readAsText(file);
    }

    function importBackupFromTextarea() {
      const raw = document.getElementById('backup-json-textarea').value.trim();
      const msgEl = document.getElementById('backup-validation-msg');
      try {
        const parsed = JSON.parse(raw);
        const validated = validateAndSanitizeState(parsed);
        if (!validated) {
          msgEl.className = "text-xs text-rose-400 font-semibold";
          msgEl.textContent = "❌ Estrutura JSON inválida: campos obrigatórios ausentes ou corrompidos.";
          return;
        }
        studentState = validated;
        courseLevels.forEach(l => recalculateCompetencyStatus(studentState, l.id));
        saveStudentState();
        renderAllViews();
        msgEl.className = "text-xs text-emerald-400 font-semibold";
        msgEl.textContent = "✅ Backup validado e restaurado com sucesso!";
        showToast("Progresso restaurado a partir do backup!", "✅");
      } catch (err) {
        msgEl.className = "text-xs text-rose-400 font-semibold";
        msgEl.textContent = "❌ Erro de sintaxe JSON: verifique se o conteúdo foi copiado integralmente.";
      }
    }

    function toggleResetConfirmBox() {
      const box = document.getElementById('reset-confirm-box');
      box.classList.toggle('hidden');
      document.getElementById('reset-confirm-input').value = "";
    }

    function executeConfirmedReset() {
      const val = document.getElementById('reset-confirm-input').value.trim().toUpperCase();
      if (val !== "REINICIAR") {
        showToast("Digite exatamente REINICIAR para confirmar a exclusão.", "⚠️");
        return;
      }
      studentState = createDefaultStudentState();
      courseLevels.forEach(l => { l.completed = false; });
      saveStudentState();
      renderAllViews();
      closeBackupModal();
      showToast("Todo o progresso foi reiniciado com segurança.", "↺");
    }

    // =========================================================================
    // 10. VIEW 1: RENDER 12 LEVELS & EVIDENCE-BASED COMPETENCY SYSTEM
    // =========================================================================
    const STATUS_LABELS = {
      nao_iniciado: { text: "Não iniciado", cls: "bg-slate-800 text-slate-400 border-slate-700" },
      em_aprendizagem: { text: "Em aprendizagem", cls: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
      em_pratica: { text: "Em prática", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
      em_avaliacao: { text: "Em avaliação", cls: "bg-purple-500/15 text-purple-300 border-purple-500/30" },
      dominado: { text: "✓ Dominado", cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold" }
    };

    function renderLevelsSidebar() {
      const container = document.getElementById('levels-list');
      container.innerHTML = courseLevels.map(lvl => {
        const isActive = lvl.id === activeLevelId;
        const comp = studentState.competencies[lvl.id];
        const d = comp.dimensions;
        const doneDims = [d.conceptual, d.interpretation, d.construction, d.debugging, d.application].filter(Boolean).length;
        const stInfo = STATUS_LABELS[comp.status] || STATUS_LABELS.nao_iniciado;

        const borderClass = isActive
          ? "border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/10"
          : "border-slate-800 bg-slate-900/70 hover:border-slate-700";

        return `
          <button onclick="selectLevel(${lvl.id})" class="w-full text-left p-3 rounded-xl border ${borderClass} transition-all flex flex-col gap-2">
            <div class="flex items-start justify-between gap-2 w-full">
              <div>
                <div class="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">${escapeHtml(lvl.tag)}</div>
                <div class="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">${escapeHtml(lvl.title)}</div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] border shrink-0 ${stInfo.cls}">${stInfo.text}</span>
            </div>
            <div class="text-[11px] text-slate-400 line-clamp-1">${escapeHtml(lvl.subtitle)}</div>
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 w-full">
              <span>Evidências: ${doneDims}/5 dimensões</span>
              <div class="flex gap-1">
                ${[d.conceptual, d.interpretation, d.construction, d.debugging, d.application].map(ok =>
                  `<span class="w-2 h-2 rounded-full ${ok ? 'bg-emerald-400' : 'bg-slate-700'}"></span>`
                ).join('')}
              </div>
            </div>
          </button>
        `;
      }).join('');
    }

    function selectLevel(id) {
      activeLevelId = id;
      studentState.lastAccessedLevelId = id;
      saveStudentState();
      renderLevelsSidebar();
      renderActiveLesson();
    }

    function switchLessonSubtab(subtab) {
      activeLessonSubtab = subtab;
      renderActiveLesson();
    }

    function renderActiveLesson() {
      const lvl = courseLevels.find(l => l.id === activeLevelId);
      const comp = studentState.competencies[lvl.id];
      const d = comp.dimensions;
      const doneDims = [d.conceptual, d.interpretation, d.construction, d.debugging, d.application].filter(Boolean).length;
      const stInfo = STATUS_LABELS[comp.status];
      const container = document.getElementById('lesson-container');

      const topicsHtml = lvl.topics.map((t, idx) => `
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs flex items-center justify-center font-mono">${idx + 1}</span>
              ${escapeHtml(t.name)}
            </h4>
            <span class="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Aplicação & Sintaxe</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong class="text-slate-100">Por que e quando usar:</strong> ${escapeHtml(t.why)}
          </p>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-3 overflow-x-auto">
            <pre class="code-font text-xs sm:text-sm text-indigo-200">${escapeHtml(t.syntax)}</pre>
          </div>
          <div class="space-y-1.5 pt-1">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Anatomia Técnica de Cada Elemento:</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              ${t.anatomy.map(a => `
                <div class="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5">
                  <div class="code-font text-xs font-bold ${a.color}">${escapeHtml(a.part)}</div>
                  <div class="text-[11px] text-slate-300 mt-1 leading-snug">${escapeHtml(a.role)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('');

      // Subtab 2: 5-Dimension Competency Assessment HTML
      const dimQuestions = [
        { key: "conceptual", label: "Dimensão 1: Compreensão Conceitual", data: lvl.dimensions.conceptual },
        { key: "interpretation", label: "Dimensão 2: Interpretação de Código", data: lvl.dimensions.interpretation },
        { key: "debugging", label: "Dimensão 4: Depuração e Resolução de Erros", data: lvl.dimensions.debugging }
      ];

      const evaluationHtml = `
        <div class="space-y-4">
          <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h3 class="text-sm font-bold text-white">Critérios de Aprovação Baseados em Evidências (Nível ${lvl.id})</h3>
              <span class="text-xs font-mono text-emerald-400">${doneDims}/5 Dimensões Comprovadas</span>
            </div>
            <p class="text-xs text-slate-400">
              O status <strong>Dominado</strong> nunca é concedido automaticamente por clicar em um botão: você precisa comprovar as 5 dimensões abaixo (3 avaliações diagnósticas + 1 exercício de construção de código no Laboratório + 1 projeto prático validado).
            </p>
          </div>

          ${dimQuestions.map(dq => {
            const passed = d[dq.key];
            return `
              <div class="bg-slate-950 border ${passed ? 'border-emerald-500/40' : 'border-slate-800'} rounded-xl p-4 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider ${passed ? 'text-emerald-400' : 'text-amber-400'}">${dq.label}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full ${passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}">${passed ? '✓ Comprovada' : 'Pendente'}</span>
                </div>
                <p class="text-xs sm:text-sm font-medium text-white">${escapeHtml(dq.data.q)}</p>
                <div class="grid grid-cols-1 gap-2">
                  ${dq.data.options.map((opt, oIdx) => `
                    <button onclick="evaluateCompetencyDimension(${lvl.id}, '${dq.key}', ${oIdx})" class="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 transition flex items-start gap-2.5 text-xs text-slate-200">
                      <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">${String.fromCharCode(65 + oIdx)}</span>
                      <span>${escapeHtml(opt)}</span>
                    </button>
                  `).join('')}
                </div>
                <div id="dim-feedback-${lvl.id}-${dq.key}" class="${passed ? 'text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg' : 'hidden'}">
                  ${passed ? '✅ Evidência registrada: ' + escapeHtml(dq.data.explanation) : ''}
                </div>
              </div>
            `;
          }).join('')}

          <!-- Dimension 3 (Code Construction) & Dimension 5 (Practical Project) Action Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-slate-950 border ${d.construction ? 'border-emerald-500/40' : 'border-slate-800'} rounded-xl p-4 flex flex-col justify-between gap-3">
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase text-indigo-400">Dimensão 3: Construção de Código</span>
                  <span class="text-xs ${d.construction ? 'text-emerald-400 font-bold' : 'text-slate-400'}">${d.construction ? '✓ Comprovada' : 'Pendente'}</span>
                </div>
                <p class="text-xs text-slate-300">Execute e valide o exercício prático do Nível ${lvl.id} no Laboratório Python comparando a saída obtida com a esperada.</p>
              </div>
              <button onclick="openLevelLabExercise(${lvl.id})" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition self-start">
                💻 Resolver Exercício no Laboratório →
              </button>
            </div>

            <div class="bg-slate-950 border ${d.application ? 'border-emerald-500/40' : 'border-slate-800'} rounded-xl p-4 flex flex-col justify-between gap-3">
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase text-emerald-400">Dimensão 5: Aplicação Prática</span>
                  <span class="text-xs ${d.application ? 'text-emerald-400 font-bold' : 'text-slate-400'}">${d.application ? '✓ Comprovada' : 'Pendente'}</span>
                </div>
                <p class="text-xs text-slate-300">Construa e valide o Projeto Prático do Nível ${lvl.id} para adicioná-lo ao seu Portfólio de Competências.</p>
              </div>
              <button onclick="openLevelProject(${lvl.id})" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition self-start">
                🛠️ Abrir Projeto do Nível ${lvl.id} →
              </button>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = `
        <!-- Level Header -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">${escapeHtml(lvl.tag)}</span>
              <span class="text-xs text-slate-500">•</span>
              <span class="text-xs text-emerald-400 font-medium">${escapeHtml(lvl.spiralConnection)}</span>
            </div>
            <h2 class="text-lg sm:text-2xl font-bold text-white">${escapeHtml(lvl.title)}</h2>
            <p class="text-xs text-slate-400"><strong>Objetivo:</strong> ${escapeHtml(lvl.objective)} | <strong>Pré-requisitos:</strong> ${escapeHtml(lvl.prerequisites)}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <span class="px-3 py-1 rounded-full text-xs border ${stInfo.cls}">${stInfo.text} (${doneDims}/5)</span>
            <span class="text-[11px] text-slate-400">Critério: 5/5 evidências para Dominado</span>
          </div>
        </div>

        <!-- 5-Dimension Progress Bar Pills -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <div class="p-2 rounded-lg border text-center text-[11px] ${d.conceptual ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'}">
            ${d.conceptual ? '✓' : '○'} 1. Conceitual
          </div>
          <div class="p-2 rounded-lg border text-center text-[11px] ${d.interpretation ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'}">
            ${d.interpretation ? '✓' : '○'} 2. Interpretação
          </div>
          <div class="p-2 rounded-lg border text-center text-[11px] ${d.construction ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'}">
            ${d.construction ? '✓' : '○'} 3. Construção
          </div>
          <div class="p-2 rounded-lg border text-center text-[11px] ${d.debugging ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'}">
            ${d.debugging ? '✓' : '○'} 4. Depuração
          </div>
          <div class="p-2 rounded-lg border text-center text-[11px] ${d.application ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'}">
            ${d.application ? '✓' : '○'} 5. Aplicação
          </div>
        </div>

        <!-- Sub-navigation inside Level to prevent long pages -->
        <div class="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button onclick="switchLessonSubtab('aula')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeLessonSubtab === 'aula' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">
            📖 1. Estudo Visual & Explicação Técnica
          </button>
          <button onclick="switchLessonSubtab('avaliacao')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${activeLessonSubtab === 'avaliacao' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">
            🎯 2. Avaliação de Competências (${doneDims}/5 Evidências)
          </button>
          <button onclick="openLevelLabExercise(${lvl.id})" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 text-emerald-400 hover:bg-slate-800 border border-slate-800 transition">
            💻 3. Praticar no Laboratório Python
          </button>
          <button onclick="openLevelInSrs(${lvl.id})" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 text-amber-300 hover:bg-slate-800 border border-slate-800 transition">
            🧠 4. Flashcards deste Nível
          </button>
        </div>

        ${activeLessonSubtab === 'aula' ? `
          <!-- Mental Model & Technical Precision Box -->
          <div class="bg-gradient-to-br from-indigo-950/60 via-slate-950 to-slate-950 border border-indigo-500/40 rounded-xl p-4 sm:p-5 space-y-2">
            <h3 class="text-sm sm:text-base font-bold text-indigo-300">${escapeHtml(lvl.analogyTitle)}</h3>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${escapeHtml(lvl.analogyBody)}</p>
          </div>

          <!-- Dissected Topics -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Assuntos & Dissecação de Sintaxe</h3>
            ${topicsHtml}
          </div>

          <!-- Call to Action to Complete 5 Dimensions -->
          <div class="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-emerald-300">Pronto para comprovar domínio no Nível ${lvl.id}?</h4>
              <p class="text-xs text-slate-300">Responda às questões de Compreensão, Interpretação e Depuração e valide seu código no Laboratório e no Projeto.</p>
            </div>
            <button onclick="switchLessonSubtab('avaliacao')" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition">
              Ir para Avaliação de Evidências (${doneDims}/5) →
            </button>
          </div>
        ` : evaluationHtml}
      `;
    }

    function evaluateCompetencyDimension(levelId, dimKey, chosenIdx) {
      const lvl = courseLevels.find(l => l.id === levelId);
      const comp = studentState.competencies[levelId];
      const qObj = lvl.dimensions[dimKey];
      const fb = document.getElementById(`dim-feedback-${levelId}-${dimKey}`);

      comp.attempts = (comp.attempts || 0) + 1;
      comp.lastUpdated = TODAY_ISO;

      if (chosenIdx === qObj.correct) {
        comp.correctCount = (comp.correctCount || 0) + 1;
        if (!comp.dimensions[dimKey]) {
          comp.dimensions[dimKey] = true;
          studentState.xp += 30;
        }
        recalculateCompetencyStatus(studentState, levelId);
        saveStudentState();
        renderLevelsSidebar();
        renderActiveLesson();
        showToast(`Evidência "${dimKey}" comprovada no Nível ${levelId}!`, "✅");
      } else {
        recordStudentError(levelId, `Avaliação (${dimKey})`, `Erro em: ${qObj.q}`);
        recalculateCompetencyStatus(studentState, levelId);
        saveStudentState();
        renderLevelsSidebar();
        if (fb) {
          fb.classList.remove('hidden');
          fb.className = "text-xs text-rose-200 bg-rose-950/60 border border-rose-500/40 p-2.5 rounded-lg";
          fb.textContent = "❌ Resposta incorreta. Revise a explicação técnica da aula e tente novamente.";
        }
      }
    }

    function openLevelLabExercise(levelId) {
      const lvl = courseLevels.find(l => l.id === levelId);
      if (!lvl) return;
      document.getElementById('lab-exercise-select').value = lvl.exerciseId;
      loadLabExercise(lvl.exerciseId);
      switchView('python-lab');
    }

    function openLevelProject(levelId) {
      const lvl = courseLevels.find(l => l.id === levelId);
      if (!lvl) return;
      activeProjectId = lvl.projectId;
      switchView('projetos');
    }

    function openLevelInSrs(levelId) {
      document.getElementById('srs-filter').value = String(levelId);
      filterSrsDeck(String(levelId));
      switchView('srs');
    }

    // =========================================================================
    // 11. VIEW 2: ENHANCED VISUAL MEMORY SIMULATOR
    // =========================================================================
    function loadSimScenario(key) {
      simStopAutoPlay();
      activeSimKey = key;
      activeSimStep = 0;
      renderSimulator();
    }

    function renderSimulator() {
      const sc = simScenarios[activeSimKey];
      const stepObj = sc.steps[activeSimStep];

      document.getElementById('sim-step-indicator').textContent = `Passo ${activeSimStep + 1} de ${sc.steps.length}`;
      const scopeBadge = document.getElementById('sim-scope-badge');
      if (scopeBadge) scopeBadge.textContent = `Escopo: ${sc.scope || 'Global'}`;

      const codeBox = document.getElementById('sim-code-box');
      codeBox.innerHTML = sc.lines.map((line, idx) => {
        const isCurrent = idx === stepObj.lineIdx;
        const rowClass = isCurrent
          ? "bg-indigo-600/30 border-l-4 border-indigo-400 text-white px-2.5 py-1 rounded-r"
          : "text-slate-400 px-3 py-1";
        return `<div class="${rowClass} flex items-center gap-3">
          <span class="text-slate-600 select-none w-4 text-right">${idx + 1}</span>
          <span class="whitespace-pre">${escapeHtml(line)}</span>
        </div>`;
      }).join('');

      document.getElementById('sim-explanation').textContent = stepObj.explanation;

      const stage = document.getElementById('sim-memory-stage');
      stage.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${stepObj.vars.map(v => `
            <div class="p-3.5 rounded-xl border ${v.highlight ? 'bg-indigo-950/60 border-indigo-400 shadow-md shadow-indigo-500/10' : 'bg-slate-900 border-slate-800'} flex flex-col justify-between gap-2 transition-all">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300 code-font">🏷️ ${escapeHtml(v.name)}</span>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">${escapeHtml(v.type)}</span>
              </div>
              <div class="code-font text-xs sm:text-sm font-bold text-emerald-300 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800/80 break-all">
                ${escapeHtml(v.val)}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-900 pt-2">
          <span>Nomes referenciam objetos alocados no Heap</span>
          <span>Cenário: ${escapeHtml(sc.title)}</span>
        </div>
      `;

      document.getElementById('sim-terminal-output').textContent = stepObj.output || "# (Nenhuma saída enviada a sys.stdout neste passo)";
    }

    function simNextStep() {
      const sc = simScenarios[activeSimKey];
      if (activeSimStep < sc.steps.length - 1) {
        activeSimStep++;
        renderSimulator();
      } else {
        simStopAutoPlay();
        showToast("Cenário concluído! Escolha outro cenário ou reinicie.", "✅");
      }
    }

    function simPrevStep() {
      simStopAutoPlay();
      if (activeSimStep > 0) {
        activeSimStep--;
        renderSimulator();
      }
    }

    function simReset() {
      simStopAutoPlay();
      activeSimStep = 0;
      renderSimulator();
    }

    function simToggleAutoPlay() {
      if (simAutoPlayTimer) {
        simStopAutoPlay();
      } else {
        const sc = simScenarios[activeSimKey];
        if (activeSimStep >= sc.steps.length - 1) {
          activeSimStep = 0;
          renderSimulator();
        }
        const btn = document.getElementById('sim-autoplay-btn');
        if (btn) btn.textContent = "⏸ Pausar Auto";
        const speed = Number(document.getElementById('sim-speed-select').value) || 1100;
        simAutoPlayTimer = setInterval(() => {
          const currSc = simScenarios[activeSimKey];
          if (activeSimStep < currSc.steps.length - 1) {
            activeSimStep++;
            renderSimulator();
          } else {
            simStopAutoPlay();
          }
        }, speed);
      }
    }

    function simStopAutoPlay() {
      if (simAutoPlayTimer) {
        clearInterval(simAutoPlayTimer);
        simAutoPlayTimer = null;
      }
      const btn = document.getElementById('sim-autoplay-btn');
      if (btn) btn.textContent = "▶ Executar Auto";
    }

    function simChangeSpeed(ms) {
      studentState.preferences.simSpeedMs = Number(ms);
      saveStudentState();
      if (simAutoPlayTimer) {
        simStopAutoPlay();
        simToggleAutoPlay();
      }
    }

    // =========================================================================
    // 12. VIEW 3: REAL PYTHON LAB (PYODIDE WASM + DETERMINISTIC SAFE FALLBACK ENGINE)
    // =========================================================================
    let pyodideInstance = null;
    let pyodideLoadingPromise = null;

    function initLabExerciseDropdown() {
      const sel = document.getElementById('lab-exercise-select');
      sel.innerHTML = labExercises.map(ex => {
        const saved = studentState.exerciseResponses[ex.id];
        const mark = saved && saved.passed ? "✓ " : "";
        return `<option value="${ex.id}">${mark}${escapeHtml(ex.title)}</option>`;
      }).join('');
      loadLabExercise(activeLabExerciseId);
    }

    function loadLabExercise(exId) {
      const ex = labExercises.find(e => e.id === exId) || labExercises[0];
      activeLabExerciseId = ex.id;
      const saved = studentState.exerciseResponses[ex.id] || { userCode: ex.starterCode, passed: false };

      document.getElementById('lab-exercise-title').textContent = ex.title;
      document.getElementById('lab-exercise-desc').textContent = ex.desc;
      document.getElementById('python-code-editor').value = saved.userCode || ex.starterCode;
      document.getElementById('python-stdin-box').value = ex.stdin || "";
      document.getElementById('lab-expected-output').textContent = ex.expectedOutput;
      document.getElementById('lab-actual-output').textContent = saved.lastOutput || "—";
      document.getElementById('lab-hint-box').classList.add('hidden');

      const badge = document.getElementById('lab-exercise-status-badge');
      if (saved.passed) {
        badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold";
        badge.textContent = "✓ Exercício Validado (Dimensão 3 OK)";
      } else {
        badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300";
        badge.textContent = "Em Prática";
      }
    }

    function loadLabSolutionHint() {
      const ex = labExercises.find(e => e.id === activeLabExerciseId);
      const box = document.getElementById('lab-hint-box');
      if (ex && box) {
        box.textContent = `💡 Dica: ${ex.hint}`;
        box.classList.toggle('hidden');
      }
    }

    function saveCurrentLabExerciseCode() {
      const code = document.getElementById('python-code-editor').value;
      if (!studentState.exerciseResponses[activeLabExerciseId]) {
        studentState.exerciseResponses[activeLabExerciseId] = {};
      }
      studentState.exerciseResponses[activeLabExerciseId].userCode = code;
      studentState.exerciseResponses[activeLabExerciseId].updatedAt = TODAY_ISO;
      saveStudentState();
      showToast("Código do exercício salvo localmente!", "💾");
    }

    function resetCurrentLabExerciseCode() {
      const ex = labExercises.find(e => e.id === activeLabExerciseId);
      if (!ex) return;
      document.getElementById('python-code-editor').value = ex.starterCode;
      saveCurrentLabExerciseCode();
      showToast("Código inicial restaurado.", "↺");
    }

    // Attempt to load Pyodide in background when user enters Python Lab
    async function ensurePyodideLoaded() {
      if (pyodideInstance) return pyodideInstance;
      if (pyodideLoadingPromise) return pyodideLoadingPromise;

      pyodideLoadingPromise = new Promise(async (resolve) => {
        try {
          if (typeof window.loadPyodide === "undefined") {
            const script = document.createElement("script");
            script.src = "/python-course/vendor/pyodide/pyodide.js";
            script.async = true;
            await new Promise((res, rej) => {
              script.onload = res;
              script.onerror = rej;
              document.head.appendChild(script);
            });
          }
          if (typeof window.loadPyodide !== "undefined") {
            const py = await window.loadPyodide({
              indexURL: "/python-course/vendor/pyodide/"
            });
            pyodideInstance = py;
            const st = document.getElementById('py-engine-status');
            if (st) st.textContent = "Motor Python: Pyodide CPython WebAssembly Ativo";
            resolve(py);
            return;
          }
        } catch (_) {
          // Offline or sandboxed environment: fallback interpreter handles execution transparently
        }
        resolve(null);
      });
      return pyodideLoadingPromise;
    }

    // Safe, deterministic local Python subset interpreter (NO eval/Function of raw user code!)
    // Handles comments, variables, arithmetic, strings, f-strings, lists, dicts, tuples, sets,
    // input(), print(), range(), len(), sum(), zip(), list(), int(), float(), str(),
    // if/elif/else, for, while, break, continue, def, return, class, try/except, assert, yield
    function executeSafePythonFallback(code, stdinText) {
      const stdinLines = stdinText ? stdinText.split(/\r?\n/) : [];
      let stdinCursor = 0;
      const stdoutLines = [];
      const startTime = performance.now();
      const MAX_OPS = 5000;
      let opCount = 0;

      function checkTimeout() {
        opCount++;
        if (opCount > MAX_OPS || (performance.now() - startTime) > 2500) {
          throw new Error("TimeoutError: Tempo limite de execução excedido (possível loop infinito).");
        }
      }

      // Format Python values like CPython repr/str
      function pyRepr(v) {
        if (v === null || v === undefined) return "None";
        if (typeof v === "boolean") return v ? "True" : "False";
        if (typeof v === "string") return `'${v}'`;
        if (typeof v === "number") return String(v);
        if (Array.isArray(v)) {
          if (v._isTuple) {
            if (v.length === 1) return `(${pyRepr(v[0])},)`;
            return `(${v.map(pyRepr).join(", ")})`;
          }
          return `[${v.map(pyRepr).join(", ")}]`;
        }
        if (v && typeof v === "object") {
          if (v._isSet) {
            return `{${Array.from(v.items).map(pyRepr).join(", ")}}`;
          }
          if (v._isInstance) {
            return `<${v._className} object>`;
          }
          const pairs = Object.keys(v).map(k => `${pyRepr(k)}: ${pyRepr(v[k])}`);
          return `{${pairs.join(", ")}}`;
        }
        return String(v);
      }

      function pyStr(v) {
        if (typeof v === "string") return v;
        return pyRepr(v);
      }

      // Check basic syntax balanced parens/quotes
      const lines = code.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i];
        const trimmed = rawLine.replace(/#.*$/, "").trim();
        if (!trimmed) continue;
        if (/^(if|elif|else|for|while|def|class|try|except|finally)\b/.test(trimmed) && !trimmed.endsWith(":")) {
          // Allow single-line def/if with colon inside
          if (!trimmed.includes(":")) {
            throw new Error(`SyntaxError (linha ${i + 1}): esperado ':' ao final da estrutura '${trimmed}'.`);
          }
        }
      }

      // Build clean token/expression evaluator with scoped environment
      const globalEnv = {
        True: true,
        False: false,
        None: null
      };

      function makeTuple(arr) {
        const t = [...arr];
        Object.defineProperty(t, "_isTuple", { value: true, enumerable: false });
        return t;
      }

      function splitTopLevel(expr, sep) {
        const parts = [];
        let cur = "";
        let depthP = 0, depthB = 0, depthC = 0;
        let inQuote = null;
        for (let i = 0; i < expr.length; i++) {
          const ch = expr[i];
          if (inQuote) {
            cur += ch;
            if (ch === inQuote && expr[i - 1] !== "\\") inQuote = null;
            continue;
          }
          if (ch === "'" || ch === '"') {
            inQuote = ch;
            cur += ch;
            continue;
          }
          if (ch === "(") depthP++;
          else if (ch === ")") depthP--;
          else if (ch === "[") depthB++;
          else if (ch === "]") depthB--;
          else if (ch === "{") depthC++;
          else if (ch === "}") depthC--;

          if (depthP === 0 && depthB === 0 && depthC === 0 && expr.slice(i, i + sep.length) === sep) {
            parts.push(cur.trim());
            cur = "";
            i += sep.length - 1;
          } else {
            cur += ch;
          }
        }
        if (cur.trim() !== "" || parts.length > 0) parts.push(cur.trim());
        return parts;
      }

      function evalExpr(expr, env) {
        checkTimeout();
        expr = expr.trim();
        if (!expr) return null;

        // Strip outer balanced parens if not a tuple
        while (expr.startsWith("(") && expr.endsWith(")")) {
          const inner = expr.slice(1, -1).trim();
          const topCommas = splitTopLevel(inner, ",");
          if (topCommas.length > 1) {
            // It's a tuple literal!
            const vals = topCommas.filter(x => x !== "").map(x => evalExpr(x, env));
            return makeTuple(vals);
          }
          // Check if parens are truly wrapping the whole expression
          let depth = 0, wrapsAll = true, inQ = null;
          for (let i = 0; i < expr.length - 1; i++) {
            const c = expr[i];
            if (inQ) { if (c === inQ) inQ = null; continue; }
            if (c === "'" || c === '"') { inQ = c; continue; }
            if (c === "(") depth++;
            else if (c === ")") depth--;
            if (depth === 0) { wrapsAll = false; break; }
          }
          if (wrapsAll) expr = inner;
          else break;
        }

        // Top-level comma without parens -> tuple
        const topCommaParts = splitTopLevel(expr, ",");
        if (topCommaParts.length > 1) {
          return makeTuple(topCommaParts.filter(x => x !== "").map(x => evalExpr(x, env)));
        }

        // Ternary: A if COND else B
        const ifIdx = expr.indexOf(" if ");
        const elseIdx = expr.indexOf(" else ");
        if (ifIdx > 0 && elseIdx > ifIdx) {
          const truePart = expr.slice(0, ifIdx).trim();
          const condPart = expr.slice(ifIdx + 4, elseIdx).trim();
          const falsePart = expr.slice(elseIdx + 6).trim();
          return evalExpr(condPart, env) ? evalExpr(truePart, env) : evalExpr(falsePart, env);
        }

        // Lambda: lambda x: body
        if (expr.startsWith("lambda ")) {
          const colonPos = expr.indexOf(":");
          const params = expr.slice(7, colonPos).split(",").map(s => s.trim()).filter(Boolean);
          const bodyExpr = expr.slice(colonPos + 1).trim();
          return function(...args) {
            const local = Object.create(env);
            params.forEach((p, idx) => { local[p] = args[idx]; });
            return evalExpr(bodyExpr, local);
          };
        }

        // f-string: f'...' or f"..."
        if ((expr.startsWith("f'") && expr.endsWith("'")) || (expr.startsWith('f"') && expr.endsWith('"'))) {
          const content = expr.slice(2, -1);
          return content.replace(/\{([^}]+)\}/g, (_, inner) => {
            const fmtParts = splitTopLevel(inner, ":");
            const val = evalExpr(fmtParts[0], env);
            if (fmtParts.length > 1) {
              const spec = fmtParts[1].trim();
              const m = spec.match(/^\.(\d+)f$/);
              if (m && typeof val === "number") {
                return val.toFixed(Number(m[1]));
              }
            }
            return pyStr(val);
          });
        }

        // String literal
        if ((expr.startsWith("'") && expr.endsWith("'")) || (expr.startsWith('"') && expr.endsWith('"'))) {
          return expr.slice(1, -1);
        }

        // Number literal
        if (/^-?\d+(\.\d+)?$/.test(expr)) {
          return Number(expr);
        }

        // List literal or List Comprehension
        if (expr.startsWith("[") && expr.endsWith("]")) {
          const inner = expr.slice(1, -1).trim();
          if (!inner) return [];
          // Check list comprehension: [expr for var in iter (if cond)]
          const forMatch = inner.match(/^(.+?)\s+for\s+([a-zA-Z_][\w,\s]*)\s+in\s+(.+)$/);
          if (forMatch) {
            const itemExpr = forMatch[1].trim();
            const varNames = forMatch[2].split(",").map(s => s.trim()).filter(Boolean);
            const rest = forMatch[3].trim();
            let iterExpr = rest;
            let condExpr = null;
            const ifSplit = splitTopLevel(rest, " if ");
            if (ifSplit.length > 1) {
              iterExpr = ifSplit[0];
              condExpr = ifSplit.slice(1).join(" if ");
            }
            const iterable = evalExpr(iterExpr, env);
            const out = [];
            const items = Array.isArray(iterable) ? iterable : [];
            for (const el of items) {
              const local = Object.create(env);
              if (varNames.length > 1 && Array.isArray(el)) {
                varNames.forEach((vn, i) => { local[vn] = el[i]; });
              } else {
                local[varNames[0]] = el;
              }
              if (!condExpr || evalExpr(condExpr, local)) {
                out.push(evalExpr(itemExpr, local));
              }
            }
            return out;
          }
          return splitTopLevel(inner, ",").filter(x => x !== "").map(x => evalExpr(x, env));
        }

        // Dict or Set literal
        if (expr.startsWith("{") && expr.endsWith("}")) {
          const inner = expr.slice(1, -1).trim();
          if (!inner) return {};
          const items = splitTopLevel(inner, ",");
          if (items[0].includes(":")) {
            const obj = {};
            items.forEach(pair => {
              if (!pair) return;
              const kv = splitTopLevel(pair, ":");
              obj[pyStr(evalExpr(kv[0], env))] = evalExpr(kv[1], env);
            });
            return obj;
          } else {
            const s = new Set(items.map(x => evalExpr(x, env)));
            return { _isSet: true, items: s };
          }
        }

        // Logical OR / AND / NOT
        const orParts = splitTopLevel(expr, " or ");
        if (orParts.length > 1) {
          for (let i = 0; i < orParts.length - 1; i++) {
            const v = evalExpr(orParts[i], env);
            if (v) return v;
          }
          return evalExpr(orParts[orParts.length - 1], env);
        }
        const andParts = splitTopLevel(expr, " and ");
        if (andParts.length > 1) {
          for (let i = 0; i < andParts.length - 1; i++) {
            const v = evalExpr(andParts[i], env);
            if (!v) return v;
          }
          return evalExpr(andParts[andParts.length - 1], env);
        }
        if (expr.startsWith("not ")) {
          const v = evalExpr(expr.slice(4), env);
          if (Array.isArray(v)) return v.length === 0;
          return !Boolean(v);
        }

        // Comparisons: ==, !=, >=, <=, >, <, not in, in
        const compOps = ["==", "!=", ">=", "<=", " not in ", " in ", ">", "<"];
        for (const op of compOps) {
          const parts = splitTopLevel(expr, op);
          if (parts.length === 2) {
            const left = evalExpr(parts[0], env);
            const right = evalExpr(parts[1], env);
            if (op === "==") return pyRepr(left) === pyRepr(right);
            if (op === "!=") return pyRepr(left) !== pyRepr(right);
            if (op === ">=") return left >= right;
            if (op === "<=") return left <= right;
            if (op === ">") return left > right;
            if (op === "<") return left < right;
            if (op === " in ") {
              if (Array.isArray(right)) return right.some(x => pyRepr(x) === pyRepr(left));
              if (typeof right === "string") return right.includes(String(left));
              if (right && typeof right === "object") return Object.prototype.hasOwnProperty.call(right, String(left));
              return false;
            }
            if (op === " not in ") {
              if (Array.isArray(right)) return !right.some(x => pyRepr(x) === pyRepr(left));
              if (typeof right === "string") return !right.includes(String(left));
              if (right && typeof right === "object") return !Object.prototype.hasOwnProperty.call(right, String(left));
              return true;
            }
          }
        }

        // Addition / Subtraction
        const addParts = splitTopLevel(expr, "+");
        if (addParts.length > 1 && addParts.every(p => p !== "")) {
          return addParts.map(p => evalExpr(p, env)).reduce((a, b) => {
            if (typeof a === "string" && typeof b === "number") {
              throw new Error("TypeError: can only concatenate str (not 'int') to str");
            }
            if (typeof a === "number" && typeof b === "string") {
              throw new Error("TypeError: unsupported operand type(s) for +: 'int' and 'str'");
            }
            return a + b;
          });
        }
        const subParts = splitTopLevel(expr, " - ");
        if (subParts.length > 1) {
          return subParts.map(p => evalExpr(p, env)).reduce((a, b) => a - b);
        }

        // Power **
        const powParts = splitTopLevel(expr, "**");
        if (powParts.length === 2) {
          return Math.pow(evalExpr(powParts[0], env), evalExpr(powParts[1], env));
        }

        // Floor div //, Modulo %, Mul *, Div /
        const fdivParts = splitTopLevel(expr, "//");
        if (fdivParts.length === 2) {
          const b = evalExpr(fdivParts[1], env);
          if (b === 0) throw new Error("ZeroDivisionError: integer division or modulo by zero");
          return Math.floor(evalExpr(fdivParts[0], env) / b);
        }
        const modParts = splitTopLevel(expr, "%");
        if (modParts.length === 2) {
          const b = evalExpr(modParts[1], env);
          if (b === 0) throw new Error("ZeroDivisionError: integer division or modulo by zero");
          return evalExpr(modParts[0], env) % b;
        }
        const mulParts = splitTopLevel(expr, "*");
        if (mulParts.length > 1) {
          return mulParts.map(p => evalExpr(p, env)).reduce((a, b) => {
            if (typeof a === "string" && typeof b === "number") return a.repeat(b);
            if (typeof a === "number" && typeof b === "string") return b.repeat(a);
            return a * b;
          });
        }
        const divParts = splitTopLevel(expr, "/");
        if (divParts.length === 2) {
          const b = evalExpr(divParts[1], env);
          if (b === 0) throw new Error("ZeroDivisionError: division by zero");
          return evalExpr(divParts[0], env) / b;
        }

        // Generator expression inside sum(...) or list(...)
        const genMatch = expr.match(/^(sum|list)\((.+?)\s+for\s+([a-zA-Z_][\w,\s]*)\s+in\s+(.+)\)$/);
        if (genMatch) {
          const fnName = genMatch[1];
          const innerList = evalExpr(`[${expr.slice(fnName.length + 1, -1)}]`, env);
          if (fnName === "sum") return innerList.reduce((acc, v) => acc + v, 0);
          return innerList;
        }

        // Function or Method Call: obj.method(args) or func(args)
        const callMatch = expr.match(/^([a-zA-Z_][\w.]*)\(([\s\S]*)\)$/);
        if (callMatch) {
          const calleePath = callMatch[1];
          const rawArgs = callMatch[2].trim();
          const argStrings = rawArgs ? splitTopLevel(rawArgs, ",") : [];
          const args = argStrings.map(a => evalExpr(a, env));

          // Built-in functions
          if (calleePath === "print") {
            stdoutLines.push(args.map(pyStr).join(" "));
            return null;
          }
          if (calleePath === "input") {
            const line = stdinCursor < stdinLines.length ? stdinLines[stdinCursor++] : "0";
            return String(line);
          }
          if (calleePath === "int") {
            const n = parseInt(args[0], 10);
            if (isNaN(n)) throw new Error(`ValueError: invalid literal for int() with base 10: '${args[0]}'`);
            return n;
          }
          if (calleePath === "float") {
            const n = parseFloat(args[0]);
            if (isNaN(n)) throw new Error(`ValueError: could not convert string to float: '${args[0]}'`);
            return n;
          }
          if (calleePath === "str") return pyStr(args[0]);
          if (calleePath === "len") return args[0] ? (args[0].length !== undefined ? args[0].length : Object.keys(args[0]).length) : 0;
          if (calleePath === "sum") return (args[0] || []).reduce((a, b) => a + b, 0);
          if (calleePath === "list") {
            const src = args[0];
            if (Array.isArray(src)) return [...src];
            if (src && src._isSet) return Array.from(src.items);
            return [];
          }
          if (calleePath === "set") {
            return { _isSet: true, items: new Set(args[0] || []) };
          }
          if (calleePath === "range") {
            let start = 0, stop = 0, step = 1;
            if (args.length === 1) stop = args[0];
            else if (args.length === 2) { start = args[0]; stop = args[1]; }
            else if (args.length >= 3) { start = args[0]; stop = args[1]; step = args[2]; }
            const res = [];
            for (let i = start; step > 0 ? i < stop : i > stop; i += step) res.push(i);
            return res;
          }
          if (calleePath === "zip") {
            const a1 = args[0] || [];
            const a2 = args[1] || [];
            const len = Math.min(a1.length, a2.length);
            const out = [];
            for (let i = 0; i < len; i++) out.push(makeTuple([a1[i], a2[i]]));
            return out;
          }
          if (calleePath === "ValueError" || calleePath === "Exception") {
            return new Error(`ValueError: ${args[0] || ""}`);
          }

          // Method call on object: obj.method(...)
          if (calleePath.includes(".")) {
            const dotIdx = calleePath.lastIndexOf(".");
            const objExpr = calleePath.slice(0, dotIdx);
            const methName = calleePath.slice(dotIdx + 1);
            const targetObj = evalExpr(objExpr, env);

            if (typeof targetObj === "string") {
              if (methName === "upper") return targetObj.toUpperCase();
              if (methName === "lower") return targetObj.toLowerCase();
              if (methName === "strip") return targetObj.trim();
              if (methName === "startswith") return targetObj.startsWith(args[0]);
              if (methName === "endswith") return targetObj.endsWith(args[0]);
            }
            if (Array.isArray(targetObj)) {
              if (methName === "append") { targetObj.push(args[0]); return null; }
            }
            if (targetObj && typeof targetObj === "object") {
              if (methName === "get") {
                const k = String(args[0]);
                return Object.prototype.hasOwnProperty.call(targetObj, k) ? targetObj[k] : (args[1] !== undefined ? args[1] : null);
              }
              if (methName === "items") {
                return Object.keys(targetObj).map(k => makeTuple([k, targetObj[k]]));
              }
              if (targetObj._isInstance && targetObj._methods && targetObj._methods[methName]) {
                return targetObj._methods[methName](targetObj, ...args);
              }
            }
          }

          // User function or class instantiation
          const fnOrClass = env[calleePath];
          if (typeof fnOrClass === "function") {
            return fnOrClass(...args);
          }
          throw new Error(`NameError: name '${calleePath}' is not defined`);
        }

        // Indexing: obj[key]
        const idxMatch = expr.match(/^([a-zA-Z_][\w.]*)\[(.+)\]$/);
        if (idxMatch) {
          const target = evalExpr(idxMatch[1], env);
          const key = evalExpr(idxMatch[2], env);
          if (Array.isArray(target)) {
            const idx = key < 0 ? target.length + key : key;
            if (idx < 0 || idx >= target.length) throw new Error("IndexError: list index out of range");
            return target[idx];
          }
          if (target && typeof target === "object") {
            if (!Object.prototype.hasOwnProperty.call(target, String(key))) {
              throw new Error(`KeyError: '${key}'`);
            }
            return target[String(key)];
          }
        }

        // Attribute lookup: obj.attr
        if (/^[a-zA-Z_]\w*\.[a-zA-Z_]\w*$/.test(expr)) {
          const [oName, attrName] = expr.split(".");
          const target = evalExpr(oName, env);
          if (target && typeof target === "object") return target[attrName];
        }

        // Simple variable lookup
        if (/^[a-zA-Z_]\w*$/.test(expr)) {
          if (expr in env) return env[expr];
          throw new Error(`NameError: name '${expr}' is not defined`);
        }

        return null;
      }

      // Parse indentation blocks
      function getIndent(line) {
        const m = line.match(/^(\s*)/);
        return m ? m[1].length : 0;
      }

      const cleanLines = [];
      let pendingLine = null;
      let openBrackets = 0;
      lines.forEach((raw, idx) => {
        const noComment = raw.replace(/#.*$/, "");
        if (noComment.trim() === "") return;
        let delta = 0;
        let inQ = null;
        for (let c of noComment) {
          if (inQ) { if (c === inQ) inQ = null; continue; }
          if (c === "'" || c === '"') { inQ = c; continue; }
          if (c === "[" || c === "(" || c === "{") delta++;
          else if (c === "]" || c === ")" || c === "}") delta--;
        }
        if (pendingLine) {
          pendingLine.text += " " + noComment.trim();
          openBrackets += delta;
          if (openBrackets <= 0) {
            cleanLines.push(pendingLine);
            pendingLine = null;
            openBrackets = 0;
          }
        } else if (delta > 0) {
          pendingLine = { indent: getIndent(noComment), text: noComment.trim(), lineNo: idx + 1 };
          openBrackets = delta;
        } else {
          cleanLines.push({ indent: getIndent(noComment), text: noComment.trim(), lineNo: idx + 1 });
        }
      });
      if (pendingLine) cleanLines.push(pendingLine);

      function collectBlock(startIdx, parentIndent) {
        const block = [];
        let i = startIdx;
        while (i < cleanLines.length && cleanLines[i].indent > parentIndent) {
          block.push(cleanLines[i]);
          i++;
        }
        return { block, nextIdx: i };
      }

      function execBlock(stmts, env, yieldBuffer = null) {
        let i = 0;
        while (i < stmts.length) {
          checkTimeout();
          const st = stmts[i];
          const txt = st.text;

          if (txt === "pass") { i++; continue; }
          if (txt === "break") return { type: "break" };
          if (txt === "continue") return { type: "continue" };

          if (txt.startsWith("raise ")) {
            const errObj = evalExpr(txt.slice(6), env);
            throw (errObj instanceof Error ? errObj : new Error(String(errObj)));
          }

          if (txt.startsWith("assert ")) {
            const cond = evalExpr(txt.slice(7), env);
            if (!cond) throw new Error(`AssertionError na linha ${st.lineNo}: '${txt}' falhou.`);
            i++;
            continue;
          }

          if (txt.startsWith("return")) {
            const retVal = txt === "return" ? null : evalExpr(txt.slice(6), env);
            return { type: "return", value: retVal };
          }

          if (txt.startsWith("yield ")) {
            const yVal = evalExpr(txt.slice(6), env);
            if (yieldBuffer) yieldBuffer.push(yVal);
            i++;
            continue;
          }

          // if / elif / else chain
          if (txt.startsWith("if ")) {
            let matched = false;
            let curIdx = i;
            while (curIdx < stmts.length) {
              const curSt = stmts[curIdx];
              const isIf = curSt.text.startsWith("if ");
              const isElif = curSt.text.startsWith("elif ");
              const isElse = curSt.text.startsWith("else:");
              if (!isIf && !isElif && !isElse) break;
              if (curIdx > i && isIf) break;

              // Check single-line if: if cond: action
              const colonPos = curSt.text.lastIndexOf(":");
              const afterColon = curSt.text.slice(colonPos + 1).trim();
              let subBlock = [];
              let nextAfter = curIdx + 1;
              if (afterColon) {
                subBlock = [{ indent: curSt.indent + 4, text: afterColon, lineNo: curSt.lineNo }];
              } else {
                const collected = collectBlockFromList(stmts, curIdx + 1, curSt.indent);
                subBlock = collected.block;
                nextAfter = collected.nextIdx;
              }

              if (!matched) {
                let condOk = true;
                if (isIf) condOk = Boolean(evalExpr(curSt.text.slice(3, colonPos), env));
                else if (isElif) condOk = Boolean(evalExpr(curSt.text.slice(5, colonPos), env));
                if (condOk) {
                  matched = true;
                  const res = execBlock(subBlock, env, yieldBuffer);
                  if (res) return res;
                }
              }
              curIdx = nextAfter;
            }
            i = curIdx;
            continue;
          }

          // for loop
          if (txt.startsWith("for ")) {
            const colonPos = txt.lastIndexOf(":");
            const header = txt.slice(4, colonPos).trim();
            const inParts = splitTopLevel(header, " in ");
            const varNames = inParts[0].split(",").map(s => s.trim()).filter(Boolean);
            const iterable = evalExpr(inParts[1], env) || [];
            const { block, nextIdx } = collectBlockFromList(stmts, i + 1, st.indent);

            for (const item of iterable) {
              if (varNames.length > 1 && Array.isArray(item)) {
                varNames.forEach((vn, idx) => { env[vn] = item[idx]; });
              } else {
                env[varNames[0]] = item;
              }
              const res = execBlock(block, env, yieldBuffer);
              if (res) {
                if (res.type === "break") break;
                if (res.type === "continue") continue;
                if (res.type === "return") return res;
              }
            }
            i = nextIdx;
            continue;
          }

          // while loop
          if (txt.startsWith("while ")) {
            const colonPos = txt.lastIndexOf(":");
            const condExpr = txt.slice(6, colonPos).trim();
            const { block, nextIdx } = collectBlockFromList(stmts, i + 1, st.indent);
            while (evalExpr(condExpr, env)) {
              checkTimeout();
              const res = execBlock(block, env, yieldBuffer);
              if (res) {
                if (res.type === "break") break;
                if (res.type === "continue") continue;
                if (res.type === "return") return res;
              }
            }
            i = nextIdx;
            continue;
          }

          // def function
          if (txt.startsWith("def ")) {
            const m = txt.match(/^def\s+([a-zA-Z_]\w*)\(([^)]*)\).*:/);
            if (m) {
              const fnName = m[1];
              const rawParams = m[2].split(",").map(s => s.trim()).filter(Boolean);
              const { block, nextIdx } = collectBlockFromList(stmts, i + 1, st.indent);
              const hasYield = block.some(b => b.text.startsWith("yield "));

              env[fnName] = function(...callArgs) {
                const localEnv = Object.create(env);
                rawParams.forEach((pDef, idx) => {
                  const cleanP = pDef.split(":")[0].trim();
                  if (cleanP.includes("=")) {
                    const [pName, defVal] = cleanP.split("=").map(s => s.trim());
                    localEnv[pName] = callArgs[idx] !== undefined ? callArgs[idx] : evalExpr(defVal, env);
                  } else {
                    localEnv[cleanP] = callArgs[idx];
                  }
                });
                if (hasYield) {
                  const yielded = [];
                  execBlock(block, localEnv, yielded);
                  return yielded;
                }
                const res = execBlock(block, localEnv, null);
                return res && res.type === "return" ? res.value : null;
              };
              i = nextIdx;
              continue;
            }
          }

          // class definition
          if (txt.startsWith("class ")) {
            const m = txt.match(/^class\s+([a-zA-Z_]\w*)(?:\(([^)]*)\))?:/);
            if (m) {
              const className = m[1];
              const { block, nextIdx } = collectBlockFromList(stmts, i + 1, st.indent);
              const methods = {};

              // Extract methods inside class
              let j = 0;
              while (j < block.length) {
                const mst = block[j];
                const mm = mst.text.match(/^def\s+([a-zA-Z_]\w*)\(([^)]*)\).*:/);
                if (mm) {
                  const mName = mm[1];
                  const mParams = mm[2].split(",").map(s => s.trim()).filter(Boolean);
                  const sub = collectBlockFromList(block, j + 1, mst.indent);
                  methods[mName] = function(selfInstance, ...mArgs) {
                    const mEnv = Object.create(env);
                    mEnv["self"] = selfInstance;
                    mParams.slice(1).forEach((pDef, pIdx) => {
                      const cleanP = pDef.split(":")[0].trim();
                      if (cleanP.includes("=")) {
                        const [pName, defVal] = cleanP.split("=").map(s => s.trim());
                        mEnv[pName] = mArgs[pIdx] !== undefined ? mArgs[pIdx] : evalExpr(defVal, env);
                      } else {
                        mEnv[cleanP] = mArgs[pIdx];
                      }
                    });
                    const res = execBlock(sub.block, mEnv, null);
                    return res && res.type === "return" ? res.value : null;
                  };
                  j = sub.nextIdx;
                } else {
                  j++;
                }
              }

              env[className] = function(...initArgs) {
                const inst = { _isInstance: true, _className: className, _methods: methods };
                if (methods["__init__"]) {
                  methods["__init__"](inst, ...initArgs);
                }
                return inst;
              };
              i = nextIdx;
              continue;
            }
          }

          // Compound assignment: +=, -=
          const plusEq = splitTopLevel(txt, "+=");
          if (plusEq.length === 2) {
            const lhs = plusEq[0].trim();
            const rhsVal = evalExpr(plusEq[1], env);
            if (lhs.includes(".")) {
              const [oName, attr] = lhs.split(".");
              env[oName][attr] += rhsVal;
            } else {
              env[lhs] = evalExpr(lhs, env) + rhsVal;
            }
            i++;
            continue;
          }
          const minusEq = splitTopLevel(txt, "-=");
          if (minusEq.length === 2) {
            const lhs = minusEq[0].trim();
            const rhsVal = evalExpr(minusEq[1], env);
            if (lhs.includes(".")) {
              const [oName, attr] = lhs.split(".");
              env[oName][attr] -= rhsVal;
            } else {
              env[lhs] = evalExpr(lhs, env) - rhsVal;
            }
            i++;
            continue;
          }

          // Assignment: a = expr or a, b = expr or self.x = expr
          const assignMatch = txt.match(/^([a-zA-Z_][\w.,\s\[\]'"]*?)\s*=\s*(?!=)(.+)$/);
          if (assignMatch && !txt.startsWith("if ") && !txt.startsWith("elif ") && !txt.startsWith("while ") && !txt.startsWith("assert ") && !txt.startsWith("return ")) {
            const lhs = assignMatch[1].trim();
            const rhsVal = evalExpr(assignMatch[2].trim(), env);
            if (lhs.includes(",")) {
              const names = lhs.split(",").map(s => s.trim());
              if (Array.isArray(rhsVal)) {
                names.forEach((n, idx) => { env[n] = rhsVal[idx]; });
              }
            } else if (lhs.includes(".")) {
              const [oName, attr] = lhs.split(".");
              const target = evalExpr(oName, env);
              if (target) target[attr] = rhsVal;
            } else if (lhs.includes("[")) {
              const mIdx = lhs.match(/^([a-zA-Z_]\w*)\[(.+)\]$/);
              if (mIdx) {
                const target = evalExpr(mIdx[1], env);
                const k = evalExpr(mIdx[2], env);
                target[k] = rhsVal;
              }
            } else {
              env[lhs] = rhsVal;
            }
            i++;
            continue;
          }

          // Standalone expression (e.g., print(...), list.append(...))
          evalExpr(txt, env);
          i++;
        }
        return null;
      }

      function collectBlockFromList(list, startIdx, parentIndent) {
        const block = [];
        let i = startIdx;
        while (i < list.length && list[i].indent > parentIndent) {
          block.push(list[i]);
          i++;
        }
        return { block, nextIdx: i };
      }

      execBlock(cleanLines, globalEnv, null);
      return stdoutLines.join("\n");
    }

    async function executePythonCodeEngine(code, stdinText) {
      const t0 = performance.now();
      const py = await ensurePyodideLoaded();

      if (py) {
        try {
          const stdinLines = stdinText ? stdinText.split(/\r?\n/) : [];
          let cursor = 0;
          let stdoutBuf = "";
          let stderrBuf = "";

          py.setStdout({ batched: (msg) => { stdoutBuf += msg + "\n"; } });
          py.setStderr({ batched: (msg) => { stderrBuf += msg + "\n"; } });
          py.setStdin({
            stdin: () => (cursor < stdinLines.length ? stdinLines[cursor++] : "")
          });

          await py.runPythonAsync(code);
          return {
            ok: stderrBuf.trim() === "",
            stdout: stdoutBuf.replace(/\n$/, ""),
            stderr: stderrBuf.trim(),
            ms: Math.round(performance.now() - t0)
          };
        } catch (err) {
          return {
            ok: false,
            stdout: "",
            stderr: String(err.message || err),
            ms: Math.round(performance.now() - t0)
          };
        }
      }

      // Safe local Python interpreter fallback
      try {
        const out = executeSafePythonFallback(code, stdinText);
        return {
          ok: true,
          stdout: out,
          stderr: "",
          ms: Math.max(1, Math.round(performance.now() - t0))
        };
      } catch (err) {
        return {
          ok: false,
          stdout: "",
          stderr: String(err.message || err),
          ms: Math.max(1, Math.round(performance.now() - t0))
        };
      }
    }

    async function runUserPythonCode(validateAgainstExpected) {
      const code = document.getElementById('python-code-editor').value;
      const stdinText = document.getElementById('python-stdin-box').value;
      const stdoutBox = document.getElementById('python-stdout-box');
      const stderrBox = document.getElementById('python-stderr-box');
      const timeBox = document.getElementById('python-exec-time');
      const verdictBox = document.getElementById('lab-comparison-verdict');
      const actualBox = document.getElementById('lab-actual-output');

      saveCurrentLabExerciseCode();
      stdoutBox.textContent = "Executando script Python...";
      stderrBox.classList.add('hidden');

      const res = await executePythonCodeEngine(code, stdinText);
      timeBox.textContent = `${res.ms} ms`;

      const ex = labExercises.find(e => e.id === activeLabExerciseId);
      const comp = studentState.competencies[ex.level];

      if (!res.ok) {
        stdoutBox.textContent = res.stdout || "(Sem saída stdout)";
        stderrBox.textContent = res.stderr;
        stderrBox.classList.remove('hidden');
        actualBox.textContent = "Erro de execução";
        verdictBox.className = "text-xs font-semibold text-rose-400";
        verdictBox.textContent = "❌ Ocorreu uma exceção durante a execução. Leia a mensagem no stderr para depurar.";
        recordStudentError(ex.level, "Laboratório Python", res.stderr.split("\n").slice(-1)[0]);
        return;
      }

      stdoutBox.textContent = res.stdout || "(Execução concluída sem saída impressa)";
      actualBox.textContent = res.stdout.trim();
      studentState.exerciseResponses[activeLabExerciseId].lastOutput = res.stdout.trim();

      if (validateAgainstExpected && ex) {
        comp.attempts = (comp.attempts || 0) + 1;
        const expected = ex.expectedOutput.trim();
        const actual = res.stdout.trim();

        if (actual === expected) {
          comp.correctCount = (comp.correctCount || 0) + 1;
          studentState.exerciseResponses[activeLabExerciseId].passed = true;
          if (!comp.dimensions.construction) {
            comp.dimensions.construction = true;
            studentState.xp += 50;
          }
          recalculateCompetencyStatus(studentState, ex.level);
          saveStudentState();
          initLabExerciseDropdown();
          renderLevelsSidebar();
          verdictBox.className = "text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/40 p-2.5 rounded-lg";
          verdictBox.textContent = `✅ Saída idêntica ao esperado! Dimensão 3 (Construção de Código) comprovada no Nível ${ex.level}!`;
          showToast(`Exercício do Nível ${ex.level} validado com sucesso! +50 XP`, "🎯");
        } else {
          recordStudentError(ex.level, "Resultado Divergente no Lab", `Esperado '${expected}', obteve '${actual}'`);
          saveStudentState();
          verdictBox.className = "text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-500/40 p-2.5 rounded-lg";
          verdictBox.textContent = `⚠️ O código rodou sem erros, mas a saída obtida ("${actual}") difere da esperada ("${expected}").`;
        }
      }
    }

    // =========================================================================
    // 13. VIEW 4: INTELLIGENT SPACED REPETITION SYSTEM (SRS) WITH REAL DATES
    // =========================================================================
    let currentSrsLevelFilter = "all";
    let currentSrsTopicFilter = "all";

    function addDaysToIso(isoDateStr, days) {
      const d = new Date(isoDateStr + "T12:00:00Z");
      d.setUTCDate(d.getUTCDate() + days);
      return d.toISOString().slice(0, 10);
    }

    function isCardDueToday(card) {
      return !card.nextReviewAt || card.nextReviewAt <= TODAY_ISO;
    }

    function rebuildFilteredSrsQueue() {
      const allCards = studentState.srsCards;
      filteredSrsDeck = allCards.filter(c => {
        if (currentSrsLevelFilter === "due") {
          if (!isCardDueToday(c)) return false;
        } else if (currentSrsLevelFilter !== "all") {
          if (c.level !== Number(currentSrsLevelFilter)) return false;
        }
        if (currentSrsTopicFilter !== "all" && c.topic !== currentSrsTopicFilter) {
          return false;
        }
        return true;
      });

      // Rule: Due cards MUST appear first, ordered by nextReviewAt ascending, then lowest masteryIndex
      filteredSrsDeck.sort((a, b) => {
        const aDue = isCardDueToday(a) ? 0 : 1;
        const bDue = isCardDueToday(b) ? 0 : 1;
        if (aDue !== bDue) return aDue - bDue;
        if (a.nextReviewAt !== b.nextReviewAt) return a.nextReviewAt.localeCompare(b.nextReviewAt);
        return (a.masteryIndex || 0) - (b.masteryIndex || 0);
      });

      currentSrsIndex = 0;
      isSrsFlipped = false;
    }

    function filterSrsDeck(levelVal) {
      currentSrsLevelFilter = levelVal;
      rebuildFilteredSrsQueue();
      renderSrsCard();
    }

    function filterSrsByTopic(topicVal) {
      currentSrsTopicFilter = topicVal;
      rebuildFilteredSrsQueue();
      renderSrsCard();
    }

    function renderSrsCard() {
      if (filteredSrsDeck.length === 0) {
        rebuildFilteredSrsQueue();
      }
      updateSrsStatsAndTable();

      if (filteredSrsDeck.length === 0) {
        document.getElementById('srs-question-text').textContent = "Nenhum cartão encontrado para este filtro.";
        document.getElementById('srs-question-hint').textContent = "Altere o filtro acima para continuar revisando.";
        return;
      }

      if (currentSrsIndex >= filteredSrsDeck.length) currentSrsIndex = 0;
      const card = filteredSrsDeck[currentSrsIndex];

      document.getElementById('srs-card-level-tag').textContent = `Nível ${card.level} • ${card.difficulty}`;
      const metaEl = document.getElementById('srs-card-meta-tag');
      if (metaEl) {
        metaEl.textContent = `Domínio: ${card.masteryIndex}% • Revisões: ${card.reviewCount} • Intervalo: ${card.intervalDays}d`;
      }
      document.getElementById('srs-card-counter').textContent = `Cartão ${currentSrsIndex + 1} de ${filteredSrsDeck.length}`;
      document.getElementById('srs-question-text').textContent = card.q;
      document.getElementById('srs-question-hint').textContent = `Assunto: ${card.topic.toUpperCase()} • Criado em: ${card.createdAt}`;

      const directEl = document.getElementById('srs-answer-direct');
      if (directEl) directEl.textContent = card.a;
      document.getElementById('srs-answer-mental').textContent = card.mental;
      document.getElementById('srs-answer-code').textContent = card.code;

      const schedEl = document.getElementById('srs-schedule-info');
      if (schedEl) {
        const dueTxt = isCardDueToday(card) ? "Vencido Hoje" : `Agendado para ${card.nextReviewAt}`;
        schedEl.textContent = `Última revisão: ${card.lastReviewedAt || 'Nunca'} | Próxima: ${dueTxt}`;
      }

      const ansBox = document.getElementById('srs-answer-box');
      if (isSrsFlipped) {
        ansBox.classList.remove('hidden');
      } else {
        ansBox.classList.add('hidden');
      }
    }

    function flipSrsCard() {
      // Viewing the back never marks a card as dominated automatically!
      isSrsFlipped = !isSrsFlipped;
      renderSrsCard();
    }

    // Reference intervals: 1d -> 3d -> 7d -> 21d -> 30d -> progressive
    function computeNextSrsSchedule(card, rating) {
      const prevInterval = card.intervalDays || 0;
      let ease = card.easeFactor || 2.5;
      let nextInterval = 1;
      let masteryDelta = 0;

      if (rating === "again") {
        nextInterval = 1;
        ease = Math.max(1.3, ease - 0.25);
        masteryDelta = -25;
      } else if (rating === "hard") {
        if (prevInterval === 0) nextInterval = 1;
        else if (prevInterval === 1) nextInterval = 3;
        else nextInterval = Math.max(1, Math.round(prevInterval * 1.2));
        ease = Math.max(1.3, ease - 0.15);
        masteryDelta = 10;
      } else if (rating === "good") {
        if (prevInterval === 0) nextInterval = 3;
        else if (prevInterval <= 1) nextInterval = 3;
        else if (prevInterval <= 3) nextInterval = 7;
        else if (prevInterval <= 7) nextInterval = 21;
        else if (prevInterval <= 21) nextInterval = 30;
        else nextInterval = Math.round(prevInterval * ease);
        masteryDelta = 25;
      } else if (rating === "easy") {
        if (prevInterval === 0) nextInterval = 21;
        else if (prevInterval < 21) nextInterval = 21;
        else if (prevInterval <= 21) nextInterval = 30;
        else nextInterval = Math.round(prevInterval * (ease + 0.15));
        ease = Math.min(3.0, ease + 0.15);
        masteryDelta = 40;
      }

      const newMastery = Math.min(100, Math.max(0, (card.masteryIndex || 0) + masteryDelta));
      const nextDate = rating === "again" ? TODAY_ISO : addDaysToIso(TODAY_ISO, nextInterval);

      return {
        nextInterval,
        ease,
        newMastery,
        nextDate
      };
    }

    function rateSrsCard(rating) {
      if (filteredSrsDeck.length === 0) return;
      const card = filteredSrsDeck[currentSrsIndex];
      const sched = computeNextSrsSchedule(card, rating);

      card.reviewCount = (card.reviewCount || 0) + 1;
      card.lastReviewedAt = TODAY_ISO;
      card.intervalDays = sched.nextInterval;
      card.easeFactor = sched.ease;
      card.masteryIndex = sched.newMastery;
      card.nextReviewAt = sched.nextDate;
      card.status = rating;
      card.history.push({
        date: TODAY_ISO,
        rating,
        intervalDays: sched.nextInterval,
        masteryIndex: sched.newMastery
      });

      if (rating === "again") {
        recordStudentError(card.level, "Revisão Espaçada (SRS)", `Dificuldade ao recordar: ${card.q}`);
      } else {
        studentState.xp += rating === "easy" ? 20 : 10;
      }

      saveStudentState();
      isSrsFlipped = false;
      currentSrsIndex = (currentSrsIndex + 1) % filteredSrsDeck.length;
      renderSrsCard();

      showToast(`Cartão agendado para ${card.nextReviewAt} (Intervalo: ${card.intervalDays}d • Domínio: ${card.masteryIndex}%)`, "🧠");
    }

    function updateSrsStatsAndTable() {
      const all = studentState.srsCards;
      const dueCount = all.filter(c => isCardDueToday(c)).length;
      const shortCount = all.filter(c => !isCardDueToday(c) && c.intervalDays >= 1 && c.intervalDays <= 3).length;
      const midCount = all.filter(c => !isCardDueToday(c) && c.intervalDays > 3 && c.intervalDays < 21).length;
      // Only consider dominated when interval >= 21 days AND masteryIndex >= 40
      const dominatedCount = all.filter(c => !isCardDueToday(c) && c.intervalDays >= 21 && c.masteryIndex >= 40).length;

      document.getElementById('srs-stat-due').textContent = dueCount;
      document.getElementById('srs-stat-hard').textContent = shortCount;
      document.getElementById('srs-stat-good').textContent = midCount;
      document.getElementById('srs-stat-easy').textContent = dominatedCount;
      document.getElementById('srs-badge').textContent = dueCount;

      const tbody = document.getElementById('srs-history-table-body');
      if (tbody) {
        tbody.innerHTML = all.map(c => {
          const isDue = isCardDueToday(c);
          return `
            <tr class="hover:bg-slate-800/40">
              <td class="p-2.5 font-mono text-indigo-300">#${c.id} (N${c.level})</td>
              <td class="p-2.5 max-w-xs truncate" title="${escapeHtml(c.q)}">${escapeHtml(c.q)}</td>
              <td class="p-2.5 font-mono">${c.reviewCount}</td>
              <td class="p-2.5 font-mono text-slate-400">${c.lastReviewedAt || '—'}</td>
              <td class="p-2.5 font-mono ${isDue ? 'text-amber-400 font-bold' : 'text-emerald-400'}">${isDue ? 'Hoje (' + c.nextReviewAt + ')' : c.nextReviewAt}</td>
              <td class="p-2.5 font-mono">${c.intervalDays}d</td>
              <td class="p-2.5">
                <div class="flex items-center gap-2">
                  <div class="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-400" style="width: ${c.masteryIndex}%"></div>
                  </div>
                  <span class="font-mono text-[11px]">${c.masteryIndex}%</span>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    function resetSrsDeck() {
      studentState.srsCards = createInitialSrsDeck();
      saveStudentState();
      rebuildFilteredSrsQueue();
      renderSrsCard();
      showToast("Agendamento de revisão espaçada reiniciado!", "↺");
    }

    // =========================================================================
    // 14. VIEW 5: PRACTICAL PROJECTS & PORTFOLIO WORKSPACE
    // =========================================================================
    function renderProjectsSection() {
      const listEl = document.getElementById('projects-sidebar-list');
      const containerEl = document.getElementById('active-project-container');
      const gridEl = document.getElementById('portfolio-completed-grid');
      const badgeEl = document.getElementById('portfolio-count-badge');

      const completedCount = Object.values(studentState.projects).filter(p => p.status === "concluido").length;
      if (badgeEl) badgeEl.textContent = `${completedCount} / ${practicalProjects.length} Concluídos`;

      listEl.innerHTML = practicalProjects.map(p => {
        const pState = studentState.projects[p.id];
        const isActive = p.id === activeProjectId;
        const stBadge = pState.status === "concluido"
          ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✓ Concluído</span>`
          : pState.status === "em_andamento"
          ? `<span class="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">Em Andamento</span>`
          : `<span class="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400">Nível ${p.level}</span>`;

        return `
          <button onclick="selectProject(${p.id})" class="w-full text-left p-3 rounded-xl border transition-all ${isActive ? 'border-indigo-500 bg-indigo-950/40' : 'border-slate-800 bg-slate-950 hover:border-slate-700'} flex items-start justify-between gap-2">
            <div>
              <div class="text-[10px] font-bold uppercase text-indigo-400">Projeto Nível ${p.level}</div>
              <div class="text-xs sm:text-sm font-bold text-white mt-0.5">${escapeHtml(p.title)}</div>
            </div>
            ${stBadge}
          </button>
        `;
      }).join('');

      const proj = practicalProjects.find(p => p.id === activeProjectId) || practicalProjects[0];
      const pState = studentState.projects[proj.id];

      containerEl.innerHTML = `
        <div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span class="text-xs font-bold uppercase text-emerald-400">Projeto de Aplicação • Nível ${proj.level}</span>
            <h3 class="text-base sm:text-lg font-bold text-white mt-0.5">${escapeHtml(proj.title)}</h3>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full ${pState.status === 'concluido' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}">
            ${pState.status === 'concluido' ? '✓ Aprovado em ' + pState.completedAt : 'Critério para 5ª Dimensão do Nível ' + proj.level}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
            <div class="font-bold text-indigo-300">🎯 Objetivo & Conhecimentos Necessários</div>
            <p class="text-slate-300">${escapeHtml(proj.objective)}</p>
            <p class="text-slate-400 pt-1"><strong>Base:</strong> ${escapeHtml(proj.knowledgeNeeded)}</p>
          </div>
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
            <div class="font-bold text-amber-300">⚡ Desafios & Critérios de Avaliação</div>
            <p class="text-slate-300">${escapeHtml(proj.challenges)}</p>
            <p class="text-emerald-300 pt-1"><strong>Critério:</strong> ${escapeHtml(proj.criteria)}</p>
          </div>
        </div>

        <!-- Checkable Steps -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <div class="text-xs font-bold uppercase text-slate-400">Etapas de Implementação:</div>
          <div class="space-y-1.5">
            ${proj.steps.map((st, sIdx) => {
              const checked = pState.completedSteps.includes(sIdx);
              return `
                <label class="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                  <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleProjectStep(${proj.id}, ${sIdx})" class="rounded bg-slate-950 border-slate-700 text-indigo-600" />
                  <span>${sIdx + 1}. ${escapeHtml(st)}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Project Code Workspace -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label for="project-code-editor" class="text-xs font-bold uppercase text-slate-400">Código da Solução (<code class="code-font">projeto_nivel_${proj.level}.py</code>)</label>
            <span class="text-xs text-slate-400">Saída esperada: <code class="code-font text-indigo-300">${escapeHtml(proj.expectedOutput)}</code></span>
          </div>
          <textarea id="project-code-editor" rows="7" spellcheck="false" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 code-font text-xs sm:text-sm text-emerald-200 focus:outline-none focus:border-indigo-500">${escapeHtml(pState.userCode)}</textarea>
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="runAndValidateProject(${proj.id})" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow">
              ▶ Executar & Validar Projeto Prático
            </button>
            <button onclick="resetProjectCode(${proj.id})" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium">
              ↺ Restaurar Modelo Base
            </button>
          </div>
          <pre id="project-output-box" class="bg-slate-900 border border-slate-800 rounded-xl p-3 code-font text-xs text-slate-300 whitespace-pre-wrap"># Execute o projeto para validar o resultado esperado e registrar no seu portfólio.</pre>
        </div>
      `;

      // Render Portfolio Showcase
      const completedProjects = practicalProjects.filter(p => studentState.projects[p.id].status === "concluido");
      if (completedProjects.length === 0) {
        gridEl.innerHTML = `<div class="col-span-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-center text-xs text-slate-400">Nenhum projeto concluído ainda. Execute e valide qualquer projeto acima para exibi-lo em seu Portfólio Profissional!</div>`;
      } else {
        gridEl.innerHTML = completedProjects.map(p => {
          const st = studentState.projects[p.id];
          return `
            <div class="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Nível ${p.level} Validado</span>
                <span class="text-[11px] font-mono text-slate-400">${st.completedAt}</span>
              </div>
              <h4 class="text-sm font-bold text-white">${escapeHtml(p.title)}</h4>
              <p class="text-xs text-slate-400">${escapeHtml(p.knowledgeNeeded)}</p>
              <pre class="bg-slate-900 border border-slate-800 rounded-lg p-2 code-font text-[11px] text-indigo-300 max-h-24 overflow-y-auto">${escapeHtml(st.userCode)}</pre>
            </div>
          `;
        }).join('');
      }
    }

    function selectProject(id) {
      activeProjectId = id;
      renderProjectsSection();
    }

    function toggleProjectStep(projId, stepIdx) {
      const st = studentState.projects[projId];
      const pos = st.completedSteps.indexOf(stepIdx);
      if (pos >= 0) st.completedSteps.splice(pos, 1);
      else st.completedSteps.push(stepIdx);
      if (st.status === "nao_iniciado") st.status = "em_andamento";
      saveStudentState();
      renderProjectsSection();
    }

    function resetProjectCode(projId) {
      const proj = practicalProjects.find(p => p.id === projId);
      if (!proj) return;
      studentState.projects[projId].userCode = proj.starterCode;
      saveStudentState();
      renderProjectsSection();
    }

    async function runAndValidateProject(projId) {
      const proj = practicalProjects.find(p => p.id === projId);
      const st = studentState.projects[projId];
      const code = document.getElementById('project-code-editor').value;
      const outBox = document.getElementById('project-output-box');

      st.userCode = code;
      if (st.status === "nao_iniciado") st.status = "em_andamento";

      const res = await executePythonCodeEngine(code, "");
      if (!res.ok) {
        outBox.className = "bg-rose-950/50 border border-rose-500/40 rounded-xl p-3 code-font text-xs text-rose-300 whitespace-pre-wrap";
        outBox.textContent = `❌ Erro na execução:\n${res.stderr}`;
        recordStudentError(proj.level, `Projeto Nível ${proj.level}`, res.stderr);
        return;
      }

      const actual = res.stdout.trim();
      const expected = proj.expectedOutput.trim();
      if (actual === expected) {
        st.status = "concluido";
        st.passedChecks = true;
        st.completedAt = TODAY_ISO;
        st.completedSteps = proj.steps.map((_, idx) => idx);

        const comp = studentState.competencies[proj.level];
        if (!comp.dimensions.application) {
          comp.dimensions.application = true;
          studentState.xp += 100;
        }
        recalculateCompetencyStatus(studentState, proj.level);
        saveStudentState();
        renderProjectsSection();
        renderLevelsSidebar();
        outBox.className = "bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-3 code-font text-xs text-emerald-300 whitespace-pre-wrap";
        outBox.textContent = `✅ Saída Validada: ${actual}\nProjeto aprovado e adicionado ao Portfólio! Dimensão 5 (Aplicação Prática) comprovada no Nível ${proj.level}.`;
        showToast(`Projeto do Nível ${proj.level} concluído! +100 XP`, "🏆");
      } else {
        saveStudentState();
        outBox.className = "bg-amber-950/50 border border-amber-500/40 rounded-xl p-3 code-font text-xs text-amber-200 whitespace-pre-wrap";
        outBox.textContent = `Saída obtida: "${actual}"\nSaída esperada pelo critério: "${expected}"`;
      }
    }

    // =========================================================================
    // 15. VIEW 6: INTELLIGENT LEARNING DASHBOARD (100% REAL STUDENT TELEMETRY)
    // =========================================================================
    function refreshDashboardView() {
      const m = computeGlobalMetrics();
      const dueCards = studentState.srsCards.filter(c => isCardDueToday(c)).length;
      const reviewedCards = studentState.srsCards.filter(c => c.reviewCount > 0);
      const avgRetention = reviewedCards.length > 0
        ? Math.round(reviewedCards.reduce((acc, c) => acc + c.masteryIndex, 0) / reviewedCards.length)
        : 0;
      const studyMinutes = Math.floor(studentState.studyTimeSeconds / 60);

      document.getElementById('dash-kpi-progress').textContent = `${Math.round((m.dominatedCount / 12) * 100)}%`;
      document.getElementById('dash-kpi-progress-sub').textContent = `${m.dominatedCount} de 12 níveis dominados`;
      document.getElementById('dash-kpi-inprogress').textContent = String(m.inProgressCount);
      document.getElementById('dash-kpi-accuracy').textContent = `${m.accuracyPct}%`;
      document.getElementById('dash-kpi-accuracy-sub').textContent = `${m.totalCorrect} acertos / ${m.totalAttempts} tent.`;
      document.getElementById('dash-kpi-retention').textContent = `${avgRetention}%`;
      document.getElementById('dash-kpi-due-sub').textContent = `${dueCards} vencidos hoje`;
      document.getElementById('dash-kpi-time').textContent = `${studyMinutes} min`;
      document.getElementById('dash-kpi-sessions-sub').textContent = `${studentState.studySessions.length} sessões registradas`;
      document.getElementById('dash-kpi-projects').textContent = `${m.completedProjects} / 12`;

      // Recommendations based on real student data
      const recs = [];
      if (studentState.errorHistory.length > 0) {
        const lastErr = studentState.errorHistory[0];
        recs.push({
          title: `Reforçar Nível ${lastErr.levelId} (${lastErr.category})`,
          desc: `Erro recente detectado: "${lastErr.description}". Recomendamos revisar a aula do Nível ${lastErr.levelId} e praticar no simulador.`,
          action: () => { selectLevel(lastErr.levelId); switchView('trilha'); }
        });
      }
      if (dueCards > 0) {
        recs.push({
          title: `Revisar ${dueCards} Flashcards Vencidos Hoje`,
          desc: `Mantenha a curva de retenção alta respondendo aos cartões prioritários no módulo SRS.`,
          action: () => switchView('srs')
        });
      }
      const nextLevelToMaster = courseLevels.find(l => studentState.competencies[l.id].status !== "dominado");
      if (nextLevelToMaster) {
        const d = studentState.competencies[nextLevelToMaster.id].dimensions;
        const done = [d.conceptual, d.interpretation, d.construction, d.debugging, d.application].filter(Boolean).length;
        recs.push({
          title: `Avançar no Nível ${nextLevelToMaster.id}: ${nextLevelToMaster.title} (${done}/5 evidências)`,
          desc: `Complete as dimensões pendentes (Avaliação, Laboratório Python e Projeto) para conquistar o status Dominado.`,
          action: () => { selectLevel(nextLevelToMaster.id); switchLessonSubtab('avaliacao'); switchView('trilha'); }
        });
      }

      const recContainer = document.getElementById('dash-recommendations-list');
      recContainer.innerHTML = recs.map((r, idx) => `
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3">
          <div>
            <div class="font-bold text-white">${escapeHtml(r.title)}</div>
            <div class="text-slate-400 text-[11px] mt-0.5">${escapeHtml(r.desc)}</div>
          </div>
          <button onclick="triggerDashboardRecommendation(${idx})" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0">
            Executar →
          </button>
        </div>
      `).join('');
      window._dashRecActions = recs.map(r => r.action);

      // Error History List
      const errContainer = document.getElementById('dash-errors-list');
      if (studentState.errorHistory.length === 0) {
        errContainer.innerHTML = `<div class="text-slate-500 py-4 text-center">Nenhum erro registrado ainda. Quando você errar um exercício ou cartão, o diagnóstico aparecerá aqui.</div>`;
      } else {
        errContainer.innerHTML = studentState.errorHistory.slice(0, 10).map(e => `
          <div class="bg-slate-900 border border-rose-500/30 rounded-lg p-2.5 flex items-start justify-between gap-2">
            <div>
              <span class="text-[10px] font-bold text-rose-400 uppercase">Nível ${e.levelId} • ${escapeHtml(e.category)}</span>
              <div class="text-slate-200 text-xs mt-0.5">${escapeHtml(e.description)}</div>
            </div>
            <span class="text-[10px] font-mono text-slate-500 shrink-0">${escapeHtml(e.date)}</span>
          </div>
        `).join('');
      }

      renderDashboardCharts();
    }

    function triggerDashboardRecommendation(idx) {
      if (window._dashRecActions && window._dashRecActions[idx]) {
        window._dashRecActions[idx]();
      }
    }

    function renderDashboardCharts() {
      if (typeof Chart === "undefined") return;

      const labels = courseLevels.map(l => `N${l.id}`);
      const dimCounts = courseLevels.map(l => {
        const d = studentState.competencies[l.id].dimensions;
        return [d.conceptual, d.interpretation, d.construction, d.debugging, d.application].filter(Boolean).length;
      });

      const ctx1 = document.getElementById('chart-competencies');
      if (ctx1) {
        if (competenciesChartInstance) competenciesChartInstance.destroy();
        competenciesChartInstance = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Dimensões Comprovadas (máx 5)',
              data: dimCounts,
              backgroundColor: 'rgba(99, 102, 241, 0.7)',
              borderColor: 'rgb(99, 102, 241)',
              borderWidth: 1,
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 5, ticks: { stepSize: 1, color: '#94a3b8' }, grid: { color: '#1e293b' } },
              x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
            },
            plugins: { legend: { labels: { color: '#e2e8f0' } } }
          }
        });
      }

      const all = studentState.srsCards;
      const due = all.filter(c => isCardDueToday(c)).length;
      const shortInt = all.filter(c => !isCardDueToday(c) && c.intervalDays >= 1 && c.intervalDays <= 3).length;
      const midInt = all.filter(c => !isCardDueToday(c) && c.intervalDays > 3 && c.intervalDays < 21).length;
      const domInt = all.filter(c => !isCardDueToday(c) && c.intervalDays >= 21).length;

      const ctx2 = document.getElementById('chart-srs-retention');
      if (ctx2) {
        if (srsChartInstance) srsChartInstance.destroy();
        srsChartInstance = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: ['Vencidos Hoje', 'Curto Prazo (1-3d)', 'Médio Prazo (7-20d)', 'Longo Prazo (21d+)'],
            datasets: [{
              data: [due, shortInt, midInt, domInt],
              backgroundColor: ['#f59e0b', '#f43f5e', '#6366f1', '#10b981'],
              borderColor: '#0f172a',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { color: '#e2e8f0', boxWidth: 12 } }
            }
          }
        });
      }
    }

    // =========================================================================
    // 16. VIEW 7: INTENT-BASED VISUAL CHEAT SHEET
    // =========================================================================
    function filterIntentByCategory(cat) {
      activeIntentCategory = cat;
      const query = document.getElementById('intent-search').value;
      renderIntentGrid(query, cat);
    }

    function filterIntentCards(query) {
      renderIntentGrid(query, activeIntentCategory);
    }

    function renderIntentGrid(query = "", cat = "all") {
      const q = query.trim().toLowerCase();
      const filtered = intentCards.filter(item => {
        const matchesCat = cat === "all" || item.cat === cat;
        const matchesText = !q ||
          item.intent.toLowerCase().includes(q) ||
          item.mentalAnchor.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q);
        return matchesCat && matchesText;
      });

      const grid = document.getElementById('intent-grid');
      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400 text-sm">Nenhuma intenção encontrada para "${escapeHtml(query)}". Tente termos como "lista", "erro", "sql", "api" ou "ia".</div>`;
        return;
      }

      grid.innerHTML = filtered.map(c => `
        <div class="bg-slate-950 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 flex flex-col justify-between gap-3 transition">
          <div class="space-y-2">
            <div class="text-[11px] font-semibold text-rose-400">${escapeHtml(c.dontMemorize)}</div>
            <h3 class="text-sm font-bold text-white leading-snug">🎯 "${escapeHtml(c.intent)}"</h3>
            <p class="text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 rounded-lg px-2.5 py-1.5">
              💡 ${escapeHtml(c.mentalAnchor)}
            </p>
          </div>
          <pre class="bg-slate-900 border border-slate-800 rounded-lg p-3 code-font text-xs text-emerald-300 overflow-x-auto">${escapeHtml(c.code)}</pre>
        </div>
      `).join('');
    }

    // =========================================================================
    // 17. VIEW 8: ADAPTIVE SCHEDULE & STUDY SESSION HISTORY
    // =========================================================================
    function setRoutinePace(minutes) {
      studentState.preferences.dailyPaceMinutes = String(minutes);
      saveStudentState();

      ['30', '60', '90'].forEach(m => {
        const btn = document.getElementById('pace-' + m);
        if (btn) {
          btn.className = m === String(minutes)
            ? "px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
            : "px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white";
        }
      });

      const dueCount = studentState.srsCards.filter(c => isCardDueToday(c)).length;
      const targetLvl = courseLevels.find(l => studentState.competencies[l.id].status !== "dominado") || courseLevels[0];

      const plans = {
        '30': [
          { step: "Bloco 1 • 8 min", title: `Revisões Pendentes (${Math.min(5, dueCount)} de ${dueCount} cartões)`, desc: "Recupere ativamente os cartões vencidos hoje antes de ver conteúdo novo." },
          { step: "Bloco 2 • 10 min", title: `Conteúdo Novo: Nível ${targetLvl.id}`, desc: `Estude os modelos mentais e a anatomia de sintaxe de "${targetLvl.title}".` },
          { step: "Bloco 3 • 12 min", title: "Exercício & Avaliação", desc: `Execute o exercício prático do Nível ${targetLvl.id} no Laboratório Python e responda 1 dimensão.` }
        ],
        '60': [
          { step: "Bloco 1 • 15 min", title: `Revisão Espaçada SRS (${Math.min(10, dueCount)} cartões vencidos)`, desc: "Zere a fila prioritária de cartões vencidos aplicando o agendamento 1-3-7-21." },
          { step: "Bloco 2 • 20 min", title: `Estudo Visual & Simulador (Nível ${targetLvl.id})`, desc: `Explore "${targetLvl.title}" e acompanhe a execução passo a passo na Bancada de Memória.` },
          { step: "Bloco 3 • 25 min", title: `Laboratório Python + Projeto Nível ${targetLvl.id}`, desc: "Valide o exercício de código e avance nas etapas do projeto prático para o seu Portfólio." }
        ],
        '90': [
          { step: "Bloco 1 • 20 min", title: `Auditoria SRS Completa (${dueCount} vencidos) + Erros`, desc: "Revise os cartões vencidos e elimine os pontos registrados no seu histórico de erros." },
          { step: "Bloco 2 • 30 min", title: `Domínio das 5 Dimensões (Nível ${targetLvl.id})`, desc: "Conclua as avaliações de Compreensão, Interpretação, Construção e Depuração do nível atual." },
          { step: "Bloco 3 • 40 min", title: `Entrega de Projeto Prático & Portfólio`, desc: `Finalize e valide o código completo do Projeto do Nível ${targetLvl.id} para comprovar Aplicação Prática.` }
        ]
      };

      const container = document.getElementById('routine-breakdown');
      container.innerHTML = (plans[String(minutes)] || plans['60']).map(p => `
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5">
          <div class="text-xs font-bold text-emerald-400 uppercase">${escapeHtml(p.step)}</div>
          <div class="text-sm font-bold text-white">${escapeHtml(p.title)}</div>
          <p class="text-xs text-slate-300 leading-relaxed">${escapeHtml(p.desc)}</p>
        </div>
      `).join('');
    }

    function renderAdaptiveSchedule() {
      setRoutinePace(studentState.preferences.dailyPaceMinutes || '60');

      const dueCount = studentState.srsCards.filter(c => isCardDueToday(c)).length;
      const targetLvl = courseLevels.find(l => studentState.competencies[l.id].status !== "dominado") || courseLevels[0];
      const nextStepText = document.getElementById('adaptive-next-step-text');

      if (dueCount > 12) {
        nextStepText.textContent = `Você possui ${dueCount} flashcards vencidos. Recomendamos iniciar por 10 minutos de Revisão Espaçada antes de avançar no Nível ${targetLvl.id}.`;
        window._adaptiveNextAction = () => switchView('srs');
      } else {
        const comp = studentState.competencies[targetLvl.id];
        if (!comp.dimensions.construction) {
          nextStepText.textContent = `Seu próximo passo ideal é validar o exercício prático do Nível ${targetLvl.id} (${targetLvl.title}) no Laboratório Python.`;
          window._adaptiveNextAction = () => openLevelLabExercise(targetLvl.id);
        } else {
          nextStepText.textContent = `Continue avançando nas evidências do Nível ${targetLvl.id} (${targetLvl.title}) para conquistar o status Dominado.`;
          window._adaptiveNextAction = () => { selectLevel(targetLvl.id); switchLessonSubtab('avaliacao'); switchView('trilha'); };
        }
      }

      const histEl = document.getElementById('study-sessions-history-list');
      if (studentState.studySessions.length === 0) {
        histEl.innerHTML = `<div class="text-slate-500 py-3 text-center">Nenhuma sessão registrada ainda. Clique em "Registrar Sessão de Estudo de Hoje" ao concluir seu bloco diário.</div>`;
      } else {
        histEl.innerHTML = studentState.studySessions.map(s => `
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <span class="font-bold text-emerald-400">${escapeHtml(s.date)}</span>
              <span class="text-slate-300 ml-2">Ritmo planejado: ${escapeHtml(String(s.paceMinutes))} min • Tempo real acumulado: ${escapeHtml(String(s.totalMinutes))} min</span>
            </div>
            <span class="font-mono text-indigo-300 font-semibold">${escapeHtml(String(s.xpSnapshot))} XP</span>
          </div>
        `).join('');
      }
    }

    function executeAdaptiveNextStep() {
      if (window._adaptiveNextAction) window._adaptiveNextAction();
    }

    function logCompletedStudySession() {
      const pace = studentState.preferences.dailyPaceMinutes || "60";
      const totalMinutes = Math.max(1, Math.floor(studentState.studyTimeSeconds / 60));
      studentState.xp += 25;
      studentState.studySessions.unshift({
        date: TODAY_ISO,
        paceMinutes: pace,
        totalMinutes,
        xpSnapshot: studentState.xp
      });
      saveStudentState();
      renderAdaptiveSchedule();
      showToast("Sessão de estudo registrada no histórico! +25 XP", "📅");
    }

    // =========================================================================
    // 18. UTILITIES & INITIALIZATION
    // =========================================================================
    function escapeHtml(str) {
      return String(str === null || str === undefined ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function renderAllViews() {
      renderLevelsSidebar();
      renderActiveLesson();
      renderSimulator();
      initLabExerciseDropdown();
      rebuildFilteredSrsQueue();
      renderSrsCard();
      renderProjectsSection();
      renderIntentGrid();
      renderAdaptiveSchedule();
      updateProgressHeader();
    }

    // Close modal on Escape key for keyboard accessibility
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeBackupModal();
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      renderAllViews();
    });

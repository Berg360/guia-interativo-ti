import type { Course } from './curriculum';

export type ConceptGuide = {
  explanation: string;
  example: string;
  recallPrompt: string;
  memoryCue: string;
  related: string[];
};

type LessonSeed = Omit<ConceptGuide, 'related'>;

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

const conceptLessons: Record<string, LessonSeed> = {
  decomposicao: {
    explanation: 'Decompor é dividir um problema grande em partes menores, compreensíveis e verificáveis. Cada parte deve ter uma responsabilidade clara e poder ser resolvida sem perder de vista o resultado final.',
    example: 'Para resolver um exercício, separe leitura dos dados, cálculo e apresentação da resposta. Teste cada parte antes de juntar o algoritmo completo.',
    recallPrompt: 'Que partes menores resolvem este problema? O que cada parte recebe e o que deve entregar?',
    memoryCue: 'Problema → partes → contratos → integração.',
  },
  'entradas/saidas': {
    explanation: 'Entrada é o dado que o algoritmo recebe; saída é o resultado que ele produz. Entre ambos ficam as regras de processamento. Validar as entradas evita que dados vazios, inválidos ou fora do limite levem a resultados incorretos.',
    example: 'Num cálculo de média, as notas são entradas, a regra de soma e divisão é o processamento, e a média calculada é a saída. Teste também lista vazia e valores no limite.',
    recallPrompt: 'Quais dados entram, que regra é aplicada e qual resultado deve sair? Como tratar uma entrada inválida?',
    memoryCue: 'Entrada → processamento → saída; valide antes de calcular.',
  },
  tipos: {
    explanation: 'Um tipo define que espécie de valor uma variável representa e quais operações fazem sentido para esse valor. Números, textos e valores lógicos têm usos diferentes; escolher e converter tipos com cuidado reduz erros.',
    example: 'A idade deve ser tratada como número para permitir comparação; o nome é texto. Somar textos pode concatená-los, enquanto somar números calcula um total.',
    recallPrompt: 'Que tipo cada dado precisa ter? Que operação é permitida e o que acontece se o tipo estiver errado?',
    memoryCue: 'Dado → tipo → operações válidas.',
  },
  variaveis: {
    explanation: 'Uma variável é um nome usado pelo programa para acessar um valor durante a execução. Um nome claro expressa o papel do dado; uma atribuição associa ou atualiza o valor que será usado nas próximas instruções.',
    example: 'Em total = preco * quantidade, preco e quantidade guardam os dados de entrada e total recebe o resultado. Atribuir um novo valor a total muda o resultado disponível depois.',
    recallPrompt: 'Que valor este nome representa agora? Em que instrução ele muda e quem depende dele?',
    memoryCue: 'Nome significativo → valor → atualização → uso.',
  },
  operadores: {
    explanation: 'Operadores executam cálculos ou comparações sobre valores. Aritméticos calculam, relacionais comparam e lógicos combinam condições. Precedência e parênteses determinam a ordem; tipos incompatíveis podem gerar erro ou resultado inesperado.',
    example: 'A condição idade >= 18 and possui_documento combina duas verificações. Se a regra exige ambas, and é adequado; se qualquer uma basta, a lógica muda para or.',
    recallPrompt: 'A expressão calcula ou compara? Qual é sua ordem de avaliação? A condição deve exigir todas as partes ou apenas uma?',
    memoryCue: 'Calcular, comparar, combinar — confira a precedência.',
  },
  selecao: {
    explanation: 'Seleção escolhe um caminho de execução conforme uma condição. if/elif/else expressa alternativas; condições claras e sem sobreposição evitam que um caso caia no ramo errado.',
    example: 'Para classificar uma nota, verifique primeiro se está abaixo do mínimo, depois as faixas válidas e por fim o caso restante. Inclua valores exatamente nos limites.',
    recallPrompt: 'Qual condição decide o caminho? Os casos cobrem as possibilidades e os limites sem se sobrepor?',
    memoryCue: 'Condição → caminho → caso limite.',
  },
  repeticao: {
    explanation: 'Repetição executa um bloco várias vezes. Um laço precisa de uma condição de parada e de uma atualização que aproxime a execução do fim; sem isso, pode repetir indefinidamente ou ignorar dados.',
    example: 'Percorra uma lista de notas atualizando a soma e a contagem. Verifique lista vazia, primeiro e último elemento e se o índice avança em cada iteração.',
    recallPrompt: 'O que se repete? Que condição encerra o laço e o que muda a cada volta?',
    memoryCue: 'Estado inicial → condição → atualização → parada.',
  },
  colecoes: {
    explanation: 'Coleções agrupam valores para processá-los como conjunto. Listas preservam ordem e aceitam repetição; conjuntos destacam elementos únicos; mapas relacionam chaves a valores. A estrutura deve combinar com as operações necessárias.',
    example: 'Use uma lista para manter uma sequência de notas, um conjunto para remover duplicatas ou um mapa para localizar o preço de um produto pelo código.',
    recallPrompt: 'Precisa de ordem, unicidade ou busca por chave? Qual coleção torna a operação mais simples e segura?',
    memoryCue: 'Ordem → lista; unicidade → conjunto; chave → mapa.',
  },
  funcoes: {
    explanation: 'Uma função encapsula uma tarefa com nome, parâmetros e, quando necessário, um valor de retorno. Dividir o programa em funções melhora reutilização, teste e leitura; cada função deve ter responsabilidade bem definida.',
    example: 'Uma função calcular_media recebe notas, valida se há valores e retorna a média. Outra parte do programa pode chamá-la sem repetir a fórmula.',
    recallPrompt: 'Qual tarefa a função resolve? Quais dados recebe, o que devolve e quais casos precisam ser tratados?',
    memoryCue: 'Nome → parâmetros → responsabilidade → retorno.',
  },
  testes: {
    explanation: 'Um teste compara o comportamento observado com o resultado esperado para uma entrada definida. Casos comuns verificam o fluxo normal; limites, entradas vazias e inválidas ajudam a revelar defeitos que exemplos simples não mostram.',
    example: 'Para uma função de média, teste valores conhecidos, lista vazia e uma única nota. Registre entrada, resultado esperado e resultado obtido.',
    recallPrompt: 'Qual comportamento está sendo verificado? Que entrada pode revelar um erro de limite ou um caso não tratado?',
    memoryCue: 'Entrada → esperado → obtido → diferença.',
  },
  depuracao: {
    explanation: 'Depurar é localizar a causa de um comportamento incorreto. Reproduza o problema, reduza-o a um caso pequeno, observe valores e fluxo, formule uma hipótese, corrija e rode novamente os testes para detectar regressões.',
    example: 'Se a média estiver errada, imprima ou inspecione a soma e a contagem em cada etapa; confira divisão, tipos e se todos os elementos foram percorridos.',
    recallPrompt: 'Como reproduzir o defeito? Que observação distingue sua hipótese de outras causas possíveis?',
    memoryCue: 'Reproduzir → observar → hipótese → corrigir → retestar.',
  },
  b2b: {
    explanation: 'B2B descreve uma transação em que uma organização vende produtos ou serviços a outra organização. O processo costuma envolver critérios técnicos, negociação, aprovação e mais de uma pessoa decisora.',
    example: 'Uma empresa que fornece software de gestão a uma rede de lojas opera em B2B; implantação, suporte e renovação fazem parte do valor entregue.',
    recallPrompt: 'Quem compra e quem usa? Que etapas e critérios influenciam a decisão da organização?',
    memoryCue: 'Business to business: organização para organização.',
  },
  b2c: {
    explanation: 'B2C é a venda de uma organização diretamente a uma pessoa consumidora. Experiência de compra, clareza de preço, confiança e atendimento influenciam conversão e retorno.',
    example: 'Uma loja virtual que vende um produto a uma pessoa é B2C. O caminho de descoberta, pagamento e entrega deve ser simples e confiável.',
    recallPrompt: 'O que a pessoa precisa para confiar, comprar e voltar? Em que etapa ela poderia desistir?',
    memoryCue: 'Business to consumer: organização para pessoa consumidora.',
  },
  iaas: {
    explanation: 'IaaS oferece recursos básicos de infraestrutura sob demanda, como computação, rede e armazenamento. A equipe cliente ainda administra sistema operacional, aplicações e boa parte da configuração.',
    example: 'Criar uma máquina virtual na nuvem é um uso comum de IaaS; dimensionamento, atualização do sistema e controles de acesso ainda precisam ser planejados.',
    recallPrompt: 'Que parte da infraestrutura o provedor entrega e o que continua sob responsabilidade da equipe?',
    memoryCue: 'IaaS: infraestrutura fornecida; sistema e aplicações continuam sob gestão do cliente.',
  },
  paas: {
    explanation: 'PaaS oferece uma plataforma gerenciada para desenvolver e executar aplicações. O provedor cuida de mais componentes da infraestrutura, enquanto a equipe concentra-se no código, nos dados e na configuração da aplicação.',
    example: 'Publicar um serviço em uma plataforma gerenciada reduz tarefas de manutenção de servidores, mas exige compreender limites, custos e opções de implantação.',
    recallPrompt: 'O que a plataforma gerencia e quais decisões sobre código e dados ainda são da equipe?',
    memoryCue: 'PaaS: plataforma pronta para executar aplicações.',
  },
  saas: {
    explanation: 'SaaS é um software pronto oferecido como serviço. O provedor opera a aplicação e a infraestrutura; a organização usuária configura o serviço, administra acessos e cuida de seus dados e processos.',
    example: 'Um sistema de e-mail acessado pelo navegador é SaaS. Avalie permissões, disponibilidade, exportação dos dados e integração antes de adotá-lo.',
    recallPrompt: 'O que o fornecedor opera? O que a organização ainda precisa configurar e governar?',
    memoryCue: 'SaaS: software pronto consumido como serviço.',
  },
  sla: {
    explanation: 'Um SLA registra níveis de serviço acordados, como disponibilidade, tempos de resposta e forma de medição. Metas precisam ter método de cálculo, janela de apuração, responsabilidades e consequências claras.',
    example: 'Um acordo de suporte pode diferenciar tempo para responder a um incidente crítico e tempo para restaurar o serviço. Os indicadores precisam ser medidos de modo verificável.',
    recallPrompt: 'Qual nível foi acordado, como será medido e quem responde quando a meta não é cumprida?',
    memoryCue: 'SLA: compromisso mensurável de serviço.',
  },
  sql: {
    explanation: 'SQL é uma linguagem para definir, consultar e alterar dados em bancos relacionais. SELECT filtra e projeta linhas, JOIN combina tabelas relacionadas e agregações resumem conjuntos.',
    example: 'Para listar pedidos e clientes, relacione as tabelas pela chave correspondente e teste se o resultado mantém a quantidade de linhas esperada.',
    recallPrompt: 'Que linhas e colunas a consulta precisa? Quais relações entre tabelas justificam o JOIN?',
    memoryCue: 'Selecionar → relacionar → filtrar → resumir.',
  },
  api: {
    explanation: 'Uma API define como componentes de software trocam solicitações e respostas. Contrato, formato, autenticação, erros e limites precisam ser claros para permitir integração previsível.',
    example: 'Um aplicativo consulta uma API de pedidos enviando um identificador; a resposta deve indicar dados, estado e erros possíveis sem expor informações indevidas.',
    recallPrompt: 'Quem solicita o quê? Qual formato, resposta e erro o contrato da API prevê?',
    memoryCue: 'Solicitação → contrato → resposta ou erro.',
  },
  dns: {
    explanation: 'DNS traduz nomes de domínio em informações usadas para localizar serviços na rede, como endereços IP. Cache e registros incorretos podem fazer um nome apontar para um destino inesperado.',
    example: 'Se um domínio não abre, compare a resolução DNS com o endereço esperado antes de investigar a aplicação ou o servidor.',
    recallPrompt: 'Que nome está sendo resolvido, qual registro é esperado e o resultado veio de qual cache ou servidor?',
    memoryCue: 'Nome legível → consulta DNS → destino de rede.',
  },
  http: {
    explanation: 'HTTP define a troca de mensagens entre cliente e servidor na Web. Métodos indicam a intenção da solicitação e códigos de status comunicam o resultado; cabeçalhos e corpo transportam metadados e dados.',
    example: 'Uma aplicação envia GET para ler um recurso ou POST para solicitar uma criação; a resposta inclui status e, quando apropriado, representação do resultado.',
    recallPrompt: 'Qual recurso está sendo solicitado? O método, o status e o corpo correspondem à intenção?',
    memoryCue: 'Método + recurso + status + representação.',
  },
  baseline: {
    explanation: 'Baseline é uma referência simples de desempenho usada para comparar um modelo ou solução mais complexa. Sem uma baseline, não há evidência de que a complexidade adicional trouxe ganho real.',
    example: 'Antes de treinar um classificador, compare-o com uma regra simples ou com a previsão da classe mais frequente; use os mesmos dados de avaliação.',
    recallPrompt: 'Qual solução simples serve de comparação e que métrica mostra se a nova abordagem melhora?',
    memoryCue: 'Primeiro uma referência simples; depois prove o ganho.',
  },
  'html semantico': {
    explanation: 'HTML semântico usa elementos de acordo com o significado e a função do conteúdo, como títulos, navegação, listas e botões. Essa estrutura melhora leitura por tecnologias assistivas e torna a página mais compreensível.',
    example: 'Use um botão para executar uma ação e um link para navegar. Um título hierárquico deve refletir a estrutura real da página.',
    recallPrompt: 'Que papel este conteúdo desempenha? Qual elemento comunica esse papel sem depender apenas da aparência?',
    memoryCue: 'Estrutura e significado antes da aparência.',
  },
};

export function conceptGuideFor(course: Course, branchIndex: number, topic: string): ConceptGuide {
  const branch = course.branches[branchIndex] ?? course.branches[0];
  const related = branch.topics.filter((item) => normalize(item) !== normalize(topic));
  const curated = conceptLessons[normalize(topic)];
  if (curated) return { ...curated, related };

  const branchFocus = branchIndex === 0
    ? 'defina o conceito, seus limites e a necessidade que ele atende'
    : branchIndex === 1
      ? 'explique as relações entre este conceito e os demais elementos do ramo'
      : branchIndex === 2
        ? 'mostre como aplicar o conceito em uma situação prática e observar o resultado'
        : 'apresente uma evidência verificável de que o conceito foi usado corretamente';
  const connections = related.length ? related.join(', ') : 'os objetivos da disciplina';
  return {
    explanation: `Neste tópico de ${course.title}, ${topic} deve ser estudado em relação a ${connections}. Para compreendê-lo, ${branchFocus}; não fique apenas na memorização do nome.`,
    example: `No desafio da disciplina — ${course.practice} — identifique especificamente onde ${topic} entra, que decisão ele influencia e que resultado permite conferir a aplicação.`,
    recallPrompt: `Sem consultar o mapa, explique ${topic}, compare-o com ${related[0] ?? 'uma ideia próxima'} e dê um exemplo ligado a ${course.title}.`,
    memoryCue: `${topic} → função em ${course.title} → exemplo próprio → evidência de domínio.`,
    related,
  };
}

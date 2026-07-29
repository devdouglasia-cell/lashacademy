/* =========================================================================
   LASH ACADEMY — DADOS DO CURSO
   Edite este arquivo para alterar aulas, quizzes, catálogo e níveis.
   ========================================================================= */

const COURSE_DATA = {

  // Preço da Formação Profissional Completa (usado na cobrança Pix)
  formacao: {
    preco: 97.00,
    descricao: "Formação Profissional Completa em Lash Designer"
  },

  aulas: [
    {
      id: 1,
      modulo: "gratis",
      titulo: "O Mercado de Lash Designer e Potencial de Lucro",
      duracao: "18 min",
      xp: 50,
      resumo: "Entenda o tamanho do mercado de extensão de cílios no Brasil, os caminhos de faturamento (avulso, assinatura, mentoria) e como se posicionar como profissional.",
      conteudo: [
        "O mercado de beleza e estética é um dos setores que mais cresce no Brasil, e a extensão de cílios se tornou um dos serviços de maior recorrência dentro dos salões e estúdios independentes — a manutenção quinzenal garante um fluxo de caixa prático de se prever.",
        "Uma Lash Designer iniciante costuma cobrar entre R$ 80 e R$ 180 por uma aplicação completa, enquanto profissionais especializadas em volume russo e mapeamentos personalizados chegam a R$ 250–R$ 500 por atendimento em praças maiores.",
        "Além do atendimento presencial, existem três frentes de faturamento que vamos explorar ao longo da formação: (1) atendimento avulso e manutenção recorrente, (2) pacotes de assinatura mensal para fidelização, e (3) treinamento de outras profissionais depois que você atingir domínio técnico.",
        "Ao final desta aula, você já entende por que investir na técnica correta — e não apenas em 'fazer bonito' — é o que separa uma amadora de uma profissional que lota agenda."
      ],
      pontosChave: [
        "A recorrência da manutenção é o que sustenta a renda mensal",
        "Preço varia por técnica, região e posicionamento",
        "Especialização em volume russo/mapeamento aumenta o ticket médio"
      ]
    },
    {
      id: 2,
      modulo: "gratis",
      titulo: "Anatomia do Olho e Biossegurança Essencial",
      duracao: "22 min",
      xp: 50,
      resumo: "Estrutura do olho, tipos de fios naturais e os protocolos de biossegurança que toda profissional precisa dominar antes de tocar em um cliente.",
      conteudo: [
        "Antes de qualquer aplicação, é preciso entender a anatomia da pálpebra: a linha ciliar superior, a direção natural de crescimento dos fios e as glândulas de Meibômio, responsáveis pela lubrificação do olho — encostar a cola nelas pode causar irritação severa.",
        "Os cílios naturais crescem em ciclos (anágeno, catágeno, telógeno). Isso significa que a cada aplicação você está colando fios em diferentes estágios de vida, e é por isso que a queda de alguns fios com a extensão é normal e esperada.",
        "Biossegurança não é opcional: higienização das mãos e da maca, esterilização de pinças em autoclave ou uso de materiais descartáveis, protetor de pálpebra inferior hipoalergênico, e um termo de consentimento assinado pela cliente informando sobre possíveis reações alérgicas.",
        "Reserve sempre um teste de alergia (mecha teste) 24h a 48h antes da primeira aplicação em clientes novas — esse cuidado evita reações graves e te protege profissionalmente."
      ],
      pontosChave: [
        "Nunca aplique cola sobre a pálpebra ou glândulas de Meibômio",
        "A queda natural de fios é parte do ciclo capilar, não erro técnico",
        "Teste de alergia prévio é obrigatório para clientes novas"
      ]
    },
    {
      id: 3,
      modulo: "gratis",
      titulo: "Catálogo de Modelos de Cílios",
      duracao: "25 min",
      xp: 50,
      hasCatalog: true,
      resumo: "Conheça os principais estilos do mercado — Fio a Fio, Volume Russo, Híbrido, Brasileiro/Tecnológico e Tufo — e quando indicar cada um.",
      conteudo: [
        "Cada técnica de extensão entrega um resultado visual e uma sensação de peso diferente. Escolher a técnica certa depende do formato do olho, da saúde do fio natural da cliente e do efeito que ela deseja.",
        "Use o Catálogo de Cílios interativo abaixo (disponível também na aba Mapeamentos) para comparar espessura, curvatura recomendada e indicação por formato de olho de cada técnica."
      ],
      pontosChave: [
        "A técnica certa depende da saúde do fio natural, não só da estética",
        "Curvaturas C, D, L e M mudam completamente o efeito do olhar"
      ]
    },
    {
      id: 4,
      modulo: "pago",
      titulo: "A Química da Cola, Umidade do Ar e Acoplagem Perfeita",
      duracao: "30 min",
      xp: 50,
      hasCalculator: true,
      resumo: "Entenda o cianoacrilato, como temperatura e umidade afetam a secagem e como calcular o tempo ideal de acoplagem para reter a extensão por até 30 dias.",
      conteudo: [
        "A cola de cílios é majoritariamente composta por cianoacrilato, uma substância que cura (seca) através da reação com a umidade do ar — não com o oxigênio. É por isso que ambientes muito secos atrasam a secagem e ambientes muito úmidos aceleram (às vezes rápido demais).",
        "A faixa ideal de trabalho fica entre 40% e 60% de umidade relativa e 20°C a 24°C de temperatura. Fora dessa faixa, a cola pode 'flowerar' (esbranquiçar), secar por fora e ficar mole por dentro, ou secar rápido demais e grudar nos dedos e pinças.",
        "A 'acoplagem perfeita' é o momento em que o fio da extensão é posicionado sobre o fio natural, envolto por uma fina camada de cola, sem tocar a pele, com 1 a 2mm de distância da raiz — isso garante conforto e evita a queda prematura por peso mal distribuído.",
        "Use a Calculadora de Secagem de Cola (na aba Mapeamentos) sempre que mudar de ambiente de trabalho ou clima — ela sugere o tempo estimado de cura com base na umidade e temperatura informadas."
      ],
      pontosChave: [
        "Cianoacrilato cura com umidade do ar, não com oxigênio",
        "Faixa ideal: 40–60% de umidade e 20–24°C",
        "Distância ideal da raiz: 1 a 2mm"
      ]
    },
    {
      id: 5,
      modulo: "pago",
      titulo: "Mapeamento de Olhares na Prática",
      duracao: "35 min",
      xp: 50,
      resumo: "Aprenda a desenhar os efeitos Gatinho, Boneca, Esquilo e Natural com base no formato do olho de cada cliente.",
      conteudo: [
        "O mapeamento é o planejamento de comprimentos e curvaturas antes da aplicação — é ele que garante um resultado harmônico e não apenas 'colar fios aleatoriamente'.",
        "Efeito Gatinho: comprimentos crescentes do canto interno até o canto externo, alongando o olhar — ótimo para olhos redondos ou próximos.",
        "Efeito Boneca (Doll Eye): comprimentos maiores no centro do olho, arredondando o olhar — ideal para olhos amendoados que já são alongados naturalmente.",
        "Efeito Esquilo: o oposto do gatinho — maior comprimento no canto interno, dando um ar mais jovem e aberto — funciona bem em olhos monolídeos ou orientais.",
        "Efeito Natural: segue exatamente a curva do olho da cliente, sem exagero de comprimento, indicado para quem busca discrição ou para clientes de peles e fios sensíveis."
      ],
      pontosChave: [
        "Mapeamento é planejamento, não improviso",
        "O formato do olho define qual efeito favorece mais",
        "Cada efeito muda o ponto de maior comprimento na linha ciliar"
      ]
    },
    {
      id: 6,
      modulo: "pago",
      titulo: "Isolamento Sem Dor e Aplicação Passo a Passo",
      duracao: "40 min",
      xp: 50,
      resumo: "Técnica de isolamento fio a fio sem desconforto para a cliente e o passo a passo completo de aplicação em modelo viva.",
      conteudo: [
        "Isolamento é separar um único fio natural dos vizinhos antes de colar a extensão — feito errado, gruda fios entre si (efeito 'teia') e machuca ao puxar durante a manutenção.",
        "Segure a pinça de isolamento em um ângulo de 45°, deslize por baixo do fio a ser isolado com movimento único e firme, sem 'serrar' a pele, o que causa desconforto e vermelhidão.",
        "Passo a passo da aplicação: 1) higienização e protetor de pálpebra inferior, 2) pentear os fios naturais, 3) isolar, 4) mergulhar a extensão na cola (gota do tamanho de uma cabeça de alfinete), 5) posicionar a 1–2mm da raiz, 6) segurar 1–2 segundos até fixar, 7) repetir fio a fio da região interna para a externa.",
        "Trabalhe sempre por regiões (interna, central, externa) e não fio a fio aleatório — isso mantém a simetria e evita retrabalho no fechamento do mapeamento."
      ],
      pontosChave: [
        "Isolamento correto evita fios colados entre si e dor na manutenção",
        "Distância ideal da raiz: 1 a 2mm",
        "Trabalhar por regiões garante simetria"
      ]
    },
    {
      id: 7,
      modulo: "pago",
      titulo: "Manutenção, Remoção Segura e Retenção de 30 Dias",
      duracao: "28 min",
      xp: 50,
      resumo: "Como fazer manutenções que preservam a saúde do fio natural, remoção segura com removedor em gel/creme e os segredos para 30 dias de retenção.",
      conteudo: [
        "A manutenção ideal acontece a cada 15–21 dias, retirando fios soltos ou mal posicionados e reaplicando apenas onde necessário — nunca 'por cima' de extensões antigas, o que sobrecarrega o fio natural.",
        "Remoção segura usa removedor em gel ou creme (nunca líquido puro escorrendo perto do olho), aplicado com microbrush, com tempo de pausa de 2–3 minutos antes de deslizar suavemente com a pinça — jamais arrancar a seco.",
        "Os segredos de retenção de 30 dias envolvem três pilares: cola de qualidade dentro da validade e armazenada corretamente (geladeira ou pote hermético), ambiente de trabalho na faixa ideal de umidade/temperatura, e orientação correta à cliente sobre cuidados em casa (evitar água nas primeiras 24h, não usar óleo na região, escovar diariamente).",
        "Ensine a cliente a dormir de barriga para cima ou de lado sem esmagar o olho — o atrito do travesseiro é uma das maiores causas de queda precoce."
      ],
      pontosChave: [
        "Manutenção ideal: a cada 15–21 dias",
        "Removedor em gel/creme, nunca arrancar a seco",
        "Orientação de cuidados em casa impacta diretamente a retenção"
      ]
    },
    {
      id: 8,
      modulo: "pago",
      titulo: "Precificação, Foto de Alto Impacto e Captação de Clientes",
      duracao: "32 min",
      xp: 50,
      resumo: "Como precificar seu trabalho de forma sustentável, fotografar resultados que vendem no Instagram e captar clientes de forma consistente.",
      conteudo: [
        "Precificar não é 'copiar o preço da concorrência': calcule custo de material por atendimento, tempo investido, aluguel/espaço e a margem de lucro desejada antes de definir sua tabela de preços.",
        "Para fotos de alto impacto: luz natural indireta (nunca flash direto, que estoura o brilho da cola), fundo neutro, foco no olho fechado e depois aberto, e sempre peça autorização de uso de imagem para a cliente.",
        "Estratégias de captação: portfólio consistente no Instagram/TikTok, parcerias com micro-influenciadoras locais, programa de indicação com desconto na manutenção, e um perfil no Google Meu Negócio para aparecer em buscas locais.",
        "Ao concluir esta aula você já reúne toda a base técnica e de negócio para atuar como Master Lash Designer — falta apenas emitir seu certificado na aba Perfil."
      ],
      pontosChave: [
        "Preço deve cobrir custo + tempo + margem, não só copiar concorrência",
        "Luz natural indireta é a chave para fotos que vendem",
        "Programa de indicação é uma das formas mais baratas de captar clientes"
      ]
    }
  ],

  // Quizzes de fixação ao final de cada módulo
  quizzes: {
    gratis: {
      titulo: "Quiz — Módulo Gratuito",
      perguntas: [
        {
          pergunta: "Onde a cola NUNCA deve ser aplicada?",
          opcoes: ["Na haste da extensão", "Sobre a pele ou glândulas de Meibômio", "No fio natural", "Na pinça"],
          correta: 1
        },
        {
          pergunta: "Qual técnica costuma entregar o efeito mais leve e natural?",
          opcoes: ["Volume Russo", "Fio a Fio", "Volume Brasileiro", "Tufo"],
          correta: 1
        },
        {
          pergunta: "Por que alguns fios caem naturalmente após a aplicação?",
          opcoes: ["Erro técnico sempre", "Cola vencida", "Ciclo natural de crescimento do cílio", "Excesso de maquiagem"],
          correta: 2
        }
      ]
    },
    pago: {
      titulo: "Quiz — Formação Profissional Completa",
      perguntas: [
        {
          pergunta: "A cola de cílios (cianoacrilato) cura principalmente através de:",
          opcoes: ["Contato com oxigênio", "Umidade do ar", "Calor direto", "Luz UV"],
          correta: 1
        },
        {
          pergunta: "Qual a distância ideal entre a extensão e a raiz do fio natural?",
          opcoes: ["Encostando na pele", "1 a 2mm", "5mm", "1cm"],
          correta: 1
        },
        {
          pergunta: "O efeito Gatinho é indicado principalmente para:",
          opcoes: ["Olhos redondos ou próximos", "Olhos já bem alongados", "Apenas peles oleosas", "Somente clientes iniciantes"],
          correta: 0
        },
        {
          pergunta: "Qual a periodicidade ideal de manutenção?",
          opcoes: ["A cada 2 meses", "A cada 15–21 dias", "Somente quando cair tudo", "A cada 3 dias"],
          correta: 1
        },
        {
          pergunta: "Na remoção da extensão, o correto é:",
          opcoes: ["Arrancar a seco com a pinça", "Usar removedor em gel/creme com pausa antes de deslizar", "Puxar rapidamente para não doer", "Usar acetona pura direto na pálpebra"],
          correta: 1
        }
      ]
    }
  },

  // Catálogo de Cílios — usado na aula 3 e na aba Mapeamentos
  catalogo: [
    {
      tipo: "Fio a Fio (Clássico)",
      proporcao: "1 fio de extensão : 1 fio natural",
      espessura: "0.15mm – 0.20mm",
      curvaturasIndicadas: ["C", "CC"],
      efeito: "Natural, discreto, alongamento sutil",
      indicadoPara: "Fios naturais finos ou fragilizados, clientes que preferem discrição",
      icone: "single"
    },
    {
      tipo: "Volume Russo",
      proporcao: "Fans de 3 a 8 fios finos : 1 fio natural",
      espessura: "0.03mm – 0.07mm por fio do fan",
      curvaturasIndicadas: ["D", "L"],
      efeito: "Preenchido, glamouroso, alta densidade sem peso",
      indicadoPara: "Fios naturais saudáveis, clientes que buscam impacto visual forte",
      icone: "fan"
    },
    {
      tipo: "Volume Híbrido",
      proporcao: "Mescla de fio a fio e fans 2D/3D",
      espessura: "0.07mm – 0.15mm",
      curvaturasIndicadas: ["C", "D"],
      efeito: "Textura mista entre natural e volumoso",
      indicadoPara: "Clientes em transição do clássico para o volume russo",
      icone: "mix"
    },
    {
      tipo: "Volume Brasileiro / Tecnológico (YY / W)",
      proporcao: "Fio bifurcado em Y ou W : 1 fio natural",
      espessura: "0.10mm – 0.15mm",
      curvaturasIndicadas: ["D", "M"],
      efeito: "Volume expressivo com aplicação mais rápida que o russo",
      indicadoPara: "Clientes que querem volume com procedimento mais ágil",
      icone: "y"
    },
    {
      tipo: "Cílios Postiços em Tufo",
      proporcao: "Tufos pré-montados de 3 a 5 fios",
      espessura: "Variável (tufo pronto)",
      curvaturasIndicadas: ["C", "D"],
      efeito: "Efeito pontual, aplicação rápida, ideal para eventos",
      indicadoPara: "Serviços expressos, noivas, eventos de curta duração",
      icone: "tuft"
    }
  ],

  // Níveis de aluno
  niveis: [
    { nome: "Lash Aprendiz", min: 0, max: 150, cor: "#C9A227" },
    { nome: "Praticante Teórica", min: 151, max: 400, cor: "#D98E9B" },
    { nome: "Especialista em Isolamento", min: 401, max: 800, cor: "#8E5A6B" },
    { nome: "Master Lash Designer", min: 801, max: Infinity, cor: "#1A1A1A" }
  ],

  // Medalhas / Badges
  badges: [
    { id: "primeira_aula", nome: "Primeiro Passo", descricao: "Concluiu a primeira aula", icone: "🌱" },
    { id: "modulo_gratis", nome: "Base Sólida", descricao: "Concluiu o módulo gratuito", icone: "📘" },
    { id: "quiz_gratis", nome: "Teoria em Dia", descricao: "Acertou o quiz do módulo gratuito", icone: "✅" },
    { id: "desbloqueou_formacao", nome: "Formação Liberada", descricao: "Desbloqueou a Formação Profissional Completa", icone: "🔓" },
    { id: "modulo_pago", nome: "Formação Completa", descricao: "Concluiu todas as aulas da Formação Profissional", icone: "🎓" },
    { id: "quiz_pago", nome: "Especialista Aprovada", descricao: "Acertou o quiz da Formação Profissional", icone: "🏅" },
    { id: "certificado", nome: "Master Lash Designer", descricao: "Emitiu o certificado oficial", icone: "👑" }
  ]
};

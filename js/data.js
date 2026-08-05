/* =========================================================================
   LASH ACADEMY — DADOS DO CURSO
   Edite este arquivo para alterar aulas, quizzes, catálogo e níveis.
   ========================================================================= */

const COURSE_DATA = {

  // Preço da Formação Profissional Completa (usado na cobrança Pix)
  //
  // IMPORTANTE — HONESTIDADE COM A ALUNA:
  // "precoOriginal" só deve ser um valor que você realmente já cobrou (ou vai
  // cobrar) por este curso depois da promoção. Não use um número inflado só
  // para simular desconto — isso é propaganda enganosa (Código de Defesa do
  // Consumidor). "promocaoValidaAte" deve ser uma data real: quando ela
  // passar, volte o "preco" para o valor cheio (ou defina uma nova promoção
  // real com nova data). O código não faz isso sozinho — é você quem honra o prazo.
  formacao: {
    preco: 97.00,
    precoOriginal: 348.99,
    promocaoValidaAte: "2026-08-15T23:59:59-03:00",
    descricao: "Formação Profissional Completa em Lash Designer"
  },

  // Extras / Bônus — produtos avulsos oferecidos como "serviços extras"
  //
  // REGRA DE HONESTIDADE (mesma lógica do preço da Formação):
  // "bonusGratisAte" só pode ser uma data real. Enquanto ela não passar, o
  // item é entregue de graça para quem compra a Formação Completa. Depois
  // dela, o item deixa de ser bônus automático e passa a ser vendido
  // separadamente, como card avulso na loja de Extras — igual aos demais.
  // Isso é o que torna a urgência real, e não só uma contagem decorativa.
  extras: [
    {
      id: "precificacao",
      nome: "Precificação Lash: Quanto Cobrar Sem Perder Cliente",
      tipo: "ebook",
      resumo: "O passo a passo para calcular seu preço de verdade — sem chutar, sem copiar concorrência e sem trabalhar de graça.",
      precoAvulso: 47.00,
      bonusGratisAte: "2026-08-15T23:59:59-03:00", // mesma data da promoção da Formação
      capitulos: [
        {
          titulo: "1. Por que copiar o preço da concorrência quebra seu negócio",
          paragrafos: [
            "É comum uma Lash Designer iniciante abrir o Instagram de outra profissional, ver o preço cobrado e copiar o mesmo valor — sem saber se aquele número cobre os custos dela ou não. O problema é que você não sabe a estrutura de custo de quem você está copiando: o espaço, o tempo de aplicação, os materiais usados e a região podem ser completamente diferentes dos seus.",
            "Preço copiado sem cálculo é o motivo número um de profissionais trabalharem cheias de clientes e, no fim do mês, sem sobrar dinheiro. Encher a agenda não é sinônimo de lucro — é sinônimo de faturamento. Lucro é o que sobra depois de pagar tudo, inclusive o seu próprio tempo."
          ]
        },
        {
          titulo: "2. Os 4 custos que toda Lash Designer esquece de calcular",
          paragrafos: [
            "Custo de material por atendimento: cola, fios/fans, removedor, fita micropore, protetor de pálpebra, luvas e descartáveis. Some o valor de cada item usado em UM atendimento completo — não o valor da caixa inteira.",
            "Custo do seu tempo: quantas horas você realmente gasta por atendimento, contando setup, aplicação e higienização da maca depois? Multiplique essas horas pelo valor que você quer ganhar por hora de trabalho — não pelo salário mínimo dividido por 220 horas, mas pelo que sustenta sua meta de renda.",
            "Custo fixo rateado: aluguel de cadeira, sala ou proporcional do espaço da sua casa dedicado ao atendimento, internet, energia, e assinaturas (agenda online, edição de fotos). Divida o custo fixo mensal pelo número de atendimentos que você faz no mês.",
            "Custo de reposição e atualização: pinças gastam o fio de precisão com o tempo, cursos de atualização técnica têm valor, e certificações também custam. Reserve uma fatia pequena do seu preço para isso — sem essa reserva, você paga essas despesas 'do seu bolso' sem perceber."
          ]
        },
        {
          titulo: "3. Fórmula prática de precificação (passo a passo com exemplo)",
          paragrafos: [
            "Fórmula: Preço = (Custo de material + Custo de tempo + Custo fixo rateado) ÷ (1 − margem de lucro desejada, em decimal).",
            "Exemplo prático: material R$ 18, tempo de 1h40 a R$ 40/hora = R$ 66,70, custo fixo rateado R$ 12. Soma: R$ 96,70. Se você quer 30% de margem de lucro: R$ 96,70 ÷ (1 − 0,30) = R$ 96,70 ÷ 0,70 = R$ 138,14.",
            "Perceba que esse valor não tem nada a ver com 'o que a profissional aqui do bairro cobra' — ele nasce da sua própria estrutura de custo e da margem que você decidiu ter. Se o resultado ficar muito acima do que o mercado da sua região paga, o ajuste correto é reduzir custo (tempo de aplicação, técnica, materiais) — não simplesmente baixar o preço e reduzir sua margem a zero."
          ]
        },
        {
          titulo: "4. Como reajustar preço sem perder clientela",
          paragrafos: [
            "Reajuste com aviso prévio: comunique a mudança com pelo menos 30 dias de antecedência para as clientes fixas, explicando o motivo (custo de material, tempo de mercado, evolução técnica) — transparência gera menos resistência do que um valor novo aparecendo do nada na hora de pagar.",
            "Script de comunicação: 'Oi [nome]! Passando pra te avisar que a partir de [data] o valor da manutenção passa a ser R$ [novo valor]. Isso reflete [motivo real, ex: novo curso de volume russo que fiz / aumento no custo dos materiais]. Você continua sendo prioridade na minha agenda, viu? Bjo!'",
            "Reajuste apenas para clientes novas primeiro, se preferir um caminho mais gradual — mantenha o preço atual para quem já é fiel por um período de transição, e aplique o novo valor só para quem agenda pela primeira vez a partir de agora."
          ]
        },
        {
          titulo: "5. Precificando pacotes e assinaturas mensais",
          paragrafos: [
            "Pacote de manutenção mensal (aplicação + 1 manutenção): calcule o custo de cada atendimento separadamente e ofereça um desconto pequeno (5% a 10%) pela garantia de recorrência — nunca um desconto tão alto que zere sua margem.",
            "Assinatura trimestral ou semestral: cobre à vista ou parcelado, mas sempre calcule o valor total como se fossem atendimentos avulsos primeiro, e só depois aplique o desconto por fidelidade — isso evita subprecificar sem perceber."
          ]
        },
        {
          titulo: "6. Erros de precificação que fazem você trabalhar de graça",
          paragrafos: [
            "Não contar o tempo de deslocamento em atendimento domiciliar. Não cobrar taxa de remoção quando a cliente troca de profissional. Dar desconto 'de amiga' repetidamente sem calcular o impacto no mês. Incluir brindes ilimitados (retoque grátis a qualquer momento) sem prazo definido. Cada um desses pontos parece pequeno isoladamente, mas juntos são o motivo mais comum de uma agenda cheia e um caixa vazio."
          ]
        }
      ],
      checklist: [
        "Calculei o custo de material de UM atendimento completo (não da caixa inteira)",
        "Defini quanto vale a minha hora de trabalho",
        "Ratiei meu custo fixo mensal pelo número de atendimentos do mês",
        "Apliquei a fórmula de precificação com a margem que eu quero, não a que sobra",
        "Tenho um script pronto para avisar clientes sobre reajuste de preço",
        "Revejo meu preço a cada 3 a 6 meses, não deixo o valor congelado por anos"
      ]
    },
    {
      id: "legendas-instagram",
      nome: "50 Legendas Prontas para Instagram de Lash Designer",
      tipo: "ebook",
      resumo: "Banco de legendas testadas para post de antes/depois, captação de clientes e datas comemorativas — copia e cola.",
      precoAvulso: 37.00,
      bonusGratisAte: null,
      capitulos: [
        {
          titulo: "Antes e Depois (10 legendas)",
          paragrafos: [
            "1. Da timidez pro olhar de gata 😻 Manutenção feita hoje, retenção de 30 dias garantida. Agenda aberta, vem marcar o seu horário!",
            "2. Transformação de hoje: volume russo fio a fio, curvatura D. Nada de photoshop — é técnica e cuidado. Comenta aqui se quiser esse efeito 👇",
            "3. Reparou a diferença? Não é maquiagem, é extensão bem aplicada com mapeamento personalizado pro formato do olho dela.",
            "4. Antes ela achava que cílio grande pesava. Depois descobriu que o segredo tá na curvatura certa, não no tamanho. Bora agendar a sua avaliação?",
            "5. Do zero ao efeito boneca em 1h40. Aplicação feita com todo cuidado de biossegurança. Link na bio pra agendar 💛",
            "6. Esse antes e depois não mente: cílio fio a fio clássico pra quem ama um efeito natural que ninguém percebe que é extensão.",
            "7. Ela chegou insegura sobre o resultado. Saiu se olhando no espelho três vezes. É esse o efeito que eu busco em cada atendimento.",
            "8. Retenção de 30 dias não é sorte, é técnica de acoplagem + cuidado em casa. Ensino tudo isso na manutenção também.",
            "9. De olhos cansados pra olhar young lash: efeito esquilo pra quem quer um ar mais aberto e jovem sem exagero.",
            "10. Antes ela usava máscara todo dia. Depois nunca mais precisou. Extensão bem feita muda a rotina — e a autoestima."
          ]
        },
        {
          titulo: "Captação de Clientes Novas (10 legendas)",
          paragrafos: [
            "11. Ainda não conhece a técnica de volume russo? Comenta 'EU QUERO' que te explico tudo por aqui e já reservo um horário.",
            "12. 3 vagas abertas essa semana para primeira aplicação. Quem chegar primeiro no direct garante o horário 💌",
            "13. Não sabe qual técnica combina com seu olho? Manda uma foto no direct que eu te digo qual efeito fica melhor em você.",
            "14. Cliente nova ganha 10% de desconto na primeira manutenção. Vem conhecer meu trabalho!",
            "15. Curiosa pra saber quanto tempo dura a extensão? Comenta aqui embaixo que eu te explico certinho.",
            "16. Trabalho com biossegurança em cada detalhe: materiais esterilizados, protetor hipoalergênico e teste de alergia antes da primeira aplicação.",
            "17. Amiga trouxe amiga, ganha desconto as duas. Programa de indicação ativo — chama no direct pra saber mais.",
            "18. Ainda usando cílio postiço todo dia? Deixa eu te mostrar como a extensão resolve isso de vez.",
            "19. Atendo em [seu bairro/cidade]. Se você é daqui e quer marcar, é só chamar no WhatsApp que combinamos o melhor horário.",
            "20. Toda cliente nova recebe orientação completa de cuidados em casa pra reter o resultado por até 30 dias. Vem agendar!"
          ]
        },
        {
          titulo: "Datas Comemorativas (10 legendas)",
          paragrafos: [
            "21. Dia das Mães chegando — que tal presentear (ou se presentear) com um olhar novo? Agenda especial aberta.",
            "22. Formatura chegando! Bora deixar o olhar pronto pra foto sem precisar de photoshop.",
            "23. Ano novo, olhar novo. Bora começar o ano com a autoestima lá em cima?",
            "24. Casamento chegando e você quer um olhar que aguenta o dia inteiro sem borrar? Fala comigo com antecedência pra garantir seu horário.",
            "25. Dia dos Namorados: que tal chegar pro encontro com um efeito gatinho irresistível?",
            "26. Réveillon é sinônimo de cílio marcado. Agenda de fim de ano é concorrida — garante já sua vaga.",
            "27. Volta às aulas, volta à rotina — e nada como um cílio de manutenção em dia pra começar o semestre com confiança.",
            "28. Aniversário chegando? Se presenteia com um olhar novo — combina com qualquer produção.",
            "29. Black Friday: condição especial só essa semana pra quem fechar a Formação Completa comigo. (uso interno da Lash Academy, adapte para seu produto)",
            "30. Verão chegando, hora de pensar num efeito mais leve pro dia a dia — bora conversar sobre qual técnica combina com você?"
          ]
        },
        {
          titulo: "Engajamento e Interação (10 legendas)",
          paragrafos: [
            "31. Qual efeito você prefere: gatinho, boneca ou natural? Comenta aqui embaixo 👇",
            "32. Enquete nos Stories: você prefere volume russo ou fio a fio? Vota lá!",
            "33. Marca aqui aquela amiga que precisa conhecer meu trabalho.",
            "34. Se esse resultado te deixou apaixonada, deixa o like e salva esse post pra não perder quando for agendar.",
            "35. Curiosidade do dia: você sabia que a cola de cílio seca com a umidade do ar, não com o oxigênio? Fascinante, né?",
            "36. Qual foi o seu primeiro contato com extensão de cílios? Conta aqui nos comentários.",
            "37. Fim de semana chegando — quem já garantiu horário de manutenção?",
            "38. Dúvida de cliente: 'dói fazer?' Não! Quando bem aplicada, a extensão não causa nenhum desconforto. Comenta se você já ouviu esse mito também.",
            "39. Esse é o meu espaço de trabalho — cada material esterilizado, cada detalhe pensado pra sua segurança.",
            "40. Compartilha esse post com quem tá pensando em fazer a primeira extensão!"
          ]
        },
        {
          titulo: "Prova Social e Autoridade (10 legendas)",
          paragrafos: [
            "41. Mais uma cliente satisfeita saindo com o olhar renovado. Obrigada pela confiança! 💛",
            "42. Formada e certificada em [técnica/curso], sempre em busca de atualização pra entregar o melhor resultado pra você.",
            "43. Cada avaliação de 5 estrelas me motiva a continuar entregando o meu melhor. Obrigada, [nome da cliente]!",
            "44. Depoimento de cliente: 'Nunca pensei que fosse durar tanto tempo sem cair!' — resultado de técnica + cuidado em casa.",
            "45. Já são [número] atendimentos realizados com muito carinho e atenção aos detalhes.",
            "46. Trabalho sempre com produtos de procedência garantida — sua segurança em primeiro lugar.",
            "47. Antes de qualquer aplicação, faço teste de alergia com toda cliente nova. Segurança não é detalhe, é prioridade.",
            "48. Bastidores do meu dia de trabalho: cada detalhe pensado pra você sair satisfeita.",
            "49. Investir em atualização profissional é o que me permite trazer as técnicas mais atuais pra você.",
            "50. Obrigada a cada cliente que confia no meu trabalho e me indica pra amigas e família. É por vocês que eu continuo evoluindo."
          ]
        }
      ],
      checklist: [
        "Adapte o texto entre colchetes [ ] com informações reais do seu negócio antes de postar",
        "Alterne entre os 5 tipos de legenda ao longo da semana para não repetir o mesmo tom sempre",
        "Sempre inclua uma chamada para ação clara (comentar, chamar no direct, agendar)",
        "Combine a legenda com foto ou vídeo de boa qualidade — luz natural indireta funciona melhor"
      ]
    },
    {
      id: "biosseguranca-anamnese",
      nome: "Checklist de Biossegurança + Ficha de Anamnese para Imprimir",
      tipo: "pdf",
      resumo: "Ficha de anamnese pronta e checklist de biossegurança para usar no primeiro atendimento de cada cliente nova.",
      precoAvulso: 27.00,
      bonusGratisAte: null,
      capitulos: [
        {
          titulo: "Checklist de Biossegurança — Antes do Atendimento",
          paragrafos: [
            "☐ Higienização completa das mãos com álcool 70% ou sabonete antisséptico",
            "☐ Maca, cadeira e superfícies de apoio higienizadas com álcool 70%",
            "☐ Pinças e materiais reutilizáveis esterilizados (autoclave) ou descartáveis novos abertos na frente da cliente",
            "☐ Protetor de pálpebra inferior hipoalergênico separado e pronto para uso",
            "☐ Cola dentro da validade e armazenada corretamente (pote fechado, longe de calor/umidade excessiva)",
            "☐ Ficha de anamnese da cliente preenchida e assinada antes de iniciar"
          ]
        },
        {
          titulo: "Checklist de Biossegurança — Durante o Atendimento",
          paragrafos: [
            "☐ Uso de luvas descartáveis trocadas se houver qualquer interrupção do atendimento",
            "☐ Aplicação do protetor de pálpebra inferior corretamente posicionada, sem tocar o globo ocular",
            "☐ Cola aplicada sem contato com a pele ou glândulas de Meibômio",
            "☐ Atenção redobrada a sinais de desconforto da cliente (coceira, ardência, lacrimejamento excessivo) — interromper se necessário",
            "☐ Descarte correto de materiais perfurocortantes e descartáveis usados"
          ]
        },
        {
          titulo: "Checklist de Biossegurança — Depois do Atendimento",
          paragrafos: [
            "☐ Higienização completa da maca e superfícies antes do próximo atendimento",
            "☐ Pinças reutilizáveis separadas para nova esterilização",
            "☐ Orientações de cuidados em casa passadas verbalmente e, se possível, por escrito/WhatsApp",
            "☐ Registro do atendimento (data, técnica usada, observações) para consulta na próxima manutenção"
          ]
        },
        {
          titulo: "Ficha de Anamnese — Campos para Preencher com a Cliente",
          paragrafos: [
            "Dados pessoais: nome completo, data de nascimento, telefone/WhatsApp, e-mail",
            "Histórico de saúde ocular: já teve conjuntivite, blefarite, olho seco ou outra condição ocular? Usa lente de contato?",
            "Histórico de alergias: já teve reação alérgica a cosméticos, colas, adesivos ou látex? Já fez extensão de cílios antes — teve alguma reação?",
            "Uso de medicamentos: faz uso de colírio, medicação para os olhos, ou tratamento dermatológico na região?",
            "Gestação/amamentação: está grávida ou amamentando? (Alguns protocolos recomendam cautela extra — informe-se com orientação profissional/médica sobre o procedimento nesse período.)",
            "Expectativa da cliente: qual efeito ela busca (natural, volumoso, alongado)? Já viu alguma referência de foto?",
            "Teste de alergia: data em que foi realizado o teste de mecha, resultado observado",
            "Termo de consentimento: espaço para a cliente declarar ciência dos riscos e assinar, autorizando o procedimento",
            "Assinatura da cliente e da profissional, com data do atendimento"
          ]
        }
      ],
      checklist: [
        "Imprima uma ficha de anamnese nova para cada cliente — nunca reutilize a mesma ficha entre clientes diferentes",
        "Guarde as fichas assinadas organizadas por ordem alfabética ou por data — servem como registro profissional",
        "Refaça o teste de alergia sempre que trocar a marca da cola utilizada",
        "Revise esse checklist de biossegurança periodicamente com toda a equipe, se você tiver colaboradoras"
      ]
    },
    {
      id: "script-vendas",
      nome: "Script de Vendas: Como Fechar o Primeiro Atendimento",
      tipo: "ebook",
      resumo: "Roteiro de conversa para responder objeções de preço e fechar o primeiro agendamento com clientes vindas do Instagram.",
      precoAvulso: 37.00,
      bonusGratisAte: null,
      capitulos: [
        {
          titulo: "1. Como abrir a conversa no Direct ou WhatsApp",
          paragrafos: [
            "Quando alguém comenta ou manda mensagem perguntando sobre o serviço, responda rápido (idealmente em até algumas horas) e comece com uma pergunta, não com uma lista de preços. Isso evita que a conversa vire só uma cotação e abre espaço para você entender o que ela busca.",
            "Exemplo de abertura: 'Oii! Que bom seu interesse 💛 Me conta, você já fez extensão antes ou seria a sua primeira vez?' — essa pergunta já direciona a conversa e mostra que você se importa com a experiência dela, não só com a venda."
          ]
        },
        {
          titulo: "2. Perguntas de qualificação antes de falar preço",
          paragrafos: [
            "Antes de informar valores, faça 2 ou 3 perguntas: já fez extensão antes? Qual efeito ela busca (natural, volumoso, alongado)? Tem alguma sensibilidade ou alergia conhecida? Isso te dá informação para recomendar a técnica certa e mostra profissionalismo — você não está só 'vendendo um serviço genérico'.",
            "Só depois dessas perguntas, apresente a técnica recomendada com uma frase curta explicando o porquê: 'Pelo que você me contou, o volume híbrido combina bem com o efeito que você quer — nem tão marcado quanto o russo, nem tão discreto quanto o clássico.'"
          ]
        },
        {
          titulo: "3. Como responder 'Quanto custa?' sem espantar a cliente",
          paragrafos: [
            "Nunca responda só o número seco. Sempre acompanhe o valor do que está incluso: 'A aplicação de [técnica] fica R$ [valor] e inclui a avaliação do formato do seu olho, aplicação com produtos de procedência garantida e orientação completa de cuidados para durar até 30 dias.'",
            "Se ela achar caro e não responder mais, não insista imediatamente — depois de um tempo, envie uma mensagem de valor (não de desconto): 'Fico à disposição se quiser tirar mais alguma dúvida sobre a técnica ou sobre os cuidados.' Isso mantém a porta aberta sem parecer desespero para vender."
          ]
        },
        {
          titulo: "4. Contornando a objeção 'Vou pensar'",
          paragrafos: [
            "'Vou pensar' quase sempre esconde uma dúvida não dita — pode ser preço, medo de não gostar do resultado, ou insegurança sobre a técnica. Em vez de aceitar e sumir, pergunte com gentileza: 'Consigo te ajudar com alguma dúvida específica? Às vezes é sobre o valor, às vezes é sobre o resultado — fico à vontade para esclarecer o que for.'",
            "Se a resposta for sobre preço, você pode oferecer (com cautela, sem virar hábito) uma condição real, como o desconto de cliente nova, se você já tiver essa política — nunca invente um desconto fictício só para fechar naquele momento."
          ]
        },
        {
          titulo: "5. Fechando o agendamento",
          paragrafos: [
            "Quando perceber sinais de interesse (perguntas sobre disponibilidade, localização, forma de pagamento), parta para o fechamento direto: 'Tenho horário disponível [dia] às [hora] ou [dia] às [hora] — qual funciona melhor pra você?' Oferecer duas opções específicas facilita a decisão mais do que perguntar 'quando você pode?'.",
            "Confirme o agendamento por escrito (mesma mensagem ou nota separada) com data, hora, valor e forma de pagamento, para evitar mal-entendidos e reduzir faltas."
          ]
        }
      ],
      checklist: [
        "Responda mensagens de interesse o quanto antes — o interesse esfria rápido em poucas horas",
        "Sempre qualifique antes de falar preço (pergunte antes de responder valor)",
        "Nunca informe o preço 'seco' — sempre junto do que está incluso",
        "Ofereça datas específicas no fechamento, não pergunte 'quando você pode'",
        "Confirme o agendamento por escrito para reduzir faltas"
      ]
    }
  ],

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

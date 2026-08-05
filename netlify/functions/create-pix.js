// netlify/functions/create-pix.js
//
// Cria uma cobrança Pix via API do Mercado Pago e devolve o QR Code (imagem em
// base64) e o código "copia e cola" para o front-end exibir no modal.
//
// IMPORTANTE — SEGURANÇA:
// O valor cobrado é SEMPRE recalculado AQUI, no servidor, a partir da lista de
// "itens" enviada pelo front-end (ex: ["formacao", "legendas-instagram"]).
// O front-end pode enviar um campo "valor" também, mas ele é só informativo —
// o servidor nunca confia nele, porque qualquer pessoa pode alterá-lo pelo
// DevTools antes de enviar a requisição.
//
// Se for mudar o preço de qualquer item, troque o número na tabela PRECOS
// abaixo E o valor exibido em js/data.js (COURSE_DATA.formacao.preco /
// COURSE_DATA.extras[].precoAvulso) — os dois lugares precisam ficar iguais.
//
// Requer a variável de ambiente MP_ACCESS_TOKEN configurada no painel da
// Netlify (Site settings → Environment variables).

// Tabela de preços — espelha js/data.js. Mantenha os dois arquivos sincronizados.
const PRECOS = {
  formacao: {
    preco: 97.00,
    descricao: "Formação Profissional Completa"
  },
  extras: {
    "precificacao": { preco: 47.00, bonusGratisAte: "2026-08-15T23:59:59-03:00", descricao: "E-book: Precificação Lash" },
    "legendas-instagram": { preco: 37.00, bonusGratisAte: null, descricao: "E-book: 50 Legendas para Instagram" },
    "biosseguranca-anamnese": { preco: 27.00, bonusGratisAte: null, descricao: "Checklist de Biossegurança + Ficha de Anamnese" },
    "script-vendas": { preco: 37.00, bonusGratisAte: null, descricao: "E-book: Script de Vendas" }
  }
};

// Calcula o total real e a descrição da cobrança a partir da lista de itens
// enviada pelo front-end. Itens desconhecidos são ignorados (não somam valor).
function calcularCobranca(itens) {
  const lista = Array.isArray(itens) ? itens : [];
  const incluiFormacao = lista.includes("formacao");
  let total = 0;
  const descricoes = [];

  if (incluiFormacao) {
    total += PRECOS.formacao.preco;
    descricoes.push(PRECOS.formacao.descricao);
  }

  lista.forEach((id) => {
    if (id === "formacao") return;
    const extra = PRECOS.extras[id];
    if (!extra) return; // ignora ids desconhecidos — nunca confia em item não catalogado

    const bonusAtivo = extra.bonusGratisAte && new Date(extra.bonusGratisAte).getTime() > Date.now();
    // Bônus grátis só é válido se a Formação estiver sendo comprada junto E o prazo do bônus ainda não passou.
    if (bonusAtivo && incluiFormacao) {
      descricoes.push(`${extra.descricao} (bônus grátis)`);
      return; // não soma valor
    }

    total += extra.preco;
    descricoes.push(extra.descricao);
  });

  return {
    total: Math.round(total * 100) / 100,
    descricao: descricoes.length ? descricoes.join(" + ") : "Lash Academy"
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método não permitido" }) };
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "MP_ACCESS_TOKEN não configurado nas variáveis de ambiente da Netlify." })
    };
  }

  let payload = {};
  try { payload = JSON.parse(event.body || "{}"); } catch (e) { /* payload vazio é aceitável */ }

  const nomePagador = (payload.nome || "Aluna Lash Academy").toString().slice(0, 60);
  const idempotencyKey = `lashacademy-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const { total, descricao } = calcularCobranca(payload.itens);

  if (total <= 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Carrinho vazio ou itens inválidos — nada a cobrar." })
    };
  }

  try {
    const resp = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Idempotency-Key": idempotencyKey
      },
      body: JSON.stringify({
        transaction_amount: total,
        description: `${descricao} - Lash Academy`,
        payment_method_id: "pix",
        payer: {
          email: "aluna@lashacademy.com.br",
          first_name: nomePagador
        }
      })
    });

    const data = await resp.json();

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: data.message || "Erro ao criar a cobrança Pix.", detalhe: data })
      };
    }

    const txData = data.point_of_interaction && data.point_of_interaction.transaction_data;

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: data.id,
        status: data.status,
        valor: total,
        qr_code: txData ? txData.qr_code : null,               // código "copia e cola"
        qr_code_base64: txData ? txData.qr_code_base64 : null, // imagem do QR Code em base64
        ticket_url: txData ? txData.ticket_url : null
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao conectar com o Mercado Pago.", detalhe: String(err) })
    };
  }
};

// netlify/functions/create-pix.js
//
// Cria uma cobrança Pix via API do Mercado Pago e devolve o QR Code (imagem em
// base64) e o código "copia e cola" para o front-end exibir no modal.
//
// IMPORTANTE — SEGURANÇA:
// O valor cobrado é definido AQUI, no servidor (nunca confie em um valor vindo
// do navegador, pois qualquer pessoa pode alterá-lo pelo DevTools antes de
// enviar a requisição). Se for mudar o preço da Formação Completa, troque o
// número abaixo E o valor exibido em js/data.js (COURSE_DATA.formacao.preco).
//
// Requer a variável de ambiente MP_ACCESS_TOKEN configurada no painel da
// Netlify (Site settings → Environment variables). Veja o README para o
// passo a passo de como obter esse token no Mercado Pago.

const PRECO_FORMACAO_COMPLETA = 97.00;

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

  try {
    const resp = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Idempotency-Key": idempotencyKey
      },
      body: JSON.stringify({
        transaction_amount: PRECO_FORMACAO_COMPLETA,
        description: "Formação Profissional Completa - Lash Academy",
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

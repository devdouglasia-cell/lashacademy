// netlify/functions/check-pix.js
//
// Consulta o status de um pagamento Pix no Mercado Pago pelo ID retornado em
// create-pix.js. O front-end chama esta função a cada poucos segundos
// (polling) até o status virar "approved" para liberar o acesso automaticamente.
//
// Requer a mesma variável de ambiente MP_ACCESS_TOKEN usada em create-pix.js.

exports.handler = async (event) => {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "MP_ACCESS_TOKEN não configurado nas variáveis de ambiente da Netlify." })
    };
  }

  const id = event.queryStringParameters && event.queryStringParameters.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Parâmetro 'id' é obrigatório." }) };
  }

  try {
    const resp = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(id)}`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    const data = await resp.json();

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: data.message || "Erro ao consultar o pagamento." })
      };
    }

    // status possíveis: pending | approved | rejected | cancelled | in_process
    return {
      statusCode: 200,
      body: JSON.stringify({ id: data.id, status: data.status })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao conectar com o Mercado Pago.", detalhe: String(err) })
    };
  }
};

// CÓDIGO TEMPORÁRIO DE DEBUG - MODO ESCUTA (ECHO)

export default async function handler(request, response) {
  
  // Esta função não faz nada inteligente.
  // Ela apenas pega TUDO o que recebeu e devolve para podermos ver.
  response.status(200).json({
    diagnostico: "Abaixo está exatamente o que a Vercel recebeu do Chatvolt.",
    query_recebida: request.query,
    url_completa_recebida: request.url
  });

}

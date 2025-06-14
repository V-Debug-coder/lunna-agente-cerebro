// CÓDIGO TEMPORÁRIO DE DEBUG - MODO DETETIVE
export default async function handler(request, response) {
  const termoDeBusca = (request.query.modelo || '').toLowerCase();
  if (!termoDeBusca) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }
  try {
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': `bearer ${process.env.NUVEMSHOP_API_TOKEN}`,
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
      }
    });
    if (!nuvemShopResponse.ok) { throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`); }
    const todasAsCategorias = await nuvemShopResponse.json();
    const resultadosEncontrados = todasAsCategorias
      .filter(c => c.name.pt.toLowerCase().includes(termoDeBusca))
      .map(c => ({ id: c.id, nome: c.name.pt, parent_id: c.parent }));
    return response.status(200).json({ termo_pesquisado: termoDeBusca, resultados: resultadosEncontrados });
  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.', details: error.message });
  }
}

// CÓDIGO TEMPORÁRIO DE DEBUG - MODO DETETIVE

export default async function handler(request, response) {
  // Pega o termo de busca que o usuário enviou
  const termoDeBusca = (request.query.modelo || '').toLowerCase();

  if (!termoDeBusca) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  try {
    // Chama a API da Nuvemshop para pegar TODAS as categorias
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': 'bearer 972ade7aa8a494d58d2dbc868f5a6e26ee0a4472', // Seu token
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)' // Seu User Agent
      }
    });
    
    if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
    }

    const todasAsCategorias = await nuvemShopResponse.json();

    // Lógica do Detetive: Encontra todas as categorias que INCLUEM o termo de busca
    const resultadosEncontrados = todasAsCategorias
      .filter(c => c.name.pt.toLowerCase().includes(termoDeBusca))
      .map(c => ({
        id: c.id,
        nome: c.name.pt,
        parent: c.parent
      }));

    // Retorna a lista do que foi encontrado para podermos analisar
    return response.status(200).json({
      termo_pesquisado: termoDeBusca,
      resultados: resultadosEncontrados
    });

  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.', details: error.message });
  }
}

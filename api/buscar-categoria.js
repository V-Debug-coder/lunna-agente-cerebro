// CÓDIGO TEMPORÁRIO DE DEBUG - MODO RAIO-X

export default async function handler(request, response) {
  try {
    // Conecta na Nuvemshop
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': `bearer ${process.env.NUVEMSHOP_API_TOKEN}`,
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
      }
    });

    if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
    }

    // Pega a lista completa de categorias
    const todasAsCategorias = await nuvemShopResponse.json();

    // Simplesmente devolve TUDO que a Nuvemshop enviou.
    return response.status(200).json(todasAsCategorias);

  } catch (error) {
    return response.status(500).json({ 
        error: 'Falha ao buscar os dados brutos da Nuvemshop.', 
        details: error.message 
    });
  }
}

// CÓDIGO TEMPORÁRIO DE DIAGNÓSTICO - INVENTÁRIO TOTAL

export default async function handler(request, response) {
  try {
    const headers = {
      'Authentication': `bearer ${process.env.NUVEMSHOP_API_TOKEN}`,
      'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
    };

    let todasAsCategorias = [];
    let url = 'https://api.nuvemshop.com.br/v1/905119/categories';

    while (url) {
      const nuvemShopResponse = await fetch(url, { headers });
      if (!nuvemShopResponse.ok) { throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`); }
      const categoriasDaPagina = await nuvemShopResponse.json();
      todasAsCategorias = todasAsCategorias.concat(categoriasDaPagina);
      const linkHeader = nuvemShopResponse.headers.get('link');
      url = null;
      if (linkHeader) {
        const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
        if (nextLink) {
          url = nextLink.split(';')[0].replace('<', '').replace('>', '').trim();
        }
      }
    }
    return response.status(200).json(todasAsCategorias);
  } catch (error) {
    return response.status(500).json({ error: 'Falha ao buscar os dados brutos.', details: error.message });
  }
}


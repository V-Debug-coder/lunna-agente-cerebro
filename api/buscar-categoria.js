// api/buscar-categoria.js - VERSÃO FINAL COM PAGINAÇÃO

const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

const dicionarioDeSinonimos = {
  // SEU DICIONÁRIO COMPLETO VEM AQUI
  'dunk': 'Dunk Low', 'force': 'Air Force', 'air force': 'Air Force', 'tn': 'AIR MAX TN', 'air max tn': 'AIR MAX TN', 'sb': 'NIKE SB', 'nike sb': 'NIKE SB', 'nike': 'Nike', 'mizuno': 'Mizuno', 'new balance': 'New Balance', 'new balance premium': 'New Balance Premium',
  // ... e o resto do seu glossário
};

function isDescendenteDe(categoriaId, categoriaPaiId, todasAsCategoriasMap) {
  let currentCategory = todasAsCategoriasMap.get(categoriaId);
  const visitados = new Set();
  while (currentCategory) {
    if (visitados.has(currentCategory.id)) return false; 
    visitados.add(currentCategory.id);
    if (currentCategory.id === categoriaPaiId || currentCategory.parent === categoriaPaiId) return true;
    if (!currentCategory.parent || currentCategory.parent === 0) return false;
    currentCategory = todasAsCategoriasMap.get(currentCategory.parent);
  }
  return false;
}

function construirUrl(categoriaId, todasAsCategoriasMap) {
  let categoriaAtual = todasAsCategoriasMap.get(categoriaId);
  const pathParts = [];
  const visitados = new Set();
  while (categoriaAtual) {
    if (visitados.has(categoriaAtual.id)) break; 
    visitados.add(categoriaAtual.id);
    if (categoriaAtual.handle && categoriaAtual.handle.pt) {
      pathParts.unshift(categoriaAtual.handle.pt);
    }
    if (!categoriaAtual.parent || categoriaAtual.parent === 0) break;
    categoriaAtual = todasAsCategoriasMap.get(categoriaAtual.parent);
  }
  return `https://www.tenismogi.com/${pathParts.join('/')}`;
}

export default async function handler(request, response) {
  const modeloDoUsuario = (request.query.modelo || '').toLowerCase();
  if (!modeloDoUsuario) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  const nomeOficial = dicionarioDeSinonimos[modeloDoUsuario] || modeloDoUsuario;

  try {
    const headers = {
      'Authentication': `bearer ${process.env.NUVEMSHOP_API_TOKEN}`,
      'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
    };

    // ========================================================================
    // NOVA LÓGICA DE PAGINAÇÃO - BUSCA TODAS AS PÁGINAS DE CATEGORIAS
    // ========================================================================
    let todasAsCategorias = [];
    let url = 'https://api.nuvemshop.com.br/v1/905119/categories';

    while (url) {
      const nuvemShopResponse = await fetch(url, { headers });
      
      if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
      }
      
      const categoriasDaPagina = await nuvemShopResponse.json();
      todasAsCategorias = todasAsCategorias.concat(categoriasDaPagina);

      const linkHeader = nuvemShopResponse.headers.get('link');
      url = null; // Reseta a url para a próxima iteração

      if (linkHeader) {
        const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
        if (nextLink) {
          url = nextLink.split(';')[0].replace('<', '').replace('>', '').trim();
        }
      }
    }
    // ========================================================================
    // AGORA 'todasAsCategorias' contém a lista 100% completa
    // O resto do código continua a partir daqui, com a lista completa em mãos
    // ========================================================================

    const categoriasMap = new Map(todasAsCategorias.map(c => [c.id, c]));
    
    const nomeNacionalBase = nomeOficial;
    const nomePremiumBase = `${nomeOficial} Premium`;

    const candidatos = todasAsCategorias.filter(c => 
      c.name.pt.toLowerCase() === nomeNacionalBase.toLowerCase() || 
      c.name.pt.toLowerCase() === nomePremiumBase.toLowerCase()
    );
    
    const categoriaNacional = candidatos.find(c => c.name.pt.toLowerCase() === nomeNacionalBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_NACIONAL, categoriasMap));
    const categoriaPremium = candidatos.find(c => c.name.pt.toLowerCase() === nomePremiumBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_PREMIUM, categoriasMap));

    const resultado = {
      nacional_disponivel: !!categoriaNacional,
      nacional_url: categoriaNacional ? construirUrl(categoriaNacional.id, categoriasMap) : null,
      premium_disponivel: !!categoriaPremium,
      premium_url: categoriaPremium ? construirUrl(categoriaPremium.id, categoriasMap) : null,
    };

    return response.status(200).json(resultado);

  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.', details: error.message });
  }
}

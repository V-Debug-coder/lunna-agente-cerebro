// api/buscar-categoria.js - VERSÃO DE PRODUÇÃO FINAL E COMPLETA

const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

// ========================================================================
// SUPER-GLOSSÁRIO GERADO POR IA
// ========================================================================
const dicionarioDeSinonimos = {
  // ========================================================
  // MARCAS PRINCIPAIS
  // ========================================================
  'nike': 'NIKE',
  'adidas': 'ADIDAS', 'adida': 'ADIDAS',
  'puma': 'PUMA',
  'all star': 'ALL STAR', 'allstar': 'ALL STAR', 'al estar': 'ALL STAR', 'converce': 'ALL STAR', 'converse': 'ALL STAR',
  'mizuno': 'MIZUNO', 'misuno': 'MIZUNO', 'mizunu': 'MIZUNO',
  'new balance': 'NEW BALANCE', 'novo balanço': 'NEW BALANCE', 'nil balance': 'NEW BALANCE', 'nb': 'NEW BALANCE',
  'vert': 'VERT', 'veja': 'VERT', 'verti': 'VERT', 'verte': 'VERT',
  'tesla': 'TESLA PREMIUM',
  'louis vuitton': 'LOUIS VUITTON', 'louis viton': 'LOUIS VUITTON', 'lv': 'LOUIS VUITTON', 'vitton': 'LOUIS VUITTON', 'vuitton': 'LOUIS VUITTON',

  // ========================================================
  // MODELOS NIKE
  // ========================================================
  'air force': 'AIR FORCE', 'force': 'AIR FORCE', 'air': 'AIR FORCE', 'ar force': 'AIR FORCE', 'ai foice': 'AIR FORCE', 'aiforce': 'AIR FORCE', 'airforci': 'AIR FORCE', 'er forci': 'AIR FORCE', 'air force 1': 'AIR FORCE', 'af1': 'AIR FORCE',
  'dunk': 'DUNK LOW', 'dunk low': 'DUNK LOW', 'duk': 'DUNK LOW', 'dank': 'DUNK LOW', 'dunke': 'DUNK LOW', 'danki': 'DUNK LOW', 'dunk l': 'DUNK LOW', 'dunk lou': 'DUNK LOW',
  'air max tn': 'AIR MAX TN', 'tn': 'AIR MAX TN', 'tn plus': 'AIR MAX TN', 'tuned': 'AIR MAX TN', 'airmax tn': 'AIR MAX TN', 'er max tn': 'AIR MAX TN',
  'air max 90': 'AIR MAX 90', 'max 90': 'AIR MAX 90', 'airmax 90': 'AIR MAX 90', 'er max 90': 'AIR MAX 90',
  'air max 95': 'AIR MAX 95', 'max 95': 'AIR MAX 95', 'airmax 95': 'AIR MAX 95', 'er max 95': 'AIR MAX 95',
  'air max 97': 'AIR MAX 97', 'max 97': 'AIR MAX 97', 'airmax 97': 'AIR MAX 97', 'er max 97': 'AIR MAX 97',
  'nike sb': 'NIKE SB', 'sb': 'NIKE SB', 'dunk sb': 'NIKE SB', 'janoski': 'NIKE SB', 'tenis sb': 'NIKE SB',
  'air max 90 excee': 'AIR MAX 90 EXCEE PREMIUM', 'max excee': 'AIR MAX 90 EXCEE PREMIUM', 'excee': 'AIR MAX 90 EXCEE PREMIUM',
  
  // --- Modelos Jordan (Premium) ---
  'air jordan': 'AIR JORDAN PREMIUM', 'jordan': 'AIR JORDAN PREMIUM', 'jordam': 'AIR JORDAN PREMIUM',
  'air jordan low': 'AIR JORDAN LOW PREMIUM', 'jordan low': 'AIR JORDAN LOW PREMIUM',
  'air jordan 1': 'AIR JORDAN 1 PREMIUM', 'jordan 1': 'AIR JORDAN 1 PREMIUM',
  'air jordan 4': 'AIR JORDAN 4 PREMIUM', 'jordan 4': 'AIR JORDAN 4 PREMIUM',
  'air jordan 5': 'AIR JORDAN 5 PREMIUM', 'jordan 5': 'AIR JORDAN 5 PREMIUM',
  'air jordan 6': 'AIR JORDAN 6 PREMIUM', 'jordan 6': 'AIR JORDAN 6 PREMIUM',

  // ========================================================
  // MODELOS ADIDAS
  // ========================================================
  'ultra boost': 'ULTRA BOOST', 'ultra bost': 'ULTRA BOOST', 'ultrabost': 'ULTRA BOOST',
  'slip on': 'SLIP ON', 'eslip on': 'SLIP ON', 'slipon': 'SLIP ON',
  'nmd': 'NMD', 'adidas nmd': 'NMD',
  'superstar': 'SUPERSTAR', 'supertar': 'SUPERSTAR', 'super star': 'SUPERSTAR',
  'adidas forum': 'ADIDAS FORUM PREMIUM', 'forum': 'ADIDAS FORUM PREMIUM', 'forun': 'ADIDAS FORUM PREMIUM',
  'samba': 'SAMBA PREMIUM', 'zamba': 'SAMBA PREMIUM',
  'yeezy boost': 'YEEZY BOOST PREMIUM', 'yeezy': 'YEEZY BOOST PREMIUM', 'yezzy': 'YEEZY BOOST PREMIUM', 'boost': 'YEEZY BOOST PREMIUM',
  'adidas campus': 'ADIDAS CAMPUS PREMIUM ', 'campus': 'ADIDAS CAMPUS PREMIUM ', 'canpus': 'ADIDAS CAMPUS PREMIUM ',
  'adi 2000': 'ADI 2000 PREMIUM', 'adi2000': 'ADI 2000 PREMIUM',
  
  // ========================================================
  // MODELOS GERAIS E ATRIBUTOS
  // ========================================================
  'bota': 'BOTA', 'botinha': 'BOTA', 'cano alto': 'BOTA',
  'couro': 'COURO', 'sintetico': 'COURO',
  'lona': 'LONA', 'tecido': 'LONA',
  'plataforma': 'PLATAFORMA',
};
// ========================================================================


// Função auxiliar para verificar a linhagem da categoria
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

// Função auxiliar para construir a URL completa da categoria
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

// api/buscar-categoria.js - VERSÃO DE PRODUÇÃO FINAL COM SUPER-GLOSSÁRIO

const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

// SUPER-GLOSSÁRIO GERADO POR IA (BASEADO NO SEU CATÁLOGO COMPLETO)
const dicionarioDeSinonimos = {
  // --- MARCAS PRINCIPAIS ---
  'nike': 'NIKE', 'naiki': 'NIKE', 'naike': 'NIKE', 'nik': 'NIKE',
  'adidas': 'ADIDAS', 'adida': 'ADIDAS', 'addidas': 'ADIDAS', 'adidasd': 'ADIDAS',
  'puma': 'PUMA', 'pumba': 'PUMA', 'pum': 'PUMA',
  'all star': 'ALL STAR', 'allstar': 'ALL STAR', 'al estar': 'ALL STAR', 'converce': 'ALL STAR', 'converse': 'ALL STAR', 'all star converse': 'ALL STAR',
  'mizuno': 'MIZUNO', 'misuno': 'MIZUNO', 'mizunu': 'MIZUNO', 'misunu': 'MIZUNO', 'mizino': 'MIZUNO',
  'new balance': 'NEW BALANCE', 'novo balanço': 'NEW BALANCE', 'nil balance': 'NEW BALANCE', 'nb': 'NEW BALANCE', 'newbalanci': 'NEW BALANCE',
  'vert': 'VERT', 'veja': 'VERT', 'verti': 'VERT', 'verte': 'VERT', 'verty': 'VERT', 'tenis veja': 'VERT',
  'tesla': 'TESLA PREMIUM', 'tezla': 'TESLA PREMIUM',
  'louis vuitton': 'LOUIS VUITTON', 'louis viton': 'LOUIS VUITTON', 'lv': 'LOUIS VUITTON', 'vitton': 'LOUIS VUITTON', 'vuitton': 'LOUIS VUITTON',

  // --- MODELOS NIKE ---
  'air force': 'AIR FORCE', 'force': 'AIR FORCE', 'air': 'AIR FORCE', 'ar force': 'AIR FORCE', 'ai foice': 'AIR FORCE', 'aiforce': 'AIR FORCE', 'airforci': 'AIR FORCE', 'er forci': 'AIR FORCE', 'air force 1': 'AIR FORCE', 'af1': 'AIR FORCE',
  'dunk': 'DUNK LOW', 'dunk low': 'DUNK LOW', 'duk': 'DUNK LOW', 'dank': 'DUNK LOW', 'dunke': 'DUNK LOW', 'danki': 'DUNK LOW', 'dunk l': 'DUNK LOW', 'dunk lou': 'DUNK LOW', 'dank low': 'DUNK LOW',
  'air max tn': 'AIR MAX TN', 'tn': 'AIR MAX TN', 'tn plus': 'AIR MAX TN', 'tuned': 'AIR MAX TN', 'airmax tn': 'AIR MAX TN', 'er max tn': 'AIR MAX TN', 'nike tn': 'AIR MAX TN',
  'air max 90': 'AIR MAX 90', 'max 90': 'AIR MAX 90', 'airmax 90': 'AIR MAX 90', 'er max 90': 'AIR MAX 90', 'am90': 'AIR MAX 90',
  'air max 95': 'AIR MAX 95', 'max 95': 'AIR MAX 95', 'airmax 95': 'AIR MAX 95', 'er max 95': 'AIR MAX 95', 'am95': 'AIR MAX 95',
  'air max 97': 'AIR MAX 97', 'max 97': 'AIR MAX 97', 'airmax 97': 'AIR MAX 97', 'er max 97': 'AIR MAX 97', 'am97': 'AIR MAX 97',
  'nike sb': 'NIKE SB', 'sb': 'NIKE SB', 'dunk sb': 'NIKE SB', 'janoski': 'NIKE SB', 'tenis sb': 'NIKE SB', 'nike janoski': 'NIKE SB',
  
  // --- Modelos Premium NIKE ---
  'air force premium': 'AIR FORCE PREMIUM', 'force premium': 'AIR FORCE PREMIUM', 'af1 premium': 'AIR FORCE PREMIUM',
  'dunk low premium': 'DUNK LOW PREMIUM', 'dunk premium': 'DUNK LOW PREMIUM',
  'air max 90 excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'max excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'excee': 'AIR MAX 90 EXCEE PREMIUM',
  'air jordan premium': 'AIR JORDAN PREMIUM', 'jordan premium': 'AIR JORDAN PREMIUM',
  'air jordan low premium': 'AIR JORDAN LOW PREMIUM', 'jordan low premium': 'AIR JORDAN LOW PREMIUM',
  'air jordan 1 premium': 'AIR JORDAN 1 PREMIUM', 'jordan 1 premium': 'AIR JORDAN 1 PREMIUM',
  'air jordan 4 premium': 'AIR JORDAN 4 PREMIUM', 'jordan 4 premium': 'AIR JORDAN 4 PREMIUM',
  'air jordan 5 premium': 'AIR JORDAN 5 PREMIUM', 'jordan 5 premium': 'AIR JORDAN 5 PREMIUM',
  'air jordan 6 premium': 'AIR JORDAN 6 PREMIUM', 'jordan 6 premium': 'AIR JORDAN 6 PREMIUM',

  // --- MODELOS ADIDAS ---
  'ultra boost': 'ULTRA BOOST', 'ultra bost': 'ULTRA BOOST', 'ultrabost': 'ULTRA BOOST', 'boost': 'ULTRA BOOST',
  'slip on': 'SLIP ON', 'eslip on': 'SLIP ON', 'slipon': 'SLIP ON',
  'nmd': 'NMD', 'adidas nmd': 'NMD', 'nomad': 'NMD',
  'superstar': 'SUPERSTAR', 'supertar': 'SUPERSTAR', 'super star': 'SUPERSTAR',
  'adidas forum premium': 'ADIDAS FORUM PREMIUM', 'forum premium': 'ADIDAS FORUM PREMIUM', 'forum': 'ADIDAS FORUM PREMIUM', 'forun': 'ADIDAS FORUM PREMIUM',
  'samba premium': 'SAMBA PREMIUM', 'samba': 'SAMBA PREMIUM', 'zamba': 'SAMBA PREMIUM',
  'yeezy boost premium': 'YEEZY BOOST PREMIUM', 'yeezy premium': 'YEEZY BOOST PREMIUM', 'yeezy': 'YEEZY BOOST PREMIUM', 'yezzy': 'YEEZY BOOST PREMIUM',
  'adidas campus premium': 'ADIDAS CAMPUS PREMIUM ', 'campus premium': 'ADIDAS CAMPUS PREMIUM ', 'campus': 'ADIDAS CAMPUS PREMIUM ', 'canpus': 'ADIDAS CAMPUS PREMIUM ',
  'adi 2000 premium': 'ADI 2000 PREMIUM', 'adi2000 premium': 'ADI 2000 PREMIUM', 'adidas 2000 premium': 'ADI 2000 PREMIUM',
  
  // --- MODELOS GERAIS E ATRIBUTOS ---
  'bota': 'BOTA', 'botinha': 'BOTA', 'cano alto': 'BOTA', 'all star bota': 'BOTA',
  'couro': 'COURO', 'sintetico': 'COURO', 'all star couro': 'COURO',
  'lona': 'LONA', 'tecido': 'LONA', 'all star lona': 'LONA',
  'plataforma': 'PLATAFORMA', 'all star plataforma': 'PLATAFORMA',
  'new balance premium': 'NEW BALANCE PREMIUM', 'nb premium': 'NEW BALANCE PREMIUM',
  'puma premium': 'PUMA PREMIUM',
  'vert premium': 'VERT PREMIUM', 'veja premium': 'VERT PREMIUM',
};

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

    const nomeBuscaPremium = nomeOficial.toLowerCase().includes('premium') ? nomeOficial : nomePremiumBase;

    const candidatos = todasAsCategorias.filter(c => 
      c.name.pt.toLowerCase() === nomeNacionalBase.toLowerCase() || 
      c.name.pt.toLowerCase() === nomeBuscaPremium.toLowerCase()
    );
    
    const categoriaNacional = candidatos.find(c => c.name.pt.toLowerCase() === nomeNacionalBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_NACIONAL, categoriasMap));
    const categoriaPremium = candidatos.find(c => c.name.pt.toLowerCase() === nomeBuscaPremium.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_PREMIUM, categoriasMap));

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

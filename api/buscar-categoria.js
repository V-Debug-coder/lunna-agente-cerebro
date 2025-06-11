// api/buscar-categoria.js

// IDs DAS SUAS CATEGORIAS PRINCIPAIS (PAI DE TODAS)
const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

// DICIONÁRIO COMPLETO, LIMPO E CORRIGIDO
const dicionarioDeSinonimos = {
  // ADI2000
  'adi2000': 'ADI2000', 'adidas 2000': 'ADI2000', 'tenis 2000': 'ADI2000',
  // ADVERSARY
  'adversary': 'Adversary', 'adiversari': 'Adversary', 'adversari': 'Adversary', 'adverssary': 'Adversary',
  // AIR FORCE
  'air force': 'Air Force', 'air': 'Air Force', 'ar force': 'Air Force', 'ai foice': 'Air Force', 'air foise': 'Air Force', 'air foisse': 'Air Force', 'ar foice': 'Air Force', 'force': 'Air Force', 'foice': 'Air Force', 'forci': 'Air Force',
  // AIR FORCE STUSSY
  'air force stussy': 'Air Force Stussy', 'estussy': 'Air Force Stussy', 'stusy': 'Air Force Stussy', 'stusi': 'Air Force Stussy', 'estusi': 'Air Force Stussy', 'istussy': 'Air Force Stussy',
  // AIR FORCE GAMMA
  'air force gamma': 'Air Force Gamma', 'gama': 'Air Force Gamma', 'gaama': 'Air Force Gamma',
  // AIR FORCE PREMIUM (para referência)
  'air force premium': 'Air Force Premium',
  // AIR JORDAN 1
  'air jordan 1': 'Air Jordan 1', 'jordan 1': 'Air Jordan 1', 'jordao 1': 'Air Jordan 1', 'jordana 1': 'Air Jordan 1',
  // AIR JORDAN 4
  'air jordan 4': 'Air Jordan 4', 'jordan 4': 'Air Jordan 4', 'ar jordan 4': 'Air Jordan 4', 'jordam 4': 'Air Jordan 4', 'jordao 4': 'Air Jordan 4', 'jordana 4': 'Air Jordan 4', 'jorda 4': 'Air Jordan 4',
  // AIR JORDAN 6
  'air jordan 6': 'Air Jordan 6', 'jordan 6': 'Air Jordan 6', 'ar jordan 6': 'Air Jordan 6', 'air jordana 6': 'Air Jordan 6',
  // AIR JORDAN LOW
  'air jordan low': 'Air Jordan Low', 'ar jordan lou': 'Air Jordan Low', 'air jordan lou': 'Air Jordan Low', 'jordan low': 'Air Jordan Low', 'jordan lou': 'Air Jordan Low', 'gordan low': 'Air Jordan Low',
  // JORDAN 5
  'jordan 5': 'Jordan 5', 'jordana 5': 'Jordan 5', 'jorda 5': 'Jordan 5',
  // AIR MAX 90
  'air max 90': 'Air Max 90', 'ar max 90': 'Air Max 90', 'ar mex 90': 'Air Max 90', 'air mex 90': 'Air Max 90', 'max 90': 'Air Max 90', 'air max bolha': 'Air Max 90',
  // AIR MAX 90 EXCEE
  'air max 90 excee': 'Air Max 90 Excee', '90 excee': 'Air Max 90 Excee', 'air max excee': 'Air Max 90 Excee', 'air max 90 exce': 'Air Max 90 Excee',
  // AIR MAX 95
  'air max 95': 'Air Max 95', 'ar max 95': 'Air Max 95', 'ar mex 95': 'Air Max 95', 'air mex 95': 'Air Max 95', 'max 95': 'Air Max 95',
  // AIR MAX 97
  'air max 97': 'Air Max 97', 'ar max 97': 'Air Max 97', 'ar mex 97': 'Air Max 97', 'air mex 97': 'Air Max 97', 'max 97': 'Air Max 97',
  // TN
  'tn': 'TN Air', 'tn air': 'TN Air', 'air max tn': 'TN Air', 'tn plus': 'TN Air 2', 'tn air 2': 'TN Air 2',
  // ALL STAR
  'all star': 'All Star', 'al estar': 'All Star', 'all estar': 'All Star', 'au star': 'All Star', 'allstar': 'All Star', 'austar': 'All Star', 'lona': 'All Star', 'tecido': 'All Star',
  // ALL STAR BOTA
  'all star bota': 'All Star Bota', 'bota': 'All Star Bota', 'botinha': 'All Star Bota', 'alto': 'All Star Bota', 'cano alto': 'All Star Bota',
  // CAMPUS
  'campus': 'Campus', 'campos': 'Campus', 'canpus': 'Campus', 'canpos': 'Campus',
  // CONTENDER
  'contender': 'Contender', 'comtender': 'Contender', 'countender': 'Contender',
  // DUNK
  'dunk': 'Dunk Low', 'duk': 'Dunk Low', 'dank': 'Dunk Low', 'dunke': 'Dunk Low', 'danke': 'Dunk Low', 'dunk low': 'Dunk Low', 'dunke low': 'Dunk Low', 'danke low': 'Dunk Low', 'dank low': 'Dunk Low', 'dunk lou': 'Dunk Low',
  // DUNK LOW PREMIUM (para referência)
  'dunk low premium': 'Dunk Low Premium',
  // DUNK TWIST
  'dunk twist': 'Dunk Twist', 'twist': 'Dunk Twist', 'tuist': 'Dunk Twist',
  // SB / JANOSKI
  'sb': 'SB', 'nike sb': 'SB', 'dunk sb': 'SB', 'tenis sb': 'SB', 'janoski': 'SB',
  // FENTY
  'fenty': 'Fenty', 'fenti': 'Fenty', 'fente': 'Fenty',
  // Atributos de Tênis
  'chaveirinho': 'Chaveirinho', 'chaveiro': 'Chaveirinho', 'holográfico': 'Holográfico', 'holografico': 'Holográfico', 'holo': 'Holográfico', 'holografic': 'Holográfico', 'refletivo': 'Holográfico',
  'shadow': 'Shadow', 'shadol': 'Shadow', 'xadol': 'Shadow', 'xadow': 'Shadow', 'shado': 'Shadow',
  'stitch': 'Stitch', 'estitchi': 'Stitch', 'stithi': 'Stitch', 'estiti': 'Stitch',
  'couro': 'Couro', 'sintetico': 'Couro',
  // FORUM
  'forum': 'Forum', 'forul': 'Forum', 'foru': 'Forum', 'forom': 'Forum',
  // INVICTUS 3
  'invictus 3': 'Invictus 3', 'inviquitus 3': 'Invictus 3', 'invictus': 'Invictus 3',
  // KNU SKOOL
  'knu skool': 'Knu Skool', 'quinu skool': 'Knu Skool', 'vans knu': 'Knu Skool', 'knu skol': 'Knu Skool', 'knu skul': 'Knu Skool', 'skool knu': 'Knu Skool', 'vans quinu': 'Knu Skool',
  // NEW BALANCE
  'new balance': 'New Balance', 'novo balanço': 'New Balance', 'nil balance': 'New Balance',
  // OLD SKOOL
  'old skool': 'Old Skool', 'vans old': 'Old Skool', 'vans tradicional': 'Old Skool', 'vans classico': 'Old Skool',
  // OLD SKOOL BOTA
  'old skool bota': 'Old Skool Bota', 'vans botinha': 'Old Skool Bota', 'vans cano alto': 'Old Skool Bota', 'vans bota': 'Old Skool Bota',
  // MIZUNO PROPHECY
  'prophecy 8': 'Prophecy 8', 'profecy 8': 'Prophecy 8', 'profeci 8': 'Prophecy 8', 'propecy 8': 'Prophecy 8', 'mizuno prophecy 8': 'Prophecy 8', 'mizuno profici 8': 'Prophecy 8',
  // MIZUNO RIDER
  'rider b': 'Rider B', 'raider b': 'Rider B', 'raider': 'Rider B', 'rider': 'Rider B',
  // PUMA SLIP ON
  'slip on': 'Slip On', 'eslip on': 'Slip On', 'slipi on': 'Slip On', 'puma elastico': 'Slip On',
  // PUMA SUEDE
  'suede': 'Suede', 'puma suede': 'Suede', 'suedi': 'Suede',
  // SUPERSTAR
  'superstar': 'Superstar', 'supertar': 'Superstar',
  // ULTRA RANGER
  'ultra ranger': 'Ultra Ranger', 'ultra range': 'Ultra Ranger', 'ranger': 'Ultra Ranger', 'ultra rang': 'Ultra Ranger',
  // ULTRA BOOST
  'ultra boost': 'Ultra Boost', 'ultra bost': 'Ultra Boost',
  // VERT
  'vert': 'Vert', 'veja': 'Vert', 'verti': 'Vert', 'verte': 'Vert',
  // ROUPAS E ACESSÓRIOS
  'bobojaco': 'Bobojaco', 'jaqueta': 'Bobojaco',
  'bag': 'Bag', 'mochila pequena': 'Bag', 'mochila pequena transversal': 'Bag', 'mochila transversal': 'Bag',
  'meia cano alto': 'Meia Cano Alto', 'meia cumprida': 'Meia Cano Alto', 'meia comprida': 'Meia Cano Alto', 'meia media': 'Meia Cano Alto', 'meia alta': 'Meia Cano Alto',
};

// Função auxiliar para verificar a linhagem da categoria
function isDescendenteDe(categoriaId, categoriaPaiId, todasAsCategoriasMap) {
  let categoriaAtual = todasAsCategoriasMap.get(categoriaId);
  if (!categoriaAtual) return false;

  let visitados = new Set(); 
  while (categoriaAtual) {
    if (visitados.has(categoriaAtual.id)) return false; 
    visitados.add(categoriaAtual.id);

    if (categoriaAtual.id === categoriaPaiId) return true;
    if (categoriaAtual.parent === categoriaPaiId) return true;
    
    if (!categoriaAtual.parent) return false;
    
    categoriaAtual = todasAsCategoriasMap.get(categoriaAtual.parent);
  }
  return false;
}

export default async function handler(request, response) {
  const modeloDoUsuario = (request.query.modelo || '').toLowerCase();
  if (!modeloDoUsuario) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  const nomeOficial = dicionarioDeSinonimos[modeloDoUsuario] || modeloDoUsuario;

  try {
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': 'bearer 972ade7aa8a494d58d2dbc868f5a6e26ee0a4472',
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
      }
    });
    
    if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
    }

    const todasAsCategorias = await nuvemShopResponse.json();
    const categoriasMap = new Map(todasAsCategorias.map(c => [c.id, c]));

    const construirUrl = (categoriaId) => {
      let categoriaAtual = categoriasMap.get(categoriaId);
      if (!categoriaAtual) return null;
      let pathParts = [];
      let visitados = new Set();
      while (categoriaAtual && categoriaAtual.parent !== 0) {
        if (visitados.has(categoriaAtual.id)) break;
        visitados.add(categoriaAtual.id);
        if (categoriaAtual.handle && categoriaAtual.handle.pt) {
          pathParts.unshift(categoriaAtual.handle.pt);
        }
        if (categoriaAtual.parent) {
          categoriaAtual = categoriasMap.get(categoriaAtual.parent);
        } else { break; }
      }
      return `https://www.tenismogi.com/${pathParts.join('/')}`;
    };
    
    const nomeNacionalBase = nomeOficial;
    const nomePremiumBase = `${nomeOficial} Premium`;

    const candidatos = todasAsCategorias.filter(c => c.name.pt.toLowerCase() === nomeOficial.toLowerCase() || c.name.pt.toLowerCase() === nomePremiumBase.toLowerCase());

    const categoriaNacional = candidatos.find(c => c.name.pt.toLowerCase() === nomeNacionalBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_NACIONAL, categoriasMap));
    const categoriaPremium = candidatos.find(c => c.name.pt.toLowerCase() === nomePremiumBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_PREMIUM, categoriasMap));

    const resultado = {
      nacional_disponivel: !!categoriaNacional,
      nacional_url: categoriaNacional ? construirUrl(categoriaNacional.id) : null,
      premium_disponivel: !!categoriaPremium,
      premium_url: categoriaPremium ? construirUrl(categoriaPremium.id) : null,
    };

    return response.status(200).json(resultado);

  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.', details: error.message });
  }
}

// api/buscar-categoria.js 
const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

const dicionarioDeSinonimos = {
  // --- MARCAS PRINCIPAIS ---
  'nike': 'NIKE', 'naiki': 'NIKE', 'naike': 'NIKE', 'nik': 'NIKE',
  'adidas': 'ADIDAS', 'adida': 'ADIDAS', 'addidas': 'ADIDAS', 'adidasd': 'ADIDAS',
  'puma': 'PUMA', 'pumba': 'PUMA', 'pum': 'PUMA',
  'all star': 'ALL STAR', 'allstar': 'ALL STAR', 'al estar': 'ALL STAR', 'converce': 'ALL STAR', 'converse': 'ALL STAR', 'all star converse': 'ALL STAR', 'au star': 'ALL STAR', 'austar': 'ALL STAR',
  'mizuno': 'MIZUNO', 'misuno': 'MIZUNO', 'mizunu': 'MIZUNO', 'misunu': 'MIZUNO', 'mizino': 'MIZUNO',
  'new balance': 'NEW BALANCE', 'novo balanço': 'NEW BALANCE', 'nil balance': 'NEW BALANCE', 'nb': 'NEW BALANCE', 'newbalanci': 'NEW BALANCE', '9060': 'New Balance 9060', 'nb 9060': 'New Balance 9060',
  'vert': 'VERT', 'veja': 'VERT', 'verti': 'VERT', 'verte': 'VERT', 'verty': 'VERT', 'tenis veja': 'VERT',
  'tesla': 'TESLA PREMIUM', 'tezla': 'TESLA PREMIUM',
  'louis vuitton': 'LOUIS VUITTON', 'louis viton': 'LOUIS VUITTON', 'lv': 'LOUIS VUITTON', 'vitton': 'LOUIS VUITTON', 'vuitton': 'LOUIS VUITTON',

  // --- MODELOS NIKE ---
  'air force': 'AIR FORCE', 'force': 'AIR FORCE', 'air': 'AIR FORCE', 'ar force': 'AIR FORCE', 'ai foice': 'AIR FORCE', 'aiforce': 'AIR FORCE', 'airforci': 'AIR FORCE', 'er forci': 'AIR FORCE', 'air force 1': 'AIR FORCE', 'nike air force 1': 'AIR FORCE', 'nike air force': 'AIR FORCE', 'af1': 'AIR FORCE', 'foice': 'AIR FORCE',
  'dunk': 'DUNK LOW', 'dunk low': 'DUNK LOW', 'duk': 'DUNK LOW', 'dank': 'DUNK LOW', 'dunke': 'DUNK LOW', 'danki': 'DUNK LOW', 'dunk l': 'DUNK LOW', 'dunk lou': 'DUNK LOW', 'dank low': 'DUNK LOW', 'nike dunk': 'DUNK LOW', 'nike dunk low': 'DUNK LOW',
  'dunk twist': 'Dunk Twist', 'twist': 'Dunk Twist', 'tuist': 'Dunk Twist', 'nike dunk twist': 'Dunk Twist',
  'air max tn': 'AIR MAX TN', 'tn': 'AIR MAX TN', 'tn plus': 'AIR MAX TN', 'tuned': 'AIR MAX TN', 'airmax tn': 'AIR MAX TN', 'nike tn': 'AIR MAX TN',
  'air max 90': 'AIR MAX 90', 'max 90': 'AIR MAX 90', 'airmax 90': 'AIR MAX 90', 'am90': 'AIR MAX 90', 'air max bolha': 'AIR MAX 90',
  'air max 95': 'AIR MAX 95', 'max 95': 'AIR MAX 95', 'airmax 95': 'AIR MAX 95', 'am95': 'AIR MAX 95',
  'air max 97': 'AIR MAX 97', 'max 97': 'AIR MAX 97', 'airmax 97': 'AIR MAX 97', 'am97': 'AIR MAX 97',
  'nike sb': 'NIKE SB', 'sb': 'NIKE SB', 'dunk sb': 'NIKE SB', 'janoski': 'NIKE SB', 'tenis sb': 'NIKE SB',

  // --- Modelos Premium NIKE ---
  'air force premium': 'AIR FORCE PREMIUM', 'force premium': 'AIR FORCE PREMIUM', 'af1 premium': 'AIR FORCE PREMIUM',
  'dunk low premium': 'DUNK LOW PREMIUM', 'dunk premium': 'DUNK LOW PREMIUM',
  'air max 90 excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'excee': 'AIR MAX 90 EXCEE PREMIUM', 'air max 90 excee': 'AIR MAX 90 EXCEE PREMIUM',
  'air jordan premium': 'AIR JORDAN PREMIUM', 'jordan premium': 'AIR JORDAN PREMIUM', 'jordan': 'AIR JORDAN PREMIUM', 'air jordan': 'AIR JORDAN PREMIUM',
  'air jordan low premium': 'AIR JORDAN LOW PREMIUM', 'jordan low': 'AIR JORDAN LOW PREMIUM',
  'air jordan 1 premium': 'AIR JORDAN 1 PREMIUM', 'jordan 1': 'AIR JORDAN 1 PREMIUM',
  'air jordan 4 premium': 'AIR JORDAN 4 PREMIUM', 'jordan 4': 'AIR JORDAN 4 PREMIUM',
  'air jordan 5 premium': 'AIR JORDAN 5 PREMIUM', 'jordan 5': 'AIR JORDAN 5 PREMIUM',
  'air jordan 6 premium': 'AIR JORDAN 6 PREMIUM', 'jordan 6': 'AIR JORDAN 6 PREMIUM',

  // --- MODELOS ADIDAS ---
  'ultra boost': 'ULTRA BOOST', 'boost': 'ULTRA BOOST',
  'slip on': 'SLIP ON', 'eslip on': 'SLIP ON', 'slipon': 'SLIP ON',
  'nmd': 'NMD', 'adidas nmd': 'NMD',
  'superstar': 'SUPERSTAR', 'adidas superstar': 'SUPERSTAR',
  'adidas forum premium': 'ADIDAS FORUM PREMIUM', 'forum premium': 'ADIDAS FORUM PREMIUM', 'forum': 'ADIDAS FORUM PREMIUM',
  'samba premium': 'SAMBA PREMIUM', 'samba': 'SAMBA PREMIUM',
  'yeezy boost premium': 'YEEZY BOOST PREMIUM', 'yeezy': 'YEEZY BOOST PREMIUM',
  'adidas campus premium': 'ADIDAS CAMPUS PREMIUM', 'campus premium': 'ADIDAS CAMPUS PREMIUM', 'campus': 'ADIDAS CAMPUS PREMIUM',
  'adi 2000 premium': 'ADI 2000 PREMIUM', 'adi2000': 'ADI 2000 PREMIUM',
  
  // --- OUTROS MODELOS ---
  'bota': 'BOTA', 'botinha': 'BOTA', 'all star bota': 'BOTA',
  'couro': 'COURO', 'sintetico': 'COURO',
  'lona': 'LONA', 'tecido': 'LONA',
  'plataforma': 'PLATAFORMA',
  'new balance premium': 'NEW BALANCE PREMIUM', 'nb premium': 'NEW BALANCE PREMIUM',
  'puma premium': 'PUMA PREMIUM',
  'vert premium': 'VERT PREMIUM', 'veja premium': 'VERT PREMIUM',
  'contender': 'Contender',
  'fenty': 'Fenty',
  'invictus 3': 'Invictus 3', 'invictus': 'Invictus 3',
  'knu skool': 'Knu Skool', 'vans knu': 'Knu Skool', 'gordinho': 'Knu Skool', 'vans gordinho': 'Knu Skool',
  'old skool': 'Old Skool', 'vans old': 'Old Skool',
  'old skool bota': 'Old Skool Bota',
  'prophecy 8': 'Prophecy 8', 'mizuno prophecy 8': 'Prophecy 8',
  'rider b': 'Rider B', 'rider': 'Rider B',
  'puma suede': 'Suede', 'suede': 'Suede',
  'ultra ranger': 'Ultra Ranger', 'ultra range': 'Ultra Ranger',
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


// --- LÓGICA PRINCIPAL MODIFICADA ---
export default async function handler(request, response) {
  const termoDeBusca = (request.query.modelo || '').toLowerCase().trim();
  if (!termoDeBusca) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  // --- VERIFICAÇÃO DE TAMANHO COM A NOVA REGRA ---
  const tamanhoNumerico = parseInt(termoDeBusca, 10);
  if (!isNaN(tamanhoNumerico) && tamanhoNumerico >= 18 && tamanhoNumerico <= 45) {
    
    const resultadoTamanho = {
      tipo_busca: 'tamanho',
      tamanho_pesquisado: tamanhoNumerico,
      infantil_url: null,
      nacional_url: null,
      premium_url: null, // Começa como nulo por padrão
    };

    if (tamanhoNumerico <= 33) {
        // É tamanho infantil
        resultadoTamanho.infantil_url = `https://www.tenismogi.com/infantil/?Tamanho=${tamanhoNumerico}`;
    } else {
        // É tamanho adulto (34 ao 45)
        // A linha Nacional sempre terá link para adultos.
        resultadoTamanho.nacional_url = `https://www.tenismogi.com/tenis-nacional/?Tamanho=${tamanhoNumerico}`;

        // MUDANÇA AQUI: Adicionamos a condição para a linha Premium.
        // Só gera o link se o tamanho for 43 ou menor.
        if (tamanhoNumerico <= 43) {
            resultadoTamanho.premium_url = `https://www.tenismogi.com/tenis-premium/?Tamanho=${tamanhoNumerico}`;
        }
    }
    
    return response.status(200).json(resultadoTamanho);
  }
  
  // --- LÓGICA ANTIGA (AGORA PARA BUSCA POR MODELO) ---
  // Se não for um tamanho, continua com a busca por modelo...
  let nomeOficial = termoDeBusca;
  let melhorMatch = '';
  const chavesOrdenadas = Object.keys(dicionarioDeSinonimos).sort((a, b) => b.length - a.length);
  for (const alias of chavesOrdenadas) {
    if (termoDeBusca.includes(alias)) {
      melhorMatch = alias;
      break;
    }
  }
  if (melhorMatch) {
    nomeOficial = dicionarioDeSinonimos[melhorMatch];
  }

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
        if (nextLink) { url = nextLink.split(';')[0].replace('<', '').replace('>', '').trim(); }
      }
    }

    const categoriasMap = new Map(todasAsCategorias.map(c => [c.id, c]));
    
    const nomeNacionalBase = nomeOficial;
    const nomePremiumBase = `${nomeOficial} Premium`;
    const nomeBuscaPremium = nomeOficial.toLowerCase().includes('premium') ? nomeOficial : nomePremiumBase;

    const candidatos = todasAsCategorias.filter(c => 
      c.name.pt.trim().toLowerCase() === nomeNacionalBase.toLowerCase() || 
      c.name.pt.trim().toLowerCase() === nomeBuscaPremium.toLowerCase()
    );
    
    const categoriaNacional = candidatos.find(c => c.name.pt.trim().toLowerCase() === nomeNacionalBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_NACIONAL, categoriasMap));
    const categoriaPremium = candidatos.find(c => c.name.pt.trim().toLowerCase() === nomeBuscaPremium.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_PREMIUM, categoriasMap));

    const resultado = {
      tipo_busca: 'modelo', // NOVO: informa o tipo de busca
      modelo_pesquisado: nomeOficial, // NOVO: informa o modelo que foi buscado
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

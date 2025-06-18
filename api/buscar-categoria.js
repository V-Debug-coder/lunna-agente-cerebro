// api/buscar-categoria.js 
const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

const dicionarioDeSinonimos = {
  // MAPEAMENTO ESPECIAL PARA INFORMAÇÕES DE REVENDA
  'revenda': 'INFO_REVENDA',
  'revendedor': 'INFO_REVENDA',
  'revender': 'INFO_REVENDA',
  'drop': 'INFO_REVENDA',
  'dropshipping': 'INFO_REVENDA',
  'drop shipping': 'INFO_REVENDA',

  
  // ========================================================
  // DICIONÁRIO DEFINITIVO (SEU GLOSSÁRIO + IA)
  // ========================================================

  // --- MARCAS ---
  'nike': 'NIKE', 'naiki': 'NIKE', 'naike': 'NIKE', 'nik': 'NIKE',
  'adidas': 'ADIDAS', 'adida': 'ADIDAS', 'addidas': 'ADIDAS', 'adidasd': 'ADIDAS',
  'puma': 'PUMA', 'pumba': 'PUMA', 'pum': 'PUMA',
  'all star': 'ALL STAR', 'allstar': 'ALL STAR', 'al estar': 'ALL STAR', 'converce': 'ALL STAR', 'converse': 'ALL STAR', 'all star converse': 'ALL STAR', 'au star': 'ALL STAR', 'austar': 'ALL STAR',
  'mizuno': 'MIZUNO', 'misuno': 'MIZUNO', 'mizunu': 'MIZUNO', 'misunu': 'MIZUNO', 'mizino': 'MIZUNO',
  'new balance': 'NEW BALANCE', '9060': 'NEW BALANCE PREMIUM', '530': 'NEW BALANCE PREMIUM', '720': 'NEW BALANCE PREMIUM', 'novo balanço': 'NEW BALANCE', 'nil balance': 'NEW BALANCE', 'nb': 'NEW BALANCE', 'newbalanci': 'NEW BALANCE',
  'vert': 'VERT', 'veja': 'VERT', 'verti': 'VERT', 'verte': 'VERT', 'verty': 'VERT', 'tenis veja': 'VERT',
  'tesla': 'TESLA PREMIUM', 'tezla': 'TESLA PREMIUM',
  'louis vuitton': 'LOUIS VUITTON', 'louis viton': 'LOUIS VUITTON', 'lv': 'LOUIS VUITTON', 'vitton': 'LOUIS VUITTON', 'vuitton': 'LOUIS VUITTON',

  // --- MODELOS NIKE ---
  'air force': 'AIR FORCE', 'force': 'AIR FORCE', 'air': 'AIR FORCE', 'ar force': 'AIR FORCE', 'ai foice': 'AIR FORCE', 'aiforce': 'AIR FORCE', 'airforci': 'AIR FORCE', 'er forci': 'AIR FORCE', 'air force 1': 'AIR FORCE', 'nike air force 1': 'AIR FORCE', 'nike air force': 'AIR FORCE', 'af1': 'AIR FORCE', 'air foise': 'AIR FORCE', 'air foisse': 'AIR FORCE', 'forci': 'AIR FORCE', 'foice': 'AIR FORCE',
  'dunk': 'DUNK LOW', 'dunk low': 'DUNK LOW', 'duk': 'DUNK LOW', 'dank': 'DUNK LOW', 'dunke': 'DUNK LOW', 'danki': 'DUNK LOW', 'dunk l': 'DUNK LOW', 'dunk lou': 'DUNK LOW', 'dank low': 'DUNK LOW', 'nike dunk': 'DUNK LOW', 'nike dunk low': 'DUNK LOW','nike dunk low twist': 'DUNK LOW', 'nike dunk twist': 'DUNK LOW', 'dunk twist': 'DUNK LOW', 'twist': 'DUNK LOW', 'dunk tuist': 'DUNK LOW', 'nike dunk tuist': 'DUNK LOW', 'tuist': 'DUNK LOW'
  'air max tn': 'AIR MAX TN', 'tn': 'AIR MAX TN', 'tn air': 'AIR MAX TN', 'tn plus': 'AIR MAX TN', 'tuned': 'AIR MAX TN', 'airmax tn': 'AIR MAX TN', 'er max tn': 'AIR MAX TN', 'nike tn': 'AIR MAX TN',
  'air max 90': 'AIR MAX 90', 'max 90': 'AIR MAX 90', 'airmax 90': 'AIR MAX 90', 'er max 90': 'AIR MAX 90', 'am90': 'AIR MAX 90', 'ar max 90': 'AIR MAX 90', 'ar mex 90': 'AIR MAX 90', 'air mex 90': 'AIR MAX 90', 'air max bolha': 'AIR MAX 90',
  'air max 95': 'AIR MAX 95', 'max 95': 'AIR MAX 95', 'airmax 95': 'AIR MAX 95', 'er max 95': 'AIR MAX 95', 'am95': 'AIR MAX 95', 'ar max 95': 'AIR MAX 95', 'ar mex 95': 'AIR MAX 95', 'air mex 95': 'AIR MAX 95',
  'air max 97': 'AIR MAX 97', 'max 97': 'AIR MAX 97', 'airmax 97': 'AIR MAX 97', 'er max 97': 'AIR MAX 97', 'am97': 'AIR MAX 97', 'ar max 97': 'AIR MAX 97', 'ar mex 97': 'AIR MAX 97', 'air mex 97': 'AIR MAX 97',
  'nike sb': 'NIKE SB', 'sb': 'NIKE SB', 'dunk sb': 'NIKE SB', 'janoski': 'NIKE SB', 'tenis sb': 'NIKE SB', 'nike janoski': 'NIKE SB',

  // --- Modelos Premium NIKE ---
  'air force premium': 'AIR FORCE PREMIUM', 'force premium': 'AIR FORCE PREMIUM', 'af1 premium': 'AIR FORCE PREMIUM',
  'dunk low premium': 'DUNK LOW PREMIUM', 'dunk premium': 'DUNK LOW PREMIUM',
  'air max 90 excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'max excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'excee premium': 'AIR MAX 90 EXCEE PREMIUM', 'excee': 'AIR MAX 90 EXCEE PREMIUM', 'air max 90 excee': 'AIR MAX 90 EXCEE PREMIUM',
  'air jordan premium': 'AIR JORDAN PREMIUM', 'jordan premium': 'AIR JORDAN PREMIUM', 'jordan': 'AIR JORDAN PREMIUM', 'air jordan': 'AIR JORDAN PREMIUM',
  'air jordan low premium': 'AIR JORDAN LOW PREMIUM', 'jordan low premium': 'AIR JORDAN LOW PREMIUM', 'ar jordan lou': 'AIR JORDAN LOW PREMIUM',
  'air jordan 1 premium': 'AIR JORDAN 1 PREMIUM', 'jordan 1 premium': 'AIR JORDAN 1 PREMIUM', 'jordan 1': 'AIR JORDAN 1 PREMIUM', 'jordao 1': 'AIR JORDAN 1 PREMIUM', 'jordana 1': 'AIR JORDAN 1 PREMIUM',
  'air jordan 4 premium': 'AIR JORDAN 4 PREMIUM', 'jordan 4 premium': 'AIR JORDAN 4 PREMIUM', 'jordan 4': 'AIR JORDAN 4 PREMIUM', 'ar jordan 4': 'AIR JORDAN 4 PREMIUM', 'jordam 4': 'AIR JORDAN 4 PREMIUM', 'jorda 4': 'AIR JORDAN 4 PREMIUM',
  'air jordan 5 premium': 'AIR JORDAN 5 PREMIUM', 'jordan 5 premium': 'AIR JORDAN 5 PREMIUM', 'jordan 5': 'AIR JORDAN 5 PREMIUM', 'jordana 5': 'AIR JORDAN 5 PREMIUM',
  'air jordan 6 premium': 'AIR JORDAN 6 PREMIUM', 'jordan 6 premium': 'AIR JORDAN 6 PREMIUM', 'jordan 6': 'AIR JORDAN 6 PREMIUM', 'air jordana 6': 'AIR JORDAN 6 PREMIUM',

  // --- MODELOS ADIDAS ---
  'ultra boost': 'ULTRA BOOST', 'ultra bost': 'ULTRA BOOST', 'ultrabost': 'ULTRA BOOST', 'boost': 'ULTRA BOOST',
  'slip on': 'SLIP ON', 'eslip on': 'SLIP ON', 'slipon': 'SLIP ON', 'adidas slip on': 'SLIP ON',
  'nmd': 'NMD', 'adidas nmd': 'NMD', 'nomad': 'NMD',
  'superstar': 'SUPERSTAR', 'supertar': 'SUPERSTAR', 'super star': 'SUPERSTAR', 'adidas superstar': 'SUPERSTAR',
  'adidas forum premium': 'ADIDAS FORUM PREMIUM', 'forum premium': 'ADIDAS FORUM PREMIUM', 'forum': 'ADIDAS FORUM PREMIUM', 'forun': 'ADIDAS FORUM PREMIUM', 'forom': 'ADIDAS FORUM PREMIUM',
  'samba premium': 'SAMBA PREMIUM', 'samba': 'SAMBA PREMIUM', 'zamba': 'SAMBA PREMIUM', 'adidas samba': 'SAMBA PREMIUM',
  'yeezy boost premium': 'YEEZY BOOST PREMIUM', 'yeezy premium': 'YEEZY BOOST PREMIUM', 'yeezy': 'YEEZY BOOST PREMIUM', 'yezzy': 'YEEZY BOOST PREMIUM',
  'adidas campus premium': 'ADIDAS CAMPUS PREMIUM', 'campus premium': 'ADIDAS CAMPUS PREMIUM', 'campus': 'ADIDAS CAMPUS PREMIUM','campos': 'ADIDAS CAMPUS PREMIUM', 'canpus': 'ADIDAS CAMPUS PREMIUM', 'campos': 'ADIDAS CAMPUS PREMIUM',
  'adi 2000 premium': 'ADI 2000 PREMIUM', 'adi2000 premium': 'ADI 2000 PREMIUM', 'adidas 2000 premium': 'ADI 2000 PREMIUM', 'adi2000': 'ADI 2000 PREMIUM',

  // --- MODELOS GERAIS E ATRIBUTOS ---
  'bota': 'BOTA', 'botinha': 'BOTA', 'cano alto': 'BOTA', 'all star bota': 'BOTA',
  'couro': 'COURO', 'sintetico': 'COURO', 'all star couro': 'COURO',
  'lona': 'LONA', 'tecido': 'LONA', 'all star lona': 'LONA',
  'plataforma': 'PLATAFORMA', 'all star plataforma': 'PLATAFORMA',
  'new balance premium': 'NEW BALANCE PREMIUM', 'nb premium': 'NEW BALANCE PREMIUM',
  'puma premium': 'PUMA PREMIUM',
  'vert premium': 'VERT PREMIUM', 'veja premium': 'VERT PREMIUM', 'verti premium': 'VERT PREMIUM',
  'contender': 'Contender', 'comtender': 'Contender', 'countender': 'Contender',
  'dunk twist': 'Dunk Twist', 'twist': 'Dunk Twist', 'tuist': 'Dunk Twist',
  'fenty': 'Fenty', 'fenti': 'Fenty', 'fente': 'Fenty',
  'chaveirinho': 'Chaveirinho', 'chaveiro': 'Chaveirinho',
  'holográfico': 'Holográfico', 'holografico': 'Holográfico', 'holo': 'Holográfico', 'holografic': 'Holográfico', 'refletivo': 'Holográfico',
  'shadow': 'Shadow', 'shadol': 'Shadow', 'xadol': 'Shadow', 'xadow': 'Shadow', 'shado': 'Shadow',
  'stitch': 'Stitch', 'estitchi': 'Stitch', 'stithi': 'Stitch', 'estiti': 'Stitch',
  'invictus 3': 'Invictus 3', 'inviquitus 3': 'Invictus 3', 'invictus': 'Invictus 3',
  'knu skool': 'Knu Skool', 'quinu skool': 'Knu Skool', 'vans knu': 'Knu Skool', 'knu skol': 'Knu Skool', 'knu skul': 'Knu Skool', 'skool knu': 'Knu Skool', 'vans quinu': 'Knu Skool',
  'old skool': 'Old Skool', 'vans old': 'Old Skool', 'vans tradicional': 'Old Skool', 'vans classico': 'Old Skool',
  'old skool bota': 'Old Skool Bota', 'vans botinha': 'Old Skool Bota', 'vans cano alto': 'Old Skool Bota', 'vans bota': 'Old Skool Bota',
  'prophecy 8': 'Prophecy 8', 'profecy 8': 'Prophecy 8', 'profeci 8': 'Prophecy 8', 'propecy 8': 'Prophecy 8', 'mizuno prophecy 8': 'Prophecy 8', 'mizuno profici 8': 'Prophecy 8',
  'rider b': 'Rider B', 'raider b': 'Rider B', 'raider': 'Rider B', 'rider': 'Rider B',
  'puma suede': 'Suede', 'suedi': 'Suede', 'suede': 'Suede',
  'ultra ranger': 'Ultra Ranger', 'ultra range': 'Ultra Ranger', 'ranger': 'Ultra Ranger', 'ultra rang': 'Ultra Ranger',

  // --- ROUPAS E ACESSÓRIOS ---
  'bobojaco': 'Bobojaco', 'jaqueta': 'Bobojaco', 'corta vento': 'Bobojaco',
  'bag': 'Bag', 'mochila pequena': 'Bag', 'mochila pequena transversal': 'Bag', 'mochila transversal': 'Bag',
  'meia cano alto': 'Meia Cano Alto', 'meia cumprida': 'Meia Cano Alto', 'meia comprida': 'Meia Cano Alto', 'meia media': 'Meia Cano Alto', 'meia alta': 'Meia Cano Alto', 'meia': 'Meia Cano Alto',
  'boné': 'Boné',
  'bermuda': 'Bermuda',
  'calça cargo': 'Calça Cargo',
  'camiseta': 'Camiseta',
};

// TEXTO COMPLETO SOBRE REVENDA
const textoDeRevenda = "Olá, futuro(a) revendedor(a)! Ficamos felizes em ter você aqui.\n\nA Tenis Mogi desenvolveu a maior plataforma de revenda do mercado. Você vai poder revender nossos pares a partir de R$70,00, sem ter quantidade mínima para adquirir. 🔥\n\nVocê irá montar a sua loja e adquirir os pares, seja no formato atacado ou dropshipping, em um site exclusivamente para revendedores. Você fará seus pedidos e enviaremos direto para o seu cliente ou para você. Também temos a opção de retirada em nossas lojas no centro de Mogi das Cruzes ou Suzano. 🔥\n\nVocê irá pagar uma taxa ANUAL de apenas R$180,00 e ter acesso à nossa plataforma de revenda! E de brinde, fizemos um minicurso que vai te ensinar todas as nossas melhores estratégias para começar a vender do zero na internet.🔥\n\nVenha já fazer parte dessa equipe! ☺️\n**PIX para inscrição:** 53.743.015/0001-06 (LWC CALÇADOS LTDA)\n\nApós o pagamento, por favor, nos envie o comprovante do PIX junto com seus dados para cadastro:\n- NOME COMPLETO\n- CPF\n- ENDEREÇO\n- NOME DA SUA LOJA\n- E-MAIL VÁLIDO\n- WHATSAPP";

// ========================================================================
// PARTE 2: FUNÇÕES AUXILIARES
// ========================================================================

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

// ========================================================================
// PARTE 3: FUNÇÃO PRINCIPAL (HANDLER)
// ========================================================================
export default async function handler(request, response) {
  const modeloDoUsuario = (request.query.modelo || '').toLowerCase();
  if (!modeloDoUsuario) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  const nomeOficial = dicionarioDeSinonimos[modeloDoUsuario] || modeloDoUsuario;

  // LÓGICA DO "CAVALO DE TROIA" PARA REVENDA
  if (nomeOficial === 'INFO_REVENDA') {
    return response.status(200).json({
      is_special_info: true,
      title: "Seja um Revendedor Tênis Mogi!",
      content: textoDeRevenda
    });
  }

  // SE NÃO FOR REVENDA, CONTINUA COM A BUSCA NORMAL DE PRODUTOS
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
      c.name.pt.trim().toLowerCase() === nomeNacionalBase.toLowerCase() || 
      c.name.pt.trim().toLowerCase() === nomeBuscaPremium.toLowerCase()
    );
    
    const categoriaNacional = candidatos.find(c => c.name.pt.trim().toLowerCase() === nomeNacionalBase.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_NACIONAL, categoriasMap));
    const categoriaPremium = candidatos.find(c => c.name.pt.trim().toLowerCase() === nomeBuscaPremium.toLowerCase() && isDescendenteDe(c.id, ID_CATEGORIA_PREMIUM, categoriasMap));

    const resultado = {
      nacional_disponivel: !!categoriaNacional,
      nacional_url: categoriaNacional ? construirUrl(categoriaNacional.id, categoriasMap) : null,
      premium_disponivel: !!categoriaPremium,
      premium_url: categoriaPremium ? construirUrl(categoriaPremium.id, categoriasMap) : null,
      is_special_info: false // Adicionando a flag para indicar que não é uma info especial
    };

    return response.status(200).json(resultado);

  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.', details: error.message });
  }
}

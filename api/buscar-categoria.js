// api/buscar-categoria.js - VERSÃO DE PRODUÇÃO FINAL E CORRIGIDA

const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

const dicionarioDeSinonimos = {
  // ADI2000
  'adi2000': 'ADI2000', 'adidas 2000': 'ADI2000', 'tenis 2000': 'ADI2000',
  // ADVERSARY
  'adversary': 'Adversary', 'adiversari': 'Adversary', 'adversari': 'Adversary', 'adverssary': 'Adversary',
  // AIR FORCE
  'air force': 'Air Force', 'air': 'Air Force', 'ar force': 'Air Force', 'ai foice': 'Air Force', 'air foise': 'Air Force', 'air foisse': 'Air Force', 'ar foice': 'Air Force', 'force': 'Air Force', 'foice': 'Air Force', 'forci': 'Air Force',
  // AIR FORCE PREMIUM
  'air force premium': 'Air Force Premium',
  // AIR FORCE STUSSY
  'air force stussy': 'Air Force Stussy', 'estussy': 'Air Force Stussy', 'stusy': 'Air Force Stussy', 'stusi': 'Air Force Stussy', 'estusi': 'Air Force Stussy', 'istussy': 'Air Force Stussy',
  // AIR FORCE GAMMA
  'air force gamma': 'Air Force Gamma', 'gama': 'Air Force Gamma', 'gaama': 'Air Force Gamma',
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
  // DUNK
  'dunk': 'Dunk Low', 'duk': 'Dunk Low', 'dank': 'Dunk Low', 'dunke': 'Dunk Low', 'danke': 'Dunk Low', 'dunk low': 'Dunk Low', 'dunke low': 'Dunk Low', 'danke low': 'Dunk Low', 'dank low': 'Dunk Low', 'dunk lou': 'Dunk Low',
  // DUNK LOW PREMIUM
  'dunk low premium': 'Dunk Low Premium',
  // NIKE
  'nike': 'Nike',
  'mizuno': 'Mizuno',
  // ... adicione outros que precisar
};

// ========================================================================
// FUNÇÕES AUXILIARES COM LÓGICA CORRIGIDA E ROBUSTA
// ========================================================================
function isDescendenteDe(categoriaId, categoriaPaiId, todasAsCategoriasMap) {
  let currentCategory = todasAsCategoriasMap.get(categoriaId);
  const visitados = new Set();

  while (currentCategory) {
    if (visitados.has(currentCategory.id)) return false; // Evita loop infinito
    visitados.add(currentCategory.id);
    
    // Verifica se a categoria atual é a própria categoria pai ou se o pai dela é a categoria que buscamos
    if (currentCategory.id === categoriaPaiId || currentCategory.parent === categoriaPaiId) {
      return true;
    }
    
    // Se chegou na raiz e não encontrou, não é descendente
    if (!currentCategory.parent || currentCategory.parent === 0) {
      return false;
    }
    
    // Sobe um nível na árvore para a próxima iteração
    currentCategory = todasAsCategoriasMap.get(currentCategory.parent);
  }
  return false;
}

function construirUrl(categoriaId, todasAsCategoriasMap) {
  let categoriaAtual = todasAsCategoriasMap.get(categoriaId);
  const pathParts = [];
  const visitados = new Set();
  
  while (categoriaAtual) {
    if (visitados.has(categoriaAtual.id)) break; // Evita loop infinito
    visitados.add(categoriaAtual.id);
    
    // Adiciona o handle da categoria atual no início do caminho
    if (categoriaAtual.handle && categoriaAtual.handle.pt) {
      pathParts.unshift(categoriaAtual.handle.pt);
    }

    // Se não houver mais pai, para o loop
    if (!categoriaAtual.parent || categoriaAtual.parent === 0) {
      break;
    }
    
    // Sobe para o pai
    categoriaAtual = todasAsCategoriasMap.get(categoriaAtual.parent);
  }
  return `https://www.tenismogi.com/${pathParts.join('/')}`;
}
// ========================================================================

export default async function handler(request, response) {
  const modeloDoUsuario = (request.query.modelo || '').toLowerCase();
  if (!modeloDoUsuario) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  const nomeOficial = dicionarioDeSinonimos[modeloDoUsuario] || modeloDoUsuario;

  try {
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': 'bearer 972ade7aae8a494d58d2dbc868f5a6e26ee0a4472',
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
      }
    });
    
    if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
    }

    const todasAsCategorias = await nuvemShopResponse.json();
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

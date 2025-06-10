// api/buscar-categoria.js

// IDs DAS SUAS CATEGORIAS PRINCIPAIS (PAI DE TODAS)
const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

// DICIONÁRIO COMPLETO E CORRIGIDO DE SINÔNIMOS E APELIDOS
const dicionarioDeSinonimos = {
  // CORREÇÕES FEITAS AQUI COM BASE NA SUA PESQUISA
  'dunk': 'Dunk Low',
  'duk': 'Dunk Low',
  'dank': 'Dunk Low',
  'dunke': 'Dunk Low',
  'danke': 'Dunk Low',
  'dunk low': 'Dunk Low',
  'dunke low': 'Dunk Low',
  'danke low': 'Dunk Low',
  'dank low': 'Dunk Low',
  'dunk lou': 'Dunk Low',
  'force': 'Air Force',
  'air force': 'Air Force',
  'air': 'Air Force',
  'ar force': 'Air Force',
  'ai foice': 'Air Force',
  'air foise': 'Air Force',
  'air foisse': 'Air Force',
  'ar foice': 'Air Force',
  'air force premium': 'Air Force Premium', // Adicionando o nome premium para referência
  'dunk low premium': 'Dunk Low Premium',
  // O RESTANTE DO SEU DICIONÁRIO...
  'tn': 'TN Air',
  'air max tn': 'TN Air',
  'tn plus': 'TN Air 2',
  'tn air 2': 'TN Air 2',
  'adi2000': 'ADI2000',
  'adidas 2000': 'ADI2000',
  // etc... (copie e cole o resto do seu dicionário gigante aqui)
};

// FUNÇÃO AUXILIAR PARA VERIFICAR A "LINHAGEM" DA CATEGORIA
function isDescendenteDe(categoriaId, categoriaPaiId, todasAsCategoriasMap) {
  let categoriaAtual = todasAsCategoriasMap.get(categoriaId);
  if (!categoriaAtual) return false;

  let visitados = new Set();
  while (categoriaAtual) {
    if (visitados.has(categoriaAtual.id)) return false; 
    visitados.add(categoriaAtual.id);

    if (categoriaAtual.id === categoriaPaiId) return true; // A própria categoria pai é uma descendente de si mesma
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

  const nomeOficial = dicionarioDeSinonimos[modeloDoUsuario] || request.query.modelo;

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
      while (categoriaAtual && categoriaAtual.parent !== 0) { // Não incluir a raiz no path
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
    const nomePremiumBase = dicionarioDeSinonimos[`${modeloDoUsuario} premium`] || `${nomeOficial} Premium`;

    const candidatosNacional = todasAsCategorias.filter(c => c.name.pt.toLowerCase() === nomeNacionalBase.toLowerCase());
    const candidatosPremium = todasAsCategorias.filter(c => c.name.pt.toLowerCase() === nomePremiumBase.toLowerCase());

    const categoriaNacional = candidatosNacional.find(c => isDescendenteDe(c.id, ID_CATEGORIA_NACIONAL, categoriasMap));
    const categoriaPremium = candidatosPremium.find(c => isDescendenteDe(c.id, ID_CATEGORIA_PREMIUM, categoriasMap));

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

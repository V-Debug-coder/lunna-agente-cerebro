// CÓDIGO TEMPORÁRIO DE DEBUG - INSPETOR DE LÓGICA

const ID_CATEGORIA_NACIONAL = 8155362;
const ID_CATEGORIA_PREMIUM = 14215331;

const dicionarioDeSinonimos = {
  // Apenas o necessário para o teste
  'dunk': 'Dunk Low',
  'dunk low': 'Dunk Low',
};

// Função de inspeção que retorna o caminho percorrido
function inspecionarLinhagem(categoriaId, todasAsCategoriasMap) {
  let categoriaAtual = todasAsCategoriasMap.get(categoriaId);
  const caminhoEncontrado = [];
  const visitados = new Set();

  while (categoriaAtual) {
    if (visitados.has(categoriaAtual.id)) {
      caminhoEncontrado.push({ nome: "LOOP INFINITO DETECTADO", id: categoriaAtual.id });
      break;
    }
    visitados.add(categoriaAtual.id);

    caminhoEncontrado.push({
      nome: categoriaAtual.name ? categoriaAtual.name.pt : "NOME NÃO ENCONTRADO",
      id: categoriaAtual.id,
      parent_id: categoriaAtual.parent || 0
    });

    if (!categoriaAtual.parent || categoriaAtual.parent === 0) {
      break;
    }
    
    categoriaAtual = todasAsCategoriasMap.get(categoriaAtual.parent);
  }
  return caminhoEncontrado;
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
        'Authentication': `bearer ${process.env.NUVEMSHOP_API_TOKEN}`,
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
      }
    });
    
    if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
    }

    const todasAsCategorias = await nuvemShopResponse.json();
    const categoriasMap = new Map(todasAsCategorias.map(c => [c.id, c]));
    
    const nomePremiumBase = `${nomeOficial} Premium`;
    const candidatoPremium = todasAsCategorias.find(c => c.name.pt.toLowerCase() === nomePremiumBase.toLowerCase());

    if (!candidatoPremium) {
      return response.status(404).json({
        error: "Não foi possível encontrar a categoria pelo nome.",
        nome_procurado: nomePremiumBase
      });
    }

    const linhagem = inspecionarLinhagem(candidatoPremium.id, categoriasMap);

    const resultado = {
      diagnostico_para: nomePremiumBase,
      id_encontrado: candidatoPremium.id,
      parent_id_imediato: candidatoPremium.parent,
      linhagem_encontrada_ate_a_raiz: linhagem,
      id_da_categoria_premium_que_buscamos: ID_CATEGORIA_PREMIUM
    };

    return response.status(200).json(resultado);

  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.', details: error.message });
  }
}

// CÓDIGO TEMPORÁRIO DE DEBUG - TESTE DE CONEXÃO

export default async function handler(request, response) {
  try {
    // 1. Tenta se conectar à API da Nuvemshop com suas credenciais
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': 'bearer 972ade7aae8a494d58d2dbc868f5a6e26ee0a4472',
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)'
      }
    });
    
    // Se a conexão falhar (ex: token errado), joga um erro
    if (!nuvemShopResponse.ok) {
        throw new Error(`Nuvemshop API respondeu com status: ${nuvemShopResponse.status}`);
    }

    // Se a conexão funcionar, pega os dados
    const todasAsCategorias = await nuvemShopResponse.json();

    // 2. Retorna uma mensagem de sucesso com o número total de categorias encontradas
    return response.status(200).json({
      status_conexao: "SUCESSO",
      total_de_categorias_recebidas: todasAsCategorias.length
    });

  } catch (error) {
    // 3. Se qualquer passo acima falhar, retorna uma mensagem de erro detalhada
    return response.status(500).json({ 
        status_conexao: "FALHA",
        error: 'A função quebrou ao tentar se comunicar com a Nuvemshop.', 
        details: error.message 
    });
  }
}

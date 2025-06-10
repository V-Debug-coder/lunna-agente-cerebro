// api/buscar-categoria.js

// Esta é a função principal que a Vercel vai executar
export default async function handler(request, response) {
  // 1. Pega o modelo do tênis que o agente enviou (ex: ?modelo=Dunk)
  const modelo = request.query.modelo || '';
  if (!modelo) {
    return response.status(400).json({ error: 'O parâmetro "modelo" é obrigatório.' });
  }

  try {
    // 2. Chama a API da Nuvemshop para pegar TODAS as categorias
    const nuvemShopResponse = await fetch('https://api.nuvemshop.com.br/v1/905119/categories', {
      headers: {
        'Authentication': 'bearer 972ade7aae8a494d58...', // COLOQUE SEU TOKEN AQUI
        'User-Agent': 'GenIA (marcos.sei.w@gmail.com)' // COLOQUE SEU USER AGENT AQUI
      }
    });
    const todasAsCategorias = await nuvemShopResponse.json();

    // 3. Função auxiliar para construir a URL (a lógica da "árvore")
    const construirUrl = (categoriaId, categorias) => {
      let categoriaAtual = categorias.find(c => c.id === categoriaId);
      if (!categoriaAtual) return null;

      let pathParts = [];
      while (categoriaAtual) {
        if (categoriaAtual.handle && categoriaAtual.handle.pt) {
          pathParts.unshift(categoriaAtual.handle.pt);
        }
        if (categoriaAtual.parent) {
          categoriaAtual = categorias.find(c => c.id === categoriaAtual.parent);
        } else {
          break;
        }
      }
      return `https://www.tenismogi.com/${pathParts.join('/')}`;
    };

    // 4. Busca pelas categorias Nacional e Premium
    //    Isso é um exemplo, ajuste os nomes se necessário (ex: "Dunk", "Dunk Premium")
    const nomeNacional = modelo;
    const nomePremium = `${modelo} Premium`;

    const categoriaNacional = todasAsCategorias.find(c => c.name.pt.toLowerCase() === nomeNacional.toLowerCase());
    const categoriaPremium = todasAsCategorias.find(c => c.name.pt.toLowerCase() === nomePremium.toLowerCase());

    // 5. Monta a resposta final e limpa para o agente
    const resultado = {
      nacional_disponivel: !!categoriaNacional,
      nacional_url: categoriaNacional ? construirUrl(categoriaNacional.id, todasAsCategorias) : null,
      premium_disponivel: !!categoriaPremium,
      premium_url: categoriaPremium ? construirUrl(categoriaPremium.id, todasAsCategorias) : null,
    };

    // 6. Envia a resposta perfeita para o Chatvolt
    return response.status(200).json(resultado);

  } catch (error) {
    return response.status(500).json({ error: 'Falha ao processar a solicitação.' });
  }
}
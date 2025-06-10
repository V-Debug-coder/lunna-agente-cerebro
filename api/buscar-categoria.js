// CÓDIGO TEMPORÁRIO DE DEBUG - MODO SUPER DETETIVE

const dicionarioDeSinonimos = {
  // Coloque seu dicionário completo aqui, exatamente como estava antes
  'dunk': 'Dunk Low',
  'force': 'Air Force',
  // etc...
};

export default async function handler(request, response) {
  // Pega o que o usuário digitou e passa para minúsculas
  const modeloDoUsuario = (request.query.modelo || '').toLowerCase();
  
  // Tenta "traduzir" usando o dicionário. Se não achar, usa o que o usuário digitou.
  const nomeOficial = dicionarioDeSinonimos[modeloDoUsuario] || modeloDoUsuario;

  // Prepara os nomes finais para a busca
  const nomeNacionalBase = nomeOficial;
  const nomePremiumBase = `${nomeOficial} Premium`;

  // Retorna para nós exatamente o que o código está "pensando"
  return response.status(200).json({
    voce_digitou_na_url: request.query.modelo,
    o_codigo_entendeu_em_minusculas: modeloDoUsuario,
    nome_oficial_traduzido_pelo_dicionario: nomeOficial,
    busca_que_seria_feita_pelo_nacional: nomeNacionalBase,
    busca_que_seria_feita_pelo_premium: nomePremiumBase
  });
}

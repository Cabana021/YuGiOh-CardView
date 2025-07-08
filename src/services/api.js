import axios from 'axios';

// Cria uma instância do axios com a URL base da API.
// Isso evita que tenhamos que repetir a URL em todas as chamadas.
const api = axios.create({
  baseURL: 'https://db.ygoprodeck.com/api/v7/'
});

// Constante para definir o número de cartas por página.
// Mudar este valor é a única coisa necessária para alterar a paginação em todo o site.
const CARDS_PER_PAGE = 30;

/**
 * A ÚNICA FUNÇÃO MESTRE PARA BUSCAR LISTAS DE CARTAS.
 * Ela recebe um objeto 'query' que descreve tudo o que queremos.
 * @param {object} query - Contém a página, o termo de busca e/ou os filtros.
 * @returns {object} - Um objeto contendo a lista de cartas e a metainformação da paginação.
 */
export const fetchCards = async (query) => {
  const { page = 1, searchTerm, filters } = query;
  const offset = (page - 1) * CARDS_PER_PAGE;
  
  // URLSearchParams é uma forma segura e robusta de construir os parâmetros da URL.
  const queryParams = new URLSearchParams();
  
  // Adiciona os parâmetros de paginação a TODAS as requisições.
  queryParams.append('num', CARDS_PER_PAGE);
  queryParams.append('offset', offset);
  
  // Adiciona o termo de busca, se ele existir.
  if (searchTerm) {
    queryParams.append('fname', searchTerm);
  }
  
  // Adiciona os filtros, se eles existirem.
  if (filters) {
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.attribute) queryParams.append('attribute', filters.attribute);
    if (filters.race) queryParams.append('race', filters.race);
  }

  const finalUrl = `cardinfo.php?${queryParams.toString()}`;

  try {
    const response = await api.get(finalUrl);
    // IMPORTANTE: Retornamos o objeto de dados completo da API.
    // Isso nos dá acesso tanto às cartas (`data`) quanto às informações de paginação (`meta`).
    return {
      cards: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    // Se a API retornar um erro (ex: nenhum resultado), garantimos que nosso app receba um formato consistente.
    if (error.response && error.response.status === 400) {
      return { cards: [], meta: null };
    }
    console.error("Erro na busca unificada:", error);
    return { cards: [], meta: null };
  }
};

/**
 * Busca os dados de uma ÚNICA carta pelo seu ID.
 * Esta função é separada porque tem um propósito muito específico e diferente.
 * @param {string} id - O ID da carta.
 * @returns {object|null} - O objeto da carta ou nulo em caso de erro.
 */
export const getCardById = async (id) => {
  try {
    const response = await api.get(`cardinfo.php?id=${id}`);
    return response.data.data[0]; 
  } catch (error) {
    console.error(`Erro ao buscar a carta com ID ${id}:`, error);
    return null;
  }
};
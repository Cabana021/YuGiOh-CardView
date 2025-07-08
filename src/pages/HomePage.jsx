import React, { useState, useEffect } from 'react';
import { fetchCards } from '../services/api'; 
import Card from '../components/Card';
import FilterModal from '../components/FilterModal';

function HomePage() {
  // --- ESTADOS ---
  const [cards, setCards] = useState([]); // Guarda a lista de cartas a ser exibida
  const [loading, setLoading] = useState(true); // Controla a exibição da mensagem "Carregando..."
  const [metaData, setMetaData] = useState(null); // Guarda a informação de paginação da API

  // O ESTADO UNIFICADO: a única "fonte da verdade" para qualquer busca de lista.
  // Descreve o estado atual da busca que o usuário deseja.
  const [query, setQuery] = useState({
    page: 1,
    searchTerm: '',
    filters: null,
  });

  // Estados locais que controlam apenas a UI, sem disparar buscas na API.
  const [localSearchTerm, setLocalSearchTerm] = useState(''); // Controla o texto do input
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Controla a visibilidade do modal

  // --- EFEITO ---
  // Este é o motor da página. Ele "assiste" o estado 'query'.
  // Sempre que 'query' muda (seja por mudança de página, busca ou filtro), ele roda novamente.
  useEffect(() => {
    const runQuery = async () => {
      setLoading(true);
      const { cards: results, meta } = await fetchCards(query);
      setCards(results || []); // Garante que 'cards' seja sempre um array
      setMetaData(meta);
      setLoading(false);
    };
    runQuery();
  }, [query]);

  // --- FUNÇÕES DE MANIPULAÇÃO DE EVENTOS ---
  // A filosofia aqui é que as funções de evento NÃO fazem a busca diretamente.
  // Elas apenas descrevem a MUDANÇA no estado 'query'. O useEffect fará o resto.
  const handleNextPage = () => {
    setQuery(prevQuery => ({ ...prevQuery, page: prevQuery.page + 1 }));
  };

  const handlePreviousPage = () => {
    if (query.page > 1) {
      setQuery(prevQuery => ({ ...prevQuery, page: prevQuery.page - 1 }));
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery({ page: 1, searchTerm: localSearchTerm, filters: null });
  };

  const handleApplyFilters = (filters) => {
    setQuery({ page: 1, searchTerm: '', filters: filters });
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    // Reseta a query para o seu estado inicial, o que acionará o useEffect para buscar a primeira página.
    setQuery({ page: 1, searchTerm: '', filters: null });
  };
  
  // Variável auxiliar para decidir se o botão "Limpar" deve aparecer.
  const hasActiveSearchOrFilter = query.searchTerm || query.filters;

  // --- RENDERIZAÇÃO ---
  return (
    <>
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-4">Galeria de Cartas Yu-Gi-Oh!</h1>
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 mb-8">
          <input type="text" value={localSearchTerm} onChange={(e) => setLocalSearchTerm(e.target.value)} placeholder="Digite o nome da carta..." className="w-full md:w-1/2 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
          <button type="submit" className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400">Buscar</button>
          <button type="button" onClick={() => setIsFilterModalOpen(true)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">Filtrar</button>
          {hasActiveSearchOrFilter && (<button type="button" onClick={handleClear} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-400">Limpar</button>)}
        </form>

        {loading ? (<h1 className="text-white text-4xl text-center mt-20">Carregando cartas...</h1>) : (
          <>
            {cards.length === 0 ? (<p className="text-center text-white text-2xl">Nenhuma carta encontrada.</p>) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {cards.map((card) => (<Card key={card.id} id={card.id} name={card.name} imageUrl={card.card_images[0].image_url_small}/>))}
              </div>
            )}
            
            {cards.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button onClick={handlePreviousPage} disabled={query.page === 1} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">Anterior</button>
                <span className="text-white text-xl font-bold">{query.page}</span>
                {/* O botão é desabilitado se não houver 'metaData' ou se a propriedade 'next_page' não existir nele. */}
                <button onClick={handleNextPage} disabled={!metaData || !metaData.next_page} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed">Próximo</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
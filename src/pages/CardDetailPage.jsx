import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardById } from '../services/api';

function CardDetailPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados da carta
    const fetchCardData = async () => {
      setLoading(true);
      const data = await getCardById(id);
      setCard(data);
      setLoading(false);
    };

    fetchCardData();
  }, [id]); // O useEffect será executado sempre que o 'id' na URL mudar

  // Renderiza uma mensagem de carregamento
  if (loading) {
    return <h1 className="text-white text-4xl text-center mt-20">Carregando detalhes...</h1>;
  }

  // Renderiza uma mensagem caso a carta não seja encontrada
  if (!card) {
    return <h1 className="text-white text-4xl text-center mt-20">Carta não encontrada.</h1>;
  }

  // Renderiza os detalhes da carta
  return (
    <div className="container mx-auto p-4 text-white">
      {/* Botão para voltar */}
      <Link to="/" className="text-yellow-400 hover:text-yellow-200 mb-8 inline-block">
        ← Voltar para a galeria
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagem da Carta */}
        <div className="md:w-1/3">
          <img 
            src={card.card_images[0].image_url} 
            alt={card.name} 
            className="rounded-lg w-full" 
          />
        </div>

        {/* Informações da Carta */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">{card.name}</h1>
          <p className="text-lg text-cyan-400 font-semibold mb-4">{card.type} / {card.race}</p>
          
          {/* Mostra ATK/DEF apenas se for um monstro */}
          {card.atk !== undefined && (
            <p className="text-xl mb-4">
              <span className="font-bold text-red-500">ATK / {card.atk}</span>
              <span className="mx-2">|</span>
              <span className="font-bold text-blue-500">DEF / {card.def}</span>
            </p>
          )}

          <h2 className="text-2xl font-bold mt-6 mb-2">Descrição:</h2>
          <p className="text-gray-300 whitespace-pre-line">{card.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default CardDetailPage;
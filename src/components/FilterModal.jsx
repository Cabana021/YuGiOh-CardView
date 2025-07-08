import React, { useState } from 'react';

// Manter essas listas de opções aqui dentro torna o componente independente.
// Ele não precisa buscar essas informações em nenhum outro lugar.
const cardTypes = ["Effect Monster", "Flip Effect Monster", "Fusion Monster", "Link Monster", "Normal Monster", "Pendulum Effect Monster", "Ritual Monster", "Spell Card", "Synchro Monster", "Token", "Trap Card", "Tuner Monster", "XYZ Monster"];
const attributes = ["DARK", "DIVINE", "EARTH", "FIRE", "LIGHT", "WATER", "WIND"];
const races = ["Aqua", "Beast", "Beast-Warrior", "Creator-God", "Cyberse", "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Psychic", "Pyro", "Reptile", "Rock", "Sea Serpent", "Spellcaster", "Thunder", "Warrior", "Winged Beast", "Wyrm", "Zombie"];

/**
 * Um componente de modal para selecionar filtros de cartas.
 * @param {object} props - As propriedades passadas pelo componente pai.
 * @param {boolean} props.isOpen - Controla se o modal está visível ou não.
 * @param {function} props.onClose - A função a ser chamada quando o usuário quer fechar o modal (clicando em Cancelar ou no fundo).
 * @param {function} props.onApplyFilters - A função a ser chamada quando o usuário clica em "Aplicar Filtros", enviando os filtros selecionados.
 */
function FilterModal({ isOpen, onClose, onApplyFilters }) {
  // evita que a HomePage seja re-renderizada a cada vez que o usuário muda uma opção no select.
  const [localFilters, setLocalFilters] = useState({ type: '', attribute: '', race: '' });

  // Se a prop 'isOpen' for falsa, o componente não renderiza nada (retorna null).
  if (!isOpen) {
    return null;
  }

  // função genérica que atualiza o estado 'localFilters' com base na seleção do usuário.
  // Usa o atributo 'name' do <select> para saber qual chave do objeto de estado deve ser atualizada.
  const handleChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  // Função chamada quando o botão "Aplicar" é clicado.
  const handleApply = () => {
    // 1. Chama a função do componente pai, passando o "rascunho" final dos filtros.
    onApplyFilters(localFilters);
    // 2. Chama a função do componente pai para fechar o modal.
    onClose();
  };

  // --- RENDERIZAÇÃO DO JSX ---
  return (
    // O Overlay: um div que cobre a tela inteira com um fundo semi-transparente.
    // Clicar aqui também poderia fechar o modal adicionando `onClick={onClose}`.
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      
      {/* O Container do Modal: a caixa de diálogo principal. */}
      {/* `e.stopPropagation()` impede que um clique dentro do modal "vaze" para o overlay e feche o modal acidentalmente. */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl text-yellow-400 font-bold mb-4">Filtrar Cartas</h2>
        
        {/* Bloco do Seletor de Tipo */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-white mb-1">Tipo de Carta</label>
          <select name="type" id="type" value={localFilters.type} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400">
            <option value="">Qualquer Tipo</option>
            {/* Mapeia o array 'cardTypes' para criar uma <option> para cada tipo. */}
            {cardTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        {/* Bloco do Seletor de Atributo */}
        <div className="mb-4">
          <label htmlFor="attribute" className="block text-white mb-1">Atributo</label>
          <select name="attribute" id="attribute" value={localFilters.attribute} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400">
            <option value="">Qualquer Atributo</option>
            {attributes.map(attr => <option key={attr} value={attr}>{attr}</option>)}
          </select>
        </div>

        {/* Bloco do Seletor de Raça */}
        <div className="mb-4">
          <label htmlFor="race" className="block text-white mb-1">Raça / Tipo (Monstro)</label>
          <select name="race" id="race" value={localFilters.race} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400">
            <option value="">Qualquer Raça</option>
            {races.map(race => <option key={race} value={race}>{race}</option>)}
          </select>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition-colors">
            Cancelar
          </button>
          <button onClick={handleApply} className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-400 transition-colors">
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
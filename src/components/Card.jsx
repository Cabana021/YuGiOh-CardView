import React from 'react';
import { Link } from 'react-router-dom'; 

function Card({ id, name, imageUrl }) {
  return (
    <Link to={`/card/${id}`}>
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 h-full">
        <img src={imageUrl} alt={name} className="w-full object-cover" />
        <div className="p-4">
          <h3 className="text-white text-lg font-bold truncate">{name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default Card;
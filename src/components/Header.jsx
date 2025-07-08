import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-yellow-400 transition-colors">
          Yu-Gi-Oh!
        </Link>
      </nav>
    </header>
  );
}

export default Header;
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 mt-auto py-4 text-center text-gray-400">
      <p>
        Desenvolvido por Victor Cabana. Dados fornecidos por{' '}
        <a 
          href="https://ygoprodeck.com/api-guide/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-yellow-400 hover:underline"
        >
          YGOProDeck API
        </a>.
      </p>
    </footer>
  );
}

export default Footer;
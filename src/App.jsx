import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import HomePage from './pages/HomePage';
import CardDetailPage from './pages/CardDetailPage';

function App() {
  return (
    // Essas classes garantem que o footer fique no final da página, mesmo com pouco conteúdo
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      
      {/* O conteúdo principal cresce para preencher o espaço */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card/:id" element={<CardDetailPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
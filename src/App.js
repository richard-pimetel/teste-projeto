import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroLivro from './pages/CadastroLivro';
import Dashboard from './pages/Dashboard';
import DebugLogger from './components/DebugLogger';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [showDebug, setShowDebug] = useState(true);

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  // Tecla de atalho para abrir/fechar debug (Ctrl+D)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        setShowDebug(!showDebug);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDebug]);

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onGoToCadastro={() => setCurrentPage('cadastro')} />;
      case 'cadastro':
        return <Cadastro onGoToLogin={() => setCurrentPage('login')} />;
      case 'cadastro-livro':
        return <CadastroLivro onCancel={() => setCurrentPage('dashboard')} onSave={(data) => { console.log('Livro cadastrado:', data); setCurrentPage('dashboard'); }} />;
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} onGoToCadastro={() => setCurrentPage('cadastro')} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <DebugLogger 
        show={showDebug} 
        onClose={() => setShowDebug(false)} 
      />
    </div>
  );
}

export default App;

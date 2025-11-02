import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroLivro from './pages/CadastroLivro';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('cadastro-livro');

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

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
    </div>
  );
}

export default App;

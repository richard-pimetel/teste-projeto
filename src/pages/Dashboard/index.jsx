import React, { useState } from 'react';
import './styles.css';
import LogoLionBook from '../../img/logoLionBook.png';
import IconDelete from '../../img/iconDelete.png';
import IconEdit from '../../img/iconDeEdicao.png';
import CadastroLivro from '../CadastroLivro';
import Estoque from '../Estoque';

function Dashboard({ onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'cadastro', 'estoque'
  const [livros, setLivros] = useState([
    { id: 120, titulo: 'A Volta ao Mundo em 80 Dias' },
    { id: 456, titulo: 'O velho e o menino' },
    { id: 987, titulo: 'As coisas que você só vê quando desacelera' },
    { id: 321, titulo: 'O Homem que Calculava' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({ id: '', titulo: '' });

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir este livro?')) {
      setLivros(livros.filter(livro => livro.id !== id));
    }
  };

  const handleEdit = (livro) => {
    setEditingBook(livro);
    setNewBook(livro);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentView('cadastro');
  };

  const handleEstoque = () => {
    setCurrentView('estoque');
  };

  const handleCadastroSave = (formData) => {
    const newId = Math.max(...livros.map(l => l.id), 0) + 1;
    setLivros([...livros, { id: newId, titulo: formData.titulo }]);
    setCurrentView('dashboard');
    alert('Livro cadastrado com sucesso!');
  };

  const handleEstoqueSave = (formData) => {
    setCurrentView('dashboard');
    alert(`Movimento de estoque registrado: ${formData.tipoMovimento} - ${formData.quantidade} unidades`);
  };

  const handleCancel = () => {
    setCurrentView('dashboard');
  };

  const handleSave = () => {
    if (!newBook.id || !newBook.titulo) {
      alert('Preencha todos os campos!');
      return;
    }

    if (editingBook) {
      setLivros(livros.map(livro => 
        livro.id === editingBook.id ? newBook : livro
      ));
    } else {
      setLivros([...livros, newBook]);
    }
    
    setShowModal(false);
    setNewBook({ id: '', titulo: '' });
  };

  // Renderizar tela de Cadastro
  if (currentView === 'cadastro') {
    return <CadastroLivro onCancel={handleCancel} onSave={handleCadastroSave} />;
  }

  // Renderizar tela de Estoque
  if (currentView === 'estoque') {
    return <Estoque onCancel={handleCancel} onSave={handleEstoqueSave} livros={livros} />;
  }

  // Renderizar Dashboard
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={LogoLionBook} alt="Logo" className="header-logo" />
            <h1>LionBook</h1>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="action-buttons">
          <button className="btn-action" onClick={handleAddNew}>NOVO LIVRO</button>
          <button className="btn-action" onClick={handleEstoque}>ESTOQUE</button>
        </div>

        <div className="table-wrapper">
          <table className="books-table">
            <thead>
              <tr>
                <th className="th-id">ID</th>
                <th className="th-titulo">TÍTULO</th>
                <th className="th-acao">AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro, index) => (
                <tr key={livro.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                  <td className="td-id">
                    <div className="id-box">{livro.id}</div>
                  </td>
                  <td className="td-titulo">{livro.titulo}</td>
                  <td className="td-acao">
                    <div className="action-icons">
                      <button 
                        className="icon-btn"
                        onClick={() => handleEdit(livro)}
                        title="Editar"
                      >
                        <img src={IconEdit} alt="Editar" className="icon" />
                      </button>
                      <button 
                        className="icon-btn"
                        onClick={() => handleDelete(livro.id)}
                        title="Excluir"
                      >
                        <img src={IconDelete} alt="Excluir" className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingBook ? 'Editar Livro' : 'Novo Livro'}</h2>
            <div className="modal-form">
              <input
                type="number"
                placeholder="ID"
                value={newBook.id}
                onChange={(e) => setNewBook({...newBook, id: parseInt(e.target.value)})}
                disabled={editingBook !== null}
              />
              <input
                type="text"
                placeholder="Título"
                value={newBook.titulo}
                onChange={(e) => setNewBook({...newBook, titulo: e.target.value})}
              />
              <div className="modal-buttons">
                <button className="btn-save" onClick={handleSave}>Salvar</button>
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

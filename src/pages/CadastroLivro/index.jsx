import React, { useState } from 'react';
import './styles.css';
import LogoLionBook from '../../img/logoLionBook.png';

function CadastroLivro({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    titulo: '',
    quantidade: '',
    isbn: '',
    dataPublicacao: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.quantidade || !formData.isbn || !formData.dataPublicacao) {
      alert('Preencha todos os campos!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={LogoLionBook} alt="Logo" className="header-logo" />
            <h1>LionBook - <span className="page-title">CADASTRO</span></h1>
          </div>
        </div>
      </header>

      <div className="cadastro-content">
        <div className="form-container">
          <div className="form-group">
            <input
              type="text"
              name="titulo"
              placeholder="TÍTULO"
              value={formData.titulo}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="quantidade"
              placeholder="QUANTIDADE"
              value={formData.quantidade}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="dataPublicacao"
              placeholder="DATA DE PUBLICAÇÃO"
              value={formData.dataPublicacao}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-buttons">
            <button className="btn-cadastrar" onClick={handleSubmit}>
              CADASTRAR
            </button>
            <button className="btn-cancelar" onClick={onCancel}>
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroLivro;

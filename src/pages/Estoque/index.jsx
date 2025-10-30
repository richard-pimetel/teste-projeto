import React, { useState } from 'react';
import './styles.css';
import LogoLionBook from '../../img/logoLionBook.png';

function Estoque({ onCancel, onSave, livros = [] }) {
  const [formData, setFormData] = useState({
    titulo: '',
    tipoMovimento: '',
    quantidade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.tipoMovimento || !formData.quantidade) {
      alert('Preencha todos os campos!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="estoque-container">
      <header className="estoque-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={LogoLionBook} alt="Logo" className="header-logo" />
            <h1>LionBook - <span className="page-title">ESTOQUE</span></h1>
          </div>
        </div>
      </header>

      <div className="estoque-content">
        <div className="form-container">
          <div className="form-group">
            <select
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>TÍTULO</option>
              {livros.map((livro) => (
                <option key={livro.id} value={livro.titulo}>
                  {livro.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              name="tipoMovimento"
              value={formData.tipoMovimento}
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>TIPO DE MOVIMENTO</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
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

          <div className="form-buttons">
            <button className="btn-salvar" onClick={handleSubmit}>
              SALVAR
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

export default Estoque;

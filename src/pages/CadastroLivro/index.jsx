import React, { useState } from 'react';
import './styles.css';
import { bookService } from '../../services/api';
import LogoLionBook from '../../img/logoLionBook.png';

function CadastroLivro({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    titulo: '',
    quantidade: '',
    isbn: '',
    dataPublicacao: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validações
    if (!formData.titulo || !formData.quantidade || !formData.isbn || !formData.dataPublicacao) {
      setError('Preencha todos os campos!');
      return;
    }
    
    if (parseInt(formData.quantidade) <= 0) {
      setError('A quantidade deve ser maior que zero');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const bookData = {
        titulo: formData.titulo,
        quantidade: parseInt(formData.quantidade),
        isbn: formData.isbn,
        dataPublicacao: formData.dataPublicacao
      };

      const response = await bookService.createBook(bookData);
      
      setSuccess('Livro cadastrado com sucesso!');
      
      // Limpar formulário
      setFormData({
        titulo: '',
        quantidade: '',
        isbn: '',
        dataPublicacao: ''
      });
      
      // Chamar callback se fornecido
      if (onSave) {
        onSave(response);
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="form-group">
            <input
              type="text"
              name="titulo"
              placeholder="TÍTULO"
              value={formData.titulo}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
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
              disabled={loading}
              min="1"
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
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="dataPublicacao"
              placeholder="DATA DE PUBLICAÇÃO"
              value={formData.dataPublicacao}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-buttons">
            <button className="btn-cadastrar" onClick={handleSubmit} disabled={loading}>
              {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
            </button>
            <button className="btn-cancelar" onClick={onCancel} disabled={loading}>
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroLivro;

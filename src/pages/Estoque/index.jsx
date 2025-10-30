import React, { useState, useEffect } from 'react';
import './styles.css';
import LogoLionBook from '../../img/logoLionBook.png';
import { movimentacoesService } from '../../services/movimentacoesService';
import { tiposMovimentacaoService } from '../../services/tiposMovimentacaoService';

function Estoque({ onCancel, onSave, livros = [] }) {
  const [formData, setFormData] = useState({
    livroId: '',
    tipoMovimentacaoId: '',
    quantidade: ''
  });
  const [tiposMovimentacao, setTiposMovimentacao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar tipos de movimentação ao montar o componente
  useEffect(() => {
    carregarTiposMovimentacao();
  }, []);

  const carregarTiposMovimentacao = async () => {
    try {
      const data = await tiposMovimentacaoService.listar();
      setTiposMovimentacao(data || []);
    } catch (error) {
      console.error('Erro ao carregar tipos de movimentação:', error);
      setError('Erro ao carregar tipos de movimentação');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.livroId || !formData.tipoMovimentacaoId || !formData.quantidade) {
      setError('Preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      await movimentacoesService.criar({
        livroId: parseInt(formData.livroId),
        tipoMovimentacaoId: parseInt(formData.tipoMovimentacaoId),
        quantidade: parseInt(formData.quantidade)
      });
      
      alert('Movimentação registrada com sucesso!');
      onSave(formData);
    } catch (err) {
      setError(err.message || 'Erro ao registrar movimentação');
    } finally {
      setLoading(false);
    }
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
          {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
          
          <div className="form-group">
            <select
              name="livroId"
              value={formData.livroId}
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>SELECIONE O LIVRO</option>
              {livros.map((livro) => (
                <option key={livro.id} value={livro.id}>
                  {livro.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              name="tipoMovimentacaoId"
              value={formData.tipoMovimentacaoId}
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>TIPO DE MOVIMENTAÇÃO</option>
              {tiposMovimentacao.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome || tipo.descricao}
                </option>
              ))}
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
            <button className="btn-salvar" onClick={handleSubmit} disabled={loading}>
              {loading ? 'SALVANDO...' : 'SALVAR'}
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

export default Estoque;

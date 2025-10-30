import React, { useState } from 'react';
import './styles.css';
import Ellipse1 from '../../img/Ellipse1.png';
import Ellipse2 from '../../img/Ellipse2.png';
import Ellipse3 from '../../img/Ellipse3.png';
import OndaLateral from '../../img/ondaLateral.png';
import LogoLogin from '../../img/LogoDaLogin.png';
import IconUser from '../../img/iconDeUser.png';
import { usuariosService } from '../../services/usuariosService';

function Cadastro({ onGoToLogin }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      await usuariosService.criar({
        nome: formData.nome,
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      
      alert('Cadastro realizado com sucesso!');
      onGoToLogin();
    } catch (err) {
      setError(err.message || 'Erro ao criar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="background-ellipse ellipse-1">
        <img src={Ellipse1} alt="" />
      </div>
      <div className="background-ellipse ellipse-2">
        <img src={Ellipse2} alt="" />
      </div>
      <div className="background-ellipse ellipse-3">
        <img src={Ellipse3} alt="" />
      </div>
      <div className="background-wave">
        <img src={OndaLateral} alt="" />
      </div>
      
      <div className="cadastro-box">
        <div className="logo-container">
          <img src={LogoLogin} alt="Logo" className="logo" />
        </div>
        
        <h2>Criar Conta</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src={IconUser} alt="Nome" className="input-icon" />
            <input
              type="text"
              name="nome"
              placeholder="NOME COMPLETO"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <img src={IconUser} alt="Email" className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <img src={IconUser} alt="Username" className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <img src={IconUser} alt="Password" className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <img src={IconUser} alt="Confirm Password" className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRMAR PASSWORD"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
          
          <button type="submit" className="cadastro-button" disabled={loading}>
            {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
          </button>
          
          <div className="login-link">
            <p>Já tem conta? <span onClick={onGoToLogin}>Faça Login</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;

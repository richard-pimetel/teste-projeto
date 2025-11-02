import React, { useState } from 'react';
import './styles.css';
import { userService } from '../../services/api';
import Ellipse1 from '../../img/Ellipse1.png';
import Ellipse2 from '../../img/Ellipse2.png';
import Ellipse3 from '../../img/Ellipse3.png';
import OndaLateral from '../../img/ondaLateral.png';
import LogoLogin from '../../img/LogoDaLogin.png';
import IconUser from '../../img/iconDeUser.png';

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
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nome || !formData.email || !formData.username || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Validações de comprimento
    if (formData.nome.trim().length > 100) {
      setError('Nome deve ter no máximo 100 caracteres');
      return;
    }

    if (formData.email.trim().length > 100) {
      setError('Email deve ter no máximo 100 caracteres');
      return;
    }

    if (formData.username.trim().length > 50) {
      setError('Username deve ter no máximo 50 caracteres');
      return;
    }

    if (formData.password.length > 50) {
      setError('Senha deve ter no máximo 50 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const userData = {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        username: formData.username.trim(),
        password: formData.password
      };

      console.log('Dados do usuário a serem enviados:', userData);

      await userService.createUser(userData);
      
      setSuccess('Cadastro realizado com sucesso!');
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        onGoToLogin();
      }, 2000);
      
    } catch (error) {
      setError(error.message);
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
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="input-group">
            <img src={IconUser} alt="Nome" className="input-icon" />
            <input
              type="text"
              name="nome"
              placeholder="NOME COMPLETO"
              value={formData.nome}
              onChange={handleChange}
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>
          
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

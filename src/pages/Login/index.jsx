import React, { useState } from 'react';
import './styles.css';
import Ellipse1 from '../../img/Ellipse1.png';
import Ellipse2 from '../../img/Ellipse2.png';
import Ellipse3 from '../../img/Ellipse3.png';
import OndaLateral from '../../img/ondaLateral.png';
import LogoLogin from '../../img/LogoDaLogin.png';
import IconUser from '../../img/iconDeUser.png';
import IconCadeado from '../../img/iconCadeado.png';
import { usuariosService } from '../../services/usuariosService';
import { setToken } from '../../services/api';

function Login({ onLogin, onGoToCadastro }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await usuariosService.login({
        username,
        password
      });
      
      // Salvar token se retornado pela API
      if (response.token) {
        setToken(response.token);
      }
      
      onLogin();
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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
      
      <div className="login-box">
        <div className="logo-container">
          <img src={LogoLogin} alt="Logo" className="logo" />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src={IconUser} alt="User" className="input-icon" />
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <img src={IconCadeado} alt="Password" className="input-icon" />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'ENTRANDO...' : 'LOGIN'}
          </button>
          
          <button type="button" className="forgot-password" onClick={() => alert('Funcionalidade em desenvolvimento')}>Forgot password?</button>
          
          <div className="cadastro-link">
            <p>Não tem conta? <span onClick={onGoToCadastro}>Cadastre-se</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

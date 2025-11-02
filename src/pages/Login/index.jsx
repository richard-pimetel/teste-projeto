import React, { useState } from 'react';
import './styles.css';
import { userService } from '../../services/api';
import Ellipse1 from '../../img/Ellipse1.png';
import Ellipse2 from '../../img/Ellipse2.png';
import Ellipse3 from '../../img/Ellipse3.png';
import OndaLateral from '../../img/ondaLateral.png';
import LogoLogin from '../../img/LogoDaLogin.png';
import IconUser from '../../img/iconDeUser.png';
import IconCadeado from '../../img/iconCadeado.png';

function Login({ onLogin, onGoToCadastro }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugLogs, setDebugLogs] = useState([]);

  const addLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = { timestamp, message, data };
    setDebugLogs(prev => [newLog, ...prev.slice(0, 9)]); // Manter apenas 10 logs
    console.log(`[${timestamp}] ${message}`, data || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');
    setDebugLogs([]); // Limpar logs anteriores

    try {
      addLog('🔐 Iniciando login', { username: username.trim(), password: '***' });

      // Corrigir email se necessário
      let emailCorrigido = username.trim();
      if (emailCorrigido.includes('gmail.com') && !emailCorrigido.includes('@')) {
        emailCorrigido = emailCorrigido.replace('gmail.com', '@gmail.com');
        addLog(`🔧 Email corrigido automaticamente: ${emailCorrigido}`);
      }
      
      // Testar diferentes estruturas manualmente
      const cleanUsername = username.trim().replace(/\s+/g, ''); // Remove espaços
      const loginVariations = [
        // Estrutura CORRETA baseada no back-end (primeira tentativa)
        { email: emailCorrigido, senha: password },
        
        // Outras estruturas básicas
        { username: username.trim(), password: password },
        { login: username.trim(), senha: password },
        { nome: username.trim(), senha: password },
        { email: username.trim(), password: password },
        
        // Estruturas sem espaços
        { username: cleanUsername, password: password },
        { login: cleanUsername, senha: password },
        { nome: cleanUsername, senha: password },
        { email: cleanUsername, password: password },
        { email: cleanUsername, senha: password },
        
        // Estruturas com campos adicionais
        { 
          username: username.trim(), 
          password: password,
          status: "ativo"
        },
        { 
          login: username.trim(), 
          senha: password,
          status: "ativo"
        },
        {
          nome: username.trim(),
          senha: password,
          tipo: "usuario"
        },
        
        // Estruturas com wrapper
        {
          usuario: {
            login: username.trim(),
            senha: password
          }
        },
        {
          user: {
            username: username.trim(),
            password: password
          }
        }
      ];

      // Focar apenas no endpoint que funciona
      const endpoint = '/usuarios/login';
      addLog(`🎯 Usando endpoint: ${endpoint}`);
      
      let success = false;
      
      for (let i = 0; i < loginVariations.length && !success; i++) {
        try {
          const variation = loginVariations[i];
          const safeVariation = { ...variation };
          if (safeVariation.password) safeVariation.password = '***';
          if (safeVariation.senha) safeVariation.senha = '***';
          
          addLog(`🔑 Tentativa ${i + 1}:`, safeVariation);
          
          // Fazer requisição manual
          const response = await fetch(`http://localhost:8080/v1/lionbook${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(variation)
          });

          const data = await response.json();
          
          if (response.ok) {
            addLog(`✅ Login bem-sucedido com estrutura ${i + 1}!`, data);
            
            // Salvar dados se necessário
            if (data.token) {
              localStorage.setItem('authToken', data.token);
            }
            if (data.user) {
              localStorage.setItem('currentUser', JSON.stringify(data.user));
            }
            
            success = true;
            onLogin(data);
            return;
          } else {
            addLog(`❌ Estrutura ${i + 1} falhou:`, data);
          }
        } catch (error) {
          addLog(`💥 Erro na tentativa ${i + 1}:`, error.message);
        }
      }
      
      if (!success) {
        setError('❌ Login falhou! Você precisa CADASTRAR um usuário primeiro.');
        addLog('💥 Todas as tentativas falharam');
        addLog('🚨 PROBLEMA: Usuário não existe no banco de dados');
        addLog('✅ SOLUÇÃO: 1) Vá para CADASTRO 2) Crie usuário 3) Faça login');
        addLog('📧 DICA: Use email válido como admin@test.com');
      }
      
    } catch (error) {
      addLog('💥 Erro geral:', error.message);
      setError(error.message);
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
          {error && (
            <div className="error-section">
              <div className="error-message">{error}</div>
              <button 
                type="button" 
                className="btn-cadastro-rapido"
                onClick={onGoToCadastro}
              >
                📝 CADASTRAR USUÁRIO AGORA
              </button>
            </div>
          )}
          
          {debugLogs.length > 0 && (
            <div className="debug-logs">
              <h4>🔍 Debug Logs:</h4>
              <div className="logs-container">
                {debugLogs.map((log, index) => (
                  <div key={index} className="log-entry">
                    <span className="log-time">[{log.timestamp}]</span>
                    <span className="log-message">{log.message}</span>
                    {log.data && (
                      <pre className="log-data">{JSON.stringify(log.data, null, 2)}</pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="input-group">
            <img src={IconUser} alt="User" className="input-icon" />
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>
          
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

import React, { useState, useEffect } from 'react';
import './styles.css';
import logger from '../../utils/logger';

function DebugLogger({ show, onClose }) {
  const [logs, setLogs] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Carregar logs existentes
    setLogs(logger.getLogs());

    // Escutar atualizações do logger
    const handleLogUpdate = (event) => {
      setLogs(event.detail);
    };

    window.addEventListener('logger-update', handleLogUpdate);

    return () => {
      window.removeEventListener('logger-update', handleLogUpdate);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`debug-logger ${isMinimized ? 'minimized' : ''}`}>
      <div className="debug-header">
        <h3>🔍 Debug Logs</h3>
        <div className="debug-controls">
          <button 
            className="btn-minimize"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '📖' : '📕'}
          </button>
          <button 
            className="btn-clear"
            onClick={() => logger.clear()}
          >
            🗑️
          </button>
          <button 
            className="btn-close"
            onClick={onClose}
          >
            ❌
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="debug-content">
          <div className="logs-container">
            {logs.length === 0 ? (
              <div className="no-logs">Nenhum log ainda. Tente fazer login ou cadastro.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className={`log-entry ${log.type}`}>
                  <div className="log-header">
                    <span className="log-time">{log.timestamp}</span>
                    <span className={`log-type ${log.type}`}>
                      {log.type === 'error' ? '❌' : log.type === 'success' ? '✅' : 'ℹ️'}
                    </span>
                  </div>
                  <div className="log-message">{log.message}</div>
                  {log.data && (
                    <div className="log-data">
                      <pre>{log.data}</pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DebugLogger;

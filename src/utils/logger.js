// Logger para capturar e exibir logs na tela
class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 50;
  }

  log(message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now(),
      timestamp,
      message,
      data: data ? JSON.stringify(data, null, 2) : null,
      type: 'info'
    };
    
    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    
    // Também logar no console normal
    console.log(`[${timestamp}] ${message}`, data || '');
    
    // Disparar evento para componentes que estão ouvindo
    window.dispatchEvent(new CustomEvent('logger-update', { detail: this.logs }));
  }

  error(message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now(),
      timestamp,
      message,
      data: data ? JSON.stringify(data, null, 2) : null,
      type: 'error'
    };
    
    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    
    // Também logar no console normal
    console.error(`[${timestamp}] ${message}`, data || '');
    
    // Disparar evento para componentes que estão ouvindo
    window.dispatchEvent(new CustomEvent('logger-update', { detail: this.logs }));
  }

  success(message, data = null) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      id: Date.now(),
      timestamp,
      message,
      data: data ? JSON.stringify(data, null, 2) : null,
      type: 'success'
    };
    
    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    
    // Também logar no console normal
    console.log(`[${timestamp}] ✅ ${message}`, data || '');
    
    // Disparar evento para componentes que estão ouvindo
    window.dispatchEvent(new CustomEvent('logger-update', { detail: this.logs }));
  }

  clear() {
    this.logs = [];
    window.dispatchEvent(new CustomEvent('logger-update', { detail: this.logs }));
  }

  getLogs() {
    return this.logs;
  }
}

// Instância global do logger
const logger = new Logger();

export default logger;

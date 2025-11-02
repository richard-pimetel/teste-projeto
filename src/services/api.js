import axios from 'axios';
import logger from '../utils/logger';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/v1/lionbook',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptador para requisições (adicionar token se necessário)
api.interceptors.request.use(
  (config) => {
    console.log('Fazendo requisição:', {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    
    // Aqui você pode adicionar token de autenticação se necessário
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para respostas (tratamento de erros)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento global de erros
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de Usuários
export const userService = {
  // Criar novo usuário
  createUser: async (userData) => {
    try {
      logger.log('🚀 Iniciando cadastro de usuário', userData);
      
      // Tentar diferentes estruturas de dados
      const variations = [
        // Estrutura 1: Dados diretos
        userData,
        
        // Estrutura 2: Com user wrapper
        { user: userData },
        
        // Estrutura 3: Campos específicos que podem ser esperados
        {
          nome: userData.nome,
          email: userData.email,
          login: userData.username, // Talvez a API espere 'login' ao invés de 'username'
          senha: userData.password   // Talvez a API espere 'senha' ao invés de 'password'
        },
        
        // Estrutura 4: Todos os campos possíveis
        {
          nome: userData.nome,
          email: userData.email,
          username: userData.username,
          login: userData.username,
          password: userData.password,
          senha: userData.password
        }
      ];

      let lastError;
      
      // Tentar cada estrutura
      for (let i = 0; i < variations.length; i++) {
        try {
          logger.log(`📝 Tentativa ${i + 1} de cadastro:`, variations[i]);
          const response = await api.post('/usuarios', variations[i]);
          logger.success(`✅ Cadastro bem-sucedido com estrutura ${i + 1}!`, response.data);
          return response.data;
        } catch (error) {
          logger.error(`❌ Estrutura ${i + 1} falhou:`, error.response?.data);
          lastError = error;
          if (i < variations.length - 1) {
            logger.log(`🔄 Tentando próxima estrutura...`);
          }
        }
      }
      
      // Se chegou aqui, todas falharam
      throw lastError;
      
    } catch (error) {
      logger.error('💥 Erro final ao criar usuário:', error.response?.data || error.message);
      throw new Error(error.response?.data?.messagem || error.response?.data?.message || 'Erro ao criar usuário');
    }
  },

  // Login de usuário
  login: async (credentials) => {
    try {
      logger.log('🔐 Iniciando login', { username: credentials.username, password: '***' });
      
      // Tentar diferentes estruturas para login
      const loginVariations = [
        // Estrutura 1: username/password (original)
        credentials,
        
        // Estrutura 2: login/senha (mais comum em APIs brasileiras)
        {
          login: credentials.username,
          senha: credentials.password
        },
        
        // Estrutura 3: nome/senha (caso use nome para login)
        {
          nome: credentials.username,
          senha: credentials.password
        },
        
        // Estrutura 4: email/password
        {
          email: credentials.username,
          password: credentials.password
        },
        
        // Estrutura 5: email/senha
        {
          email: credentials.username,
          senha: credentials.password
        },
        
        // Estrutura 6: user wrapper
        {
          user: {
            username: credentials.username,
            password: credentials.password
          }
        },
        
        // Estrutura 7: user wrapper com login/senha
        {
          user: {
            login: credentials.username,
            senha: credentials.password
          }
        }
      ];

      let lastError;
      
      // Diferentes endpoints possíveis
      const endpoints = ['/usuarios/login', '/login', '/auth/login', '/usuarios/auth'];
      
      // Tentar cada endpoint com cada estrutura
      for (let endpointIndex = 0; endpointIndex < endpoints.length; endpointIndex++) {
        const currentEndpoint = endpoints[endpointIndex];
        logger.log(`🎯 Testando endpoint: ${currentEndpoint}`);
        
        for (let i = 0; i < loginVariations.length; i++) {
          try {
            const safeVariation = { ...loginVariations[i] };
            if (safeVariation.password) safeVariation.password = '***';
            if (safeVariation.senha) safeVariation.senha = '***';
            
            logger.log(`🔑 Tentativa ${i + 1} no endpoint ${currentEndpoint}:`, safeVariation);
            const response = await api.post(currentEndpoint, loginVariations[i]);
            logger.success(`✅ Login bem-sucedido com estrutura ${i + 1} no endpoint ${currentEndpoint}!`, response.data);
            
            // Salvar token se retornado pela API
            if (response.data.token) {
              localStorage.setItem('authToken', response.data.token);
            }
            return response.data;
          } catch (error) {
            logger.error(`❌ Estrutura ${i + 1} falhou no endpoint ${currentEndpoint}:`, error.response?.data);
            lastError = error;
          }
        }
      }
      
      // Se chegou aqui, todas falharam
      throw lastError;
      
    } catch (error) {
      logger.error('💥 Erro final ao fazer login:', error.response?.data || error.message);
      throw new Error(error.response?.data?.messagem || error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Listar todos os usuários
  getAllUsers: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuários');
    }
  },

  // Buscar usuário por ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
  },

  // Atualizar usuário
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
  },

  // Excluir usuário
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir usuário');
    }
  },
};

// Serviços de Livros
export const bookService = {
  // Criar novo livro
  createBook: async (bookData) => {
    try {
      const response = await api.post('/livro', bookData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao cadastrar livro');
    }
  },

  // Listar todos os livros
  getAllBooks: async () => {
    try {
      const response = await api.get('/livro');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar livros');
    }
  },

  // Buscar livro por ID
  getBookById: async (id) => {
    try {
      const response = await api.get(`/livro/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar livro');
    }
  },

  // Atualizar livro
  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/livro/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar livro');
    }
  },

  // Excluir livro
  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/livro/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir livro');
    }
  },
};

// Função de teste para verificar se a API está funcionando
export const testAPI = async () => {
  try {
    console.log('Testando conexão com a API...');
    const response = await api.get('/usuarios');
    console.log('API funcionando! Resposta:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Erro ao testar API:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data || error.message,
      status: error.response?.status 
    };
  }
};

// Exportar instância do axios configurada para uso direto se necessário
export default api;

import { apiRequest } from './api';

export const usuariosService = {
  // POST /usuarios - Criar novo usuário
  criar: async (userData) => {
    return await apiRequest('POST', '/usuarios', userData);
  },

  // POST /usuarios/login - Login de usuário
  login: async (credentials) => {
    return await apiRequest('POST', '/usuarios/login', credentials);
  },

  // GET /usuarios - Listar todos os usuários
  listar: async () => {
    return await apiRequest('GET', '/usuarios');
  },

  // GET /usuarios/:id - Buscar usuário por ID
  buscarPorId: async (id) => {
    return await apiRequest('GET', `/usuarios/${id}`);
  },

  // PUT /usuarios/:id - Atualizar usuário por ID
  atualizar: async (id, userData) => {
    return await apiRequest('PUT', `/usuarios/${id}`, userData);
  },

  // DELETE /usuarios/:id - Excluir usuário por ID
  excluir: async (id) => {
    return await apiRequest('DELETE', `/usuarios/${id}`);
  },
};

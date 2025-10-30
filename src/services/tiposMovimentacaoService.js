import { apiRequest } from './api';

export const tiposMovimentacaoService = {
  // POST /tipo-movimentacao - Criar novo tipo de movimentação
  criar: async (tipoData) => {
    return await apiRequest('POST', '/tipo-movimentacao', tipoData);
  },

  // GET /tipo-movimentacao - Listar todos os tipos de movimentação
  listar: async () => {
    return await apiRequest('GET', '/tipo-movimentacao');
  },

  // GET /tipo-movimentacao/:id - Buscar tipo de movimentação por ID
  buscarPorId: async (id) => {
    return await apiRequest('GET', `/tipo-movimentacao/${id}`);
  },

  // PUT /tipo-movimentacao/:id - Atualizar tipo de movimentação por ID
  atualizar: async (id, tipoData) => {
    return await apiRequest('PUT', `/tipo-movimentacao/${id}`, tipoData);
  },

  // DELETE /tipo-movimentacao/:id - Excluir tipo de movimentação por ID
  excluir: async (id) => {
    return await apiRequest('DELETE', `/tipo-movimentacao/${id}`);
  },
};

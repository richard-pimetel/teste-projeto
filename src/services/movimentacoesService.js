import { apiRequest } from './api';

export const movimentacoesService = {
  // POST /movimentacao - Criar nova movimentação
  criar: async (movimentacaoData) => {
    return await apiRequest('POST', '/movimentacao', movimentacaoData);
  },

  // GET /movimentacao - Listar todas as movimentações
  listar: async () => {
    return await apiRequest('GET', '/movimentacao');
  },

  // GET /movimentacao/:id - Buscar movimentação por ID
  buscarPorId: async (id) => {
    return await apiRequest('GET', `/movimentacao/${id}`);
  },

  // PUT /movimentacao/:id - Atualizar movimentação por ID
  atualizar: async (id, movimentacaoData) => {
    return await apiRequest('PUT', `/movimentacao/${id}`, movimentacaoData);
  },

  // DELETE /movimentacao/:id - Excluir movimentação por ID
  excluir: async (id) => {
    return await apiRequest('DELETE', `/movimentacao/${id}`);
  },
};

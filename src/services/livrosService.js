import { apiRequest } from './api';

export const livrosService = {
  // POST /livro - Criar novo livro
  criar: async (livroData) => {
    return await apiRequest('POST', '/livro', livroData);
  },

  // GET /livro - Listar todos os livros
  listar: async () => {
    return await apiRequest('GET', '/livro');
  },

  // GET /livro/:id - Buscar livro por ID
  buscarPorId: async (id) => {
    return await apiRequest('GET', `/livro/${id}`);
  },

  // PUT /livro/:id - Atualizar livro por ID
  atualizar: async (id, livroData) => {
    return await apiRequest('PUT', `/livro/${id}`, livroData);
  },

  // DELETE /livro/:id - Excluir livro por ID
  excluir: async (id) => {
    return await apiRequest('DELETE', `/livro/${id}`);
  },
};

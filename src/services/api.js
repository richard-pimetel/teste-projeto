const BASE_URL = 'http://localhost:8080/v1/lionbook';

export function getToken() {
  return localStorage.getItem('authToken') || '';
}

export function setToken(token) {
  if (token) localStorage.setItem('authToken', token);
}

export function clearToken() {
  localStorage.removeItem('authToken');
}

export async function apiRequest(method, path, data = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    console.log(`[API] ${method} ${BASE_URL}${path}`, data ? { body: data } : '');
    
    const response = await fetch(`${BASE_URL}${path}`, config);
    
    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json().catch(() => ({}));
      } else {
        const textError = await response.text().catch(() => '');
        errorData = { message: textError };
      }
      
      console.error(`[API Error] ${method} ${path}`, {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        sentData: data
      });
      
      throw new Error(errorData.message || errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }

    // Se for 204 No Content, retorna null
    if (response.status === 204) {
      return null;
    }

    const result = await response.json();
    console.log(`[API Success] ${method} ${path}`, result);
    return result;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      console.error('[API] Servidor não está respondendo. Verifique se a API está rodando em http://localhost:8080');
      throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.');
    }
    console.error('API Request Error:', error);
    throw error;
  }
}

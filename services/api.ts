// Configuração base da API
const API_BASE_URL = 'https://backend-yo84.onrender.com/api/v1';

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }
  return null;
};

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  (headers as Record<string, string>)['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTc2NDQ3MjYzN30.YGtWWTOeYZ2wJdd5pxPDubZfi0EDKIRwLo4n5SVqJEc`;
  // if (token) {
  //   (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  // }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(errorData.message || `Erro: ${response.status}`);
  }

  return response;
};


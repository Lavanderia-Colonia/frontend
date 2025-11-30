import Cookies from "js-cookie";

const API_BASE_URL = 'https://backend-yo84.onrender.com/api/v1';

export const getAuthToken = (): string | undefined => {
  return Cookies.get("auth_token");
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

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'Erro na requisição'
    }));

    throw new Error(errorData.error || errorData.message || `Erro: ${response.status}`);
  }

  return response;
};

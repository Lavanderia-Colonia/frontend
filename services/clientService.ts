import { apiRequest } from './api';
import { IClientes } from '@/models/clientes';

export interface CreateClientRequest {
  name: string;
  telephone: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  complement?: string;
}

export interface CreateClientResponse {
  id: string;
  name: string;
  telephone: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  complement?: string;
}

/**
 * Cria um novo cliente
 * @param clientData - Dados do cliente a ser criado
 * @returns Promise com os dados do cliente criado
 */
export const createClient = async (
  clientData: CreateClientRequest
): Promise<CreateClientResponse> => {
  try {
    const response = await apiRequest('/clients', {
      method: 'POST',
      body: JSON.stringify({
        name: clientData.name,
        telephone: clientData.telephone,
        street: clientData.street,
        number: clientData.number,
        district: clientData.district,
        zipCode: clientData.zipCode,
        complement: clientData.complement || '',
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

/**
 * Busca todos os clientes
 * @returns Promise com a lista de clientes
 */
export const getClients = async (): Promise<IClientes[]> => {
  try {
    const response = await apiRequest('/clients', {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

/**
 * Busca um cliente por ID
 * @param id - ID do cliente
 * @returns Promise com os dados do cliente
 */
export const getClientById = async (id: string): Promise<IClientes> => {
  try {
    const response = await apiRequest(`/clients/${id}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }
};

/**
 * Atualiza um cliente existente
 * @param id - ID do cliente
 * @param clientData - Dados atualizados do cliente
 * @returns Promise com os dados do cliente atualizado
 */
export const updateClient = async (
  id: string,
  clientData: CreateClientRequest
): Promise<CreateClientResponse> => {
  try {
    const response = await apiRequest(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: clientData.name,
        telephone: clientData.telephone,
        street: clientData.street,
        number: clientData.number,
        district: clientData.district,
        zipCode: clientData.zipCode,
        complement: clientData.complement || '',
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};


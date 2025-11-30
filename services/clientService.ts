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

export interface Client {
  id: number;
  active: boolean;
  name: string;
  telephone: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  complement: string;
  createdAt: string;
  updatedAt: string;
}

export interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface GetClientsResponse {
  content: Client[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: SortInfo;
  empty: boolean;
}

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

export const getClients = async (
  page: number,
  pageSize: number,
  name: string
): Promise<GetClientsResponse> => {
  try {
    const response = await apiRequest(
      `/clients?page=${page}&page_size=${pageSize}&name=${encodeURIComponent(name)}`,
      { method: 'GET' }
    );

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

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

export const toogleActiveClient = async (id: string) => {
  try {
    const response = await apiRequest(`/clients/${id}/toggle-active`, {
      method: 'PUT'
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao ativar/desativar cliente:', error);
    throw error;
  }
};


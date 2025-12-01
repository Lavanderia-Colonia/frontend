import { apiRequest } from './api';
import { IClientes } from '@/models/clientes';

// Importar Order do orderService
export interface Order {
  id: number;
  code?: string;
  clientId: number;
  clientName?: string;
  client?: {
    id: number;
    name: string;
  };
  finishType: string;
  finishDeadline: string;
  status: string;
  totalPieces?: number;
  totalValue?: number;
  items?: Array<{
    id: number;
    productId: number;
    unitPrice: number;
    brand: string;
    colorId: number;
    quantity: number;
    observation?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

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

export const getClientHistory = async (id: string): Promise<Order[]> => {
  try {
    const response = await apiRequest(`/clients/${id}/history`, {
      method: 'GET',
    });

    const data = await response.json();
    
    // A API retorna um array direto
    let ordersArray: any[] = [];
    if (Array.isArray(data)) {
      ordersArray = data;
    } else if (data.content && Array.isArray(data.content)) {
      ordersArray = data.content;
    } else if (data.orders && Array.isArray(data.orders)) {
      ordersArray = data.orders;
    }
    
    // Mapear para o formato Order esperado
    const mappedOrders: Order[] = ordersArray.map((order: any) => {
      // Extrair status (pode ser objeto ou string)
      const status = order.status?.name || order.status || "EM_ABERTO";
      
      // Extrair items (pode ser orderItems ou items)
      const items = order.orderItems || order.items || [];
      
      // Extrair clientId (pode vir de clientId direto ou client.id)
      const clientId = order.clientId || order.client?.id;
      
      // Extrair clientName (pode vir de clientName ou client.name)
      const clientName = order.clientName || order.client?.name;
      
      return {
        id: order.id,
        code: order.code,
        clientId: clientId,
        clientName: clientName,
        client: order.client ? {
          id: order.client.id,
          name: order.client.name
        } : undefined,
        finishType: order.finishType || "",
        finishDeadline: order.finishDeadline || order.deliveryDate || "",
        status: status,
        items: items.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          unitPrice: item.unitPrice,
          brand: item.brand,
          colorId: item.colorId,
          quantity: item.quantity,
          observation: item.observation
        })),
        createdAt: order.createdAt || "",
        updatedAt: order.updatedAt || ""
      };
    });
    
    return mappedOrders;
  } catch (error) {
    console.error('Erro ao buscar histórico do cliente:', error);
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


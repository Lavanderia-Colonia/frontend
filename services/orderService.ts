import { apiRequest } from "./api";

export interface CreateOrderItem {
  productId: number;
  unitPrice: number;
  brand: string;
  colorId: number;
  quantity: number;
  observation?: string;
}

export interface CreateOrderRequest {
  clientId: number;
  finishType: "ENTREGA" | "RETIRADA";
  finishDeadline: string;
  status: "EM_ABERTO" | "PAGO" | "CANCELADO";
  items: CreateOrderItem[];
}

export interface CreateOrderResponse {
  id: number;
  clientId: number;
  finishType: string;
  finishDeadline: string;
  items: CreateOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemColor {
  id: number;
  name: string;
}

export const getOrderItemColors = async (): Promise<OrderItemColor[]> => {
  try {
    const response = await apiRequest("/order-item-colors", {
      method: "GET",
    });

    const data = await response.json();
    
    // Log para debug - ver estrutura real da resposta
    console.log("Resposta completa da API de cores:", data);
    console.log("Tipo da resposta:", typeof data);
    console.log("É array?", Array.isArray(data));
    
    let colorsArray: any[] = [];
    
    // Se a resposta for um array direto, retorna
    if (Array.isArray(data)) {
      colorsArray = data;
    }
    // Se a resposta tiver uma propriedade content (paginação), retorna content
    else if (data.content && Array.isArray(data.content)) {
      colorsArray = data.content;
    }
    // Se a resposta tiver uma propriedade data, retorna data
    else if (data.data && Array.isArray(data.data)) {
      colorsArray = data.data;
    }
    // Se a resposta tiver uma propriedade colors, retorna colors
    else if (data.colors && Array.isArray(data.colors)) {
      colorsArray = data.colors;
    }
    
    if (colorsArray.length > 0) {
      console.log("Primeiro item do array:", colorsArray[0]);
      console.log("Chaves do primeiro item:", Object.keys(colorsArray[0]));
    }
    
    // Mapear para o formato esperado, tentando diferentes nomes de propriedades
    const mappedColors: OrderItemColor[] = colorsArray.map((item: any) => {
      // Tentar diferentes nomes de propriedades comuns
      const id = item.id || item.colorId || item.ID || item.COLOR_ID;
      const name = item.name || item.colorName || item.name || item.NAME || item.color || item.COLOR;
      
      console.log("Item original:", item);
      console.log("ID mapeado:", id);
      console.log("Name mapeado:", name);
      
      return {
        id: Number(id),
        name: String(name || "Sem nome")
      };
    });
    
    console.log("Cores mapeadas:", mappedColors);
    
    return mappedColors;
  } catch (error) {
    console.error("Erro ao buscar cores:", error);
    throw error;
  }
};

export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  try {
    const response = await apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
};

export interface OrderItem {
  id: number;
  productId: number;
  unitPrice: number;
  brand: string;
  colorId: number;
  quantity: number;
  observation?: string;
}

export interface Order {
  id: number;
  code?: string;
  clientId: number;
  clientName?: string;
  client?: {
    id: number;
    name: string;
    telephone?: string;
    street?: string;
    number?: string;
    district?: string;
    zipCode?: string;
    complement?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  finishType: string;
  finishDeadline: string;
  status: string | {
    id?: number;
    name?: string;
    status?: string;
  };
  totalPieces?: number;
  totalValue?: number;
  items: OrderItem[];
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

export interface GetOrdersResponse {
  content: Order[];
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

export const getOrders = async (
  page: number,
  pageSize: number,
  code?: string,
  status?: string
): Promise<GetOrdersResponse> => {
  try {
    let url = `/orders?page=${page}&page_size=${pageSize}`;
    
    if (code) {
      url += `&code=${encodeURIComponent(code)}`;
    }
    
    if (status && status !== "all") {
      // Converter status do frontend para o formato da API
      const statusMap: Record<string, string> = {
        "open": "EM_ABERTO",
        "paid": "PAGO",
        "cancelled": "CANCELADO"
      };
      url += `&status=${statusMap[status] || status}`;
    }

    const response = await apiRequest(url, {
      method: "GET",
    });

    const data = await response.json();
    
    // Garantir que cada pedido tenha um ID válido
    if (data.content && Array.isArray(data.content)) {
      data.content = data.content.map((order: any) => {
        // Tentar diferentes nomes de propriedades para o ID
        const id = order.id || order.orderId || order.ID || order.ORDER_ID;
        const mappedOrder = {
          ...order,
          id: id !== undefined && id !== null ? Number(id) : undefined
        };
        
        // Log para debug se o ID não foi encontrado
        if (mappedOrder.id === undefined || isNaN(mappedOrder.id)) {
          console.warn("Pedido sem ID válido:", order);
        }
        
        return mappedOrder;
      });
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
};

export const getOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await apiRequest(`/orders/${id}`, {
      method: "GET",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    throw error;
  }
};

export const finishOrder = async (id: string | number): Promise<Order> => {
  try {
    const response = await apiRequest(`/orders/${id}/finish`, {
      method: "POST",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
    throw error;
  }
};

export const cancelOrder = async (id: string | number): Promise<Order> => {
  try {
    const response = await apiRequest(`/orders/${id}/cancel`, {
      method: "POST",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    throw error;
  }
};

export const updateOrder = async (
  id: string | number,
  orderData: CreateOrderRequest
): Promise<Order> => {
  try {
    const response = await apiRequest(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    throw error;
  }
};


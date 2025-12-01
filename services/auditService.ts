import { apiRequest } from './api';

export interface Audit {
  id: number;
  message: string;
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
  action?: string;
  entityType?: string;
  entityId?: number;
  userId?: number;
  userName?: string;
}

export interface GetAuditsResponse {
  content: Audit[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const getAudits = async (): Promise<Audit[]> => {
  try {
    const response = await apiRequest('/audits', {
      method: 'GET',
    });

    const data = await response.json();
    
    let audits: Audit[] = [];
    
    if (Array.isArray(data)) {
      audits = data;
    } else if (data.content && Array.isArray(data.content)) {
      audits = data.content;
    } else if (data.audits && Array.isArray(data.audits)) {
      audits = data.audits;
    } else if (data.data && Array.isArray(data.data)) {
      audits = data.data;
    } else {
      console.warn('Estrutura de resposta de auditoria não reconhecida:', data);
      audits = [];
    }

    return audits.map((audit: any) => {
      let formattedTimestamp = audit.timestamp || audit.createdAt || audit.updatedAt || '';
      
      if (formattedTimestamp && formattedTimestamp.includes('T')) {
        try {
          const date = new Date(formattedTimestamp);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          formattedTimestamp = `${day}/${month}/${year} - ${hours}:${minutes}`;
        } catch (e) {
          console.error('Erro ao formatar timestamp:', e);
        }
      }

      return {
        id: audit.id || audit.ID || 0,
        message: audit.message || audit.action || audit.description || 'Ação realizada',
        timestamp: formattedTimestamp,
        createdAt: audit.createdAt,
        updatedAt: audit.updatedAt,
        action: audit.action,
        entityType: audit.entityType,
        entityId: audit.entityId,
        userId: audit.userId,
        userName: audit.userName,
      };
    });
  } catch (error) {
    console.error('Erro ao buscar auditoria:', error);
    throw error;
  }
};


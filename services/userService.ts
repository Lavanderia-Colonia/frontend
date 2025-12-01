import { apiRequest } from "./api";

export interface viewAdminResponse {
    id: number;
    name: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: Authority[];
    username: string;
    enabled: boolean;
}

export interface Authority {
    authority: string;
}

export const viewAdmin = async (): Promise<viewAdminResponse> => {
    try {
        const response = await apiRequest(`/admin`, {
            method: 'GET',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao visualizar admin:", error);
        throw error;
    }
}

export const changeName = async (newName: string): Promise<void> => {
    try {
        const response = await apiRequest(`/admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newName }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao alterar nome:", error);
        throw error;
    }
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
        const response = await apiRequest(`/admin/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        throw error;
    }
};
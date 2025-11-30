import { apiRequest } from "./api";

export interface listProductsResponse {
    id: string,
    code: string
    name: string,
    price: number
}

export const listProducts = async (): Promise<listProductsResponse[]> => {
    const response = await apiRequest('/products', {
        method: 'GET',
    });

    const data = await response.json();
    return data;
}
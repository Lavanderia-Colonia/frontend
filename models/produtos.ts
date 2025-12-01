export interface IProdutos {
    code: string;
    value: number;
    brand: string;
    color: string;
    pieces: number;
    productId?: number; // ID do produto da API
    colorId?: number; // ID da cor
    observation?: string; // Observações do item
}
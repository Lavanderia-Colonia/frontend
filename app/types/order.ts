export interface Pedido{
codigo: string;
nomeCliente: string;
pecas: number;
lancamento: string;
finalizacao: string;
valorTotal: number;
status: 'aberto' | 'pago' | 'cancelado';
}
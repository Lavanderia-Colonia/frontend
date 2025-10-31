// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// export async function getPedidos() {
//   const response = await fetch(`${API_BASE_URL}/pedidos`);
//   if (!response.ok) throw new Error('Erro ao buscar pedidos');
//   return response.json();
// }

// export async function getPedidoById(id: string) {
//   const response = await fetch(`${API_BASE_URL}/pedidos/${id}`);
//   if (!response.ok) throw new Error('Erro ao buscar pedido');
//   return response.json();
// }

// export async function createPedido(pedido: Partial<Pedido>) {
//   const response = await fetch(`${API_BASE_URL}/pedidos`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(pedido),
//   });
//   if (!response.ok) throw new Error('Erro ao criar pedido');
//   return response.json();
// }
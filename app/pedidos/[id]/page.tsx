import React from 'react';
import Header from '@/components/Header';

interface OrderDetailsProps {
  params: {
    id: string;
  };
}

export default function OrderDetails({ params }: OrderDetailsProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-6">Detalhes do pedido #{params.id}</h1>
          
          {/* Informações do Cliente */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Informações do Cliente</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Nome do cliente</p>
                <p className="font-medium">Ana Carolina Souza</p>
              </div>
              <div>
                <p className="text-gray-600">Data do pedido</p>
                <p className="font-medium">24/10/2023</p>
              </div>
            </div>
          </div>

          {/* Detalhes dos Itens */}
          <div>
            <h2 className="text-lg font-medium mb-4">Detalhes dos Itens</h2>
            <div className="space-y-6">
              {/* Item 1 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <p className="text-gray-600">Número do item</p>
                    <p className="font-medium">#123456</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Marca</p>
                    <p className="font-medium">Nike</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600">Valor do item</p>
                    <p className="font-medium">R$150,00</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Número de peças</p>
                    <p className="font-medium">1</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cor da peça</p>
                    <p className="font-medium">Branco</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">Observações</p>
                  <p className="text-sm">Cuidado ao lavar pois o logo da marca está desbotado.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Valor Total */}
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Valor Total</h2>
              <p className="text-xl font-semibold">R$150,00</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
// "use client"
// import React from "react";
// import { useRouter } from "next/navigation";

// interface OrderDetailsProps {
//   params: {
//     id: string;
//   };
// }

// export default function OrderDetails({ params }: OrderDetailsProps) {
//   const router = useRouter();

//   // Dados mockados para exemplo - substitua com seus dados reais
//   const orderData = {
//     code: `#${params.id}`,
//     client: "Ana Carolina Souza",
//     pieces: 2,
//     launched: "24/10/2025",
//     finished: "23/10/2025",
//     total: "R$1100,00",
//     items: [
//       {
//         id: "#123456",
//         value: "R$550,00",
//         brand: "Nike",
//         pieces: 1,
//         color: "Branco",
//         finalPrice: "R$550,00",
//         observations: "Cuidado ao lavar pois a logo da marca está desbotada."
//       },
//       {
//         id: "#123456",
//         value: "R$550,00",
//         brand: "Nike",
//         pieces: 1,
//         color: "Branco",
//         finalPrice: "R$550,00",
//         observations: "Cuidado ao lavar pois a logo da marca está desbotada."
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-8">
//             <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
//               <span className="text-white text-2xl">📦</span>
//             </div>
//             <nav className="flex items-center gap-6">
//               <a href="/pedidos" className="text-blue-700 font-medium border-b-2 border-blue-700 pb-1">
//                 Pedidos
//               </a>
//               <a href="/clientes" className="text-slate-500 hover:text-slate-700">
//                 Clientes
//               </a>
//               <a href="/configuracoes" className="text-slate-500 hover:text-slate-700">
//                 Configurações
//               </a>
//             </nav>
//           </div>
//           <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             Sair
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-lg shadow-sm p-8">
//           {/* Header com título e botões de ação */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={() => router.back()}
//                 className="text-blue-700 hover:text-blue-800"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <h1 className="text-2xl font-semibold text-slate-900">
//                 Detalhes do pedido - {orderData.code}
//               </h1>
//               <button className="ml-2 text-slate-400 hover:text-slate-600">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium">
//                 Finalizar
//               </button>
//               <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium">
//                 Cancelar
//               </button>
//               <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2">
//                 Editar
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Informações do Cliente */}
//           <div className="grid grid-cols-2 gap-8 mb-8">
//             <div>
//               <p className="text-sm text-slate-500 mb-1">Nome do cliente</p>
//               <p className="text-slate-700">{orderData.client}</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500 mb-1">Quantidade total de peças</p>
//               <p className="text-slate-700">{orderData.pieces} peças</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500 mb-1">Data de lançamento no sistema</p>
//               <p className="text-slate-700">{orderData.launched}</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500 mb-1">Data de finalização</p>
//               <p className="text-slate-700">{orderData.finished}</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500 mb-1">Valor total</p>
//               <p className="text-slate-700">{orderData.total}</p>
//             </div>
//           </div>

//           {/* Detalhes dos Itens */}
//           <div>
//             <h2 className="text-xl font-semibold text-blue-900 mb-6">Detalhes dos Itens</h2>
            
//             <div className="space-y-4">
//               {orderData.items.map((item, index) => (
//                 <div key={index} className="border border-slate-200 rounded-lg p-6">
//                   <h3 className="text-slate-700 font-medium mb-4">{item.id}</h3>
                  
//                   <div className="grid grid-cols-2 gap-x-16 gap-y-4">
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Valor do item</p>
//                       <p className="text-slate-700">{item.value}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Marca</p>
//                       <p className="text-slate-700">{item.brand}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Número de peças</p>
//                       <p className="text-slate-700">{item.pieces}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Cor da peça</p>
//                       <p className="text-slate-700">{item.color}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Preço final</p>
//                       <p className="text-slate-700">{item.finalPrice}</p>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4">
//                     <p className="text-sm text-slate-500 mb-1">Observações</p>
//                     <p className="text-slate-600 text-sm">{item.observations}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal";

interface OrderDetailsProps {
  params: {
    id: string;
  };
}

export default function OrderDetails({ params }: OrderDetailsProps) {
  const router = useRouter();
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "danger" as "danger" | "success" | "warning",
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {}
  });

  // Dados mockados para exemplo - substitua com seus dados reais
  const orderData = {
    code: `#${params.id}`,
    client: "Ana Carolina Souza",
    pieces: 2,
    launched: "24/10/2025",
    finished: "23/10/2025",
    total: "R$1100,00",
    items: [
      {
        id: "#123456",
        value: "R$550,00",
        brand: "Nike",
        pieces: 1,
        color: "Branco",
        finalPrice: "R$550,00",
        observations: "Cuidado ao lavar pois a logo da marca está desbotada."
      },
      {
        id: "#123456",
        value: "R$550,00",
        brand: "Nike",
        pieces: 1,
        color: "Branco",
        finalPrice: "R$550,00",
        observations: "Cuidado ao lavar pois a logo da marca está desbotada."
      }
    ]
  };

  const handleFinalizar = () => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Finalizar?",
      message: "Tem certeza de que deseja finalizar o pedido? Essa ação não poderá ser desfeita.",
      confirmText: "Finalizar",
      cancelText: "Cancelar",
      onConfirm: () => {
        // Aqui você implementa a lógica de finalizar o pedido
        console.log("Pedido finalizado!");
        closeModal();
        // Opcional: redirecionar ou mostrar mensagem de sucesso
        // router.push('/pedidos');
      }
    });
  };

  const handleCancelar = () => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Cancelar?",
      message: "Tem certeza de que deseja cancelar o pedido? Essa ação não poderá ser desfeita.",
      confirmText: "Cancelar Pedido",
      cancelText: "Voltar",
      onConfirm: () => {
        // Aqui você implementa a lógica de cancelar o pedido
        console.log("Pedido cancelado!");
        closeModal();
        // Opcional: redirecionar ou mostrar mensagem de sucesso
        // router.push('/pedidos');
      }
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📦</span>
              </div>
              <nav className="flex items-center gap-6">
                <a href="/pedidos" className="text-blue-700 font-medium border-b-2 border-blue-700 pb-1">
                  Pedidos
                </a>
                <a href="/clientes" className="text-slate-500 hover:text-slate-700">
                  Clientes
                </a>
                <a href="/configuracoes" className="text-slate-500 hover:text-slate-700">
                  Configurações
                </a>
              </nav>
            </div>
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Header com título e botões de ação */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => router.back()}
                  className="text-blue-700 hover:text-blue-800"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Detalhes do pedido - {orderData.code}
                </h1>
                <button className="ml-2 text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleFinalizar}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Finalizar
                </button>
                <button 
                  onClick={handleCancelar}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  Editar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Informações do Cliente */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Nome do cliente</p>
                <p className="text-slate-700">{orderData.client}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Quantidade total de peças</p>
                <p className="text-slate-700">{orderData.pieces} peças</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Data de lançamento no sistema</p>
                <p className="text-slate-700">{orderData.launched}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Data de finalização</p>
                <p className="text-slate-700">{orderData.finished}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Valor total</p>
                <p className="text-slate-700">{orderData.total}</p>
              </div>
            </div>

            {/* Detalhes dos Itens */}
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-6">Detalhes dos Itens</h2>
              
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6">
                    <h3 className="text-slate-700 font-medium mb-4">{item.id}</h3>
                    
                    <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Valor do item</p>
                        <p className="text-slate-700">{item.value}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Marca</p>
                        <p className="text-slate-700">{item.brand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Número de peças</p>
                        <p className="text-slate-700">{item.pieces}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Cor da peça</p>
                        <p className="text-slate-700">{item.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Preço final</p>
                        <p className="text-slate-700">{item.finalPrice}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-slate-500 mb-1">Observações</p>
                      <p className="text-slate-600 text-sm">{item.observations}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        type={modalConfig.type}
      />
    </>
  );
}
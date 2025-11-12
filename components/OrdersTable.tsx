// "use client"
// import React from "react";
// import { useRouter } from "next/navigation";

// type Order = {
//   code: string;
//   client: string;
//   pieces: number;
//   launched: string;
//   finished: string;
//   total: string;
//   status: "open" | "paid" | "cancelled";
// };

// const sample: Order[] = [
//   { code: "#112345", client: "Ana Carolina Souza", pieces: 2, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
//   { code: "#112344", client: "Bruno Henrique Almeida", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
//   { code: "#112343", client: "Camila Ferreira Costa", pieces: 2, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
//   { code: "#112342", client: "Diego Rafael Martins", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
//   { code: "#112341", client: "Eduarda Silva Pereira", pieces: 6, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
//   { code: "#112340", client: "Felipe Augusto Ramos", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
//   { code: "#112339", client: "Gabriela Torres Lima", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
//   { code: "#112338", client: "Henrique Lopes Duarte", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
//   { code: "#112337", client: "Isabela Rocha Nunes", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
//   { code: "#112336", client: "João Pedro Barros", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
// ];

// export default function OrdersTable({ data = sample }: { data?: Order[] }) {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [statusFilter, setStatusFilter] = React.useState<"all" | "open" | "paid" | "cancelled">("all");

//   const handleViewOrder = (code: string) => {
//     const orderId = code.replace('#', '');
//     router.push(`/pedidos/${orderId}`);
//   };

//   const filteredData = data.filter(order => {
//     const matchesSearch = order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.client.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "all" || order.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="space-y-4">
//       {/* Header with filters and actions */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h2 className="text-xl font-semibold text-slate-900">Pedidos</h2>
//           <div className="flex items-center gap-3 text-sm">
//             <button
//               onClick={() => setStatusFilter("open")}
//               className={`flex items-center gap-1.5 ${statusFilter === "open" ? "text-slate-700" : "text-slate-400"}`}
//             >
//               <span className="inline-block w-2 h-2 rounded-full border-2 border-slate-400"></span>
//               Em aberto - Estoque
//             </button>
//             <button
//               onClick={() => setStatusFilter("paid")}
//               className={`flex items-center gap-1.5 ${statusFilter === "paid" ? "text-slate-700" : "text-slate-400"}`}
//             >
//               <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
//               Pago - Saída
//             </button>
//             <button
//               onClick={() => setStatusFilter("cancelled")}
//               className={`flex items-center gap-1.5 ${statusFilter === "cancelled" ? "text-slate-700" : "text-slate-400"}`}
//             >
//               <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
//               Cancelado
//             </button>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Busque pelo código do pedido"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <svg className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 flex items-center gap-2">
//             Cadastrar
//             <span className="text-lg">+</span>
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
//         <table className="w-full table-auto text-sm">
//           <thead className="bg-slate-50 border-b border-slate-200">
//             <tr className="text-left text-xs text-slate-600 font-medium">
//               <th className="py-3 px-6">Código</th>
//               <th className="py-3 px-6">Nome do Cliente</th>
//               <th className="py-3 px-6 text-center">Peças</th>
//               <th className="py-3 px-6">Lançamento</th>
//               <th className="py-3 px-6">Finalização</th>
//               <th className="py-3 px-6">Valor Total</th>
//               <th className="py-3 px-6">Status</th>
//               <th className="py-3 px-6">Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row, idx) => (
//               <tr key={row.code} className={`border-b border-slate-100 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-slate-50`}>
//                 <td className="px-6 py-4 text-slate-400 text-xs">{row.code}</td>
//                 <td className="px-6 py-4 text-slate-700">{row.client}</td>
//                 <td className="px-6 py-4 text-center text-slate-600">{row.pieces}</td>
//                 <td className="px-6 py-4 text-slate-500 text-xs">{row.launched}</td>
//                 <td className="px-6 py-4 text-slate-500 text-xs">{row.finished}</td>
//                 <td className="px-6 py-4 text-slate-700">{row.total}</td>
//                 <td className="px-6 py-4">
//                   {row.status === "paid" && <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>}
//                   {row.status === "cancelled" && <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>}
//                   {row.status === "open" && <span className="inline-block w-2 h-2 rounded-full border-2 border-slate-300"></span>}
//                 </td>
//                 <td className="px-6 py-4">
//                   <button 
//                     onClick={() => handleViewOrder(row.code)}
//                     className="rounded-full p-2 text-blue-600 hover:bg-blue-50 transition-colors"
//                     aria-label="Visualizar pedido"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
//           <div className="text-sm text-slate-600">Mostrando 10 de 300</div>
//           <div className="flex items-center gap-1">
//             <button className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button className="px-3 py-1.5 rounded bg-blue-700 text-white font-medium text-sm min-w-[32px]">1</button>
//             <button className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm min-w-[32px]">2</button>
//             <button className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm min-w-[32px]">3</button>
//             <span className="px-2 text-slate-400">...</span>
//             <button className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm min-w-[32px]">30</button>
//             <button className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import { Search, Plus, Eye, ChevronLeft, ChevronRight } from "lucide-react";

type Order = {
  code: string;
  client: string;
  pieces: number;
  launched: string;
  finished: string;
  total: string;
  status: "open" | "paid" | "cancelled";
};

const sample: Order[] = [
  { code: "#112345", client: "Ana Carolina Souza", pieces: 2, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
  { code: "#112344", client: "Bruno Henrique Almeida", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
  { code: "#112343", client: "Camila Ferreira Costa", pieces: 2, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
  { code: "#112342", client: "Diego Rafael Martins", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
  { code: "#112341", client: "Eduarda Silva Pereira", pieces: 6, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
  { code: "#112340", client: "Felipe Augusto Ramos", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
  { code: "#112339", client: "Gabriela Torres Lima", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
  { code: "#112338", client: "Henrique Lopes Duarte", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
  { code: "#112337", client: "Isabela Rocha Nunes", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
  { code: "#112336", client: "João Pedro Barros", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
];

export default function PedidosDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "paid" | "cancelled">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('pedidos');

  const filteredOrders = sample.filter(order => {
    const matchesSearch = order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = 30;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-full mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-semibold text-blue-900">Pedidos</h1>
            
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => setStatusFilter(statusFilter === "open" ? "all" : "open")}
                className={`flex items-center gap-2 ${statusFilter === "open" ? "text-gray-700" : "text-gray-400"}`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-gray-400"></span>
                Em aberto - Estoque
              </button>
              <button
                onClick={() => setStatusFilter(statusFilter === "paid" ? "all" : "paid")}
                className={`flex items-center gap-2 ${statusFilter === "paid" ? "text-gray-700" : "text-gray-400"}`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Pago - Saída
              </button>
              <button
                onClick={() => setStatusFilter(statusFilter === "cancelled" ? "all" : "cancelled")}
                className={`flex items-center gap-2 ${statusFilter === "cancelled" ? "text-gray-700" : "text-gray-400"}`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Cancelado
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Busque pelo código do pedido"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            
            <button className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium">
              Cadastrar
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Código</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Nome do Cliente</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Peças</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Lançamento</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Finalização</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Valor Total</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr 
                  key={order.code} 
                  className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-400">{order.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.pieces}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.launched}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.finished}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-start">
                      {order.status === "paid" && (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      )}
                      {order.status === "cancelled" && (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      )}
                      {order.status === "open" && (
                        <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-gray-400"></span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-600 hover:text-blue-900 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <span className="text-sm text-gray-600">Mostrando 10 de 300</span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <button 
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              1
            </button>
            <button 
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1 rounded ${currentPage === 2 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              2
            </button>
            <button 
              onClick={() => setCurrentPage(3)}
              className={`px-3 py-1 rounded ${currentPage === 3 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              3
            </button>
            
            <span className="px-2 text-gray-400">...</span>
            
            <button 
              onClick={() => setCurrentPage(30)}
              className={`px-3 py-1 rounded ${currentPage === 30 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              30
            </button>
            
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
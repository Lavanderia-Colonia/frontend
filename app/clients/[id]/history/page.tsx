"use client";

import React, { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";

type OrderStatus = "open" | "paid" | "cancelled";

type Order = {
  code: string;
  pieces: number;
  launched: string;
  finished: string;
  total: string;
  status: OrderStatus;
};

const sampleOrders: Order[] = [
  { code: "#112345", pieces: 2, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
  { code: "#112344", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
  { code: "#112343", pieces: 2, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
  { code: "#112342", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
  { code: "#112341", pieces: 6, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
  { code: "#112340", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
  { code: "#112339", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" },
  { code: "#112338", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "paid" },
  { code: "#112337", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "cancelled" },
  { code: "#112336", pieces: 5, launched: "24/10/2025", finished: "23/10/2025", total: "R$1100,00", status: "open" }
];

export default function ClientOrdersHistory() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id;

  // Em um cenário real, esse nome viria da API junto com os pedidos
  const clientName = "Ana Carolina Souza";

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch =
      order.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = 30;

  const handleBack = () => {
    router.push(`/clients/${clientId}`);
  };

  const handleViewOrder = (code: string) => {
    const orderId = code.replace("#", "");
    router.push(`/pedidos/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="w-full flex justify-center">
          <div className="rounded-[30px] bg-white p-6 shadow w-full min-h-[400px]">
            {/* Header com botão voltar, título e filtros */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  onClick={handleBack}
                  className="text-title hover:text-[#012444] flex items-center mr-1"
                >
                  <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                </button>
                <h1 className="text-2xl font-bold text-title">
                  Histórico de pedidos - {clientName}
                </h1>
              </div>

              <div className="flex items-center gap-8">
                {/* Legenda de status */}
                <div className="flex items-center gap-6 text-sm text-neutral">
                  <button
                    type="button"
                    onClick={() =>
                      setStatusFilter(statusFilter === "open" ? "all" : "open")
                    }
                    className={`flex items-center gap-2 cursor-pointer ${statusFilter === "open" ? "text-neutral" : "text-neutral/60"}`}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-gray-400" />
                    Em aberto - Estoque
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStatusFilter(statusFilter === "paid" ? "all" : "paid")
                    }
                    className={`flex items-center gap-2 cursor-pointer ${statusFilter === "paid" ? "text-neutral" : "text-neutral/60"}`}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
                    Pago - Saída
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStatusFilter(statusFilter === "cancelled" ? "all" : "cancelled")
                    }
                    className={`flex items-center gap-2 cursor-pointer ${statusFilter === "cancelled" ? "text-neutral" : "text-neutral/60"}`}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
                    Cancelado
                  </button>
                </div>

                {/* Busca */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#012444] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Busque pelo código do pedido"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-80 border border-neutral/20 rounded-lg hover:outline-none hover:ring-2 hover:ring-title text-neutral placeholder-neutral/60"
                  />
                </div>
              </div>
            </div>

            {/* Tabela */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-white border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">
                      Código
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">
                      Peças
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">
                      Lançamento
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">
                      Finalização
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">
                      Valor Total
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-blue-900">
                      Status
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-blue-900">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order.code}
                      className={`border-b border-gray-100 ${
                        index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {order.code}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.pieces}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.launched}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.finished}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          {order.status === "paid" && (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
                          )}
                          {order.status === "cancelled" && (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
                          )}
                          {order.status === "open" && (
                            <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewOrder(order.code)}
                          className="text-gray-600 hover:text-blue-900 transition-colors mx-auto"
                          aria-label={`Ver detalhes do pedido ${order.code}`}
                        >
                          <Eye className="w-5 h-5 cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
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
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`px-3 py-1 rounded ${
                    currentPage === 2
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`px-3 py-1 rounded ${
                    currentPage === 3
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  3
                </button>

                <span className="px-2 text-gray-400">...</span>

                <button
                  onClick={() => setCurrentPage(30)}
                  className={`px-3 py-1 rounded ${
                    currentPage === 30
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  30
                </button>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



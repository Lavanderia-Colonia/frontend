"use client";

import React, { useState, useEffect } from "react";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import { getClientHistory, Order } from "@/services/clientService";

type OrderStatus = "open" | "paid" | "cancelled";

// Função para converter status da API para o formato do frontend
const convertStatus = (status: any): OrderStatus => {
  const statusStr = typeof status === 'string' ? status : (status?.name || status?.status || String(status || ''));
  const statusUpper = statusStr.toUpperCase();
  if (statusUpper === "EM_ABERTO" || statusUpper === "OPEN") return "open";
  if (statusUpper === "PAGO" || statusUpper === "PAID") return "paid";
  if (statusUpper === "CANCELADO" || statusUpper === "CANCELLED") return "cancelled";
  return "open";
};

// Função para formatar data
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

// Função para formatar código do pedido
const formatOrderCode = (id: number): string => {
  return `#${String(id).padStart(6, '0')}`;
};

export default function ClientOrdersHistory() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id as string;

  const [orders, setOrders] = useState<Order[]>([]);
  const [clientName, setClientName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    const loadData = async () => {
      if (!clientId) return;
      
      try {
        setLoading(true);
        
        // Buscar nome do cliente do localStorage (salvo na página de detalhes)
        const storedClient = localStorage.getItem("selectedClient");
        if (storedClient) {
          try {
            const client = JSON.parse(storedClient);
            setClientName(client.name || client.nome || "");
          } catch (e) {
            console.error("Erro ao parsear cliente do localStorage:", e);
          }
        }
        
        // Buscar apenas o histórico (sem buscar dados do cliente separadamente)
        const historyData = await getClientHistory(clientId);
        setOrders(historyData);
        
        // Se não tiver nome do localStorage, tentar pegar do primeiro pedido
        if (historyData.length > 0 && historyData[0].client?.name && !clientName) {
          setClientName(historyData[0].client.name);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [clientId]);

  // Calcular totais de peças e valor para cada pedido
  const ordersWithTotals = orders.map(order => {
    // Garantir que items existe e é um array
    const items = order.items || [];
    const totalPieces = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const totalValue = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity || 0), 0);
    return {
      ...order,
      totalPieces,
      totalValue
    };
  });

  // Filtrar pedidos
  const filteredOrders = ordersWithTotals.filter(order => {
    const orderCode = formatOrderCode(order.id);
    const matchesSearch = searchTerm === "" || 
      orderCode.toLowerCase().includes(searchTerm.toLowerCase());

    const status = convertStatus(order.status);
    const matchesStatus = statusFilter === "all" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleBack = () => {
    router.push(`/clients/${clientId}`);
  };

  const handleViewOrder = (orderId: number) => {
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
                  Histórico de pedidos - {clientName || "Carregando..."}
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
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-600">
                        Carregando histórico...
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-600">
                        Nenhum pedido encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order, index) => {
                      const status = convertStatus(order.status);
                      const totalFormatted = order.totalValue?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) || "R$ 0,00";
                      
                      return (
                        <tr
                          key={order.id}
                          className={`border-b border-gray-100 ${
                            index % 2 === 1 ? "bg-gray-50" : "bg-white"
                          } hover:bg-gray-100 transition-colors`}
                        >
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {formatOrderCode(order.id)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">
                            {order.totalPieces || 0}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(order.finishDeadline)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {totalFormatted}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center">
                              {status === "paid" && (
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
                              )}
                              {status === "cancelled" && (
                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
                              )}
                              {status === "open" && (
                                <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-gray-400" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleViewOrder(order.id)}
                              className="text-gray-600 hover:text-blue-900 transition-colors mx-auto"
                              aria-label={`Ver detalhes do pedido ${formatOrderCode(order.id)}`}
                            >
                              <Eye className="w-5 h-5 cursor-pointer" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Informação de resultados */}
            {!loading && filteredOrders.length > 0 && (
              <div className="flex items-center justify-end gap-4 mt-6">
                <span className="text-sm text-gray-600">
                  Mostrando {filteredOrders.length} de {orders.length} pedido(s)
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}



"use client"
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal";
import Header from "@/components/Header";
import { getOrderById, finishOrder, cancelOrder, Order, OrderItem } from "@/services/orderService";
import { listProducts, listProductsResponse } from "@/services/productService";
import { getOrderItemColors, OrderItemColor } from "@/services/orderService";
import SuccessModal from "@/components/SuccessModal";

interface OrderDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

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

// Função para formatar valor monetário
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Função para formatar código do pedido
const formatOrderCode = (id: number): string => {
  return `#${String(id).padStart(6, '0')}`;
};

export default function OrderDetails({ params }: OrderDetailsProps) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<listProductsResponse[]>([]);
  const [colors, setColors] = useState<OrderItemColor[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "danger" as "danger" | "success" | "warning",
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {}
  });

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError("ID do pedido não encontrado.");
          setLoading(false);
          return;
        }
        
        // Buscar pedido, produtos e cores em paralelo
        const [orderData, productsData, colorsData] = await Promise.all([
          getOrderById(id),
          listProducts(),
          getOrderItemColors()
        ]);
        
        setOrder(orderData);
        setProducts(productsData);
        setColors(colorsData);
      } catch (err) {
        console.error("Erro ao carregar dados do pedido:", err);
        setError("Erro ao carregar dados do pedido. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [id]);

  // Função para obter nome do produto
  const getProductName = (productId: number): string => {
    const product = products.find(p => Number(p.id) === productId);
    return product ? `${product.code} - ${product.name}` : `Produto #${productId}`;
  };

  // Função para obter nome da cor
  const getColorName = (colorId: number): string => {
    const color = colors.find(c => c.id === colorId);
    return color ? color.name : `Cor #${colorId}`;
  };

  // Calcular totais
  const totalPieces = order?.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  const totalValue = order?.items?.reduce((acc, item) => acc + (item.unitPrice * item.quantity || 0), 0) || 0;

  // Obter nome do cliente
  const clientName = order?.clientName || order?.client?.name || `Cliente #${order?.clientId || ''}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-title mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando detalhes do pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <Header />
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-error mb-4">{error || "Pedido não encontrado"}</p>
            <button
              onClick={() => router.back()}
              className="bg-title hover:bg-title/50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Voltar
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleFinalizar = () => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Finalizar?",
      message: "Tem certeza de que deseja finalizar o pedido? Essa ação não poderá ser desfeita.",
      confirmText: "Finalizar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        closeModal();
        setActionLoading(true);
        try {
          if (!id || !order) {
            alert("Erro: ID do pedido não encontrado.");
            setActionLoading(false);
            return;
          }
          
          await finishOrder(id);
          setSuccessMessage("Pedido finalizado com sucesso! O status foi alterado para 'Pago'.");
          setShowSuccessModal(true);
          
          // Recarregar os dados do pedido
          const updatedOrder = await getOrderById(id);
          setOrder(updatedOrder);
        } catch (err) {
          console.error("Erro ao finalizar pedido:", err);
          alert("Erro ao finalizar pedido. Tente novamente.");
        } finally {
          setActionLoading(false);
        }
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
      onConfirm: async () => {
        closeModal();
        setActionLoading(true);
        try {
          if (!id || !order) {
            alert("Erro: ID do pedido não encontrado.");
            setActionLoading(false);
            return;
          }
          
          await cancelOrder(id);
          setSuccessMessage("Pedido cancelado com sucesso!");
          setShowSuccessModal(true);
          
          // Recarregar os dados do pedido
          const updatedOrder = await getOrderById(id);
          setOrder(updatedOrder);
        } catch (err) {
          console.error("Erro ao cancelar pedido:", err);
          alert("Erro ao cancelar pedido. Tente novamente.");
        } finally {
          setActionLoading(false);
        }
      }
    });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/pedidos/orders-table');
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <Header />
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Header com título e botões de ação */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => router.back()}
                  className="text-title hover:text-title/50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-2xl font-semibold text-title">
                  Detalhes do pedido - {formatOrderCode(order.id)}
                </h1>
                <button className="ml-2 text-neutral/400 hover:text-neutral/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                {order && (() => {
                  const statusStr = typeof order.status === 'string' ? order.status : (order.status?.name || order.status?.status || String(order.status || ''));
                  const statusUpper = statusStr.toUpperCase();
                  const isPaid = statusUpper === "PAGO" || statusUpper === "PAID";
                  const isCancelled = statusUpper === "CANCELADO" || statusUpper === "CANCELLED";
                  
                  return (
                    <>
                      <button 
                        onClick={handleFinalizar}
                        disabled={actionLoading || isPaid || isCancelled}
                        className={`${
                          actionLoading || isPaid || isCancelled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-sucess hover:bg-sucess/60'
                        } text-white px-6 py-2.5 rounded-lg font-medium transition-colors`}
                      >
                        {actionLoading ? "Processando..." : "Finalizar"}
                      </button>
                      <button 
                        onClick={handleCancelar}
                        disabled={actionLoading || isPaid || isCancelled}
                        className={`${
                          actionLoading || isPaid || isCancelled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-error hover:bg-error/60'
                        } text-white px-6 py-2.5 rounded-lg font-medium transition-colors`}
                      >
                        {actionLoading ? "Processando..." : "Cancelar"}
                      </button>
                    </>
                  );
                })()}
                {order && (() => {
                  const statusStr = typeof order.status === 'string' ? order.status : (order.status?.name || order.status?.status || String(order.status || ''));
                  const statusUpper = statusStr.toUpperCase();
                  const isPaid = statusUpper === "PAGO" || statusUpper === "PAID";
                  const isCancelled = statusUpper === "CANCELADO" || statusUpper === "CANCELLED";
                  
                  return (
                    <button 
                      onClick={() => router.push(`/pedidos/${id}/editar`)}
                      disabled={isPaid || isCancelled}
                      className={`${
                        isPaid || isCancelled
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-title hover:bg-title/50'
                      } text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                    >
                      Editar
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Informações do Cliente */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Nome do cliente</p>
                <p className="text-slate-700">{clientName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Quantidade total de peças</p>
                <p className="text-slate-700">{totalPieces} peças</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Data de lançamento no sistema</p>
                <p className="text-slate-700">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Prazo de finalização</p>
                <p className="text-slate-700">{formatDate(order.finishDeadline)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Tipo de finalização</p>
                <p className="text-slate-700">{order.finishType === "ENTREGA" ? "Entrega" : "Retirada"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Valor total</p>
                <p className="text-slate-700">{formatCurrency(totalValue)}</p>
              </div>
            </div>

            {/* Detalhes dos Itens */}
            <div>
              <h2 className="text-xl font-semibold text-title mb-6">Detalhes dos Itens</h2>
              
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => {
                    const finalPrice = item.unitPrice * item.quantity;
                    return (
                      <div key={item.id || index} className="border border-slate-200 rounded-lg p-6">
                        <h3 className="text-slate-700 font-medium mb-4">
                          {getProductName(item.productId)}
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Valor unitário</p>
                            <p className="text-slate-700">{formatCurrency(item.unitPrice)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Marca</p>
                            <p className="text-slate-700">{item.brand}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Número de peças</p>
                            <p className="text-slate-700">{item.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Cor da peça</p>
                            <p className="text-slate-700">{getColorName(item.colorId)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Preço final</p>
                            <p className="text-slate-700">{formatCurrency(finalPrice)}</p>
                          </div>
                        </div>
                        
                        {item.observation && (
                          <div className="mt-4">
                            <p className="text-sm text-slate-500 mb-1">Observações</p>
                            <p className="text-slate-600 text-sm">{item.observation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500 text-center py-8">Nenhum item encontrado neste pedido.</p>
                )}
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

      {/* Modal de Sucesso */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Sucesso!"
        message={successMessage}
        buttonText="OK"
      />
    </>
  );
}


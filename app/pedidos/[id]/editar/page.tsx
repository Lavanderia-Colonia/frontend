"use client";

import RegisterOrder from "@/components/RegisterOrder";
import { IPedidos } from "@/models/pedidos";
import { useState, useEffect, use } from "react";
import { getOrderById } from "@/services/orderService";
import { IClientes } from "@/models/clientes";
import { listProducts } from "@/services/productService";
import { getOrderItemColors } from "@/services/orderService";
import { IProdutos } from "@/models/produtos";

interface EditOrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditOrderPage({ params }: EditOrderPageProps) {
  const { id } = use(params);
  const [pedido, setPedido] = useState<IPedidos>({
    tipoFinalizacao: "",
    prazo: "",
    cliente: null,
    products: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Debug: verificar estrutura do pedido
        console.log("Dados do pedido recebidos:", orderData);
        console.log("clientId:", orderData.clientId);
        console.log("client:", orderData.client);

        // Converter data de YYYY-MM-DD para dd/mm/aaaa
        const formatDateForInput = (dateString: string): string => {
          try {
            if (!dateString) return "";
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          } catch {
            return dateString;
          }
        };

        // Mapear itens do pedido para produtos
        const mappedProducts: IProdutos[] = await Promise.all(
          (orderData.items || []).map(async (item) => {
            // Encontrar produto
            const product = productsData.find(p => Number(p.id) === item.productId);
            // Encontrar cor
            const color = colorsData.find(c => c.id === item.colorId);

            return {
              code: product?.code || `#${item.productId}`,
              value: item.unitPrice,
              brand: item.brand,
              color: color?.name || "Sem cor",
              pieces: item.quantity,
              productId: item.productId,
              colorId: item.colorId,
              observation: item.observation || ""
            } as IProdutos;
          })
        );

        // Mapear cliente - usar dados que vêm no pedido ou do localStorage
        let mappedClient: IClientes | null = null;
        
        // Primeiro, tentar usar os dados do cliente que vêm no pedido
        if (orderData.client) {
          mappedClient = {
            id: String(orderData.client.id),
            nome: orderData.client.name,
            telefone: orderData.client.telephone || "",
            endereco: `${orderData.client.street || ""}, ${orderData.client.number || ""} – ${orderData.client.district || ""}`
          };
        } else {
          // Se não vier no pedido, tentar buscar do localStorage
          const storedClient = localStorage.getItem("selectedClient");
          if (storedClient) {
            try {
              const client = JSON.parse(storedClient);
              if (client.nome || client.name) {
                mappedClient = {
                  id: String(client.id),
                  nome: client.nome || client.name,
                  telefone: client.telefone || client.telephone || "",
                  endereco: client.endereco || `${client.street || ""}, ${client.number || ""} – ${client.district || ""}`
                };
              }
            } catch (e) {
              console.error("Erro ao parsear cliente do localStorage:", e);
            }
          }
        }
        
        if (!mappedClient) {
          setError("Erro: Dados do cliente não encontrados.");
          setLoading(false);
          return;
        }

        // Montar pedido
        // Converter finishType para minúsculas para corresponder ao formato esperado pelo componente
        const finishTypeLower = (orderData.finishType || "").toLowerCase();
        const tipoFinalizacao = finishTypeLower === "entrega" ? "entrega" : finishTypeLower === "retirada" ? "retirada" : "";
        
        setPedido({
          tipoFinalizacao: tipoFinalizacao,
          prazo: formatDateForInput(orderData.finishDeadline),
          cliente: mappedClient,
          products: mappedProducts
        });
      } catch (err) {
        console.error("Erro ao carregar dados do pedido:", err);
        setError("Erro ao carregar dados do pedido. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-title mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dados do pedido...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-title hover:bg-title/50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return <RegisterOrder pedido={pedido} setPedido={setPedido} orderId={id} isEditMode={true} />;
}


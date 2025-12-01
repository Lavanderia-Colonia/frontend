import { IPedidos } from "@/models/pedidos";
import { Clipboard, Trash2 } from "lucide-react";
import { createOrder, updateOrder, CreateOrderRequest } from "@/services/orderService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

interface ResumoPedidoProps {
  pedido: IPedidos;
  setPedido: React.Dispatch<React.SetStateAction<IPedidos>>;
  orderId?: string;
  isEditMode?: boolean;
}

export function ResumoPedido({ pedido, setPedido, orderId, isEditMode = false }: ResumoPedidoProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const totalPecas = pedido.products?.reduce(
    (acc, item) => acc + (item.pieces ?? 0),
    0
  );

  const totalGeral = pedido.products?.reduce(
    (acc, item) => acc + (item.pieces ?? 0) * (Number(item.value) ?? 0),
    0
  );

  const totalFormatado = totalGeral.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Agrupar produtos pelo código
  const produtosAgrupados = pedido.products.reduce((acc, item) => {
    const codigo = item.code;
    if (!acc[codigo]) {
      acc[codigo] = {
        code: codigo,
        totalPieces: 0,
        totalValue: 0,
        items: []
      };
    }
    acc[codigo].totalPieces += item.pieces ?? 0;
    acc[codigo].totalValue += (item.pieces ?? 0) * (Number(item.value) ?? 0);
    acc[codigo].items.push(item);
    return acc;
  }, {} as Record<string, { code: string; totalPieces: number; totalValue: number; items: typeof pedido.products }>);

  const produtosAgrupadosArray = Object.values(produtosAgrupados);

  const handleFinalizarPedido = async () => {
    // Validações
    if (!pedido.cliente?.id) {
      alert("Por favor, selecione um cliente");
      return;
    }

    if (!pedido.tipoFinalizacao) {
      alert("Por favor, selecione o tipo de finalização");
      return;
    }

    if (!pedido.prazo) {
      alert("Por favor, informe o prazo de finalização");
      return;
    }

    if (pedido.products.length === 0) {
      alert("Por favor, adicione pelo menos um item ao pedido");
      return;
    }

    console.log(pedido)

    // Validar se todos os produtos têm productId e colorId válidos
    const produtosInvalidos = pedido.products.filter(p => {
      const productId = p.productId;
      const colorId = p.colorId;
      const isValidProductId = productId !== undefined && productId !== null && !isNaN(Number(productId)) && Number(productId) > 0;
      const isValidColorId = colorId !== undefined && colorId !== null && !isNaN(Number(colorId)) && Number(colorId) > 0;

      if (!isValidProductId || !isValidColorId) {
        console.log("Produto inválido:", p);
      }
      return !isValidProductId || !isValidColorId;
    });

    if (produtosInvalidos.length > 0) {
      const produtosLista = produtosInvalidos.map(p => p.code || "sem código").join(", ");
      alert(`Os seguintes produtos não têm dados válidos: ${produtosLista}.\n\nIsso pode acontecer se os produtos foram adicionados antes de uma atualização.\n\nPor favor, remova esses itens usando a lixeira e adicione-os novamente selecionando o produto e a cor do dropdown.`);
      return;
    }

    setLoading(true);

    try {
      // Converter finishType
      const finishType = pedido.tipoFinalizacao.toUpperCase() === "ENTREGA"
        ? "ENTREGA"
        : "RETIRADA";

      // Converter prazo de dd/mm/aaaa para YYYY-MM-DD
      const [dia, mes, ano] = pedido.prazo.split('/');
      const finishDeadline = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

      // Mapear produtos para items da API
      // Cada produto individual vira um item (não agrupamos na API)
      const items = pedido.products.map(item => {
        const itemData = {
          productId: item.productId!,
          unitPrice: item.value,
          brand: item.brand,
          colorId: item.colorId!, // Já validado acima
          quantity: item.pieces,
          observation: item.observation || undefined
        };
        console.log("Item sendo enviado:", itemData);
        return itemData;
      });

      const orderData: CreateOrderRequest = {
        clientId: Number(pedido.cliente.id),
        finishType: finishType as "ENTREGA" | "RETIRADA",
        finishDeadline: finishDeadline,
        status: "EM_ABERTO", // Status inicial ao criar pedido (corresponde a "Em Aberto" no backend)
        items: items
      };

      if (isEditMode && orderId) {
        // Modo de edição - atualizar pedido existente
        await updateOrder(orderId, orderData);
      } else {
        // Modo de criação - criar novo pedido
        await createOrder(orderData);
      }

      // Mostrar modal de sucesso
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error(isEditMode ? "Erro ao atualizar pedido:" : "Erro ao criar pedido:", error);
      alert(error.message || (isEditMode ? "Erro ao atualizar pedido. Tente novamente." : "Erro ao criar pedido. Tente novamente."));
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setLoading(false);
    // Redirecionar para a lista de pedidos após fechar o modal
    router.push("/pedidos/orders-table");
  };

  console.log(pedido)

  return (
    <div className="flex-1 border border-neutral/20 rounded-2xl p-6 flex flex-col h-[670px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-title text-xl text-title font-semibold">
          Resumo do pedido
        </h2>

        <Clipboard
          size={25}
          strokeWidth={2}
          className="text-title"
        />
      </div>

      <div className="flex-1">
        {pedido.products.length === 0 ? (
          <div className="flex justify-center items-center font-default text-neutral/80 h-full">
            Adicione itens ao pedido
          </div>
        ) : (
          <div>
            <div className="space-y-2">
              <p className="font-default text-neutral text-base"            >
                {pedido.cliente?.nome}
              </p>
              <p className="font-default text-neutral/80 text-base">
                Total de peças: {totalPecas}
              </p>
              <p className="font-default text-neutral/80 text-base">Total: {totalFormatado}</p>
            </div>
            <p className="text-title mt-6">Itens</p>
            {produtosAgrupadosArray.map((grupo, index) => (
              <div
                key={grupo.code}
                className="font-default text-base mt-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-neutral">{grupo.code}</p>
                  <div className="flex items-center gap-3 text-neutral/80">
                    <span>
                      {grupo.totalPieces}
                      {grupo.totalPieces === 1 ? " peça" : " peças"}
                    </span>
                    <span>
                      R${grupo.totalValue.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPedido(prev => ({
                      ...prev,
                      products: prev.products.filter(item => item.code !== grupo.code)
                    }));
                  }}
                  className="
                    p-1
                    hover:bg-red-50
                    rounded
                    transition-colors
                    cursor-pointer
                    flex-shrink-0
                    outline-none
                    border-none
                    bg-transparent
                  "
                  title="Excluir item"
                >
                  <Trash2
                    size={18}
                    className="text-red-500"
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            ))}
            <button
              onClick={handleFinalizarPedido}
              disabled={loading}
              className={`
                bg-title
                rounded-lg
                w-full
                h-[50px]
                mt-5
                hover:bg-[#012444]
                transition-colors
                ${loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
                }
              `}
            >
              {loading ? (isEditMode ? "Salvando..." : "Finalizando...") : (isEditMode ? "Salvar alterações" : "Finalizar pedido")}
            </button>
          </div>
        )}
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title={isEditMode ? "Pedido atualizado com sucesso!" : "Pedido criado com sucesso!"}
        message={isEditMode ? "As alterações no pedido foram salvas com sucesso." : "O pedido foi cadastrado e está disponível na lista de pedidos."}
        buttonText="OK"
      />
    </div >

  );
}

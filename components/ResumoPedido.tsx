import { IPedidos } from "@/models/pedidos";
import { Clipboard } from "lucide-react";

interface ResumoPedidoProps {
  pedido: IPedidos;
}

export function ResumoPedido({ pedido }: ResumoPedidoProps) {
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
  return (
    <div className="flex-1 border border-gray-200 rounded-2xl p-6 flex flex-col min-h-[670px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-title text-base text-title font-semibold">
          Resumo do pedido
        </h2>

        <Clipboard
          size={25}
          strokeWidth={2}
          className="text-title"
        />
      </div>

      <p><strong>{pedido.cliente?.nome}</strong></p>
      <p><strong>Total de peças: {totalPecas}</strong></p>
      <p><strong>Total: {totalFormatado}</strong></p>

      <div className="flex-1">
        {pedido.products.length === 0 ? (
          <div className="flex justify-center items-center text-gray-400 h-full">
            Adicione itens ao pedido
          </div>
        ) : (
          <div className="space-y-4">
            {pedido.products.map((item, index) => (
              <div
                key={index}
                className="border border-neutral/20 rounded-lg p-4"
              >
                <p><strong>Código:</strong> {item.code}</p>
                <p><strong>Valor:</strong> {item.value}</p>
                <p><strong>Marca:</strong> {item.brand}</p>
                <p><strong>Cor:</strong> {item.color}</p>
                <p><strong>Peças:</strong> {item.pieces}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
}

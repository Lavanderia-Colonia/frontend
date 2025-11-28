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
            {pedido.products.map((item, index) => (
              <div
                key={index}
                className="font-default text-base"
              >
                <p className="text-title mt-6">Itens</p>
                <p className="text-neutral mt-4">{item.code}</p>
                <p className="text-neutral/80">
                  {item.pieces}
                  {item.pieces === 1 ? " peça" : " peças"}
                </p>
                <p className="text-neutral/80">
                  R${item.value.toFixed(2).replace(".", ",")}
                </p>
              </div>
            ))}
            <button
              className="
                bg-title
                rounded-lg
                w-full
                h-[50px]
                cursor-pointer
                mt-5
                hover:bg-[#012444]
              "
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </div >

  );
}

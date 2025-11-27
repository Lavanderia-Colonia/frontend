"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import DataInput from "./ui/DataInput";
import { Search, Clipboard } from "lucide-react";
import ClientModal from "./SelectClientModal";
import { DropdownCodigoItem } from "./ui/Dropdown";
import { IPedidos } from "@/models/pedidos";
import { ResumoPedido } from "./ResumoPedido";
import { IClientes } from "@/models/clientes";

const itens = [
    { code: "18927-2" },
    { code: "28173-9" },
    { code: "91872-1" },
    { code: "55012-4" },
    { code: "77129-6" }
];

const colors = [
    { name: "vermelho" },
    { name: "azul" },
    { name: "verde" },
    { name: "roxo" },
    { name: "amarelo" },
    { name: "preto" },
    { name: "rosa" }
]

function Etapa1({ setEtapa,
    pedido,
    setPedido }: {
        setEtapa: (value: number) => void;
        pedido: IPedidos;
        setPedido: React.Dispatch<React.SetStateAction<IPedidos>>;
    }) {
    const [selected, setSelected] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectCliente = (cliente: IClientes) => {
        setPedido(prev => ({
            ...prev,
            cliente: cliente
        }));
        setIsModalOpen(false);
    };

    const isValid = () => {
        return (
            selected &&
            pedido?.prazo &&
            pedido?.cliente
        );
    };

    return (
        <div>
            <div className="text-base text-neutral font-default space-y-5">
                <p>Antes de adicionar um pedido, preencha algumas informações:</p>
                <p>
                    Tipo de finalização:
                    <span className="text-red-500"> *</span>
                </p>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setSelected(selected === "entrega" ? "" : "entrega")}
                        className="flex items-center gap-2"
                    >
                        <span
                            className={`
                                w-5 h-5 rounded-full border
                                transition-all cursor-pointer
                                ${selected === "entrega"
                                    ? "border-[3px] border-sucess"
                                    : "border-[1px] border-neutral/40"
                                }
                            `}
                        />
                        <span className="text-neutral">Entrega</span>
                    </button>

                    <button
                        onClick={() => setSelected(selected === "retirada" ? "" : "retirada")}
                        className="flex items-center gap-2"
                    >
                        <span
                            className={`
                                w-5 h-5 rounded-full border
                                transition-all cursor-pointer
                                ${selected === "retirada"
                                    ? "border-[3px] border-sucess"
                                    : "border-[1px] border-neutral/40"
                                }
                            `}
                        />
                        <span className="text-neutral">Retirar na loja</span>
                    </button>
                </div>

                <p>
                    Prazo de finalização
                    <span className="text-error"> *</span>
                </p>

                <DataInput
                    value={pedido.prazo}
                    onChange={(value) => {
                        setPedido(prev => ({
                            ...prev,
                            prazo: value
                        }));
                    }}
                />

                <p>
                    Cliente
                    <span className="text-error"> *</span>
                </p>

                {pedido.cliente ? (
                    <div className="space-y-4">
                        <div className="bg-white border border-neutral/20 rounded-lg p-4">
                            <div className="flex flex-col">
                                <p className="font-default text-neutral mt-2">{pedido.cliente.nome}</p>
                                <p className="font-default text-neutral mt-2">Telefone</p>
                                <p className="text-sm font-default text-neutral/80 mt-2">{pedido.cliente.telefone}</p>
                                <p className="font-default text-neutral mt-2">Endereço</p>
                                <p className="text-sm font-default text-neutral/80 mt-2">{pedido.cliente.endereco}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="
                                w-full bg-title text-white 
                                py-4 px-6 rounded-[10px]
                                flex items-center justify-center gap-3
                                font-semibold text-base
                                hover:bg-[#012444]
                                transition-colors
                                cursor-pointer
                            "
                        >
                            Selecionar cliente
                            <Search size={20} strokeWidth={2} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="
                            w-full bg-title text-white 
                            py-4 px-6 rounded-[10px]
                            flex items-center justify-center gap-3
                            font-title text-lg
                            hover:bg-[#012444]
                            transition-colors
                            cursor-pointer
                        "
                    >
                        Selecionar cliente
                        <Search size={22} strokeWidth={2} />
                    </button>
                )}

                <ClientModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelectCliente={handleSelectCliente}
                />

                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            console.log("isValid: ", !isValid())
                            if (!isValid()) return;
                            setEtapa(2);
                        }}
                        className={
                            `
                                font-title text-title
                                flex items-center justify-between
                                py-3 px-4
                                rounded-IPedidos
                                border-2 border-title
                                hover:bg-neutral/5 transition-colors
                                cursor-pointer
                                rounded-[10px]
                                hover:bg-neutral/5
                            `
                        }
                    >
                        <div className="flex-1 text-center">
                            Prosseguir
                        </div>

                        <FontAwesomeIcon icon={faChevronRight} className="ml-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function Etapa2({
    setEtapa,
    pedido,
    setPedido
}: {
    setEtapa: (value: number) => void;
    pedido: IPedidos;
    setPedido: React.Dispatch<React.SetStateAction<IPedidos>>;
}) {
    const [code, setCode] = useState("");
    const [value, setValue] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [pieces, setPieces] = useState(0);
    const finalPrice = value && pieces ? Number(value) * Number(pieces) : "-";

    return (
        <div className="text-base text-neutral font-default space-y-6">

            <p className="text-neutral font-default">
                Agora, adicione os itens ao pedido:
            </p>

            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Código do item <span className="text-red-500">*</span>
                    </label>

                    <DropdownCodigoItem
                        items={itens}
                        filterKey="code"
                        placeholder="Selecione"
                        onClickPlaceholder="|Selecione ou pesquise"
                        onSelect={(value, item) => setCode(item.code)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Valor do item <span className="text-red-500">*</span>
                    </label>
                    <input
                        onChange={(value) => setValue(value.target.value)}
                        type="text"
                        placeholder="Digite o valor"
                        className="
                            w-full border border-neutral/20 rounded-lg 
                            py-2 px-3 text-sm placeholder-neutral/50 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral"                    >
                        Marca <span className="text-red-500">*</span>
                    </label>
                    <input
                        onChange={(value) => setBrand(value.target.value)}
                        type="text"
                        placeholder="Digite a marca"
                        className="
                            w-full border border-neutral/20 rounded-lg 
                            py-2 px-3 text-sm placeholder-neutral/50 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Cor da peça <span className="text-red-500">*</span>
                    </label>

                    <DropdownCodigoItem
                        items={colors}
                        filterKey="name"
                        placeholder="Selecione"
                        onClickPlaceholder="|Selecione ou pesquise"
                        onSelect={(value, item) => setColor(item.name)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Número de peças
                    </label>
                    <input
                        onChange={(value) => setPieces(Number(value.target.value))}
                        type="number"
                        min="0"
                        defaultValue={0}
                        className="
                            w-full border border-neutral/20 rounded-lg 
                            py-2 px-3 text-sm placeholder-neutral/50
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Preço final
                    </label>
                    <input
                        type="text"
                        value={finalPrice}
                        disabled
                        className="
                            w-full border border-neutral/20 rounded-lg bg-neutral/10
                            py-2 px-3 text-sm placeholder-neutral/50 text-neutral
                        "
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                    Observações (Opcional)
                </label>
                <textarea
                    rows={3}
                    placeholder="Digite as observações"
                    className="
                        w-full border border-neutral/20 rounded-lg 
                        py-2 px-3 text-sm placeholder-neutral/50 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                />
            </div>

            <div className="flex justify-between mt-6">

                <button
                    onClick={() => setEtapa(1)}
                    className="
                        flex items-center gap-2 border border-title 
                        px-5 py-2 rounded-lg text-title font-default
                        hover:bg-neutral/10 transition cursor-pointer
                    "
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                    Voltar
                </button>

                <button
                    onClick={() => {
                        const novoItem = {
                            code,
                            value,
                            brand,
                            color,
                            pieces
                        };

                        setPedido(prev => ({
                            ...prev,
                            products: [...prev.products, novoItem]
                        }));
                    }}
                    className="
                        flex items-center gap-2 bg-title text-white 
                I      s  px-5 py-2 rounded-lg font-default
                        hover:bg-[#012444] transition cIursor-spointer
                    "
                >
                    Adicionar +
                </button>
            </div>
        </div>
    );
}

function renderEtapa(
    etapa: number,
    setEtapa: (value: number) => void,
    pedido: IPedidos,
    setPedido: React.Dispatch<React.SetStateAction<IPedidos>>
) {
    switch (etapa) {
        case 1: return <Etapa1 setEtapa={setEtapa} pedido={pedido} setPedido={setPedido} />;
        case 2: return <Etapa2 setEtapa={setEtapa} pedido={pedido} setPedido={setPedido} />;
        default: return null;
    }
}

interface PedidoProps {
    pedido: IPedidos;
    setPedido: React.Dispatch<React.SetStateAction<IPedidos>>
}

export default function CadastrarPedido({ pedido, setPedido }: PedidoProps) {
    const router = useRouter();
    const [etapa, setEtapa] = useState(1);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="w-full flex justify-center items-start mt-8">
                <div
                    className="rounded-[30px] bg-white p-4 shadow w-[1800px] min-h-[800px]">
                    <button
                        className="cursor-pointer font-title text-xl text-title flex gap-2 mt-6 font-semibold"
                        onClick={() => router.push(`/pedidos/orders-table`)}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                        Cadastrar pedido
                    </button>

                    <div className="mt-10 flex gap-6 flex-1">

                        <ResumoPedido pedido={pedido} />

                        <div className="flex-1 border border-gray-200 rounded-2xl p-6 flex flex-col min-h-[670px]">
                            <div className="flex mb-8">
                                <div className="flex items-center gap-4">

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${etapa === 1
                                        ? 'bg-title text-white'
                                        : 'bg-title text-white'
                                        }`}>
                                        1
                                    </div>

                                    <div className={`h-1 w-24 rounded-full ${etapa === 2
                                        ? 'bg-title'
                                        : 'bg-title/50'
                                        }`}></div>

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${etapa === 2
                                        ? 'bg-title text-white'
                                        : 'bg-title/50 text-white'
                                        }`}>
                                        2
                                    </div>

                                </div>
                            </div>

                            <div className="flex-1">
                                {renderEtapa(etapa, setEtapa, pedido, setPedido)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

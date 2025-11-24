"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import DataInput from "./ui/DataInput";
import { Search } from "lucide-react";
import ClientModal from "./SelectClientModal";
import { DropdownCodigoItem } from "./ui/Dropdown";

interface Cliente {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
}

const itens = [
    { code: "18927-2" },
    { code: "28173-9" },
    { code: "91872-1" },
    { code: "55012-4" },
    { code: "77129-6" }
];

function Etapa1({ setEtapa }: { setEtapa: (value: number) => void }) {
    const [selected, setSelected] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

    const handleSelectCliente = (cliente: Cliente) => {
        setClienteSelecionado(cliente);
        setIsModalOpen(false);
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

                <DataInput />

                <p>
                    Cliente
                    <span className="text-error"> *</span>
                </p>

                {clienteSelecionado ? (
                    <div className="space-y-4">
                        <div className="bg-white border border-neutral/20 rounded-lg p-4">
                            <div className="flex flex-col">
                                <p className="font-default text-neutral mt-2">{clienteSelecionado.nome}</p>
                                <p className="font-default text-neutral mt-2">Telefone</p>
                                <p className="text-sm font-default text-neutral/80 mt-2">{clienteSelecionado.telefone}</p>
                                <p className="font-default text-neutral mt-2">Endereço</p>
                                <p className="text-sm font-default text-neutral/80 mt-2">{clienteSelecionado.endereco}</p>
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
                            font-semibold text-base
                            hover:bg-[#012444]
                            transition-colors
                            cursor-pointer
                        "
                    >
                        Selecionar cliente
                        <Search size={20} strokeWidth={2} />
                    </button>
                )}

                <ClientModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelectCliente={handleSelectCliente}
                />

                <div className="flex justify-end">
                    <button
                        onClick={() => setEtapa(2)}
                        className="
                            font-title text-title
                            flex py-3 px-4 rounded-[5px]
                            border-1 border-title
                            hover:bg-neutral/5 transition-colors
                            cursor-pointer
                        "
                    >
                        Prosseguir
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function Etapa2({ setEtapa }: { setEtapa: (value: number) => void }) {

    return (
        <div className="text-base text-neutral font-default space-y-6">

            <p className="text-neutral font-default">
                Agora, adicione os itens ao pedido:
            </p>

            <div className="grid grid-cols-2 gap-6">
                {/* Código do item */}
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Código do item <span className="text-red-500">*</span>
                    </label>

                    <DropdownCodigoItem
                        items={itens}
                        filterKey="code"
                        placeholder="Selecione"
                    />
                </div>

                {/* Valor do item */}
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Valor do item <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o valor"
                        className="
                            w-full border border-neutral/20 rounded-lg 
                            py-2 px-3 text-sm placeholder-neutral/50 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    />
                </div>

                {/* Marca */}
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Marca <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Digite a marca"
                        className="
                            w-full border border-neutral/20 rounded-lg 
                            py-2 px-3 text-sm placeholder-neutral/50 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    />
                </div>

                {/* Cor da peça */}
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Cor da peça <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="
                            w-full border border-neutral/20 rounded-lg 
                            py-2 px-3 text-sm text-neutral
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    >
                        <option value="">Selecione</option>
                    </select>
                </div>

                {/* Número de peças */}
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Número de peças
                    </label>
                    <input
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

                {/* Preço final */}
                <div className="flex flex-col gap-2">
                    <label className="font-default text-neutral">
                        Preço final
                    </label>
                    <input
                        type="text"
                        placeholder="-"
                        disabled
                        className="
                            w-full border border-neutral/20 rounded-lg bg-neutral/10
                            py-2 px-3 text-sm placeholder-neutral/50 text-neutral
                        "
                    />
                </div>
            </div>

            {/* Observações */}
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

            {/* Botões */}
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
                    className="
                        flex items-center gap-2 bg-title text-white 
                        px-5 py-2 rounded-lg font-default
                        hover:bg-[#012444] transition cursor-pointer
                    "
                >
                    Adicionar +
                </button>
            </div>
        </div>
    );
}

function renderEtapa(etapa: number, setEtapa: (value: number) => void) {
    switch (etapa) {
        case 1: return <Etapa1 setEtapa={setEtapa} />;
        case 2: return <Etapa2 setEtapa={setEtapa} />;
        default: return null;
    }
}

export default function CadastrarPedido() {
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

                        <div className="flex-1 border border-gray-200 rounded-2xl p-6 flex flex-col min-h-[670px]">
                            <h2 className="font-title text-base text-title font-semibold mb-4">Resumo do pedido</h2>

                            <div className="flex-1 flex justify-center items-center text-gray-400">
                                Adicione itens ao pedido
                            </div>
                        </div>

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
                                {renderEtapa(etapa, setEtapa)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

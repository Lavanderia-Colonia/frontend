import { useState } from 'react';
import { Search, X, Save } from 'lucide-react';

interface Cliente {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
}

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCliente: (cliente: Cliente) => void;
}

export default function ClientModal({ isOpen, onClose, onSelectCliente }: ClientModalProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

    // Dados de exemplo
    const clientes: Cliente[] = [
        {
            id: "1",
            nome: "Ana Carolina Souza",
            telefone: "(11) 98765-4321",
            endereco: "Rua Ipiranga, 123 - Centro"
        },
        {
            id: "2",
            nome: "Bruno Henrique Almeida",
            telefone: "(11) 99812-7744",
            endereco: "Av. Fernando Franco, 456"
        },
        {
            id: "3",
            nome: "Camila Ferreira Costa",
            telefone: "(11) 98400-2211",
            endereco: "Rua José Bonifácio, 789"
        },
        {
            id: "4",
            nome: "Diego Rafael Martins",
            telefone: "(11) 99955-8800",
            endereco: "Rua Souza Franco, 200"
        },
        {
            id: "5",
            nome: "Eduarda Silva Pereira",
            telefone: "(11) 99123-4567",
            endereco: "Av. João XXIII, 300 - Martins"
        },
        {
            id: "6",
            nome: "Felipe Augusto Ramos",
            telefone: "(11) 98877-3344",
            endereco: "Rua Carmem Santos, 150"
        },
        {
            id: "7",
            nome: "Gabriela Torres Lima",
            telefone: "(11) 99321-5566",
            endereco: "Rua Deodato Wertheim, 88"
        },
        {
            id: "8",
            nome: "Henrique Lopes Duarte",
            telefone: "(11) 99700-6677",
            endereco: "Av. Rodrigues Filho, 450, Mogi das Cruzes, São Paulo, São Paulo, Brasil"
        }
    ];

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (cliente: Cliente) => {
        setSelectedCliente(cliente);
    };

    const handleConfirmar = () => {
        if (selectedCliente) {
            onSelectCliente(selectedCliente);
            setSelectedCliente(null);
            setSearchTerm("");
        }
    };

    const handleVoltar = () => {
        setSelectedCliente(null);
        setSearchTerm("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-title">Listagem de clientes</h2>
                        <button
                            onClick={handleVoltar}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-gray-600 mb-4">Selecione o cliente:</p>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Busque pelo nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-title"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead className="border-b-2 border-gray-200">
                                <tr>
                                    <th className="text-left pb-3 text-title font-semibold pr-16">Nome do Cliente</th>
                                    <th className="text-left pb-3 text-title font-semibold pr-16">Telefone</th>
                                    <th className="text-left pb-3 text-title font-semibold pr-16">Endereço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesFiltrados.map((cliente, index) => (
                                    <tr
                                        key={cliente.id}
                                        onClick={() => handleRowClick(cliente)}
                                        className={`
                                            cursor-pointer transition-colors
                                            ${selectedCliente?.id === cliente.id
                                                ? 'bg-blue-100 border-l-4 border-title'
                                                : index % 2 === 0
                                                    ? 'bg-white hover:bg-title/20'
                                                    : 'bg-neutral/20 hover:bg-title/20'
                                            }
                                        `}
                                    >
                                        <td className="py-4 pl-2 pr-16 text-gray-700">{cliente.nome}</td>
                                        <td className="py-4 pr-16 text-neutral">{cliente.telefone}</td>
                                        <td className="py-4 pr-16 text-neutral">{cliente.endereco}</td>
                                    </tr>
                                ))}
                                {clientesFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="py-8 text-center text-gray-500">
                                            Nenhum cliente encontrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-6 border-t flex gap-4">
                    <button
                        onClick={handleVoltar}
                        className="flex-1 py-3 border-2 border-title text-title rounded-lg font-default hover:bg-neutral/10 transition-colors cursor-pointer"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={handleConfirmar}
                        disabled={!selectedCliente}
                        className={`
                            flex-1 py-3 rounded-lg font-default transition-colors
                            flex items-center justify-center gap-2 cursor-pointer
                            ${selectedCliente
                                ? 'bg-title text-white hover:bg-[#012444]'
                                : 'bg-gray-300 text-white cursor-not-allowed'
                            }
                        `}
                    >
                        Confirmar
                        <Save size={20} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    );
}
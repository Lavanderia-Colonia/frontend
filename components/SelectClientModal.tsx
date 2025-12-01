import { useState, useEffect, useRef } from 'react';
import { Search, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { getClients, Client } from '@/services/clientService';
import { IClientes } from '@/models/clientes';

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCliente: (cliente: IClientes) => void;
}

const PAGE_SIZE = 10;

export default function ClientModal({ isOpen, onClose, onSelectCliente }: ClientModalProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCliente, setSelectedCliente] = useState<IClientes | null>(null);
    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Limpar timeout anterior se existir
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            // Debounce: aguardar 500ms após o usuário parar de digitar
            searchTimeoutRef.current = setTimeout(() => {
                loadClients();
            }, 500);

            return () => {
                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }
            };
        }
    }, [isOpen, currentPage, searchTerm]);

    const loadClients = async () => {
        setLoading(true);
        try {
            const response = await getClients(
                currentPage,
                PAGE_SIZE,
                searchTerm
            );

            // Converter Client da API para IClientes
            const clientesConvertidos: IClientes[] = response.content
                .filter(cliente => cliente.active) // Apenas clientes ativos
                .map((cliente: Client) => ({
                    id: String(cliente.id),
                    nome: cliente.name,
                    telefone: cliente.telephone,
                    endereco: `${cliente.street}, ${cliente.number} – ${cliente.district}`
                }));

            setClientes(clientesConvertidos);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            setClientes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // Resetar para primeira página ao buscar
    };

    const handleRowClick = (cliente: IClientes) => {
        setSelectedCliente(cliente);
    };

    const handleConfirmar = () => {
        if (selectedCliente) {
            onSelectCliente(selectedCliente);
            setSelectedCliente(null);
            setSearchTerm("");
            setCurrentPage(0);
        }
    };

    const handleVoltar = () => {
        setSelectedCliente(null);
        setSearchTerm("");
        setCurrentPage(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-title">Listagem de clientes</h2>

                        <div className="mt-3 relative">
                            <Search 
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-title" 
                                size={18} 
                            />

                            <input
                                type="text"
                                placeholder="Busque pelo nome"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="
                                    w-full
                                    pl-10
                                    pr-4 py-2
                                    border border-neutral/20
                                    rounded-lg
                                    hover:ring-1 hover:ring-title/60
                                    focus:ring-1 focus:ring-title/60
                                    outline-none
                                "
                            />
                        </div>
                    </div>
                    <p className="text-neutral">Selecione o cliente:</p>
                </div>

                <div className="flex-1 overflow-auto mt-3 ml-6 mr-6 mb-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-neutral">Carregando clientes...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead className="border-b-2 border-title">
                                    <tr>
                                        <th className="text-left pb-3 text-title font-semibold pr-16">Nome do Cliente</th>
                                        <th className="text-left pb-3 text-title font-semibold pr-16">Telefone</th>
                                        <th className="text-left pb-3 text-title font-semibold pr-16">Endereço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente, index) => (
                                        <tr
                                            key={cliente.id}
                                            onClick={() => handleRowClick(cliente)}
                                            className={`
                                                cursor-pointer transition-colors
                                                ${selectedCliente?.id === cliente.id
                                                    ? 'bg-blue-100 border-l-4 border-title'
                                                    : index % 2 === 0
                                                        ? 'bg-white hover:bg-title/20'
                                                        : 'bg-title/5 hover:bg-title/20'
                                                }
                                            `}
                                        >
                                            <td className="py-4 pl-2 pr-16 text-neutral">{cliente.nome}</td>
                                            <td className="py-4 pr-16 text-neutral">{cliente.telefone}</td>
                                            <td className="py-4 pr-16 text-neutral">{cliente.endereco}</td>
                                        </tr>
                                    ))}
                                    {clientes.length === 0 && !loading && (
                                        <tr>
                                            <td colSpan={3} className="py-8 text-center text-neutral">
                                                Nenhum cliente encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {!loading && totalPages > 1 && (
                    <div className="px-6 pb-4 flex items-center justify-between">
                        <span className="text-sm text-neutral/60">
                            Mostrando {clientes.length} de {totalElements} clientes
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                disabled={currentPage === 0}
                                className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5 text-neutral/60" />
                            </button>
                            <span className="text-sm text-neutral/60">
                                Página {currentPage + 1} de {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-5 h-5 text-neutral/60" />
                            </button>
                        </div>
                    </div>
                )}

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
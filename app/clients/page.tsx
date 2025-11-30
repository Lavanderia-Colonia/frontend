"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Search, Plus, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getClients, Client, GetClientsResponse, toogleActiveClient } from "../../services/clientService";

const PAGE_SIZE = 10;

export default function ClientesDashboard() {
  const router = useRouter();

  const [clientes, setClientes] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    loadClients();
  }, [currentPage, searchTerm]);

  const loadClients = async () => {
    try {
      const response: GetClientsResponse = await getClients(
        currentPage,
        PAGE_SIZE,
        searchTerm
      );

      setClientes(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const toggleActive = async (id: number) => {
    try {
      const updated = await toogleActiveClient(String(id));

      setClientes((prev) =>
        prev.map((cliente) =>
          cliente.id === id ? { ...cliente, active: updated.active } : cliente
        )
      );
    } catch (error) {
      console.error("Erro ao ativar/desativar cliente:", error);
    }
  };

  const generatePagination = () => {
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded ${currentPage === i
            ? "bg-title text-white"
            : "hover:bg-gray-100 text-neutral/60"
            }`}
        >
          {i + 1}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-slate-100">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-title">Clientes</h1>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Busque pelo nome"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#012444] text-neutral/40 placeholder-neutral/40"
                />
              </div>

              <button
                onClick={() => router.push("/clients/cadastrar")}
                className="flex items-center gap-2 bg-title text-white px-6 py-2 rounded-lg hover:bg-[#012444] transition-colors"
              >
                Adicionar
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-title">
                    Nome do Cliente
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-title">
                    Telefone
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-title">
                    Endereço
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-title">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {clientes.map((cliente, index) => (
                  <tr
                    key={cliente.id}
                    className={`border-b border-gray-100 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm text-neutral/60">
                      {cliente.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral/60">
                      {cliente.telephone}
                    </td>

                    <td className="px-6 py-4 text-sm text-neutral/60">
                      {cliente.street}, {cliente.number} – {cliente.district}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            localStorage.setItem("selectedClient", JSON.stringify(cliente));
                            router.push(`/clients/${cliente.id}`);
                          }}
                          className="text-neutral/60 hover:text-title transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => toggleActive(cliente.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${cliente.active ? "bg-sucess" : "bg-neutral/20"
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${cliente.active ? "translate-x-6" : "translate-x-1"
                              }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-4 mt-6">
            <span className="text-sm text-neutral/60">
              Mostrando {clientes.length} de {totalElements}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-5 h-5 text-neutral/60" />
              </button>

              {generatePagination()}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
                }
                className="p-2 rounded hover:bg-gray-100 transition-colors"
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="w-5 h-5 text-neutral/60" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

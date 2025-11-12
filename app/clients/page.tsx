"use client";
import Header from "@/components/Header";
import React, { useState } from 'react';
import { Search, Plus, Eye, ChevronLeft, ChevronRight } from 'lucide-react';


export default function ClientesDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Ana Carolina Souza', telefone: '(11) 98765-4321', endereco: 'Rua Ipiranga, 123 – Centro, Mogi das Cruzes/SP', ativo: true },
    { id: 2, nome: 'Bruno Henrique Almeida', telefone: '(11) 99812-7744', endereco: 'Av. Fernando Franco, 850 – Mogi das Cruzes/SP', ativo: false },
    { id: 3, nome: 'Camila Ferreira Costa', telefone: '(11) 98400-2211', endereco: 'Rua José Bonifácio, 45 – Mogi das Cruzes/SP', ativo: true },
    { id: 4, nome: 'Diego Rafael Martins', telefone: '(11) 99955-8800', endereco: 'Rua Souza Franco, 200 – Mogi das Cruzes/SP', ativo: true },
    { id: 5, nome: 'Eduarda Silva Pereira', telefone: '(11) 99123-4567', endereco: 'Av. João XXIII, 300 – Mogi das Cruzes/SP', ativo: true },
    { id: 6, nome: 'Felipe Augusto Ramos', telefone: '(11) 98877-3344', endereco: 'Rua Carmem Santos, 89 – Mogi das Cruzes/SP', ativo: true },
    { id: 7, nome: 'Gabriela Torres Lima', telefone: '(11) 99321-5566', endereco: 'Rua Deodato Wertheimer, 150 – Mogi das Cruzes/SP', ativo: true },
    { id: 8, nome: 'Henrique Lopes Duarte', telefone: '(11) 99700-6677', endereco: 'Av. Rodrigues Filho, 455 – Mogi das Cruzes/SP', ativo: true },
    { id: 9, nome: 'Isabela Rocha Nunes', telefone: '(11) 99654-2233', endereco: 'Rua Manoel Caetano, 300 – Mogi das Cruzes/SP', ativo: true },
    { id: 10, nome: 'João Pedro Barros', telefone: '(11) 98981-7788', endereco: 'Av. Carlos Lopes, 900 – Mogi das Cruzes/SP', ativo: true },
  ]);

  const [activeTab, setActiveTab] = useState('clientes');

  const toggleAtivo = (id: number) => {
    setClientes(clientes.map(cliente => 
      cliente.id === id ? { ...cliente, ativo: !cliente.ativo } : cliente
    ));
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = 30;

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="min-h-screen bg-slate-100">
        <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-blue-900">Clientes</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Busque pelo nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#A2A2A2] placeholder-[#A2A2A2]"
              />
            </div>
            
            <button className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Adicionar
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Nome do Cliente</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Telefone</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Endereço</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-blue-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente, index) => (
                <tr 
                  key={cliente.id} 
                  className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{cliente.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cliente.telefone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cliente.endereco}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="text-gray-600 hover:text-blue-900 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleAtivo(cliente.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          cliente.ativo ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            cliente.ativo ? 'translate-x-6' : 'translate-x-1'
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

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <span className="text-sm text-gray-600">Mostrando 10 de 300</span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <button 
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              1
            </button>
            <button 
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-1 rounded ${currentPage === 2 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              2
            </button>
            <button 
              onClick={() => setCurrentPage(3)}
              className={`px-3 py-1 rounded ${currentPage === 3 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              3
            </button>
            
            <span className="px-2 text-gray-400">...</span>
            
            <button 
              onClick={() => setCurrentPage(30)}
              className={`px-3 py-1 rounded ${currentPage === 30 ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              30
            </button>
            
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
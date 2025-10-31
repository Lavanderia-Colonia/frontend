"use client";

import React, { useState } from 'react';
import { Search, Plus, Eye } from 'lucide-react';

// Tipos
interface Pedido {
  codigo: string;
  nomeCliente: string;
  pecas: number;
  lancamento: string;
  finalizacao: string;
  valorTotal: number;
  status: 'aberto' | 'pago' | 'cancelado';
}

// Dados de exemplo
const pedidosExemplo: Pedido[] = [
  {
    codigo: '#112345',
    nomeCliente: 'Ana Carolina Souza',
    pecas: 2,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'aberto'
  },
  {
    codigo: '#112344',
    nomeCliente: 'Bruno Henrique Almeida',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'pago'
  },
  {
    codigo: '#112343',
    nomeCliente: 'Camila Ferreira Costa',
    pecas: 2,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'cancelado'
  },
  {
    codigo: '#112342',
    nomeCliente: 'Diego Rafael Martins',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'aberto'
  },
  {
    codigo: '#112341',
    nomeCliente: 'Eduarda Silva Pereira',
    pecas: 6,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'pago'
  },
  {
    codigo: '#112340',
    nomeCliente: 'Felipe Augusto Ramos',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'cancelado'
  },
  {
    codigo: '#112339',
    nomeCliente: 'Gabriela Torres Lima',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'aberto'
  },
  {
    codigo: '#112338',
    nomeCliente: 'Henrique Lopes Duarte',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'pago'
  },
  {
    codigo: '#112337',
    nomeCliente: 'Isabela Rocha Nunes',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'cancelado'
  },
  {
    codigo: '#112336',
    nomeCliente: 'João Pedro Barros',
    pecas: 5,
    lancamento: '24/10/2025',
    finalizacao: '23/10/2025',
    valorTotal: 1100.00,
    status: 'aberto'
  }
];

const PedidosPage = () => {
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-500';
      case 'cancelado':
        return 'bg-red-500';
      case 'aberto':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="w-12 h-12"
            />
            <span className="text-xl font-semibold text-blue-700">Lavanderia</span>
          </div>
          <nav className="flex gap-6">
            <a href="/pedidos" className="font-semibold text-blue-700 border-b-2 border-blue-700 pb-4">
              Pedidos
            </a>
            <a href="/clientes" className="text-gray-600 hover:text-gray-900 pb-4">
              Clientes
            </a>
            <a href="/configuracoes" className="text-gray-600 hover:text-gray-900 pb-4">
              Configurações
            </a>
          </nav>
        </div>
        <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Filtros e Busca */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-semibold text-gray-800">Pedidos</h1>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    className="w-4 h-4"
                    onChange={() => setFiltroStatus('aberto')}
                  />
                  <span className="text-sm text-gray-600">Em aberto - Estoque</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    className="w-4 h-4"
                    onChange={() => setFiltroStatus('pago')}
                  />
                  <span className="text-sm text-gray-600">Pago - Saída</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    className="w-4 h-4"
                    onChange={() => setFiltroStatus('cancelado')}
                  />
                  <span className="text-sm text-gray-600">Cancelado</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Busque pelo código do pedido"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 transition-colors">
                Cadastrar
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Código</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nome do Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Peças</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lançamento</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Finalização</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Valor Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidosExemplo.map((pedido, index) => (
                  <tr 
                    key={pedido.codigo} 
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-4 text-sm text-gray-600">{pedido.codigo}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{pedido.nomeCliente}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{pedido.pecas}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{pedido.lancamento}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{pedido.finalizacao}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{formatarMoeda(pedido.valorTotal)}</td>
                    <td className="py-4 px-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(pedido.status)}`}></div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-gray-600 hover:text-blue-700 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="flex justify-end items-center gap-2 mt-6">
            <span className="text-sm text-gray-600 mr-4">Mostrando 10 de 300</span>
            <button 
              className="p-2 border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-blue-700 text-white rounded font-semibold">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">3</button>
            <span className="px-2">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">30</button>
            <button 
              className="p-2 border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => setPaginaAtual(paginaAtual + 1)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PedidosPage;
"use client";

import React, { useState } from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import Image from 'next/image';

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
        return 'bg-white border-2 border-gray-300';
      default:
        return 'bg-white border-2 border-gray-300';
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={44} 
                height={44}
                className="object-contain"
              />
            </div>
            <nav className="flex gap-8">
              <a 
                href="/pedidos" 
                className="text-blue-800 font-medium border-b-3 border-blue-800 pb-3 text-[15px]"
              >
                Pedidos
              </a>
              <a 
                href="/clientes" 
                className="text-gray-500 hover:text-gray-700 pb-3 text-[15px]"
              >
                Clientes
              </a>
              <a 
                href="/configuracoes" 
                className="text-gray-500 hover:text-gray-700 pb-3 text-[15px]"
              >
                Configurações
              </a>
            </nav>
          </div>
          <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-[15px]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-[1400px] mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Filtros e Busca */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-[26px] font-semibold text-blue-900">Pedidos</h1>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      className="w-4 h-4 accent-gray-400"
                      onChange={() => setFiltroStatus('aberto')}
                    />
                    <span className="text-[14px] text-gray-600">Em aberto - Estoque</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      className="w-4 h-4 accent-green-500"
                      onChange={() => setFiltroStatus('pago')}
                    />
                    <span className="text-[14px] text-gray-600">Pago - Saída</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      className="w-4 h-4 accent-red-500"
                      onChange={() => setFiltroStatus('cancelado')}
                    />
                    <span className="text-[14px] text-gray-600">Cancelado</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
                  <input
                    type="text"
                    placeholder="Busque pelo código do pedido"
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[320px] text-[14px]"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                <button className="bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-900 transition-colors text-[14px]">
                  Cadastrar
                  <Plus className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="text-left py-3.5 px-8 text-[13px] font-semibold text-gray-700">Código</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Nome do Cliente</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Peças</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Lançamento</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Finalização</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Valor Total</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3.5 px-4 text-[13px] font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidosExemplo.map((pedido, index) => (
                  <tr 
                    key={pedido.codigo} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="py-4 px-8 text-[13px] text-gray-500">{pedido.codigo}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-700">{pedido.nomeCliente}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-500">{pedido.pecas}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-500">{pedido.lancamento}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-500">{pedido.finalizacao}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-500">{formatarMoeda(pedido.valorTotal)}</td>
                    <td className="py-4 px-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(pedido.status)}`}></div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-gray-400 hover:text-blue-700 transition-colors p-1">
                        <Eye className="w-[20px] h-[20px]" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="flex justify-end items-center gap-2 px-8 py-6 border-t border-gray-100">
            <span className="text-[13px] text-gray-600 mr-4">Mostrando 10 de 300</span>
            <button 
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="min-w-[36px] px-3 py-2 bg-blue-800 text-white rounded font-medium text-[13px] hover:bg-blue-900 transition-colors">
              1
            </button>
            <button className="min-w-[36px] px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-[13px] transition-colors">
              2
            </button>
            <button className="min-w-[36px] px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-[13px] transition-colors">
              3
            </button>
            <span className="px-2 text-gray-500 text-[13px]">...</span>
            <button className="min-w-[36px] px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-[13px] transition-colors">
              30
            </button>
            <button 
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              onClick={() => setPaginaAtual(paginaAtual + 1)}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
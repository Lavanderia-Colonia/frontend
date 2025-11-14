"use client";
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Clock, Edit } from 'lucide-react';
import Header from "@/components/Header";

export default function ClientDetails() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id;

  // Dados de exemplo - substitua pela busca real do cliente
  const cliente = {
    id: clientId,
    nomeCompleto: 'Ana Carolina Souza',
    telefone: '(11) 12345-6789',
    logradouro: 'Rua Ipiranga',
    numero: '126',
    bairro: 'Centro',
    cep: '12345-678',
    complemento: '-'
  };

  const handleEdit = () => {
    router.push(`/clients/${clientId}/edit`);
  };

  const handleBack = () => {
    router.push('/clients');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header com botão voltar e título */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Detalhes do cliente - {cliente.nomeCompleto}
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <Clock size={18} />
              Histórico
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit size={18} />
              Editar
            </button>
          </div>
        </div>

        {/* Card com informações do cliente */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {/* Nome completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo
              </label>
              <p className="text-gray-900">{cliente.nomeCompleto}</p>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <p className="text-gray-900">{cliente.telefone}</p>
            </div>

            {/* Logradouro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logradouro
              </label>
              <p className="text-gray-900">{cliente.logradouro}</p>
            </div>

            {/* Número */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número
              </label>
              <p className="text-gray-900">{cliente.numero}</p>
            </div>

            {/* Bairro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bairro
              </label>
              <p className="text-gray-900">{cliente.bairro}</p>
            </div>

            {/* CEP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <p className="text-gray-900">{cliente.cep}</p>
            </div>

            {/* Complemento */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complemento
              </label>
              <p className="text-gray-900">{cliente.complemento}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
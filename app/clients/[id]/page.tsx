"use client";
import { useRouter, useParams } from 'next/navigation';
import { Clock, Edit } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";

export default function ClientDetails() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id;

  // Dados de exemplo - substituir por busca real do cliente
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

  const handleHistory = () => {
    router.push(`/clients/${clientId}/history`);
  };

  const handleBack = () => {
    router.push('/clients');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="w-full flex justify-center">
          <div className="rounded-3xl bg-white p-6 shadow w-full min-h-[260px]">
            {/* Header com botão voltar e título */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleBack}
                  className="text-title hover:text-[#012444] flex items-center mr-1"
                >
                  <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                </button>
                <h1 className="text-2xl font-bold text-title">
                  Detalhes do cliente - {cliente.nomeCompleto}
                </h1>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleHistory}
                  className="flex items-center gap-2 px-5 py-2 border border-title rounded-lg hover:bg-title/10 text-title font-semibold transition-colors"
                >
                  Histórico
                  <Clock size={18} />
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-5 py-2 bg-title text-white rounded-lg hover:bg-[#012444] font-semibold transition-colors"
                >
                  Editar
                  <Edit size={18} />
                </button>
              </div>
            </div>

            {/* Card com informações do cliente */}
            <div className="mt-4 grid grid-cols-2 gap-x-24 gap-y-6">
              {/* Nome completo */}
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Nome completo
                </span>
                <span className="text-neutral">
                  {cliente.nomeCompleto}
                </span>
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Telefone
                </span>
                <span className="text-neutral">
                  {cliente.telefone}
                </span>
              </div>

              {/* Logradouro */}
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Logradouro
                </span>
                <span className="text-neutral">
                  {cliente.logradouro}
                </span>
              </div>

              {/* Número */}
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Número
                </span>
                <span className="text-neutral">
                  {cliente.numero}
                </span>
              </div>

              {/* Bairro */}
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Bairro
                </span>
                <span className="text-neutral">
                  {cliente.bairro}
                </span>
              </div>

              {/* CEP */}
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  CEP
                </span>
                <span className="text-neutral">
                  {cliente.cep}
                </span>
              </div>

              {/* Complemento */}
              <div className="col-span-2 flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Complemento
                </span>
                <span className="text-neutral">
                  {cliente.complemento}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
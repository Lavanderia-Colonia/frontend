"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Client } from "@/services/clientService";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Clock, Edit } from "lucide-react";
import { formatCEP, formatPhone } from "@/utils/clientUtils";

export default function ClientDetailsPage() {
  const router = useRouter();

  const [client] = useState<Client | null>(() => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("selectedClient");
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error("Erro ao parsear cliente:", err);
      return null;
    }
  });

  const handleEdit = () => {
    if (!client) return;
    router.push(`/clients/${client.id}/edit`);
  };
  const handleHistory = () => {
    if (!client) return;
    router.push(`/clients/${client.id}/history`);
  };
  const handleBack = () => {
    router.push('/clients');
  };

  if (!client) {
    return (
      <div className="p-6 text-center">
        <p className="text-neutral/60">Nenhum cliente encontrado.</p>

        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-title text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="w-full flex justify-center">
          <div className="rounded-3xl bg-white p-6 shadow w-full min-h-[260px]">

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleBack}
                  className="text-title hover:text-[#012444] flex items-center mr-1" >
                  <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                </button>
                <h1 className="text-2xl font-bold text-title"> Detalhes do cliente - {client.name} </h1>
              </div>
              <div className="flex gap-3">

                <button
                  onClick={handleHistory}
                  className="flex items-center gap-2 px-5 py-2 border border-title rounded-lg hover:bg-title/10 text-title font-semibold transition-colors" >
                  Histórico
                  <Clock size={18} />
                </button>

                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-5 py-2 bg-title text-white rounded-lg hover:bg-[#012444] font-semibold transition-colors" >
                  Editar
                  <Edit size={18} />
                </button>

              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-24 gap-y-6">
              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Nome completo </span>
                <span className="text-neutral">
                  {client.name}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Telefone
                </span>
                <span className="text-neutral">
                  {formatPhone(client.telephone)}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Logradouro
                </span>
                <span className="text-neutral">
                  {client.street}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Número
                </span>
                <span className="text-neutral">
                  {client.number}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Bairro
                </span>
                <span className="text-neutral">
                  {client.district}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-default text-neutral">
                  CEP
                </span>
                <span className="text-neutral">
                  {formatCEP(client.zipCode)}
                </span>
              </div>

              <div className="col-span-2 flex flex-col gap-1">
                <span className="font-default text-neutral">
                  Complemento
                </span>
                <span className="text-neutral">
                  {client.complement || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

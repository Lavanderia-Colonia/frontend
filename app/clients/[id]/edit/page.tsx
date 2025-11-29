// 

"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function ClientEdit() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id;

  // Estado inicial com os dados do cliente
  const [formData, setFormData] = useState({
    nomeCompleto: 'Ana Carolina Souza',
    telefone: '(11) 12345-6789',
    logradouro: 'Rua Ipiranga',
    numero: '126',
    bairro: 'Centro',
    cep: '12345-678',
    complemento: '-'
  });

  // Estado para controlar os modais
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "danger" as "danger" | "success" | "warning",
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {}
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackClick = () => {
    // Mostra modal de confirmação antes de descartar
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Descartar?",
      message: "Tem certeza de que deseja descartar as alterações feitas? Essa ação não poderá ser desfeita.",
      confirmText: "Descartar",
      cancelText: "Cancelar",
      onConfirm: () => {
        closeModal();
        router.push(`/clients/${clientId}`);
      }
    });
  };

  const handleCancelClick = () => {
    // Mesmo comportamento do botão voltar
    handleBackClick();
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica de salvamento
    console.log('Salvando dados:', formData);
    
    // Fecha qualquer modal aberto e mostra o de sucesso
    closeModal();
    
    // Simula processamento
    setTimeout(() => {
      setModalConfig({
        isOpen: true,
        type: "success",
        title: "Sucesso!",
        message: "As alterações foram salvas com sucesso!",
        confirmText: "Voltar",
        cancelText: "Fechar",
        onConfirm: () => {
          closeModal();
          router.push(`/clients/${clientId}`);
        }
      });
    }, 300);
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Card de edição */}
          <div className="bg-white rounded-3xl shadow p-8">
            {/* Header com botão voltar e título */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleBackClick}
                  className="text-title hover:text-[#012444] flex items-center mr-1"
                >
                  <FontAwesomeIcon icon={faCaretLeft} size="lg" />
                </button>
                <h1 className="text-2xl font-bold text-title">
                  Editar cliente - {formData.nomeCompleto}
                </h1>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancelClick}
                  className="px-6 py-2 border border-title rounded-lg hover:bg-title/10 text-title font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-title text-white rounded-lg hover:bg-[#012444] font-semibold transition-colors"
                >
                  <Save size={18} />
                  Salvar
                </button>
              </div>
            </div>

            {/* Formulário de edição */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Nome completo */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Telefone
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>

              {/* Logradouro */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Logradouro
                </label>
                <input
                  type="text"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  placeholder="Digite o logradouro"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>

              {/* Número */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Número
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Digite o número"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>

              {/* Bairro */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Digite o bairro"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>

              {/* CEP */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>

              {/* Complemento */}
              <div className="col-span-2 flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Digite o complemento"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm text-neutral placeholder-neutral/50 
                    focus:outline-none focus:ring-1 focus:ring-title
                  "
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        type={modalConfig.type}
      />
    </>
  );
}
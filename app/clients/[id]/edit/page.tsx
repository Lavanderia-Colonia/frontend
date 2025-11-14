// 

"use client";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
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
          {/* Header com botão voltar e título */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackClick}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Editar cliente - {formData.nomeCompleto}
              </h1>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCancelClick}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={18} />
                Salvar
              </button>
            </div>
          </div>

          {/* Formulário de edição */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Nome completo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Logradouro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logradouro
                </label>
                <input
                  type="text"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  placeholder="Digite o logradouro"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Número */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Digite o número"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Bairro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Digite o bairro"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* CEP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Complemento */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Digite o complemento"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
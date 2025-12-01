// 

"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import ConfirmationModal from "@/components/ConfirmationModal";
import { updateClient, Client } from "@/services/clientService";
import { formatCEP, formatPhone, unformatCEP, unformatPhone } from "@/utils/clientUtils";
import SuccessModal from "@/components/SuccessModal";

export default function ClientEdit() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Funções de formatação (máscaras)
  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length === 0) return "";

    // DDD
    if (numbers.length <= 2) {
      return `(${numbers}`;
    }

    const ddd = numbers.slice(0, 2);
    const restante = numbers.slice(2);

    if (numbers.length <= 10) {
      if (restante.length <= 4) {
        return `(${ddd}) ${restante}`;
      }

      return `(${ddd}) ${restante.slice(0, 4)}-${restante.slice(4)}`;
    }

    if (restante.length <= 5) {
      return `(${ddd}) ${restante}`;
    }

    return `(${ddd}) ${restante.slice(0, 5)}-${restante.slice(5)}`;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2").replace(/-$/, "");
  };
  
  // Estado inicial com os dados do cliente - carregar do localStorage
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") {
      return {
        nomeCompleto: '',
        telefone: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cep: '',
        complemento: ''
      };
    }

    const stored = localStorage.getItem("selectedClient");
    if (!stored) {
      return {
        nomeCompleto: '',
        telefone: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cep: '',
        complemento: ''
      };
    }

    try {
      const client: Client = JSON.parse(stored);
      return {
        nomeCompleto: client.name || '',
        telefone: formatPhone(client.telephone || ''),
        logradouro: client.street || '',
        numero: client.number || '',
        bairro: client.district || '',
        cep: formatCEP(client.zipCode || ''),
        complemento: client.complement || ''
      };
    } catch (err) {
      console.error("Erro ao parsear cliente do localStorage:", err);
      return {
        nomeCompleto: '',
        telefone: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cep: '',
        complemento: ''
      };
    }
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

    if (name === 'telefone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatTelefone(value)
      }));
    } else if (name === 'cep') {
      setFormData(prev => ({
        ...prev,
        [name]: formatCEP(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

  const handleSave = async () => {
    // Validações
    if (!formData.nomeCompleto.trim()) {
      alert("Por favor, informe o nome completo.");
      return;
    }

    if (!formData.telefone.trim()) {
      alert("Por favor, informe o telefone.");
      return;
    }

    if (!formData.logradouro.trim()) {
      alert("Por favor, informe o logradouro.");
      return;
    }

    if (!formData.numero.trim()) {
      alert("Por favor, informe o número.");
      return;
    }

    if (!formData.bairro.trim()) {
      alert("Por favor, informe o bairro.");
      return;
    }

    if (!formData.cep.trim()) {
      alert("Por favor, informe o CEP.");
      return;
    }

    setLoading(true);
    closeModal();

    try {
      // Preparar dados para a API (remover formatação)
      const clientData = {
        name: formData.nomeCompleto.trim(),
        telephone: unformatPhone(formData.telefone),
        street: formData.logradouro.trim(),
        number: formData.numero.trim(),
        district: formData.bairro.trim(),
        zipCode: unformatCEP(formData.cep),
        complement: formData.complemento.trim() || undefined
      };

      await updateClient(clientId, clientData);
      
      // Atualizar localStorage com os dados atualizados
      const updatedClient: Client = {
        id: Number(clientId),
        active: true,
        name: clientData.name,
        telephone: clientData.telephone,
        street: clientData.street,
        number: clientData.number,
        district: clientData.district,
        zipCode: clientData.zipCode,
        complement: clientData.complement || "",
        createdAt: "",
        updatedAt: ""
      };
      localStorage.setItem("selectedClient", JSON.stringify(updatedClient));
      
      // Mostrar modal de sucesso
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      alert(error.message || "Erro ao atualizar cliente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push(`/clients/${clientId}`);
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
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-2 bg-title text-white rounded-lg hover:bg-[#012444] font-semibold transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Save size={18} />
                  {loading ? "Salvando..." : "Salvar"}
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

      {/* Modal de Sucesso */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Cliente atualizado com sucesso!"
        message="As alterações foram salvas com sucesso."
        buttonText="OK"
      />
    </>
  );
}
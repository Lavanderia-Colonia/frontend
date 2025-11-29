"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import ConfirmationModal from "@/components/ConfirmationModal";
import SuccessModal from "@/components/SuccessModal";

export default function CadastrarCliente() {
  const router = useRouter();

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cep: '',
    complemento: ''
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Função para formatar telefone dinamicamente enquanto o usuário digita
  // Suporta tanto (XX) XXXX-XXXX quanto (XX) XXXXX-XXXX
  const formatTelefone = (value: string) => {
    let numbers = value.replace(/\D/g, "").slice(0, 11); // limita a 11 dígitos

    if (numbers.length === 0) return "";

    // DDD
    if (numbers.length <= 2) {
      return `(${numbers}`;
    }

    const ddd = numbers.slice(0, 2);
    let restante = numbers.slice(2);

    // Telefones fixos (até 10 dígitos no total => 8 no restante)
    if (numbers.length <= 10) {
      if (restante.length <= 4) {
        // ainda sem traço
        return `(${ddd}) ${restante}`;
      }

      // 4 + até 4
      return `(${ddd}) ${restante.slice(0, 4)}-${restante.slice(4)}`;
    }

    // Celulares (11 dígitos => 9 no restante)
    if (restante.length <= 5) {
      // ainda sem traço
      return `(${ddd}) ${restante}`;
    }

    // 5 + até 4
    return `(${ddd}) ${restante.slice(0, 5)}-${restante.slice(5)}`;
  };

  // Função para formatar CEP no padrão 00000-000 enquanto digita
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8); // limita a 8 dígitos
    return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2").replace(/-$/, "");
  };

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
    // Verifica se há dados preenchidos
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    
    if (hasData) {
      // Mostra modal de confirmação antes de descartar
      setModalConfig({
        isOpen: true,
        type: "danger",
        title: "Descartar?",
        message: "Tem certeza de que deseja descartar as informações preenchidas? Essa ação não poderá ser desfeita.",
        confirmText: "Descartar",
        cancelText: "Cancelar",
        onConfirm: () => {
          closeModal();
          router.push('/clients');
        }
      });
    } else {
      router.push('/clients');
    }
  };

  const handleCancelClick = () => {
    // Sempre mostra a modal de descarte ao clicar em Cancelar,
    // independentemente de haver dados preenchidos ou não
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Descartar?",
      message: "Tem certeza de que deseja descartar as informações preenchidas? Essa ação não poderá ser desfeita.",
      confirmText: "Descartar",
      cancelText: "Cancelar",
      onConfirm: () => {
        closeModal();
        router.push('/clients');
      }
    });
  };

  const validateForm = () => {
    const requiredFields = [
      'nomeCompleto',
      'telefone',
      'logradouro',
      'numero',
      'bairro',
      'cep',
      'complemento'
    ];
    return requiredFields.every(
      field => formData[field as keyof typeof formData].trim() !== ''
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      setModalConfig({
        isOpen: true,
        type: "warning",
        title: "Campos obrigatórios",
        message: "Por favor, preencha todos os campos obrigatórios antes de salvar.",
        confirmText: "OK",
        cancelText: "Fechar",
        onConfirm: () => {
          closeModal();
        }
      });
      return;
    }

    // Aqui você implementaria a lógica de salvamento real (API, etc.)
    console.log('Salvando dados:', formData);

    // Garante que qualquer modal anterior esteja fechado
    closeModal();

    // Simula processamento e abre o modal de sucesso
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 300);
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const isFormValid = validateForm();

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Formulário de cadastro */}
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
                  Cadastrar cliente
                </h1>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancelClick}
                  className="px-6 py-2 border border-title rounded-lg hover:bg-title/10 text-title transition-colors font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isFormValid}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors
                    ${isFormValid
                      ? 'bg-title text-white hover:bg-[#012444] cursor-pointer'
                      : 'bg-neutral/30 text-white cursor-not-allowed'
                    }
                  `}
                >
                  <Save size={18} />
                  Salvar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Nome completo */}
              <div className="flex flex-col gap-2">
                <label className="font-default text-neutral">
                  Nome completo <span className="text-red-500">*</span>
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
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
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
                  Logradouro <span className="text-red-500">*</span>
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
                  Número <span className="text-red-500">*</span>
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
                  Bairro <span className="text-red-500">*</span>
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
                  CEP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  maxLength={9}
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
                  Complemento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Digite o complemento"
                  className="
                    w-full border border-neutral/20 rounded-lg 
                    py-2 px-3 text-sm placeholder-neutral/50 
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
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          router.push('/clients');
        }}
        title="Sucesso!"
        message="Cliente cadastrado com sucesso!"
        buttonText="Voltar"
      />
    </>
  );
}


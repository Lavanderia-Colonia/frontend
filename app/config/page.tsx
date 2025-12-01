"use client";
import React, { useEffect, useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import Header from '@/components/Header';
import { changeName, changePassword, viewAdmin, viewAdminResponse } from '@/services/userService';

type AuditLog = {
  id: number;
  message: string;
  timestamp: string;
};

const sampleAuditLogs: AuditLog[] = [
  { id: 1, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 2, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 3, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 4, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 5, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 6, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 7, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 8, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 9, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
  { id: 10, message: "Cliente adicionado!", timestamp: "30/10/2025 - 18:00" },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'privacidade' | 'auditoria'>('privacidade');
  const [username, setUsername] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false);

  const [admin, setAdmin] = useState<viewAdminResponse | null>(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [editingPassword, setEditingPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    async function loadAdmin() {
      try {
        const data = await viewAdmin();
        setAdmin(data);
        setUsername(data.name);
      } catch (error) {
        console.error("Erro ao carregar admin:", error);
      } finally {
        setLoadingAdmin(false);
      }
    }

    loadAdmin();
  }, []);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleChangeName = (value: string) => {
    setUsername(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await changeName(value);
      } catch (err) {
        console.error("Erro ao atualizar nome", err);
      }
    }, 1500);
  };

  const handleChangePassword = async () => {
    if (!senhaAtual || !novaSenha || !confirmaSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 8) {
      alert("A nova senha deve conter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmaSenha) {
      alert("A nova senha e a confirmação devem ser iguais.");
      return;
    }

    try {
      setSavingPassword(true);
      await changePassword(senhaAtual, novaSenha);

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmaSenha("");
      setEditingPassword(false);
    } catch (err) {
      alert("Erro ao alterar senha.");
      console.error(err);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-blue-900 mb-8">Configurações</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('privacidade')}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'privacidade'
              ? 'text-blue-900 border-blue-900'
              : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
          >
            Privacidade e segurança
          </button>
          <button
            onClick={() => setActiveTab('auditoria')}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'auditoria'
              ? 'text-blue-900 border-blue-900'
              : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
          >
            Registro de auditoria
          </button>
        </div>

        {activeTab === 'privacidade' && (
          <div className="max-w-xl space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do usuário
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => handleChangeName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-blue-900">Alterar senha</h2>
                <button
                  onClick={handleChangePassword}
                  disabled={savingPassword}
                  className="flex items-center gap-2 px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Alterar
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha atual
                </label>
                <div className="relative">
                  <input
                    type={showSenhaAtual ? "text" : "password"}
                    placeholder="Digite sua senha atual"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showSenhaAtual ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Nova senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova senha
                </label>
                <div className="relative">
                  <input
                    type={showNovaSenha ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNovaSenha(!showNovaSenha)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNovaSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirme a nova senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirme a nova senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirmaSenha ? "text" : "password"}
                    placeholder="Confirme sua nova senha"
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmaSenha(!showConfirmaSenha)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmaSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registro de auditoria Tab */}
        {activeTab === 'auditoria' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-blue-900 pb-4 border-b-2 border-blue-900 inline-block">
              Mensagem de atualização
            </h2>

            <div className="space-y-3">
              {sampleAuditLogs.map((log, index) => (
                <div
                  key={log.id}
                  className={`px-6 py-4 rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                >
                  <p className="text-sm text-gray-600">
                    {log.message} - {log.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
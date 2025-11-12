"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples - você deve substituir pela sua lógica de autenticação
    // Exemplo: usuário "admin" e senha "123456"
    if (username.trim() === "admin" && password === "123456") {
      // Login bem-sucedido - redireciona para a tela OrdersTable
      router.push("/orders-table");
    } else {
      // Dados incorretos - mostra modal de erro
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Lado Esquerdo - Formulário */}
        <div className="w-1/2 bg-white flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-slate-600 mb-8">
              Insira seus dados para continuar:
            </p>

            <form onSubmit={handleLogin}>
              {/* Campo Nome de usuário */}
              <div className="mb-6">
                <label className="block text-slate-700 font-medium mb-2">
                  Nome de usuário
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite o nome de usuário"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#A2A2A2] placeholder-[#A2A2A2]"
                  required
                />
              </div>

              {/* Campo Senha */}
              <div className="mb-8">
                <label className="block text-slate-700 font-medium mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-[#A2A2A2] placeholder-[#A2A2A2]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Botão Entrar */}
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>

        {/* Lado Direito - Branding */}
        <div className="w-1/2 bg-blue-900 flex flex-col items-center justify-center text-white p-12">
          <div className="text-center">
            {/* Ícone da Lavanderia */}
            <div className="mb-8 flex justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <svg className="w-32 h-32 text-blue-900" viewBox="0 0 200 200" fill="none" stroke="currentColor">
                  {/* Máquina de lavar */}
                  <rect x="30" y="20" width="140" height="160" rx="10" strokeWidth="6" fill="currentColor"/>
                  {/* Painel superior */}
                  <rect x="40" y="30" width="120" height="20" rx="5" fill="white"/>
                  {/* Botões */}
                  <circle cx="55" cy="40" r="4" fill="currentColor"/>
                  <circle cx="70" cy="40" r="4" fill="currentColor"/>
                  {/* Display */}
                  <rect x="90" y="35" width="60" height="10" rx="2" fill="currentColor"/>
                  {/* Porta circular */}
                  <circle cx="100" cy="120" r="50" strokeWidth="6" fill="white"/>
                  {/* Vidro interno */}
                  <circle cx="100" cy="120" r="40" strokeWidth="4" fill="none" stroke="currentColor"/>
                  {/* Água/Roupa */}
                  <path d="M 85 110 Q 100 120 115 110 Q 100 100 85 110" fill="currentColor" opacity="0.3"/>
                  <path d="M 80 125 Q 100 135 120 125 Q 100 115 80 125" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold mb-4">
              Lavanderia<br/>Colônia
            </h2>
          </div>
        </div>
      </div>

      {/* Modal de Erro */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowErrorModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-red-600"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-4">
              Dados incorretos
            </h2>

            {/* Message */}
            <p className="text-slate-600 text-center mb-8 leading-relaxed">
              Verifique se digitou o nome de usuário e a senha corretamente. Lembre-se de checar letras maiúsculas ou espaços extras.
            </p>

            {/* Button */}
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </>
  );
}
"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLogin from "../../public/logo_login.svg";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen w-full">

      <div className="w-1/2 flex flex-col justify-center px-24 bg-white">
        <h1 className="text-3xl font-bold text-title mb-2">
          Bem-vindo de volta!
        </h1>
        <p className="text-neutral/70 mb-8">
          Insira seus dados para continuar:
        </p>

        <div className="mb-6">
          <label className="block mb-1 text-neutral/70">Nome de usuário</label>
          <input
            type="text"
            placeholder="Digite o nome de usuário"
            className="w-full border border-neutral-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-title text-default text-neutral/60"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-1 text-neutral">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="w-full border border-neutral-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-title text-default text-neutral/60"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer select-none text-title"
              onClick={() => setShowPassword(!showPassword)}
            >
              
            </span>
          </div>
        </div>

        <button
          className="w-full bg-title text-white font-semibold py-3 rounded-lg hover:bg-[#012444] transition-all cursor-pointer"
          onClick={() => router.push(`/pedidos/orders-table`)}
        >
          Entrar
        </button>
      </div>

      <div className="w-1/2 bg-title flex items-center justify-center text-white">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Image src={logoLogin} alt="Logo" className="w-100 h-100" />
          </div>
        </div>
      </div>

    </div>
  );
}
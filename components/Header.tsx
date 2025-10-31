"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="w-[44.81px] h-[50px]"/>
          <span className="font-bold text-lg">Lavanderia</span>
        </div>
        <nav className="flex gap-6 text-gray-600">
          <Link href="/pedidos" className="font-semibold text-blue-700 border-b-2 border-blue-700">Pedidos</Link>
          <Link href="/clientes">Clientes</Link>
          <Link href="/configuracoes">Configurações</Link>
        </nav>
      </div>
      <button className="text-gray-500 hover:text-red-500">Sair →</button>
    </header>
  );
}


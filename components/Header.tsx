"use client";
import Link from "next/link";
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={44.81} 
          height={50}
        />
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


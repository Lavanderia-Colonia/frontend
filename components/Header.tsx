import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b bg-white">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <Image src="/logo.svg" alt="Logo" width={44.81} height={50} className="object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a className="text-blue-700 border-b-2 border-blue-100 pb-2" href="#">Pedidos</a>
            <a className="hover:text-slate-800" href="#">Clientes</a>
            <a className="hover:text-slate-800" href="#">Configurações</a>
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-slate-600">
        {/* <button className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-2 hover:bg-slate-50">
          <span>⚙️</span>
          Configurar
        </button> */}
        <button className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-slate-50">
            <Image src="/sair.svg" alt="Sair" width={18} height={18} /> Sair
        </button>
      </div>
    </header>
  );
}

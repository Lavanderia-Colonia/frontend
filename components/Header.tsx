"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 flex items-center justify-between px-8">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={44.81} height={50} />
      </div>

      {/* Menu centralizado */}
      <nav className="flex justify-center flex-1">
        <ul className="flex gap-12 text-gray-600">
          <li>
            <Link href="/pedidos" className="font-semibold text-blue-700 border-b-2 border-blue-700 pb-1">
              Pedidos
            </Link>
          </li>
          <li>
            <Link href="/clientes" className="hover:text-blue-700">
              Clientes
            </Link>
          </li>
          <li>
            <Link href="/configuracoes" className="hover:text-blue-700">
              Configurações
            </Link>
          </li>
        </ul>
      </nav>

      {/* Botão sair */}
      <button className="text-gray-500 hover:text-red-500 flex items-center gap-1">
        <span>↪</span> Sair
      </button>
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? "text-[#013C72]" : "text-[#727376]";

  return (
    <nav className="flex gap-6 p-4 text-lg font-semibold">
      <Link href="/pedidos" className={isActive("/pedidos")}>
        Pedidos
      </Link>

      <Link href="/clientes" className={isActive("/clientes")}>
        Clientes
      </Link>

      <Link href="/configuracoes" className={isActive("/configuracoes")}>
        Configurações
      </Link>
    </nav>
  );
}

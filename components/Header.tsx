// import Image from "next/image";
// import React from "react";
// import Link from "next/link";
// import ExitModal from "./ExitModal";

// export default function Header() {
//   return (
//     <header className="flex items-center justify-between py-4 px-6 border-b bg-white">
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 flex items-center justify-center">
//             <Image src="/logo.svg" alt="Logo" width={44.81} height={50} className="object-contain" />
//           </div>
//           <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
//             <Link className="text-blue-700 border-b-2 border-blue-100 pb-2" href="/orders-table">Pedidos</Link>
//             <Link className="hover:text-slate-800" href="/clients">Clientes</Link>
//             <Link className="hover:text-slate-800" href="/configuracoes">Configurações</Link>
//           </nav>
//         </div>
//       </div>

//       <div className="flex items-center gap-4 text-sm text-slate-600">
//         <button className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-slate-50">
//             <Image src="/sair.svg" alt="Sair" width={18} height={18} /> Sair
//         </button>
//       </div>
//     </header>
//   );
// }

"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Determina qual aba está ativa baseado no pathname
  const isActive = (path: string) => {
    if (path === "/pedidos") {
      return pathname === "/pedidos" || pathname?.startsWith("/pedidos/");
    }
    return pathname === path;
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // Aqui você pode adicionar lógica de logout (limpar tokens, localStorage, etc)
    setShowLogoutModal(false);
    router.push("/auth");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="flex items-center justify-between py-4 px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="w-14 h-14 flex items-center justify-center">
            <Image 
              src="/logo.svg" 
              alt="Logo Lavanderia Colônia" 
              width={44.81} 
              height={50} 
              className="object-contain" 
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 h-14">
            <Link 
              href="/orders-table"
              className={`text-base font-medium transition-colors ${
                isActive("/orders-table")
                  ? "text-[#013C72]"
                  : "text-[#727376] hover:text-[#013C72]"
              }`}
            >
              Pedidos
            </Link>
            
            <Link 
              href="/clients"
              className={`text-base font-medium transition-colors ${
                isActive("/clients")
                  ? "text-[#013C72]"
                  : "text-[#727376] hover:text-[#013C72]"
              }`}  
            >
              Clientes
            </Link>
            
           <Link 
              href="/configuracoes"
              className={`text-base font-medium transition-colors ${
                isActive("/configuracoes")
                  ? "text-[#013C72]"
                  : "text-[#727376] hover:text-[#013C72]"
              }`}
            >
              Configurações
            </Link>
          </nav>
        </div>

        {/* Botão Sair */}
        <div className="flex items-center">
          <button 
            onClick={handleLogoutClick}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Image src="/sair.svg" alt="Sair" width={18} height={18} />
            <span className="text-base">Sair</span>
          </button>
        </div>
      </header>

      {/* Modal de Logout */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
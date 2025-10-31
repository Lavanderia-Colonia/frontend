 import type { Metadata } from 'next'
import '../styles/globals.css'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // opcional: escolha os pesos desejados
});

export const metadata: Metadata = {
  title: "Lavanderia",
  description: "Sistema de Pedidos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
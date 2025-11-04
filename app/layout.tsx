import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// METADATA DO SITE
export const metadata: Metadata = {
  title: "Lavanderia Colônia",
  description: "Gestão de Pedidos",
};

// ROOT LAYOUT (estrutura base do projeto)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}

// export function RootLayoutNavbar({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="pt-br">
//       <body>
//         <Navbar />
//         {children}
//       </body>
//     </html>
//   );
// }

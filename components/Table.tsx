import StatusBadge from "@/components/StatusBadge";
import { Eye } from "lucide-react";

interface Pedido {
  codigo: string;
  cliente: string;
  pecas: number;
  lancamento: string;
  finalizacao: string;
  valor: string;
  status: "em_aberto" | "pago" | "cancelado";
}

const pedidos: Pedido[] = [
  { codigo: "#12345", cliente: "Ana Carolina Souza", pecas: 2, lancamento: "24/10/2025", finalizacao: "23/10/2025", valor: "R$1100,00", status: "em_aberto" },
  { codigo: "#12344", cliente: "Bruno Henrique Almeida", pecas: 5, lancamento: "24/10/2025", finalizacao: "23/10/2025", valor: "R$1100,00", status: "pago" },
  { codigo: "#12343", cliente: "Camila Ferreira Costa", pecas: 2, lancamento: "24/10/2025", finalizacao: "23/10/2025", valor: "R$1100,00", status: "cancelado" },
];

export default function Table() {
  return (
    <div className="bg-white shadow rounded-2xl mt-6 p-6">
      <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b text-gray-600">
            <th className="p-2">Código</th>
            <th className="p-2">Nome do Cliente</th>
            <th className="p-2">Peças</th>
            <th className="p-2">Lançamento</th>
            <th className="p-2">Finalização</th>
            <th className="p-2">Valor Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.codigo}</td>
              <td className="p-2">{p.cliente}</td>
              <td className="p-2">{p.pecas}</td>
              <td className="p-2">{p.lancamento}</td>
              <td className="p-2">{p.finalizacao}</td>
              <td className="p-2">{p.valor}</td>
              <td className="p-2"><StatusBadge status={p.status} /></td>
              <td className="p-2"><Eye className="w-5 h-5 text-blue-700 cursor-pointer" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

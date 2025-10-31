interface Props {
  status: "em_aberto" | "pago" | "cancelado";
}

export default function StatusBadge({ status }: Props) {
  const cores = {
    em_aberto: "bg-gray-300",
    pago: "bg-green-500",
    cancelado: "bg-red-500",
  }[status];

  return <span className={`inline-block w-3 h-3 rounded-full ${cores}`}></span>;
}

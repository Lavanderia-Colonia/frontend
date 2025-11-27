"use client";

import RegisterOrder from "@/components/RegisterOrder";
import { IPedidos } from "@/models/pedidos";
import { useState } from "react"; 

export default function Page() {
    const [pedido, setPedido] = useState<IPedidos>({tipoFinalizacao: "",
        prazo: "",
        cliente: null,
        products: []});

    return <RegisterOrder pedido={pedido} setPedido={setPedido} />;
}
import { IClientes } from "./clientes";
import { IProdutos } from "./produtos";

export interface IPedidos {
    tipoFinalizacao: string;
    prazo: string;
    cliente: IClientes | null;
    products: IProdutos[];
}
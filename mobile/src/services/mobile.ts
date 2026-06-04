import { EmprestimoWithCliente } from "../types";
import api from "../lib/api";

export async function getEmprestimos (filtros: string): Promise<EmprestimoWithCliente[]> {
    console.log("Buscando empréstimos com filtros:", filtros);
  const response = await api.get("/emprestimos", { params: { busca: filtros } });
  return response.data;
}
import { EmprestimoWithCliente } from "../types";
import api from "../lib/api";

export async function getEmprestimos (filtros: { busca: string; }): Promise<EmprestimoWithCliente[]> {
  const response = await api.get("/emprestimos", { params: filtros });
  return response.data;
}
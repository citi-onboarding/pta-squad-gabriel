import { EmprestimoWithCliente } from "../types";
import api from "../lib/api";

export async function getEmprestimos(
  cliente: string,
): Promise<EmprestimoWithCliente[]> {
  // O backend filtra por nome do cliente através do parâmetro `busca`
  const response = await api.get("/emprestimos", { params: { busca: cliente } });
  return response.data;
}

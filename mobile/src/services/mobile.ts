import { EmprestimoWithCliente } from "../types";
import api from "../lib/api";

export async function getEmprestimos(
  cliente: string,
): Promise<EmprestimoWithCliente[]> {
  const response = await api.get("/emprestimos", { params: { cliente } });
  return response.data;
}

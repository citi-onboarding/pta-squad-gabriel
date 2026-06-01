import api from "../lib/api";

export async function devolverEmprestimo(id: string) {
  const response = await api.patch(`/emprestimos/${id}/devolver`);
  return response.data;
}

import api from "../lib/api";

export async function devolverEmprestimo(id: string) {
  const response = await api.patch(`/emprestimos/${id}/devolver`);
  return response.data;
}

export async function sendEmail(id: string): Promise<any> {
  const response = await api.post(`/emprestimos/${id}/lembrete`);
  return response.data; 
}

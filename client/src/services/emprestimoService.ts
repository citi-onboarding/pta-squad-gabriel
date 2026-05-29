import api from "../lib/api";

export async function createEmprestimo(id: string) {
    try {
        const response = await api.post(`/emprestimos/${id}`);
        return response.data;
} catch (error) {
    console.error("Erro ao criar empréstimo:", error);       
     }
}

export async function devolverEmprestimo(id: string) {
  try {
    const response = await api.patch(`/emprestimos/${id}/devolver`);
    return response;
  } catch (error) {
    console.error("Erro ao devolver empréstimo:", error);
   }
}
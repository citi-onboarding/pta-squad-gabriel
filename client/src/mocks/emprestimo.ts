import { Emprestimo } from "@/types/index";
import { StatusEmprestimo } from "@/types/index";

export const emprestimosMock: Record<string, Emprestimo[]> = {
  "1": [
    {
      id: "emp1",
      livroId: "1",
      nome_cliente: "João Silva",
      email_cliente: "joao@email.com",
      data_locacao: '07/04/2026',
      data_prevista_devolucao: '14/04/2026',
      status: "Em_andamento",
    },
    {
      id: "emp2",
      livroId: "1",
      nome_cliente: "Maria Oliveira",
      email_cliente: "maria@email.com",
      data_locacao: '03/04/2026',
      data_prevista_devolucao: '07/04/2026',
      status: "Atrasado",
    },
    {
      id: "emp3",
      livroId: "1",
      nome_cliente: "Carlos Mendes",
      email_cliente: "carlos@email.com",
      data_locacao: '07/04/2026',
      data_prevista_devolucao: '10/04/2026',
      status: "Devolvido",
    },
  ],
};

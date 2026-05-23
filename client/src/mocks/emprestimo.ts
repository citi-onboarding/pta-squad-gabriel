import { EmprestDataProps } from "@/types/typeExample";

export const emprestimosMock: Record<string, EmprestDataProps[]> = {
  "1": [
    {
      emprestimoId: "emp1",
      livroId: "1",
      nome: "João Silva",
      email: "joao@email.com",
      dataLoc: new Date(2025, 3, 10),
      dataDevol: new Date(2025, 4, 10),
      status: "Em andamento",
    },
    {
      emprestimoId: "emp2",
      livroId: "1",
      nome: "Maria Oliveira",
      email: "maria@email.com",
      dataLoc: new Date(2025, 2, 5),
      dataDevol: new Date(2025, 2, 20),
      status: "Atrasado",
    },
    {
      emprestimoId: "emp3",
      livroId: "1",
      nome: "Carlos Mendes",
      email: "carlos@email.com",
      dataLoc: new Date(2025, 4, 1),
      dataDevol: new Date(2025, 5, 1),
      status: "Devolvido",
    },
  ],
};

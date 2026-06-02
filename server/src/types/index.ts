import { Livro, Categoria, Emprestimo, Status } from "@prisma/client";

export type CreateLivroInput = Omit<Livro, "id" | "createdAt">;

export type LivroResponse = Omit<Livro, "createdAt">;

export type LivroWithEmprestimos = LivroResponse & {
  emprestimos: Emprestimo[];
};

export { Emprestimo, Status, Categoria };



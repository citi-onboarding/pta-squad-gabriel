import { Emprestimo, LivroResponse, Status } from "../types";
import prisma from "@database";

class EmprestimoRepository {
  async create(
    emprestimo: Omit<Emprestimo, "id" | "createdAt">,
  ): Promise<Emprestimo> {
    const [emprestimoCriado] = await prisma.$transaction([
      prisma.emprestimo.create({
        data: emprestimo,
      }),
      prisma.livro.update({
        where: { id: emprestimo.livroId },
        data: { quantidade_disponivel: { decrement: 1 } },
      }),
    ]);

    return emprestimoCriado;
  }

  async findById(id: string): Promise<Emprestimo | null> {
    return prisma.emprestimo.findUnique({ where: { id } });
  }

  async findLivroById(livroId: string): Promise<LivroResponse | null> {
    return prisma.livro.findUnique({ where: { id: livroId } });
  }

  async devolver(id: string, livroId: string): Promise<Emprestimo> {
    const [emprestimoDevolvido] = await prisma.$transaction([
    prisma.emprestimo.update({
      where: { id },
      data: { status: Status.Devolvido },
    }),
    prisma.livro.update({
      where: { id: livroId },
      data: { quantidade_disponivel: { increment: 1 } },
    }),
  ]);
  return emprestimoDevolvido;
}

  async getEmprestimoWithLivro(
    id: string,
  ): Promise<(Emprestimo & { livro: LivroResponse }) | null> {
    return prisma.emprestimo.findUnique({
      where: { id },
      include: { livro: true },
    });
  }

  async findEmprestimosByCliente(cliente: string) {
    return prisma.emprestimo.findMany({
      where: cliente
        ? {
            nome_cliente: {
              contains: String(cliente),
              mode: "insensitive", // busca case-insensitive
            },
          }
        : undefined,
      include: { livro: true },
    });
  }
}
export default new EmprestimoRepository();

import {
  CreateLivroInput,
  LivroResponse,
  LivroWithEmprestimos,
} from "src/types";
import prisma from "@database";
import { Categoria, Prisma } from "@prisma/client";

class LivroRepository {
  async create(livro: CreateLivroInput): Promise<LivroResponse> {
    const createdLivro = await prisma.livro.create({
      data: livro,
    });

    const { createdAt, ...createdLivroWithoutDate } = createdLivro;
    return createdLivroWithoutDate;
  }

  async findAll(filter?: {
    busca?: string;
    categoria?: Categoria;
  }): Promise<LivroResponse[]> {
    const where: Prisma.LivroWhereInput = {};

    if (filter?.busca) {
      where.OR = [
        { titulo: { contains: filter.busca, mode: "insensitive" } },
        { autor: { contains: filter.busca, mode: "insensitive" } },
      ];
    }

    if (filter?.categoria) {
      where.categoria = filter.categoria as Categoria;
    }

    const livros = await prisma.livro.findMany({ where });
    return livros.map(({ createdAt, ...livro }) => livro);
  }

  async findById(id: string): Promise<LivroWithEmprestimos | null> {
    const livro = await prisma.livro.findUnique({
      where: { id },
      include: { emprestimos: true },
    });

    if (!livro) return null;
    const { createdAt, ...livroWithoutDate } = livro;

    return livroWithoutDate;
  }

  async delete(id: string): Promise<LivroResponse> {
    const [, deletedLivro] = await prisma.$transaction([
      prisma.emprestimo.deleteMany({ where: { livroId: id } }),
      prisma.livro.delete({ where: { id } }),
    ]);

    const { createdAt, ...deletedLivroWithoutDate } = deletedLivro;
    return deletedLivroWithoutDate;
  }
}

export default new LivroRepository();

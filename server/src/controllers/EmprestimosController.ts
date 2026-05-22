import { Request, Response } from "express";
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

const emprestimoController = {
    async create(req: Request, res: Response) {
    const { livroId, nome_cliente, email_cliente, data_locacao, data_prevista_devolucao } = req.body;

    // POST /emprestimos
    // Checa os campos obrigatórios
    if (!livroId || !nome_cliente || !email_cliente || !data_locacao || !data_prevista_devolucao) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // checa o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_cliente)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    const locacao = new Date(data_locacao);
    const devolucao = new Date(data_prevista_devolucao);

    // Checa se a data de devolução é anterior à data de locação
    if (devolucao < locacao) {
      return res.status(400).json({ error: "Data de devolução não pode ser anterior à data de locação." });
    }

    // Checa se o Livro existe e se há algum dele disponível
    const livro = await prisma.livro.findUnique({ where: { id: livroId } });
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }
    if (livro.quantidade_disponivel <= 0) {
      return res.status(400).json({ error: "Não há exemplares disponíveis para empréstimo." });
    }

    // cria o emprestimo e decrementa a quantidade disponível do livro
    const [emprestimo] = await prisma.$transaction([
      prisma.emprestimo.create({
        data: {
          livroId,
          nome_cliente,
          email_cliente,
          data_locacao: locacao,
          data_prevista_devolucao: devolucao,
        },
      }),
      prisma.livro.update({
        where: { id: livroId },
        data: { quantidade_disponivel: { decrement: 1 } },
      }),
    ]);

    return res.status(201).json(emprestimo);
  },

  // PATCH /emprestimos/:id/devolver
  // Marca o empréstimo como Devolvido
  async devolver(req: Request, res: Response) {
    const { id } = req.params;

    const emprestimo = await prisma.emprestimo.findUnique({ where: { id } });
    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado." });
    }
    if (emprestimo.status === Status.Devolvido) {
      return res.status(400).json({ error: "Empréstimo já foi devolvido." });
    }

    // atualizar status e incrementar quantidade disponivel
    const [emprestimoAtualizado] = await prisma.$transaction([
      prisma.emprestimo.update({
        where: { id },
        data: { status: Status.Devolvido },
      }),
      prisma.livro.update({
        where: { id: emprestimo.livroId },
        data: { quantidade_disponivel: { increment: 1 } },
      }),
    ]);
        
    
    return res.status(200).json(emprestimoAtualizado);
    },

    // POST /emprestimos/:id/lembrete
    // Placeholder 
    async lembrete(req: Request, res: Response) {
        const { id } = req.params;

        const emprestimo = await prisma.emprestimo.findUnique({ where: { id } });
        if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado." });
        }

        return res.status(200).json({ message: "Lembrete será enviado em breve." });
    },

     // GET pelo nome do cliente
     // Busca parcial e case-insensitive por nome do cliente
    async get(req: Request, res: Response) {
        const { cliente } = req.query;

        const emprestimos = await prisma.emprestimo.findMany({
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

    //calcular status Atrasado de acordo com a data do dia 
    const hoje = new Date();
    const resultado = emprestimos.map((e) => ({
      ...e,
      status:
        e.status !== Status.Devolvido && e.data_prevista_devolucao < hoje
          ? "Atrasado"
          : e.status,
    }));

     return res.status(200).json(resultado);
  },
};

export default emprestimoController;

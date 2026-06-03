import { Request, Response } from "express";
import { Status } from "@prisma/client";
import prisma from "@database";
import { enviarLembrete } from "../services/emailService";

const emprestimoController = {
  async create(req: Request, res: Response) {
    try {
      const {
        livroId,
        nome_cliente,
        email_cliente,
        data_locacao,
        data_prevista_devolucao,
      } = req.body;

      // POST /emprestimos

      const locacao = new Date(data_locacao);
      const devolucao = new Date(data_prevista_devolucao);

      // Checa se a data de devolução é anterior à data de locação
      if (devolucao < locacao) {
        return res.status(400).json({
          error: "Data de devolução não pode ser anterior à data de locação.",
        });
      }

      // Checa se o Livro existe e se há algum dele disponível
      const livro = await prisma.livro.findUnique({ where: { id: livroId } });
      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado." });
      }
      if (livro.quantidade_disponivel <= 0) {
        return res
          .status(400)
          .json({ error: "Não há exemplares disponíveis para empréstimo." });
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
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar empréstimo." });
    }
  },

  // PATCH /emprestimos/:id/devolver
  // Marca o empréstimo como Devolvido
  async devolver(req: Request, res: Response) {
    try {
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
    } catch (error) {
      return res.status(500).json({ error: "Erro ao devolver empréstimo." });
    }
  },

  // POST /emprestimos/:id/lembrete
  // Placeholder
  async lembrete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const emprestimo = await prisma.emprestimo.findUnique({
        where: { id },
        include: { livro: true }, //incluir dados do livro
      });

      if (!emprestimo) {
        return res.status(404).json({ error: "Empréstimo não encontrado." });
      }

      // Chama o serviço de email passando os dados necessários
      await enviarLembrete({
        email_cliente: emprestimo.email_cliente,
        nome_cliente: emprestimo.nome_cliente,
        nome_livro: emprestimo.livro.titulo,
        data_locacao: emprestimo.data_locacao,
        data_prevista_devolucao: emprestimo.data_prevista_devolucao,
      });

      return res.status(200).json({ message: "Lembrete enviado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao enviar lembrete." });
    }
  },

  // GET pelo nome do cliente
  // Busca parcial e case-insensitive por nome do cliente
  async get(req: Request, res: Response) {
    try {
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
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar empréstimos." });
    }
  },
};

export default emprestimoController;

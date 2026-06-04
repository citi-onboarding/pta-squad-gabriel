import { Request, Response } from "express";
import { Status } from "@prisma/client";
import emprestimoService from "src/services/emprestimoService";

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

      const emprestimo = await emprestimoService.create({
        livroId,
        nome_cliente,
        email_cliente,
        data_locacao: data_locacao ? new Date(data_locacao) : new Date(),
        data_prevista_devolucao: new Date(data_prevista_devolucao),
        status: Status.Em_andamento,
      });

      return res.status(201).json(emprestimo);
    } catch (error: any) {
      if (error.message === "Livro não encontrado.") {
        return res.status(404).json({ message: error.message });
      } else if (
        error.message === "Não há exemplares disponíveis para empréstimo."
      ) {
        return res.status(400).json({ message: error.message });
      } else if (
        error.message ===
        "Data de devolução não pode ser anterior à data de locação."
      ) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro ao criar empréstimo." });
      }
    }
  },

  // PATCH /emprestimos/:id/devolver
  // Marca o empréstimo como Devolvido
  async devolver(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const emprestimoDevolvido = await emprestimoService.devolver(id);

      return res.status(200).json(emprestimoDevolvido);
    } catch (error: any) {
      if (error.message === "Empréstimo não encontrado.") {
        return res.status(404).json({ message: error.message });
      } else if (error.message === "Empréstimo já foi devolvido.") {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: "Erro ao devolver empréstimo." });
      }
    }
  },

  // POST /emprestimos/:id/lembrete
  async lembrete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const teste = await emprestimoService.enviarLembrete(id);

      return res.status(200).json({ message: "Lembrete enviado com sucesso!" });
    } catch (error: any) {
      if (
        error.message === "Empréstimo não encontrado." ||
        error.message === "Livro não encontrado."
      ) {
        return res.status(404).json({ message: error.message });
      } else if (error.message === "Empréstimo não está atrasado.") {
        return res.status(400).json({ message: error.message });
      }

      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar empréstimos." });
    }
  },

  // GET pelo nome do cliente
  // Busca parcial e case-insensitive por nome do cliente
  async get(req: Request, res: Response) {
    try {
      const { cliente } = req.query;
      const resultado = await emprestimoService.getEmprestimosByCliente(
        cliente as string,
      );

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao buscar empréstimos." });
    }
  },
};

export default emprestimoController;

import { Request, Response } from "express";
import { Crud } from "../global";
import livroService from "../services/livroService";
import { LivroResponse, LivroWithEmprestimos } from "src/types";

class LivroController implements Crud {
  create = async (request: Request, response: Response) => {
    try {
      const {
        titulo,
        autor,
        isbn,
        editora,
        ano,
        quantidade_total,
        categoria,
        foto_url,
      } = request.body;

      const quantidade_disponivel = Number(quantidade_total);

      const createdLivro: LivroResponse = await livroService.createLivro({
        titulo,
        autor,
        isbn,
        editora,
        ano: Number(ano),
        quantidade_total: Number(quantidade_total),
        quantidade_disponivel: Number(quantidade_disponivel),
        categoria,
        foto_url: foto_url || null,
      });

      return response.status(201).json({
        message: "Livro cadastrado com sucesso.",
        livro: createdLivro,
      });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao cadastrar livro" });
    }
  };

  get = async (request: Request, response: Response) => {
    try {
      const { titulo, autor, categoria } = request.query;

      const livros: LivroResponse[] = await livroService.getAllLivros({
        titulo,
        autor,
        categoria,
      });

      return response.status(200).json(livros);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao obter livros." });
    }
  };

  getById = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const livro: LivroWithEmprestimos | null =
        await livroService.getLivroById(id);

      return response.status(200).json({
        message: "Livro encontrado com sucesso.",
        livro: livro,
      });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao procurar livro." });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const { deletedLivro, message } = await livroService.deleteLivro(id);

      if (message === "Livro não encontrado.") {
        return response.status(404).json({ message });
      } else if (
        message === "Não é possível excluir um livro com empréstimos ativos."
      ) {
        return response.status(409).json({ message });
      }

      return response
        .status(200)
        .json({ message: "Livro deletado com sucesso.", deletedLivro });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao deletar livro." });
    }
  };
}

export default new LivroController();

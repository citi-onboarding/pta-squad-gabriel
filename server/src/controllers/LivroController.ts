import { Request, Response } from "express";
import livroService from "../services/livroService";

class LivroController {
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

      const createdLivro = await livroService.createLivro({
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
      const livros = await livroService.getAllLivros({
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
      const livro = await livroService.getLivroById(id);

      return response.status(200).json({
        message: "Livro encontrado com sucesso.",
        livro: livro,
      });
    } catch (error: any) {
      if (error.message === "Livro não encontrado.") {
        return response.status(404).json({ message: error.message });
      }

      return response.status(400).json({ message: "Erro ao procurar livro." });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const deletedLivro = await livroService.deleteLivro(id);

      return response
        .status(200)
        .json({ message: "Livro deletado com sucesso.", deletedLivro });
    } catch (error: any) {
      if (error.message === "Livro não encontrado.") {
        return response.status(404).json({ message: error.message });
      } else if (
        error.message ===
        "Não é possível deletar o livro com empréstimos ativos."
      ) {
        return response.status(409).json({ message: error.message });
      }

      return response.status(400).json({ message: "Erro ao deletar livro." });
    }
  };
}

export default new LivroController();

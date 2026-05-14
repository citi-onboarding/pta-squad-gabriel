import { Request, Response } from "express";
import { Crud } from "../global";
import prisma from "@database";
import { Status } from '@prisma/client'

class LivroController implements Crud {
  private isEmprestimoAtrasado(emprestimo: any){
    const hoje = new Date();
    const data_prevista = new Date(emprestimo.data_prevista_devolucao);
    //Verifica se esta atrasado pela data e se nao foi devolvido
    return hoje > data_prevista && emprestimo.status !== Status.Devolvido;
  }
  private isEmprestimoAtivo(emprestimo: any){
    if (emprestimo.status === Status.Em_andamento || this.isEmprestimoAtrasado(emprestimo)) return true

    return false
  }

  create = async (request: Request, response: Response) => {
    try {
      const { titulo, autor, isbn, editora, ano, quantidade_total, categoria } = request.body;
      //Valida campos obrigatorios
      if (!titulo || !autor || !isbn || !editora || ano === undefined || quantidade_total === undefined || !categoria) {
        return response.status(400).json({ message: "Todos os campos são obrigatórios." });
      }
      //Valida ISBN
      const isbn_regex = /^(?:\d{10}|\d{13})$/; 
      if (typeof isbn !== "string" || !isbn_regex.test(isbn)) {
        return response.status(400).json({ message: "ISBN inválido." });
      }

      const quantidade_disponivel = quantidade_total;

      const createdLivro = await prisma.livro.create({
        data: {
          titulo,
          autor,
          isbn,
          editora,
          ano: Number(ano),
          quantidade_total: Number(quantidade_total),
          quantidade_disponivel: Number(quantidade_disponivel),
          categoria,
        },
      });

      return response.status(200).json({ message: "Livro cadastrado com sucesso.", livro: createdLivro });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao cadastrar livro" });
    }
  };

  get = async (request: Request, response: Response) => {
    try {
      const { titulo, autor, categoria } = request.query;

      const where: any = {};

      if (titulo) {
        where.titulo = {
          contains: String(titulo),
          mode: "insensitive"
        }
      };

      if (autor) {
        where.autor = {
          contains: String(autor),
          mode: "insensitive"
        }
      };

      if (categoria) {
        where.categoria = categoria
      };

      const livros = await prisma.livro.findMany({where});
      if (!livros){
            return response.status(404).json({message: "Nenhum livro encontrado."})
        };

      return response.status(200).json(livros);

    } catch (error) {
      return response.status(400).json({ message: "Erro ao obter livros." });
    }
  };

  getById = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {     
      const livro = await prisma.livro.findUnique({
        where: { id },
        include: { emprestimos: true} //Inclui os emprestimos do livro
      })

      if (!livro){
        return response.status(404).json({message: "Nenhum livro encontrado."})
      }

      const emprestimosAtualizados = livro.emprestimos.map(emprestimo => {
        // Copia do emprestimo
        const tempEmprestimo = { ...emprestimo };

        if (this.isEmprestimoAtrasado(emprestimo)){
          tempEmprestimo.status = Status.Atrasado
        }

        return tempEmprestimo;
      });

      const livroAtualizado = {
        ...livro, 
        emprestimos: emprestimosAtualizados
      };

      return response.status(200).json({message: "Livro encontrado com sucesso.", livro: livroAtualizado})
    } catch (error){
        return response.status(400).json({message: "Erro ao procurar livro."})
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      // Retorna os emprestimos do livro
      const livro = await prisma.livro.findUnique({
        where: { id },
        include: { emprestimos: true } 
      });

      if (!livro) return response.status(404).json({ message: "Livro não encontrado." });
      // Verifica se o livro contem emprestimos ativos
      const emprestimoAtivo = livro.emprestimos.some(emprestimo => this.isEmprestimoAtivo(emprestimo))

      if (emprestimoAtivo){
        return response.status(400).json({ message: "Livro está emprestado no momento." });
      }

      const deletedLivro = await prisma.livro.delete({ where: { id } });

      return response.status(200).json({ message: "Livro deletado com sucesso.", deletedLivro });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao deletar livro." });
    }
  };
}

export default new LivroController();

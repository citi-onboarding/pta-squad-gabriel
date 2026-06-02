import {
  CreateLivroInput,
  LivroResponse,
  Emprestimo,
  Status,
  Categoria,
  LivroWithEmprestimos,
} from "src/types";
import livroRepository from "../repositories/livroRepository";

class LivroService {
  isEmprestimoAtrasado(emprestimo: Emprestimo) {
    const hoje = new Date();
    const data_prevista = new Date(emprestimo.data_prevista_devolucao);
    //Verifica se esta atrasado pela data e se nao foi devolvido
    return hoje > data_prevista && emprestimo.status !== Status.Devolvido;
  }

  isEmprestimoAtivo(emprestimo: Emprestimo) {
    if (
      emprestimo.status === Status.Em_andamento ||
      this.isEmprestimoAtrasado(emprestimo)
    )
      return true;

    return false;
  }

  async createLivro(livro: CreateLivroInput): Promise<LivroResponse> {
    return livroRepository.create(livro);
  }

  async getAllLivros(filter?: any): Promise<LivroResponse[]> {
    const filterParsed = {
      titulo: filter?.titulo ? String(filter.titulo) : undefined,
      autor: filter?.autor ? String(filter.autor) : undefined,
      categoria: filter?.categoria as Categoria | undefined,
    };
    return livroRepository.findAll(filterParsed);
  }

  async getLivroById(id: string): Promise<LivroWithEmprestimos | null> {
    const livro = await livroRepository.findById(id);
    if (!livro) return null;

    const emprestimosAtualizados = livro.emprestimos.map(
      (emprestimo: Emprestimo) => {
        const tempEmprestimo = { ...emprestimo };

        if (this.isEmprestimoAtrasado(emprestimo)) {
          tempEmprestimo.status = Status.Atrasado;
        }

        return tempEmprestimo;
      },
    );

    const livroAtualizado = {
      ...livro,
      emprestimos: emprestimosAtualizados,
    };
    return livroAtualizado;
  }

  async deleteLivro(
    id: string,
  ): Promise<{ deletedLivro: LivroResponse | null; message: string }> {
    const checkLivro = await livroRepository.findById(id);

    if (!checkLivro) {
      return { deletedLivro: null, message: "Livro não encontrado." };
    }

    const emprestimoAtivo = checkLivro?.emprestimos.some((emprestimo) =>
      this.isEmprestimoAtivo(emprestimo),
    );

    if (emprestimoAtivo) {
      return {
        deletedLivro: null,
        message: "Não é possível excluir um livro com empréstimos ativos.",
      };
    }

    const deletedLivro = await livroRepository.delete(id);

    return {
      deletedLivro: deletedLivro,
      message: "Livro deletado com sucesso.",
    };
  }
}
export default new LivroService();

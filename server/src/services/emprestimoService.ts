import { Emprestimo, Status } from "src/types";
import emprestimoRepository from "../repositories/emprestimoRepository";
import { enviarLembrete } from "./emailService";

class EmprestimoService {
  private async getEmprestimoOrThrow(id: string) {
    const emprestimo = await emprestimoRepository.findById(id);
    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }
    return emprestimo;
  }

  private async getLivroOrThrow(livroId: string) {
    const livro = await emprestimoRepository.findLivroById(livroId);
    if (!livro) {
      throw new Error("Livro não encontrado.");
    }
    return livro;
  }

  async create(
    emprestimo: Omit<Emprestimo, "id" | "createdAt">,
  ): Promise<Emprestimo> {
    if (emprestimo.data_prevista_devolucao < emprestimo.data_locacao) {
      throw new Error(
        "Data de devolução não pode ser anterior à data de locação.",
      );
    }

    const livro = await this.getLivroOrThrow(emprestimo.livroId);

    if (livro.quantidade_disponivel <= 0) {
      throw new Error("Não há exemplares disponíveis para empréstimo.");
    }

    const createdEmprestimo = await emprestimoRepository.create(emprestimo);

    return createdEmprestimo;
  }

  async devolver(id: string): Promise<Emprestimo> {
    const emprestimo = await this.getEmprestimoOrThrow(id);

    if (emprestimo.status === Status.Devolvido) {
      throw new Error("Empréstimo já foi devolvido.");
    }
    return await emprestimoRepository.devolver(id, emprestimo.livroId);
  }

  async findById(id: string): Promise<Emprestimo> {
    const emprestimo = await this.getEmprestimoOrThrow(id);
    return emprestimo;
  }

  async enviarLembrete(emprestimoId: string): Promise<void> {
    const emprestimo =
      await emprestimoRepository.getEmprestimoWithLivro(emprestimoId);
    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    } else if (!emprestimo.livro) {
      throw new Error("Livro não encontrado.");
    }
    //Email service para enviar o lembrete de devolução
    await enviarLembrete({
      email_cliente: emprestimo.email_cliente,
      nome_cliente: emprestimo.nome_cliente,
      nome_livro: emprestimo.livro.titulo,
      data_locacao: emprestimo.data_locacao,
      data_prevista_devolucao: emprestimo.data_prevista_devolucao,
    });
  }

  async getEmprestimosByCliente(cliente: string) {
    //Emprestimos com nome_cliente
    const emprestimos =
      await emprestimoRepository.findEmprestimosByCliente(cliente);

    const hoje = new Date();
    const resultado = emprestimos.map((e) => ({
      ...e,
      status:
        e.status !== Status.Devolvido && e.data_prevista_devolucao < hoje
          ? Status.Atrasado
          : e.status,
    }));
    return resultado;
  }
}

export default new EmprestimoService();

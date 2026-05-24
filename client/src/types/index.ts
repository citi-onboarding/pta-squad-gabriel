export type Categoria =
  | "Romance"
  | "Tecnologia"
  | "Historia"
  | "Ciencias"
  | "Infantil";

export type StatusEmprestimo = "Em_andamento" | "Devolvido" | "Atrasado";

// Tipo usado no Card e nas listagens
export interface LivroResumido {
  id: string;
  titulo: string;
  autor: string;
  categoria: Categoria;
  quantidade_total: number;
  quantidade_disponivel: number;
  foto_url?: string;
}

export interface CriarLivroDTO {
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  ano: number;
  quantidade_total: number;
  categoria: string;
  foto_url?: string;
}

// Tipo completo usado no Modal de Detalhes
export interface Livro extends LivroResumido {
  isbn: string;
  editora: string;
  ano: number;
  emprestimos?: Emprestimo[];
}

// Tipo usado no Modal de Empréstimo e Modal de Detalhes
export interface Emprestimo {
  id: string;
  livroId: string;
  nome_cliente: string;
  email_cliente: string;
  data_locacao: string;
  data_prevista_devolucao: string;
  status: StatusEmprestimo;
}

// Tipo usado no submit do Modal de Empréstimo
export interface EmprestimoProps {
  livroId: string;
  nome_cliente: string;
  email_cliente: string;
  data_locacao: string;
  data_prevista_devolucao: string;
}

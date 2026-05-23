export type Categoria =
  | "INFANTIL"
  | "ROMANCE"
  | "HISTORIA"
  | "CIENCIAS"
  | "TECNOLOGIA";

export type LivroDataProps = {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  categoria: Categoria;
  editora: string;
  ano: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  imagem_url?: string;
};

export type EmprestDataProps = {
  emprestimoId: string;
  livroId: string;
  nome: string;
  email: string;
  dataLoc: Date;
  dataDevol: Date;
  status: string;
};
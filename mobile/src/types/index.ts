export type EmprestimoWithCliente = {
  id: string;
  nome_cliente: string;
  data_locacao: Date;
  data_prevista_devolucao: Date;
  status: Status;
  titulo_livro: string;
  foto_url: string | null;
};

export type Status = "Em_andamento" | "Devolvido" | "Atrasado";
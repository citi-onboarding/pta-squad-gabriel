export type EmprestimoWithCliente = {
  id: string;
  nome_cliente: string;
  data_locacao: string;
  data_prevista_devolucao: string;
  status: Status;
  titulo_livro: string;
  foto_url: string | null;
};

export type Status = "Em_andamento" | "Devolvido" | "Atrasado";

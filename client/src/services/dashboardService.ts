import api from "@/lib/api";
import type { StatusEmprestimo } from "@/types";

export interface DashboardLatestLoan {
  id: string;
  livro_titulo: string;
  nome_cliente: string;
  email_cliente: string;
  status: StatusEmprestimo;
  data_locacao: string;
  data_prevista_devolucao: string;
}

// tipo dos dados que vem da API
export interface DashboardData {
  metrics: {
    totalBooks: number;
    activeLoans: number;
    overdueLoans: number;
  };
  booksByCategory: {
    categoria: string;
    quantidade: number;
  }[];
  latestLoans: DashboardLatestLoan[];
}

// busca os dados do dashboard da API
export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get("/dashboard");
  return response.data;
}
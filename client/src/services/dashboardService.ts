import api from "@/lib/api";

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
  latestLoans: {
    id: string;
    livro: string;
    nome_cliente: string;
    email_cliente: string;
    status: string;
    data_locacao: string;
    data_prevista_devolucao: string;
  }[];
}

// busca os dados do dashboard da API
export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get("/dashboard");
  return response.data;
}
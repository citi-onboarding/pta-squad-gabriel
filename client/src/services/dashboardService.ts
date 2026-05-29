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
    status: string;
    data: string;
  }[];
}

// busca os dados do dashboard da API
export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get("/dashboard");
  return response.data;
}
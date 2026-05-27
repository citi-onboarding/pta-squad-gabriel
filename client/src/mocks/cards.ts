import { Cores } from "@/types";
import { BookOpen, AlertCircle, Clock, LucideIcon } from "lucide-react";

type StatItem = {
  valor: number;
  descricao: string;
  Icon: LucideIcon;
  cor: Cores;
};

export const mockStats: Record<string, StatItem> = {
  totalLivros: {
    valor: 1247,
    descricao: "Total de Livros",
    Icon: BookOpen,
    cor: "green",
  },
  emprestimosAtivos: {
    valor: 43,
    descricao: "Empréstimos Ativos",
    Icon: Clock,
    cor: "green",
  },
  livrosAtraso: {
    valor: 12,
    descricao: "Livros Atrasados",
    Icon: AlertCircle,
    cor: "red",
  },
};

import { BookOpen, AlertCircle, Clock, LucideIcon } from "lucide-react";
import { Cores } from "@/types";

type MetricaConfig = {
  descricao: string;
  Icon: LucideIcon;
  cor: Cores;
};

export const metricasConfig: Record<string, MetricaConfig> = {
  totalBooks: {
    descricao: "Total de Livros",
    Icon: BookOpen,
    cor: "green",
  },
  activeLoans: {
    descricao: "Empréstimos Ativos",
    Icon: Clock,
    cor: "green",
  },
  overdueLoans: {
    descricao: "Livros Atrasados",
    Icon: AlertCircle,
    cor: "red",
  },
};

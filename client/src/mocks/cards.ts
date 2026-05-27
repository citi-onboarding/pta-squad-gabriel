import { BookOpen, AlertCircle, Clock, BookMarked, Bookmark } from 'lucide-react';

export const mockStats = {
  totalLivros: {
    valor: 1247,
    descricao: "Total de Livros",
    Icon: BookOpen,
    cor: "green"
  },
  emprestimosAtivos: {
    valor: 43,
    descricao: "Empréstimos Ativos",
    Icon: Bookmark,
    cor: "green"
  },
  livrosAtraso: {
    valor: 12,
    descricao: "Livros Atrasados",
    Icon: Clock,
    cor: "red"
  }
};
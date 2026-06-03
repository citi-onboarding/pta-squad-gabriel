"use client";

import { useState, useEffect } from "react";
import CardMetricas from "@/components/CardMetricas";
import { TabelaEmprestimos } from "@/components/TabelaEmprestimo";
import GraficoLivros from "@/components/GraficoLivros";
import { mockStats } from "@/mocks/cards";
import { getDashboard, DashboardData } from "@/services/dashboardService";
import { LivroResumido, Emprestimo } from "@/types";
import { devolverEmprestimo } from "@/services/emprestimoService";
import { toast } from "sonner";

export default function DashboardPage() {
  const [dados, setDados] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        setLoading(true);
        const data = await getDashboard();
        setDados(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    buscar();
  }, []);

  const livrosAdaptados: LivroResumido[] = (dados?.latestLoans ?? []).map(
    (loan) => ({
      id: loan.id,
      titulo: loan.livro,
      autor: "-",
      categoria: "Romance",
      quantidade_total: 0,
      quantidade_disponivel: 0,
    }),
  );

  const dadosGrafico = (dados?.booksByCategory ?? []).map((item) => ({
    categoria: item.categoria,
    quantidade: item.quantidade,
  }));

  const emprestimosAdaptados: Record<string, Emprestimo[]> = {};
  for (const loan of dados?.latestLoans ?? []) {
    emprestimosAdaptados[loan.id] = [
      {
        id: loan.id,
        livroId: loan.id,
        nome_cliente: loan.nome_cliente,
        email_cliente: loan.email_cliente,
        data_locacao: loan.data_locacao,
        data_prevista_devolucao: loan.data_prevista_devolucao,
        status: loan.status as any,
      },
    ];
  }

  async function handleConfirmarDevolucao(emprestimoId: string) {
    try {
      await devolverEmprestimo(emprestimoId);
      toast.success("Livro devolvido com sucesso!");
      const data = await getDashboard();
      setDados(data);
    } catch (error) {
      toast.error("Erro ao processar devolução. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Visão geral da biblioteca</p>

        {/* Cards de métricas */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardMetricas
            valor={dados?.metrics.totalBooks ?? 0}
            descricao={mockStats.totalLivros.descricao}
            Icon={mockStats.totalLivros.Icon}
            cor={mockStats.totalLivros.cor}
          />
          <CardMetricas
            valor={dados?.metrics.activeLoans ?? 0}
            descricao={mockStats.emprestimosAtivos.descricao}
            Icon={mockStats.emprestimosAtivos.Icon}
            cor={mockStats.emprestimosAtivos.cor}
          />
          <CardMetricas
            valor={dados?.metrics.overdueLoans ?? 0}
            descricao={mockStats.livrosAtraso.descricao}
            Icon={mockStats.livrosAtraso.Icon}
            cor={mockStats.livrosAtraso.cor}
          />
        </div>

        {/* Gráfico de livros por categoria */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Livros por Categoria
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <GraficoLivros dados={dadosGrafico} />
          )}
        </div>

        {/* Tabela de últimos empréstimos */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <TabelaEmprestimos
              livros={livrosAdaptados}
              emprestimos={emprestimosAdaptados}
              onConfirmarDevolucao={handleConfirmarDevolucao}
            />
          )}
        </div>
      </main>
    </div>
  );
}

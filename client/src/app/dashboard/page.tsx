"use client";
import { TabelaEmprestimos } from "@/components/TabelaEmprestimo";
import { livrosMock } from "@/mocks/livro";
import { emprestimosMock } from "@/mocks/emprestimo";
import GraficoLivros from "@/components/GraficoLivros";
import { livrosPorCategoriaMock } from "@/mocks/LivroPorCategoria";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Título e descrição da página */}
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Visão geral da biblioteca</p>
        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Livros por Categoria
          </h2>
          {/* passa os dados mockados para o componente */}
          <GraficoLivros dados={livrosPorCategoriaMock} />
        </div>
        <div className="mt-8">
          <TabelaEmprestimos
            livros={livrosMock}
            emprestimos={emprestimosMock}
          ></TabelaEmprestimos>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import BarraDeBuscar from "@/components/BarraDeBusca";
import Card from "@/components/card";
import { ModalDetalhesLivro } from "@/components/ModalDetalhesLivro";
import {
  EmprestDataProps,
  LivroDataProps,
} from "../../types/typeExample";
import { emprestimosMock } from "@/mocks/emprestimo"
import { livrosMock } from "@/mocks/livro";

export default function Livros() {
  const [filtros, setFiltros] = useState({
    busca: "",
    categoria: "Todas",
  });

  //logica do filtro
  const livrosFiltrados = livrosMock.filter((livro) => {
    const buscaMatch =
      livro.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      livro.autor.toLowerCase().includes(filtros.busca.toLowerCase());

    const categoriaMatch =
      filtros.categoria === "Todas" ||
      livro.categoria.toLowerCase() === filtros.categoria.toLowerCase();

    return buscaMatch && categoriaMatch;
  });

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState<LivroDataProps | null>(null);
  const [selectedEmprestimos, setSelectedEmprestimos] = useState<
    EmprestDataProps[]
  >([]);
  const [emprestimosMap, setEmprestimosMap] = useState<Record<string, EmprestDataProps[]>>(emprestimosMock);

  const atualizarStatusEmprestimo = (livroId: string, emprestimoId: string, novoStatus: string) => {
    setEmprestimosMap(prev => {
      const emprestimosDoLivro = prev[livroId]?.map(emp =>
        emp.emprestimoId === emprestimoId ? { ...emp, status: novoStatus } : emp
      );
      return { ...prev, [livroId]: emprestimosDoLivro };
    });
  };

  const handleVerClick = (livro: LivroDataProps) => {
    setSelectedLivro(livro);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F9FA" }}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-800">Livros</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gerencie o acervo da biblioteca
        </p>

        {/* barra de busca */}
        <div className="mt-4">
          <BarraDeBuscar filtros={filtros} onChange={setFiltros} />
        </div>

        {/* loading state e o grid de livros */}
        {loading ? (
          <div className="mt-6 flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-3 gap-4">
            {livrosFiltrados.map((livro) => (
              <Card key={livro.id} livro={livro} onVerClick={handleVerClick} />
            ))}

            {/* mensagem caso n tenha nenhum livro daquele tipo */}
            {livrosFiltrados.length === 0 && (
              <div className="mt-6 flex flex-col items-center justify-center py-16 text-center w-full col-span-3">
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum livro encontrado
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Tente buscar por outro título, autor ou categoria
                </p>
              </div>
            )}
          </div>
        )}

        {/*Se tiver livro selecionado, renderiza o modal com props de abrir e fechar.*/}
        {selectedLivro && (
          <ModalDetalhesLivro
            open={modalOpen}
            onOpenChange={(open) => {
              setModalOpen(open);
              if (!open) {
                setSelectedLivro(null);
                setSelectedEmprestimos([]);
              }
            }}
            livro={selectedLivro}
            emprestimos={emprestimosMap[selectedLivro.id]}
            onAtualizarStatus={atualizarStatusEmprestimo}
          />
        )}
      </div>
    </div>
  );
}

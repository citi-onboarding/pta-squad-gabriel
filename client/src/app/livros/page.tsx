"use client";

import { useState } from "react";
import BarraDeBuscar from "@/components/BarraDeBusca";
import Card from "@/components/card";
import {
  EmprestDataProps,
  LivroMock,
  ModalDetalhesLivro,
} from "@/components/ModalDetalhesLivro";

const livrosMock: LivroMock[] = [
  {
    id: "1",
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    isbn: "978-0132350884",
    categoria: "TECNOLOGIA",
    editora: "Prentice Hall",
    ano: 2008,
    quantidade_total: 5,
    quantidade_disponivel: 3,
    imagem_url: "",
  },
  {
    id: "2",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    isbn: "978-8595081512",
    categoria: "INFANTIL",
    editora: "Agir",
    ano: 2015,
    quantidade_total: 8,
    quantidade_disponivel: 8,
    imagem_url: "",
  },
  {
    id: "3",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    isbn: "978-8520922389",
    categoria: "ROMANCE",
    editora: "Editora Garnier",
    ano: 1899,
    quantidade_total: 3,
    quantidade_disponivel: 3,
    imagem_url: "",
  },
  {
    id: "4",
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    isbn: "978-8535926990",
    categoria: "HISTORIA",
    editora: "Companhia das Letras",
    ano: 2015,
    quantidade_total: 6,
    quantidade_disponivel: 6,
    imagem_url: "",
  },
  {
    id: "5",
    titulo: "Cosmos",
    autor: "Carl Sagan",
    isbn: "978-8576570437",
    categoria: "CIENCIAS",
    editora: "Companhia das Letras",
    ano: 2017,
    quantidade_total: 4,
    quantidade_disponivel: 4,
    imagem_url: "",
  },
  {
    id: "6",
    titulo: "1984",
    autor: "George Orwell",
    isbn: "978-8535914849",
    categoria: "ROMANCE",
    editora: "Companhia das Letras",
    ano: 2009,
    quantidade_total: 0,
    quantidade_disponivel: 0,
    imagem_url: "",
  },
];

const emprestimosPorLivro: Record<string, EmprestDataProps[]> = {
  "1": [
    {
      emprestimoId: "emp1",
      livroId: "1",
      nome: "João Silva",
      email: "joao@email.com",
      dataLoc: new Date(2025, 3, 10),
      dataDevol: new Date(2025, 4, 10),
      status: "Em andamento",
    },
    {
      emprestimoId: "emp2",
      livroId: "1",
      nome: "Maria Oliveira",
      email: "maria@email.com",
      dataLoc: new Date(2025, 2, 5),
      dataDevol: new Date(2025, 2, 20),
      status: "Atrasado",
    },
    {
      emprestimoId: "emp3",
      livroId: "1",
      nome: "Carlos Mendes",
      email: "carlos@email.com",
      dataLoc: new Date(2025, 4, 1),
      dataDevol: new Date(2025, 5, 1),
      status: "Devolvido",
    },
  ],
};

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
  const [selectedLivro, setSelectedLivro] = useState<LivroMock | null>(null);
  const [selectedEmprestimos, setSelectedEmprestimos] = useState<
    EmprestDataProps[]
  >([]);
  const [emprestimosMap, setEmprestimosMap] = useState<Record<string, EmprestDataProps[]>>(emprestimosPorLivro);

  const atualizarStatusEmprestimo = (livroId: string, emprestimoId: string, novoStatus: string) => {
    setEmprestimosMap(prev => {
      const emprestimosDoLivro = prev[livroId]?.map(emp =>
        emp.emprestimoId === emprestimoId ? { ...emp, status: novoStatus } : emp
      );
      return { ...prev, [livroId]: emprestimosDoLivro };
    });
  };

  const handleVerClick = (livro: LivroMock) => {
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

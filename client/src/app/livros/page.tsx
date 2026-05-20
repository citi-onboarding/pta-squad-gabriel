"use client";

import * as React from "react";
import { useState } from "react";
import BarraDeBuscar from "@/components/BarraDeBusca";
import Card from "@/components/card";

const livrosMock = [
  {
    id: 1,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    categoria: "Tecnologia",
    quantidade: 5,
  },
  {
    id: 2,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Infantil",
    quantidade: 8,
  },
  {
    id: 3,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Romance",
    quantidade: 3,
  },
  {
    id: 4,
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    categoria: "Historia",
    quantidade: 6,
  },
  {
    id: 5,
    titulo: "Cosmos",
    autor: "Carl Sagan",
    categoria: "Ciencias",
    quantidade: 4,
  },
  {
    id: 6,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Romance",
    quantidade: 0,
  },
];

export default function Livros() {
  const [filtros, setFiltros] = useState({
    busca: "",
    categoria: "todas",
  });

  //logica do filtro
  const livrosFiltrados = livrosMock.filter((livro) => {
    const buscaMatch =
      livro.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      livro.autor.toLowerCase().includes(filtros.busca.toLowerCase());

    const categoriaMatch =
      filtros.categoria === "todas" ||
      livro.categoria.toLowerCase() === filtros.categoria.toLowerCase();

    return buscaMatch && categoriaMatch;
  });

const [loading, setLoading] = useState(false);

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
              <Card
                key={livro.id}
                titulo={livro.titulo}
                autor={livro.autor}
                categoria={livro.categoria}
                quantidade={livro.quantidade}
              />
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
      </div>
    </div>
  );
}

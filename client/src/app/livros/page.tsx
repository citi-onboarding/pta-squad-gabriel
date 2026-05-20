"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import BarraDeBuscar from "@/components/BarraDeBusca";
import Card from "@/components/card";
import { getLivros, Livro } from "@/services/livrosService";

export default function Livros() {
    const [filtros, setFiltros] = useState({
      busca: "",
      categoria: "Todas",
    });
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function buscar() {
        try {
          setLoading(true);
          const dados = await getLivros(filtros);
          setLivros(dados);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      buscar();
    }, [filtros]);
  
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
              {livros.map((livro) => (
                <Card
                  key={livro.id}
                  titulo={livro.titulo}
                  autor={livro.autor}
                  categoria={livro.categoria}
                  quantidade={livro.quantidade_disponivel}
                />
              ))}

              {/* mensagem caso n tenha nenhum livro daquele tipo */}
              {livros.length === 0 && (
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

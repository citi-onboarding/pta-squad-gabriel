"use client";

import { useState, useEffect } from "react";

// componentes
import BarraDeBuscar from "@/components/BarraDeBusca";
import Card from "@/components/card";
import { ModalDetalhesLivro } from "@/components/ModalDetalhesLivro";
import { ModalEmprestimo } from "@/components/ModalEmprestimo";
import api from "@/lib/api";
import { toast } from "sonner";

// tipos
import { EmprestimoProps, Emprestimo, LivroResumido, Livro } from "@/types/index";

// serviços
import { getLivros, getLivroPorId } from "@/services/livrosService";
import { devolverEmprestimo } from "@/services/emprestimoService";

// biblioteca para exibir notificações na tela
export default function Livros() {
  const [filtros, setFiltros] = useState({
    busca: "",
    categoria: "",
    disponibilidade: "",
  });

  const [loading, setLoading] = useState(false);
  const [livros, setLivros] = useState<LivroResumido[]>([]);

  // busca os livros da API ao carregar a página e quando os filtros mudam
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

  // filtra os livros por disponibilidade no front
  const livrosFiltrados = livros.filter((livro) => {
    const disponibilidadeMatch =
      filtros.disponibilidade === "" ||
      filtros.disponibilidade === "Todas" ||
      (filtros.disponibilidade === "Disponíveis" &&
        livro.quantidade_disponivel > 0) ||
      (filtros.disponibilidade === "Indisponíveis" &&
        livro.quantidade_disponivel === 0);

    return disponibilidadeMatch;
  });

  // remove o livro da listagem após deletar
  function handleDeletar(id: string) {
    setLivros(livros.filter((livro) => livro.id !== id));
  }

  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
  const [selectedVerLivro, setSelectedVerLivro] = useState<Livro | null>(null);
  const [modalEmprestarOpen, setModalEmprestarOpen] = useState(false);
  const [selectedEmprestarLivro, setSelectedEmprestarLivro] =
    useState<LivroResumido | null>(null);

  const handleVerClick = async (livroResumido: LivroResumido) => {
    try {
      const livroCompleto = await getLivroPorId(livroResumido.id);
      setSelectedVerLivro(livroCompleto);
      setModalDetalhesOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmprestarClick = (livroResumido: LivroResumido) => {
    if (livroResumido) {
      setSelectedEmprestarLivro(livroResumido);
      setModalEmprestarOpen(true);
    }
  };

  async function handleConfirmarEmprestimo(emprestimo: EmprestimoProps) {
    try {
      await api.post("/emprestimos", emprestimo);
      toast.success("Empréstimo realizado com sucesso!");
      const dados = await getLivros(filtros);
      setLivros(dados);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Tente novamente.");
      throw error;
    }
  }

  async function handleConfirmarDevolucao(emprestimo: Emprestimo) {
    try {
      await devolverEmprestimo(emprestimo.id);
      toast.success('Livro devolvido com sucesso!');

      const novoLivro = await getLivroPorId(emprestimo.livroId)
      setSelectedVerLivro(novoLivro)
    } catch (error) {
      toast.error("Erro ao processar devolução. Tente novamente.");
    }
  }

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
                livro={livro}
                onVerClick={handleVerClick}
                onEmprestarClick={handleEmprestarClick}
                onDeletar={handleDeletar}
              />
            ))}

            {/* mensagem caso não tenha nenhum livro */}
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
        {selectedEmprestarLivro && (
          <ModalEmprestimo
            open={modalEmprestarOpen}
            onOpenChange={(open) => {
              setModalEmprestarOpen(open);
              if (!open) {
                setSelectedEmprestarLivro(null);
              }
            }}
            livro={selectedEmprestarLivro}
            onConfirmEmprestar={handleConfirmarEmprestimo}
          />
        )}
        {/*Se tiver livro selecionado, renderiza o modal com props de abrir e fechar.*/}
        {selectedVerLivro && (
          <ModalDetalhesLivro
            open={modalDetalhesOpen}
            onOpenChange={(open) => {
              setModalDetalhesOpen(open);
              if (!open) {
                setSelectedVerLivro(null);
              }
            }}
            livro={selectedVerLivro}
            emprestimos={selectedVerLivro.emprestimos ?? []}
            onConfirmDevolucao={handleConfirmarDevolucao}
          />
        )}
      </div>
    </div>
  );
}

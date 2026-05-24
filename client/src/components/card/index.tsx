"use client";

import * as React from "react";
import { Eye, Bookmark, Trash2 } from "lucide-react";
// botao shadcn
import { Button } from "@/components/ui/button";
// imagens das categorias
import Image from "next/image";
import romanceImg from "../../../../assets/categoriasCard/romance.png";
import tecnologiaImg from "../../../../assets/categoriasCard/tecnologia.png";
import historiaImg from "../../../../assets/categoriasCard/historia.png";
import cienciasImg from "../../../../assets/categoriasCard/ciencias.png";
import infantilImg from "../../../../assets/categoriasCard/infantil.png";
// modal de confirmação
import { useState } from "react";
import ModalConfirmacao from "../ModalConfirmacao";
import { toast } from "sonner";

interface CardLivroProps {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  quantidade: number;
  onDeletar: (id: string) => void;
}

const imagensCategorias: { [key: string]: any } = {
  Romance: romanceImg,
  Tecnologia: tecnologiaImg,
  Historia: historiaImg,
  Ciencias: cienciasImg,
  Infantil: infantilImg,
};

export default function Card({
  id,
  titulo,
  autor,
  categoria,
  quantidade,
  onDeletar,
}: CardLivroProps) {
  // estado para mostrar o modal de confirmação
  const [mostrarModal, setMostrarModal] = useState(false);

  // função para deletar o livro
  async function handleDeletar() {
    try {
      // muda a URL para a variável de ambiente
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/livros/${id}`, {
        method: "DELETE",
      });

      // verifica se a resposta foi ok, se não, mostra o erro
      if (!response.ok) {
        const erro = await response.json();
        toast.error(erro.message || "Erro ao excluir o livro");
        return;
      }

      // se a resposta for ok, mostra o sucesso e chama a função de deletar do pai
      toast.success("Livro excluído com sucesso!");
      onDeletar?.(id);
    } catch (error) {
      toast.error("Erro ao excluir o livro");
    } finally {
      setMostrarModal(false);
    }
  }
  return (
    <div>
      {/* modal de confirmação */}
      {mostrarModal && (
        <ModalConfirmacao
          titulo="Excluir livro"
          mensagem={`Tem certeza que deseja excluir "${titulo}"? Esta ação não pode ser desfeita.`}
          onConfirmar={handleDeletar}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
      {/* // div geral */}
      <div className="bg-green-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* área da imagem */}
        <div className="w-full h-56 overflow-hidden">
          <Image
            src={imagensCategorias[categoria]}
            alt={categoria}
            width={400}
            height={208}
            className="object-cover w-full h-full"
          />
        </div>
        {/* informações */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-800">{titulo}</h2>
          <p className="text-sm text-gray-500 mt-1">{autor}</p>
          <p className="text-sm text-emerald-500 mt-1">{categoria}</p>
          <p className="text-sm text-gray-500 mt-1">
            Disponível: {quantidade} unidade(s)
          </p>

          {/* botões */}
          <div className="flex gap-2 mt-4">
            {/* ver */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-white border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-750"
            >
              <Eye className="w-3 h-3" /> Ver
            </Button>
            {/* emprestar */}
            <Button
              size="sm"
              disabled={quantidade === 0}
              className={`h-9 flex items-center gap-1 text-xs px-3 py-1.5 rounded-md
    ${
      quantidade === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-emerald-500 text-white hover:bg-emerald-600"
    }`}
            >
              <Bookmark className="w-3 h-3" /> Emprestar
            </Button>
            {/* deletar */}
            <Button
              size="sm"
              className="h-9 bg-red-500 text-white hover:bg-red-600"
              onClick={() => setMostrarModal(true)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

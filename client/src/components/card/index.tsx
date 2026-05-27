"use client";

// componentes
import { useState } from "react";
import { Eye, Bookmark, Trash2 } from "lucide-react";
// botao shadcn
import { Button } from "@/components/ui/button";

// biblioteca para exibir notificações na tela
import { toast } from "sonner";
// modal de confirmação
import ModalConfirmacao from "@/components/ModalConfirmacao";

// imagens das categorias
import Image from "next/image";
import romanceImg from "../../../../assets/categoriasCard/romance.png";
import tecnologiaImg from "../../../../assets/categoriasCard/tecnologia.png";
import historiaImg from "../../../../assets/categoriasCard/historia.png";
import cienciasImg from "../../../../assets/categoriasCard/ciencias.png";
import infantilImg from "../../../../assets/categoriasCard/infantil.png";

// tipagem
import { LivroResumido, Categoria } from "@/types";
// serviços
import { deletarLivro } from "@/services/livrosService";

// interface para as props do card
interface CardLivroProps {
  livro: LivroResumido;
  onVerClick: (livro: LivroResumido) => void;
  onDeletar?: (id: string) => void;
  onEmprestarClick: (livro: LivroResumido) => void;
}

// mapa de categorias para imagens
const imagensCategorias: Record<Categoria, any> = {
  Romance: romanceImg,
  Tecnologia: tecnologiaImg,
  Historia: historiaImg,
  Ciencias: cienciasImg,
  Infantil: infantilImg,
};

const coresCategoria: Record<Categoria, string> = {
  Romance: "bg-red-100 border-red-300",
  Tecnologia: "bg-blue-100 border-blue-300",
  Historia: "bg-orange-100 border-orange-300",
  Ciencias: "bg-green-100 border-green-300",
  Infantil: "bg-purple-100 border-purple-300",
};

// componente do card
export default function Card({
  livro,
  onVerClick,
  onDeletar,
  onEmprestarClick,
}: CardLivroProps) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const { id, titulo, autor, categoria, quantidade_disponivel } = livro;
  const imagemCategoria = imagensCategorias[categoria] ?? romanceImg;

  // função para deletar o livro, chamada quando o usuário confirma a exclusão no modal
  async function handleDeletar() {
    try {
      await deletarLivro(id);
      toast.success("Livro excluído com sucesso!");
      onDeletar?.(id);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao excluir o livro");
    } finally {
      setMostrarModal(false);
    }
  }

  return (
    <>
      {/* modal de confirmação de exclusão */}
      {mostrarModal && (
        <ModalConfirmacao
          titulo="Excluir livro"
          mensagem={`Tem certeza que deseja excluir "${titulo}"? Esta ação não pode ser desfeita.`}
          onConfirmar={handleDeletar}
          onCancelar={() => setMostrarModal(false)}
        />
      )}

      {/* div geral */}
      <div
        className={`${coresCategoria[categoria]} border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
      >
        {/* área da imagem — posição relativa para o badge */}
        <div className="w-full h-56 overflow-hidden relative">
          {livro.foto_url ? (
            // URL externa — usa <img> comum
            <img
              src={livro.foto_url}
              alt={categoria}
              className="object-cover w-full h-full"
            />
          ) : (
            // imagem local da categoria — usa <Image> do Next
            <Image
              src={imagemCategoria}
              alt={categoria}
              width={400}
              height={208}
              className="object-cover w-full h-full"
            />
          )}

          {/* badge de indisponível no canto superior direito */}
          {quantidade_disponivel === 0 && (
            <span className="absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full bg-red-500 text-white">
              Indisponível
            </span>
          )}
        </div>

        {/* informações */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-800">{titulo}</h2>
          <p className="text-sm text-gray-500 mt-1">{autor}</p>
          <p className="text-sm text-emerald-500 mt-1">{categoria}</p>
          <p className="text-sm text-gray-500 mt-1">
            Disponível: {quantidade_disponivel} unidade(s)
          </p>

          {/* botões */}
          <div className="flex gap-2 mt-4">
            {/* ver */}
            <Button
              onClick={() => onVerClick(livro)}
              variant="outline"
              size="sm"
              className="h-9 bg-white border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Eye className="w-3 h-3" /> Ver
            </Button>

            {/* emprestar */}
            <Button
              onClick={() => onEmprestarClick(livro)}
              size="sm"
              disabled={quantidade_disponivel === 0}
              className={`h-9 flex items-center gap-1 text-xs px-3 py-1.5 rounded-md
                ${
                  quantidade_disponivel === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
            >
              <Bookmark className="w-3 h-3" /> Emprestar
            </Button>

            {/* deletar */}
            <Button
              size="sm"
              onClick={() => setMostrarModal(true)}
              className="h-9 bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

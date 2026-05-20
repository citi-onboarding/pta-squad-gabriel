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

interface CardLivroProps {
  titulo: string;
  autor: string;
  categoria: string;
  quantidade: number;
}

const imagensCategorias: { [key: string]: any } = {
  Romance: romanceImg,
  Tecnologia: tecnologiaImg,
  História: historiaImg,
  Ciências: cienciasImg,
  Infantil: infantilImg,
};

export default function Card({
  titulo,
  autor,
  categoria,
  quantidade,
}: CardLivroProps) {
  return (
    // div geral
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
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

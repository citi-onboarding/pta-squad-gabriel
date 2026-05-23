"use client";
import { useState } from "react";
import CadastrarLivro from "@/components/CadastrarLivro";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function NovoLivro() {
  const router = useRouter()

  async function handleCadastrarLivro(livro: any) {
    await api.post("/livros", livro)

    router.push("/livros");
  }

  async function handleCancelar() {
    router.push("/livros");
  }
  return (
    <CadastrarLivro
      onCadastrar={handleCadastrarLivro}
      onCancelar={handleCancelar}
    ></CadastrarLivro>
  );
}

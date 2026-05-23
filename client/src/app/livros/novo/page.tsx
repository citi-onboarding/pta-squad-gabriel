"use client";
import { useState } from "react";
import CadastrarLivro from "@/components/CadastrarLivro";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast, Toaster } from "sonner";

export default function NovoLivro() {
  const router = useRouter()

  async function handleCadastrarLivro(livro: any) {
    try {
      await api.post("/livros", livro)
      toast.success('Cadastrado com sucesso')
    } catch (error: any) {
      toast.error(error.message || "Tente novamente.");    
}

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

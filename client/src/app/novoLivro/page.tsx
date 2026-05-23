"use client";
import { useState } from "react";
import CadastrarLivro from "@/components/CadastrarLivro";
import { useRouter } from "next/navigation";

export default function NovoLivro() {
  const router = useRouter()

  async function handleCadastrarLivro(livro: any) {
    const response = await fetch("/api/livros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livro),
    });

    router.push("/dashboard");
  }

  async function handleCancelar() {
    router.push("/dashboard");
  }
  return (
    <CadastrarLivro
      onCadastrar={handleCadastrarLivro}
      onCancelar={handleCancelar}
    ></CadastrarLivro>
  );
}

"use client";
import CadastrarLivro from "@/components/CadastrarLivro";
import { CriarLivroDTO } from "@/types";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";

export default function NovoLivro() {
  const router = useRouter();

  async function handleCadastrarLivro(livro: CriarLivroDTO) {
    try {
      await api.post("/livros", livro);
      toast.success("Cadastrado com sucesso");
      router.push("/livros");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Tente novamente.");
    }
  }

  function handleCancelar() {
    router.push("/livros");
  }
  return (
    <CadastrarLivro
      onCadastrar={handleCadastrarLivro}
      onCancelar={handleCancelar}
    ></CadastrarLivro>
  );
}

import { LivroResumido, Livro } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// busca os livros da API com filtros de busca e categoria
export async function getLivros(filtros: {
  busca: string;
  categoria: string;
}): Promise<LivroResumido[]> {
  const params = new URLSearchParams();

  // adiciona os filtros de busca e categoria aos parâmetros da requisição, se eles estiverem preenchidos
  if (filtros.busca) params.append("titulo", filtros.busca);
  if (filtros.categoria && filtros.categoria !== "Todas")
    params.append("categoria", filtros.categoria);

  const response = await fetch(`${API_URL}/livros?${params.toString()}`);
  if (!response.ok) throw new Error("Erro ao buscar livros");

  return response.json();
}

// deleta um livro pelo id
export async function deletarLivro(id: string) {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erro ao deletar livro");

  return data;
}

// busca um livro completo pelo id
export async function getLivroPorId(id: string): Promise<Livro> {
  const response = await fetch(`${API_URL}/livros/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar livro");
  const data = await response.json();
  return data.livro; // pega o livro de dentro do objeto
}

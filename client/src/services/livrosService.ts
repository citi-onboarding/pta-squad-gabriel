const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

//características do livro que chegam da API
export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  quantidade_disponivel: number;
};

//get dos livros
export async function getLivros(filtros: {
  busca: string;
  categoria: string;
}): Promise<Livro[]> {
  // muda a URL
  const params = new URLSearchParams();

  if (filtros.busca) params.append("titulo", filtros.busca);
  if (filtros.categoria && filtros.categoria !== "Todas")
    params.append("categoria", filtros.categoria);

  // Envia os dados do formulário para a API no formato JSON
  const response = await fetch(`${API_URL}/livros?${params.toString()}`);
  if (!response.ok) throw new Error("Erro ao buscar livros");

  return response.json();
}

//deletar os livros
export async function deletarLivro(id: string) {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erro ao deletar livro");

  return data;
}

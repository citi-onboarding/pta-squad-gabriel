import api from "@/lib/api";
import { LivroResumido, Livro } from "@/types";

// busca os livros da API com filtros de busca e categoria
export async function getLivros(filtros: {
  busca: string;
  categoria: string;
  disponibilidade?: string;
}): Promise<LivroResumido[]> {
  const params: Record<string, string> = {};

  // adiciona os filtros de busca e categoria aos parâmetros da requisição, se eles estiverem preenchidos
  if (filtros.busca) params.titulo = filtros.busca;
  if (
    filtros.categoria &&
    filtros.categoria !== "Todas" &&
    filtros.categoria !== ""
  )
    params.categoria = filtros.categoria;

  const response = await api.get("/livros", { params });
  const livros: LivroResumido[] = response.data;

  // filtra por disponibilidade no front pois a API não suporta esse filtro
  if (
    filtros.disponibilidade &&
    filtros.disponibilidade !== "" &&
    filtros.disponibilidade !== "Todas"
  ) {
    return livros.filter((livro) =>
      filtros.disponibilidade === "Disponíveis"
        ? livro.quantidade_disponivel > 0
        : livro.quantidade_disponivel === 0,
    );
  }

  return livros;
}

// deleta um livro pelo id
export async function deletarLivro(id: string) {
  const response = await api.delete(`/livros/${id}`);
  return response.data;
}

// busca um livro completo pelo id
export async function getLivroPorId(id: string): Promise<Livro> {
  const response = await api.get(`/livros/${id}`);
  return response.data.livro;
}

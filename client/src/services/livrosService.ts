const API_URL = "http://localhost:3000"; // ajuste para a URL da sua API

//características do livro que chegam da API
export type Livro = {
    id: string;
    titulo: string;
    autor: string;
    categoria: string;
    quantidade_disponivel: number;
};

//get dos livros
export async function getLivros(filtros: { busca: string; categoria: string }): Promise<Livro[]> {
    // muda a URL
    const params = new URLSearchParams();

    if (filtros.busca) params.append("titulo", filtros.busca);
    if (filtros.categoria && filtros.categoria !== "Todas") params.append("categoria", filtros.categoria);

    // Envia os dados do formulário para a API no formato JSON
    const response = await fetch(`${API_URL}/livros?${params.toString()}`);
    if (!response.ok) throw new Error("Erro ao buscar livros");

    return response.json();
}

//post  
export async function cadastrarLivro(dados: {
    titulo: string;
    autor: string;
    isbn: string;
    editora: string;
    ano: number;
    quantidade_total: number;
    categoria: string;
    }) {
    const response = await fetch(`${API_URL}/livros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro ao cadastrar livro");

    return data;
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
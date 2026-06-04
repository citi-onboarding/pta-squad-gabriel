import { z } from "zod";

export const createLivroSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório."),
  autor: z.string().min(1, "Autor é obrigatório."),
  isbn: z.string().regex(/^(?:\d{10}|\d{13})$/, "ISBN inválido."),
  editora: z.string().min(1, "Editora é obrigatória."),
  ano: z.number({ error: "Ano é obrigatório." }),
  quantidade_total: z.number({ error: "Quantidade total é obrigatória." }),
  categoria: z.string().min(1, "Categoria é obrigatória."),
  foto_url: z.string().url("URL da foto inválida.").or(z.literal("")).optional(),
});

export type CreateLivroDTO = z.infer<typeof createLivroSchema>;
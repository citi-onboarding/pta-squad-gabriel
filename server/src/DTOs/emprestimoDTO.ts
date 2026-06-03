import { z } from "zod";

export const createEmprestimoSchema = z.object({
  livroId: z.string().uuid("livroId deve ser um UUID válido."),
  nome_cliente: z.string().min(1, "Nome do cliente é obrigatório."),
  email_cliente: z.string().email("Email inválido."),
  data_locacao: z.string().min(1, "Data de locação é obrigatória."),
  data_prevista_devolucao: z.string().min(1, "Data de devolução é obrigatória."),
});

export type CreateEmprestimoDTO = z.infer<typeof createEmprestimoSchema>;
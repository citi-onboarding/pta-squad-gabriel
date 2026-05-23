import { z } from "zod";

// O Schema (Validação)
export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginDTO = z.infer<typeof loginSchema>;

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Middleware genérico (Exemplo)
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body); // Olha os dados do corpo da requisição e tenta validar com o schema

    if (!result.success) {
      // Validação falhou
      const erros = result.error.flatten().fieldErrors;
      return res.status(400).json({ message: "Dados inválidos.", erros });
    }

    req.body = result.data;
    next(); // Validação passou, pode acessar o controller
  };
}

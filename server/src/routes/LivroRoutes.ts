import { Router } from "express";
import LivroController from "../controllers/LivroController";
import { validate } from "../middlewares/validate";
import { createLivroSchema } from "../DTOs/livroDTO";

const router = Router();

// Rotas de livros
router.post("/",  validate(createLivroSchema), LivroController.create);
router.get("/", LivroController.get);
router.get("/:id", LivroController.getById);
router.delete("/:id", LivroController.delete);

export default router;
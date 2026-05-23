import { Router } from "express";
import LivroController from "../controllers/LivroController";


const router = Router();

// Rotas de livros
router.post("/", LivroController.create);
router.get("/", LivroController.get);
router.get("/:id", LivroController.getById);
router.delete("/:id", LivroController.delete);

export default router;
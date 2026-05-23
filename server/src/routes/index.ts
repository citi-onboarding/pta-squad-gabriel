
import { Router } from "express";
import LivroRoutes from "./LivroRoutes";
import emprestimoRoutes from "./EmprestimoRoutes";

const router = Router();

router.use("/livros", LivroRoutes);
router.use("/emprestimos", emprestimoRoutes);

export default router;

import { Router } from "express";
import LivroRoutes from "./LivroRoutes";
import emprestimoRoutes from "./EmprestimoRoutes";
import dashboardRoutes from "./DashboardRoutes";

const router = Router();

router.use("/livros", LivroRoutes);
router.use("/emprestimos", emprestimoRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
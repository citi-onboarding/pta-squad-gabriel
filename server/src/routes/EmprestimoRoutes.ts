import { Router } from "express";
import EmprestimosController from "../controllers/EmprestimosController";
import { validate } from "../middlewares/validate";
import { createEmprestimoSchema } from "../DTOs/emprestimoDTO";

const router = Router();

router.post("/", validate(createEmprestimoSchema), EmprestimosController.create);
router.patch("/:id/devolver", EmprestimosController.devolver);
router.post("/:id/lembrete", EmprestimosController.lembrete);
router.get("/", EmprestimosController.get);

export default router;
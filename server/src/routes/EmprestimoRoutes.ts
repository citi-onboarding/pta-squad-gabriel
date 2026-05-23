import { Router } from "express";
import EmprestimosController from "../controllers/EmprestimosController";

const router = Router();

router.post("/", EmprestimosController.create);
router.patch("/:id/devolver", EmprestimosController.devolver);
router.post("/:id/lembrete", EmprestimosController.lembrete);
router.get("/", EmprestimosController.get);

export default router;
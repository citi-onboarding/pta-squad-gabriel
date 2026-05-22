import express from "express";
import livroController from "./controllers/LivroController";
import EmprestimosController from "./controllers/EmprestimosController";

const routes = express.Router();

routes.post("/livros", livroController.create);
routes.get("/livros", livroController.get);
routes.get("/livros/:id", livroController.getById);
routes.delete("/livros/:id", livroController.delete);

// Rotas de empréstimos
routes.post("/emprestimos", EmprestimosController.create);
routes.patch("/emprestimos/:id/devolver", EmprestimosController.devolver);
routes.post("/emprestimos/:id/lembrete", EmprestimosController.lembrete);
routes.get("/emprestimos", EmprestimosController.get);

export default routes;

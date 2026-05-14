import express from "express";
import livroController from "./controllers/LivroController";

const routes = express.Router();

routes.post("/livros", livroController.create);
routes.get("/livros", livroController.get);
routes.get("/livros/:id", livroController.getById);
routes.delete("/livros/:id", livroController.delete);

export default routes;

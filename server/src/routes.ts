import express from "express";
import userController from "./controllers/UserController";
import livroController from "./controllers/LivroController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/livros", livroController.create);
routes.get("/livros", livroController.get);
routes.get("/livros/:id", livroController.getById);
routes.delete("/livros/:id", livroController.delete);

export default routes;

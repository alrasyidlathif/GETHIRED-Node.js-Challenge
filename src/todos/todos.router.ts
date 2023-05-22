import { Router } from "express";
import * as todosController from "./todos.controller";
import { bodyBlankValidator } from "../middleware";
import { todosCreateValidator } from "./todos.validator";

const todosRouter = Router()

todosRouter.get("/", todosController.getAll)
todosRouter.get("/:id", todosController.getOne)
todosRouter.post("/", bodyBlankValidator, todosCreateValidator, todosController.create)
todosRouter.patch("/:id", todosController.update)
todosRouter.delete("/:id", todosController.deleteTodos)

export default todosRouter

import { Router } from "express";
import * as activitiesController from "./activities.controller";
import { activitiesCreateValidator } from "./activities.validator";
import { bodyBlankValidator } from "../middleware";

const activitiesRouter = Router()

activitiesRouter.get("/", activitiesController.getAll)
activitiesRouter.get("/:id", activitiesController.getOne)
activitiesRouter.post("/", activitiesCreateValidator, activitiesController.create)
activitiesRouter.patch("/:id", bodyBlankValidator, activitiesController.update)
activitiesRouter.delete("/:id", activitiesController.deleteActivities)

export default activitiesRouter

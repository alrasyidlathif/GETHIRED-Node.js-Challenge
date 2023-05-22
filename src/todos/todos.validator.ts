import { Request, Response, NextFunction } from "express";
import { returnTemplate } from "../formatter";

export function todosCreateValidator(
    req: Request, res: Response, next: NextFunction
) {
    if (!req.body.title) return returnTemplate(res, 400, "Bad Request", "title cannot be null")
    if (!req.body.activity_group_id) return returnTemplate(res, 400, "Bad Request", "activity_group_id cannot be null")
    return next()
}

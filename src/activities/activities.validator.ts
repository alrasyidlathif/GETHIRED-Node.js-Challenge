import { Request, Response, NextFunction } from "express";
import { returnTemplate } from "../formatter";

export function activitiesCreateValidator(
    req: Request, res: Response, next: NextFunction
) {
    if (!req.body.title) return returnTemplate(res, 400, "Bad Request", "title cannot be null")
    if (!req.body.email) return returnTemplate(res, 400, "Bad Request", "email cannot be null")
    return next()
}

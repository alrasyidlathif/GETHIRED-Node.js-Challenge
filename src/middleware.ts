import { Request, Response, NextFunction } from "express";
import { returnTemplate } from "./formatter";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    console.log(err)
    return returnTemplate(res, 500, 'Error', 'Error')
}

export function notFoundHandler(req: Request, res: Response): Response {
    return returnTemplate(res, 404, 'Not found', 'Not found')
}

export function bodyBlankValidator(
    req: Request, res: Response, next: NextFunction
) {
    const obj = req.body
    if (
        obj 
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype
    ) return returnTemplate(res, 400, "Bad Request", "title cannot be null")
    return next()
}

export function logger(
    req: Request, res: Response, next: NextFunction
) {
    console.log('body:')
    console.log(req.body)
    console.log('params:')
    console.log(req.params)
    console.log('query:')
    console.log(req.query)
    return next()
}

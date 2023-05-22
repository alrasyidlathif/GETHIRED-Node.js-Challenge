import { Request, Response, NextFunction } from "express"
import service from './todos.service'
import { returnTemplate } from "../formatter"
import { Todos } from "./todos.interface"
import { isActiveFormat } from "./todos.helper"

export async function getAll(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const activityId = req.query.activity_group_id ? Number(req.query.activity_group_id) : null
        const result = await service.getAll(activityId)
        return returnTemplate(res, 200, 'Success', 'Success', result)
    } catch (error) {
        return next(error)
    }
}

export async function getOne(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const id = Number(req.params.id)
        const result = await service.getOne(id)
        if (!result) return returnTemplate(res, 404, 'Not Found', `Todo with ID ${id} Not Found`)
        return returnTemplate(res, 200, 'Success', 'Success', isActiveFormat(result))
    } catch (error) {
        return next(error)
    }
}

export async function create(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const data: Todos = {
            'activity_group_id': req.body.activity_group_id,
            'title': req.body.title,
        }
        if (req.body.is_active !== undefined) data.is_active = data.is_active
        if (req.body.priority) data.priority = req.body.priority
        const result = await service.create(data)
        return returnTemplate(res, 201, 'Success', 'Success', isActiveFormat(result))
    } catch (error) {
        return next(error)
    }
}

export async function update(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const id = Number(req.params.id)
        const data = req.body as Todos
        const result = await service.update(id, data)
        if (!result) return returnTemplate(res, 404, 'Not Found', `Todo with ID ${id} Not Found`)
        return returnTemplate(res, 200, 'Success', 'Success', isActiveFormat(result))
    } catch (error) {
        return next(error)
    }
}

export async function deleteTodos(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const id = Number(req.params.id)
        const result = await service.delete(id)
        if (!result) return returnTemplate(res, 404, 'Not Found', `Todo with ID ${id} Not Found`)
        return returnTemplate(res, 200, 'Success', 'Success', {})
    } catch (error) {
        return next(error)
    }
}
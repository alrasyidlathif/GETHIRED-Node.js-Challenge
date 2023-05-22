import { Request, Response, NextFunction } from "express"
import service from './activities.service'
import { returnTemplate } from "../formatter"
import { Activities } from "./activities.interface"

export async function getAll(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const result = await service.getAll()
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
        if (!result) return returnTemplate(res, 404, 'Not Found', `Activity with ID ${id} Not Found`)
        return returnTemplate(res, 200, 'Success', 'Success', result)
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
        const result = await service.create({
            'title': req.body.title,
            'email': req.body.email,
        })
        return returnTemplate(res, 201, 'Success', 'Success', result)
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
        const data = req.body as Activities
        const result = await service.update(id, data)
        if (!result) return returnTemplate(res, 404, 'Not Found', `Activity with ID ${id} Not Found`)
        return returnTemplate(res, 200, 'Success', 'Success', result)
    } catch (error) {
        return next(error)
    }
}

export async function deleteActivities(
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> {
    try {
        const id = Number(req.params.id)
        const result = await service.delete(id)
        if (!result) return returnTemplate(res, 404, 'Not Found', `Activity with ID ${id} Not Found`)
        return returnTemplate(res, 200, 'Success', 'Success', {})
    } catch (error) {
        return next(error)
    }
}
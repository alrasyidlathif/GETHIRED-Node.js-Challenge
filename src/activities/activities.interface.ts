import { PoolConnection } from "mysql2/promise"

export type Activities = {
    id?: number
    title: string
    email: string
    createdAt?: string
}

export interface ActivitiesModelI {
    getAll(conn: PoolConnection): Promise<Activities[]>
    getOne(conn: PoolConnection, id: number): Promise<Activities>
    create(conn: PoolConnection, data: Activities): Promise<void>
    update(conn: PoolConnection, id: number, data: Activities): Promise<void>
    delete(conn: PoolConnection, id: number): Promise<void>
    getLastId(conn: PoolConnection): Promise<number>
}

export interface ActivitiesServiceI {
    getAll(): Promise<Activities[]>
    getOne(id: number): Promise<Activities>
    create(data: Activities): Promise<Activities>
    update(id: number, data: Activities): Promise<Activities>
    delete(id: number): Promise<boolean>
}

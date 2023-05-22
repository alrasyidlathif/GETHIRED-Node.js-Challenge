import { PoolConnection } from "mysql2/promise"

export type Todos = {
    id?: number
    activity_group_id: number
    title: string
    is_active?: boolean
    priority?: string
    createdAt?: string
}

export interface TodosModelI {
    getAll(conn: PoolConnection, activityId: number): Promise<Todos[]>
    getOne(conn: PoolConnection, id: number): Promise<Todos>
    create(conn: PoolConnection, data: Todos): Promise<void>
    update(conn: PoolConnection, id: number, data: Todos): Promise<void>
    delete(conn: PoolConnection, id: number): Promise<void>
    getLastId(conn: PoolConnection): Promise<number>
}

export interface TodosServiceI {
    getAll(activityId: number): Promise<Todos[]>
    getOne(id: number): Promise<Todos>
    create(data: Todos): Promise<Todos>
    update(id: number, data: Todos): Promise<Todos>
    delete(id: number): Promise<boolean>
}

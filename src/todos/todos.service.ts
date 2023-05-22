import { PoolConnection } from "mysql2/promise";
import db from "../db";
import { Todos, TodosModelI, TodosServiceI } from "./todos.interface";
import TodosModel from "./todos.model";

class TodosService implements TodosServiceI {
    private db = db
    private model: TodosModelI

    constructor(model: TodosModelI) {
        this.model = model
    }
    
    async getAll(activityId: number): Promise<Todos[]> {
        try {
            const result = await this.model.getAll(null, activityId)
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOne(id: number): Promise<Todos> {
        try {
            const result = await this.model.getOne(null, id)
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(data: Todos): Promise<Todos> {
        let conn: PoolConnection = null
        try {
            conn = await this.db.getConnection()
            await conn.beginTransaction()
            await this.model.create(conn, data)
            const lasdId = await this.model.getLastId(conn)
            const result = await this.model.getOne(conn, lasdId)
            await conn.commit()
            conn.release()
            return result
        } catch (error) {
            await conn?.rollback()
            conn?.release()
            throw new Error(error)
        }
    }

    async update(id: number, data: Todos): Promise<Todos> {
        let conn: PoolConnection = null
        try {
            const oldData = await this.model.getOne(null, id)
            if (!oldData) return null
            const newData = oldData
            if (data.activity_group_id) newData.activity_group_id = data.activity_group_id
            if (data.is_active) newData.is_active = data.is_active
            if (data.priority) newData.priority = data.priority
            if (data.title) newData.title = data.title
            conn = await this.db.getConnection()
            await conn.beginTransaction()
            await this.model.update(conn, id, newData)
            const result = await this.model.getOne(conn, id)
            await conn.commit()
            conn.release()
            return result
        } catch (error) {
            await conn?.rollback()
            conn?.release()
            throw new Error(error)
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await this.model.getOne(null, id)
            if (!result) return false
            await this.model.delete(null, id)
            return true
        } catch (error) {
            throw new Error(error)
        }
    }
    
}

export default new TodosService(new TodosModel())
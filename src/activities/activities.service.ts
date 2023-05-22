import { PoolConnection } from "mysql2/promise";
import db from "../db";
import { Activities, ActivitiesModelI, ActivitiesServiceI } from "./activities.interface";
import ActivitiesModel from "./activities.model";

class ActivitiesService implements ActivitiesServiceI {
    private db = db
    private model: ActivitiesModelI

    constructor(model: ActivitiesModelI) {
        this.model = model
    }
    
    async getAll(): Promise<Activities[]> {
        try {
            const result = await this.model.getAll(null)
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOne(id: number): Promise<Activities> {
        try {
            const result = await this.model.getOne(null, id)
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(data: Activities): Promise<Activities> {
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

    async update(id: number, data: Activities): Promise<Activities> {
        let conn: PoolConnection = null
        try {
            const oldData = await this.model.getOne(null, id)
            if (!oldData) return null
            const newData = oldData
            if (data.title) newData.title = data.title
            if (data.email) newData.email = data.email
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

export default new ActivitiesService(new ActivitiesModel())
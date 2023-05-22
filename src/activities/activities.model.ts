import { Activities, ActivitiesModelI } from "./activities.interface";
import db from '../db'
import { PoolConnection } from 'mysql2/promise'

class ActivitiesModel implements ActivitiesModelI {
    private db = db

    async getAll(conn: PoolConnection): Promise<Activities[]> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            const [rows, fields] = await conn.execute(`
                SELECT 
                activity_id AS id,
                title,
                email,
                created_at AS createdAt
                FROM activities;
            `)
            if (releaseConn) conn.release()
            return rows as Activities[]
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async getOne(conn: PoolConnection, id: number): Promise<Activities> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            const [rows, fields] = await conn.execute(`
                SELECT 
                activity_id AS id,
                title,
                email,
                created_at AS createdAt
                FROM activities
                WHERE activity_id = ?;
            `, [id])
            if (releaseConn) conn.release()
            return rows[0] as Activities
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async create(conn: PoolConnection, data: Activities): Promise<void> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            await conn.execute(`
                INSERT INTO 
                activities (title, email) 
                VALUES (?, ?);
            `, [data.title, data.email])
            if (releaseConn) conn.release()
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async update(conn: PoolConnection, id: number, data: Activities): Promise<void> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            await conn.execute(`
                UPDATE activities
                SET
                title = ?,
                email = ?
                WHERE activity_id = ?;
            `, [data.title, data.email, id])
            if (releaseConn) conn.release()
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async delete(conn: PoolConnection, id: number): Promise<void> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            await conn.execute(`
                DELETE FROM activities
                WHERE activity_id = ?;
            `, [id])
            if (releaseConn) conn.release()
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async getLastId(conn: PoolConnection): Promise<number> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            const [rows, fields] = await conn.execute(`SELECT LAST_INSERT_ID() AS last_id;`)
            if (releaseConn) conn.release()
            return rows[0].last_id
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }
}

export default ActivitiesModel
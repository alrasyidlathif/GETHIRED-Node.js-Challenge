import { Todos, TodosModelI } from "./todos.interface";
import db from '../db'
import { PoolConnection } from 'mysql2/promise'
import { createTodosInsertQuery } from "./todos.helper";

class TodosModel implements TodosModelI {
    private db = db

    async getAll(conn: PoolConnection, activityId: number): Promise<Todos[]> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            const [rows, fields] = await conn.execute(`
                SELECT 
                todo_id AS id,
                activity_group_id,
                title,
                is_active,
                priority,
                created_at AS createdAt
                FROM todos 
                ${activityId ? 'WHERE activity_group_id = ?' : ''};
            `, [activityId])
            if (releaseConn) conn.release()
            return rows as Todos[]
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async getOne(conn: PoolConnection, id: number): Promise<Todos> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            const [rows, fields] = await conn.execute(`
                SELECT 
                todo_id AS id,
                activity_group_id,
                title,
                is_active,
                priority,
                created_at AS createdAt
                FROM todos 
                WHERE todo_id = ?;
            `, [id])
            if (releaseConn) conn.release()
            return rows[0] as Todos
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async create(conn: PoolConnection, data: Todos): Promise<void> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            const q = createTodosInsertQuery(data)
            await conn.execute(`
                INSERT INTO 
                todos ${q.strQuery} 
                VALUES ${q.strReplacement};
            `, q.strReplacementValue)
            if (releaseConn) conn.release()
        } catch (error) {
            if (releaseConn) conn.release()
            throw new Error(error)
        }
    }

    async update(conn: PoolConnection, id: number, data: Todos): Promise<void> {
        let releaseConn: boolean = false
        try {
            if (!conn) {
                conn = await db.getConnection()
                releaseConn = true
            }
            await conn.execute(`
                UPDATE todos
                SET
                activity_group_id = ?,
                title = ?,
                is_active = ?,
                priority = ?
                WHERE todo_id = ?;
            `, [data.activity_group_id, data.title, data.is_active, data.priority, id])
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
                DELETE FROM todos
                WHERE todo_id = ?;
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

export default TodosModel
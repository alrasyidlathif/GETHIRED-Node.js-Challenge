import mysql, { Pool, PoolOptions, PoolConnection } from 'mysql2/promise'
import { config } from "./config"

class DB {
    private static instance: DB
    private pool: Pool
    private config: PoolOptions = {
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        queueLimit: 0,
        idleTimeout: 10000,
        user: config.mysql.user || '',
        password: config.mysql.password || '',
        database: config.mysql.dbname || '',
        host: config.mysql.host || '',
        port: Number(config.mysql.port) || 3306,
    }

    private constructor() {
        this.pool = mysql.createPool(this.config)
    }

    async initTable() {
        await this.getPool().query(`
            CREATE TABLE IF NOT EXISTS activities (
                activity_id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT NOW(),
                PRIMARY KEY (activity_id)
            );
        `)
        await this.getPool().query(`
            CREATE TABLE IF NOT EXISTS todos (
                todo_id INT NOT NULL AUTO_INCREMENT,
                activity_group_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                priority ENUM('very-low', 'low', 'medium', 'high', 'very-high') NOT NULL DEFAULT 'very-high',
                is_active BOOLEAN NOT NULL DEFAULT true,
                created_at DATETIME NOT NULL DEFAULT NOW(),
                PRIMARY KEY (todo_id)
            );
        `)
    }

    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB()
        }
        return DB.instance
    }

    getPool(): Pool {
        return this.pool
    }

    async getConnection(): Promise<PoolConnection> {
        return await this.pool.getConnection()
    }
}

export default DB.getInstance()
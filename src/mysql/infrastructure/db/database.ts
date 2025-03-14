import mysql, { Pool } from "mysql2/promise";
import DBProvider from "../provider/DatabaseProvider";

export default class Database {
    private static instance: Database;
    private readonly pool: Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: DBProvider.getDBHost(),
            user: DBProvider.getDBUser(),
            password: DBProvider.getDBPassword(),
            database: DBProvider.getDBName(),
            port: Number(DBProvider.getDBPort()),
            waitForConnections: true,
            connectionLimit: 10, // Número de conexiones simultáneas permitidas
            queueLimit: 0 // 0 significa sin límite de cola de espera
        });
        console.log("Pool de conexiones a la base de datos creado");
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getPool(): Pool {
        return this.pool;
    }

    public async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const [rows] = await this.pool.execute(query, params);
            return rows;
        } catch (error) {
            console.error("Error en la consulta:", error);
            return [];
        }
    }

    public async closePool(): Promise<void> {
        try {
            await this.pool.end();
            console.log("Pool de conexiones cerrado correctamente");
        } catch (error) {
            console.error("Error al cerrar el pool de conexiones:", error);
        }
    }
}

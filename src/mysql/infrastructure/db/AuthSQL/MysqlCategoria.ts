import CategoriaRepoInterface from "../../../domain/repository/CategoriaRepoInterface";
import { MysqlCategoria } from "../../../domain/producto/MySQLCategoria";
import { MysqlTipoProducto } from "../../../domain/producto/MySQLTipoProducto";
import Database from "../database";




export default class MysqlCategoriaRepository implements CategoriaRepoInterface {
    private readonly db = Database.getInstance();

    public fetchCategorias = async (): Promise<MysqlCategoria[]> => {
        const rows = await this.db.executeQuery(
            `SELECT idCategoria, nombreCategoria, tipo FROM BuenaVista_Categoria`
        );

        if (!rows || rows.length === 0) {
            return Promise.reject(new Error("No se encontraron categorías"));
        }

        return rows as MysqlCategoria[];
    }
    public fetchCategoriasById = async (id: number): Promise<MysqlCategoria> => {
        const rows = await this.db.executeQuery(
            `SELECT idCategoria, nombreCategoria, tipo FROM BuenaVista_Categoria WHERE idCategoria = ?`,
            [id]
        );

        if (!rows || rows.length === 0) {
            return Promise.reject(new Error("No se encontró la categoría"));
        }

        return rows[0] as MysqlCategoria;
    }
    public fetchCategoriasByNombre = async (nombre: string): Promise<MysqlCategoria[]> => {
        const rows = await this.db.executeQuery(
            `SELECT idCategoria, nombreCategoria, tipo FROM BuenaVista_Categoria WHERE nombreCategoria LIKE ?`,
            [`%${nombre}%`]
        );

        if (!rows || rows.length === 0) {
            return Promise.reject(new Error("No se encontraron categorías con ese nombre"));
        }

        return rows as MysqlCategoria[];
    }
    public fetchTipoProductos = async (): Promise<MysqlTipoProducto[]> => {
        const rows = await this.db.executeQuery(
            `SELECT idTipoProducto, nombreTipoProducto FROM BuenaVista_TipoProducto`
        );

        if (!rows || rows.length === 0) {
            return Promise.reject(new Error("No se encontraron tipos de productos"));
        }

        return rows as MysqlTipoProducto[];
    }
    public fetchTipoProductoById = async (id: number): Promise<MysqlTipoProducto> => {
        const rows = await this.db.executeQuery(
            `SELECT idTipoProducto, nombreTipoProducto FROM BuenaVista_TipoProducto WHERE idTipoProducto = ?`,
            [id]
        );

        if (!rows || rows.length === 0) {
            return Promise.reject(new Error("No se encontró el tipo de producto"));
        }

        return rows[0] as MysqlTipoProducto;
    }
    public addCategoria = async (categoria: MysqlCategoria): Promise<boolean> => {
        const result = await this.db.executeQuery(
            `INSERT INTO BuenaVista_Categoria (nombreCategoria, tipo) VALUES (?, ?)`,
            [categoria.nombreCategoria, categoria.tipo]
        );

        return result.affectedRows > 0;
    }
    public addTipoProducto = async (tipoProducto: MysqlTipoProducto): Promise<boolean> => {
        const result = await this.db.executeQuery(
            `INSERT INTO BuenaVista_TipoProducto (nombreTipoProducto) VALUES (?)`,
            [tipoProducto.nombreTipoProducto]
        );

        return result.affectedRows > 0;
    }


}
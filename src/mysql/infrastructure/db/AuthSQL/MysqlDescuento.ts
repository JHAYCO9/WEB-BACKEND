import DescuentoRepoInterface from "../../../domain/repository/DescuentoRepoInterface";
import { MysqlDescuento } from "../../../domain/producto/MySQLDescuento";
import Database from "../database";




export default class MysqlDescuentoRepository implements DescuentoRepoInterface {
    private readonly db = Database.getInstance();

    public async fetchDescuentos(): Promise<MysqlDescuento[]> {
        const rows = await this.db.executeQuery("SELECT * FROM BuenaVista_Descuentos");
        return rows as MysqlDescuento[];
    }

    public async fetchDescuentoById(id: number): Promise<MysqlDescuento> {
        const rows = await this.db.executeQuery(
            "SELECT * FROM BuenaVista_Descuentos WHERE idDescuento = ?",
            [id]
        );
        if (!rows || rows.length === 0) {
            return  rows[0]
        }
        return rows[0] as MysqlDescuento;
    }

    public async fetchDescuentoByNombre(nombre: string): Promise<MysqlDescuento[]> {
        const rows = await this.db.executeQuery(
            "SELECT * FROM BuenaVista_Descuentos WHERE nombreDescuento LIKE ?",
            [`%${nombre}%`]
        );
        return rows as MysqlDescuento[];
    }

    public async addDescuento(descuento: MysqlDescuento): Promise<boolean> {
        const result = await this.db.executeQuery(
            "INSERT INTO BuenaVista_Descuentos (nombreDescuento, porcentaje) VALUES (?, ?)",
            [descuento.nombreDescuento, descuento.valorDescuento]
        );
        return result.affectedRows > 0;
    }

    public async updateDescuento(id: number, descuento: MysqlDescuento): Promise<boolean> {
        const result = await this.db.executeQuery(
            "UPDATE BuenaVista_Descuentos SET nombreDescuento = ?, porcentaje = ? WHERE idDescuento = ?",
            [descuento.nombreDescuento, descuento.valorDescuento, id]
        );
        return result.affectedRows > 0;
    }
    
}
import { MysqlDescuento } from "../producto/MySQLDescuento";

export default interface DescuentoRepoInterface {
    fetchDescuentos(): Promise<MysqlDescuento[]>;
    fetchDescuentoById(id: number): Promise<MysqlDescuento>;
    fetchDescuentoByNombre(nombre: string): Promise<MysqlDescuento[]>;
    addDescuento(descuento: MysqlDescuento): Promise<boolean>;
    updateDescuento(id: number, descuento: MysqlDescuento): Promise<boolean>;
}

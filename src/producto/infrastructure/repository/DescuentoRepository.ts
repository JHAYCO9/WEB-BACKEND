import DescuentoRepoInterface from "../../../mysql/domain/repository/DescuentoRepoInterface";
import { Descuento } from "../../domain/descuento/Descuento";
import NullDescuento from "../../domain/descuento/NullTypes/NullDescuento";
import DescuentoRepositoryPort from "../../domain/port/driven/DescuentoRepositoryPort";
import MysqlDescuentoToDescuento from "./DescuentoToDecuento";

export default class DescuentoRepositoryInfraestructure implements DescuentoRepositoryPort {

    constructor(
        private readonly mysqlDescuentoRepo: DescuentoRepoInterface,
        private readonly descuentoToDescuento: MysqlDescuentoToDescuento
    ) {}

    async getDescuentoByNombre(nombre: string): Promise<Descuento[]> {
        const descuentos = await this.mysqlDescuentoRepo.fetchDescuentoByNombre(nombre);
        return await this.descuentoToDescuento.getArray(descuentos);
    }

    async findAll(): Promise<Descuento[]> {
        const descuentos = await this.mysqlDescuentoRepo.fetchDescuentos();
        return await this.descuentoToDescuento.getArray(descuentos);
    }

    async findById(id: number): Promise<Descuento> {
        const descuento = await this.mysqlDescuentoRepo.fetchDescuentoById(id);
        return await this.descuentoToDescuento.get(descuento);
    }

    async save(item: Descuento): Promise<Descuento> {
        const itemMysql = await this.descuentoToDescuento.teg(item);
        const savedDescuento = await this.mysqlDescuentoRepo.addDescuento(itemMysql);
        if (savedDescuento === false) {
            return new NullDescuento();
        }
        return item;
    }

    async update(id: number, item: Descuento): Promise<boolean | Descuento> {
        const itemMysql = await this.descuentoToDescuento.teg(item);
        return await this.mysqlDescuentoRepo.updateDescuento(id, itemMysql);
    }

    async patch(_id: number, _item: Partial<Descuento>): Promise<boolean | Descuento> {
        return Promise.resolve(false);
    }

    async delete(_id: number): Promise<boolean> {
        return Promise.resolve(false);
    }
}


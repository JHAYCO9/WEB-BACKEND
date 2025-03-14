import { Descuento } from "../../domain/descuento/Descuento";
import DescuentoServiceInterface from "../../domain/interfaces/DescuentoServiceInterface";
import DescuentoRepositoryPort from "../../domain/port/driven/DescuentoRepositoryPort";

export default class DescuentoService implements DescuentoServiceInterface {
    constructor(private readonly descuentoRepository: DescuentoRepositoryPort ) {}

    async getDescuentos(): Promise<Descuento[]> {
        return await this.descuentoRepository.findAll();
    }

    async getDescuentoById(id: number): Promise<Descuento> {
        return await this.descuentoRepository.findById(id);
    }

    async getDescuentoByNombre(nombre: string): Promise<Descuento[]> {
        return await this.descuentoRepository.getDescuentoByNombre(nombre);
    }

    async addDescuento(descuento: Descuento): Promise<boolean> {
        const des = this.descuentoRepository.save(descuento)
        if(des === null || des  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }

    async updateDescuento(id: number, descuento: Descuento): Promise<boolean> {
        const des = this.descuentoRepository.update(id,descuento)
        if(des === null || des  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
}

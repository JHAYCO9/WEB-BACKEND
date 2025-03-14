import { Descuento } from "../../domain/descuento/Descuento";
import DescuentoServiceInterface from "../../domain/interfaces/DescuentoServiceInterface";
import DescuentoDriverPort from "../../domain/port/driver/producto/DescuentoDriverPort";

export default class ProductoUseCase implements DescuentoDriverPort {
    constructor(
        private readonly descuentoService: DescuentoServiceInterface
    ) {}
    public async getDescuentos(): Promise<Descuento[]> {
        const descuentos = await this.descuentoService.getDescuentos();
        return descuentos ?? [];
    }

    public async getDescuentoById(id: number): Promise<Descuento> {
        const descuento = await this.descuentoService.getDescuentoById(id);
        return descuento;
    }

    public async getDescuentoByNombre(nombre: string): Promise<Descuento[]> {
        const descuentos = await this.descuentoService.getDescuentoByNombre(nombre);
        return descuentos ?? [];
    }

    public async addDescuento(descuento: Descuento): Promise<boolean> {
        return await this.descuentoService.addDescuento(descuento);
    }

    public async updateDescuento(id: number, descuento: Descuento): Promise<boolean> {
        return await this.descuentoService.updateDescuento(id, descuento);
    }

   


}
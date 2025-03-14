import { Descuento } from "../descuento/Descuento";

export default interface DescuentoServiceInterface {
    getDescuentos(): Promise<Descuento[]>;
    getDescuentoById(id: number): Promise<Descuento>;
    getDescuentoByNombre(nombre: string): Promise<Descuento[]>;
    addDescuento(descuento: Descuento): Promise<boolean>;
    updateDescuento(id: number, descuento: Descuento): Promise<boolean>;
}
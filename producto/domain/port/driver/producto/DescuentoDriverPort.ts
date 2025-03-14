import { Descuento } from "../../../descuento/Descuento";

export default interface DescuentoUseCasePort {
    getDescuentos: () => Promise<Descuento[]>;
    getDescuentoById: (id: number) => Promise<Descuento>;
    getDescuentoByNombre: (nombre: string) => Promise<Descuento[]>;
    addDescuento: (descuento: any) => Promise<boolean>;
    updateDescuento: (id: number, descuento: Descuento) => Promise<boolean>;
  }

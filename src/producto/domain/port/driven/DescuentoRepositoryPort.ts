import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { Descuento } from "../../descuento/Descuento";

export default interface DescuentoRepositoryPort 
    extends RepositoryInterface<number, Descuento >  {
    getDescuentoByNombre(nombre: string): Promise<Descuento[]>;
    
}
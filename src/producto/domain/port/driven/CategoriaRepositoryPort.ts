import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { Categoria } from "../../categoria/Categoria";
import { TipoProducto } from "../../tipoProducto/TipoProducto";

export default interface CategoriaRepository
    extends RepositoryInterface<number, Categoria >  {
    getCategoriasByNombre(nombre: string): Promise<Categoria[]>;
    getTipoProductos(): Promise<TipoProducto[]>;
    getTipoProductoById(id: number): Promise<TipoProducto>;
    addTipoProducto(tipoProducto: TipoProducto): Promise<boolean>;
}
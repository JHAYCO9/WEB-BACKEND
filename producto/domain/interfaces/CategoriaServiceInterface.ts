import { Categoria } from "../categoria/Categoria";
import { TipoProducto } from "../tipoProducto/TipoProducto";

export default interface CategoriaServiceInterface {
    getCategorias(): Promise<Categoria[]>;
    getCategoriasById(id: number): Promise<Categoria>;
    getCategoriasByNombre(nombre: string): Promise<Categoria[]>;
    getTipoProductos(): Promise<TipoProducto[]>;
    getTipoProductoById(id: number): Promise<TipoProducto>;
    addCategoria(categoria: Categoria): Promise<boolean>;
    addTipoProducto(tipoProducto: TipoProducto): Promise<boolean>;
}
import { MysqlCategoria } from "../producto/MySQLCategoria";
import { MysqlTipoProducto } from "../producto/MySQLTipoProducto";

export default interface CategoriaRepoInterface {
    fetchCategorias(): Promise<MysqlCategoria[]>;
    fetchCategoriasById(id: number): Promise<MysqlCategoria>;
    fetchCategoriasByNombre(nombre: string): Promise<MysqlCategoria[]>;
    fetchTipoProductos(): Promise<MysqlTipoProducto[]>;
    fetchTipoProductoById(id: number): Promise<MysqlTipoProducto>;
    addCategoria(categoria: MysqlCategoria): Promise<boolean>;
    addTipoProducto(tipoProducto: MysqlTipoProducto): Promise<boolean>;
}
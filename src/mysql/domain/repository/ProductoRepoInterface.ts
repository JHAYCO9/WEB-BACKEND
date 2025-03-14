import { MySQLFiltrarProducto } from "../producto/MySQLFilter";
import { MysqlProducto } from "../producto/MySQLProducto";

export default interface ProductoRepoInterface {
    fetchAllProductos(): Promise<MysqlProducto[]>;
    fetchProductoById(id: number): Promise<MysqlProducto>;
    fetchProductoByName(nombre: string): Promise<MysqlProducto[]>;
    fetchProductosByCategoria(categoria: string): Promise<MysqlProducto[]>;
    fetchProductoByMarca(marca: string): Promise<MysqlProducto[]>;
    fetchImgProducto(idProducto: string): Promise<string>;
    addProducto(producto: MysqlProducto): Promise<boolean>;
    updateProducto(id: number, producto: MysqlProducto): Promise<boolean>;
    filterProductos(producto:MySQLFiltrarProducto): Promise<MysqlProducto[]>;
    searchProductos(busq: string): Promise<MysqlProducto[]>;
}

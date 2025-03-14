import ProductoRepoInterface from "../../../mysql/domain/repository/ProductoRepoInterface";
import ProductoRepository from "../../domain/port/driven/ProductoRepositoryPort";
import { FiltrarProducto } from "../../domain/producto/interface/FilterInterface";
import NullProducto from "../../domain/producto/NullTypes/NullProducto";
import { Producto } from "../../domain/producto/Producto";
import MysqlProductosToProductos from "./ProductoToProducto";

export default class ProductoRepositoryInfraestructure implements ProductoRepository {

    constructor(
        private readonly mysqlProductoRepo: ProductoRepoInterface,
        private readonly productoToProducto: MysqlProductosToProductos
    ) {}
    async filterProductos(filters: FiltrarProducto): Promise<Producto[]> {
        const fil = await this.productoToProducto.filterToMysqlFilter(filters)
        const productos = await this.mysqlProductoRepo.filterProductos(fil)
        const produ = await this.productoToProducto.getArray(productos)
        return produ
    }
    async searchProductos(search: string): Promise<Producto[]> {
        const productos = await this.mysqlProductoRepo.searchProductos(search)
        const produ = await this.productoToProducto.getArray(productos)
        return produ
    }
    async getProductoByName(nombre: string): Promise<Producto[]> {
        const productos = await this.mysqlProductoRepo.fetchProductoByName(nombre);
        const produ =  await this.productoToProducto.getArray(productos)
        return produ
       
    }
    
    async getProductosByCategoria(categoria: string): Promise<Producto[]> {
        const productos = await this.mysqlProductoRepo.fetchProductosByCategoria(categoria);
        const produ =  await this.productoToProducto.getArray(productos)
        return produ

    }
    
    async getProductoByMarca(marca: string): Promise<Producto[]> {
        const productos = await this.mysqlProductoRepo.fetchProductoByMarca(marca);
        const produ =  await this.productoToProducto.getArray(productos)
        return produ

    }
    
    async getImgProducto(idProducto: string): Promise<string> {
        return await this.mysqlProductoRepo.fetchImgProducto(idProducto);
    }
    
    async findAll(): Promise<Producto[]> {
        const productos = await this.mysqlProductoRepo.fetchAllProductos();
        
        if (!productos || productos.length === 0) {
            console.log("No se encontraron productos en la base de datos");
            return [];
        }
        
        const produ = await this.productoToProducto.getArray(productos);
        
        return produ;
    }
    
    async findById(id: number): Promise<Producto> {
        const producto = await this.mysqlProductoRepo.fetchProductoById(id);
        const produ =  await this.productoToProducto.get(producto)
        return produ
       
    }
    
    async save(item: Producto): Promise<Producto> {
        const itemMysql = await this.productoToProducto.teg(item)
        const savedProducto = await this.mysqlProductoRepo.addProducto(itemMysql);
        if(savedProducto=== false){
            return new NullProducto()
        }
        return item
    }
    
    async update(id: number, item: Producto): Promise<boolean | Producto> {
        const itemMysql = await this.productoToProducto.teg(item)
        return await this.mysqlProductoRepo.updateProducto(id, itemMysql);
    }
    
    async patch(_id: number, _item: Partial<Producto>): Promise<boolean | Producto> {
        return Promise.resolve(false);
    }
    
    async delete(_id: number): Promise<boolean> {
        return Promise.resolve(false);

    }
   
    
}

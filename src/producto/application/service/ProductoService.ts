import ProductoServiceInterface from "../../domain/interfaces/ProductoServiceInterface";
import ProductoRepository from "../../domain/port/driven/ProductoRepositoryPort";
import { FiltrarProducto } from "../../domain/producto/interface/FilterInterface";
import { Producto } from "../../domain/producto/Producto";

export default class ProductoService implements ProductoServiceInterface {
    constructor(private readonly productoRepository: ProductoRepository) { }
    /**
     * Filters products based on specified criteria.
     * This method delegates the filtering operation to the product repository.
     * 
     * @param {FiltrarProducto} filters - The filter criteria to apply
     * @returns {Promise<Producto[]>} A promise that resolves to an array of filtered products
     */
    async filterProductos(filters: FiltrarProducto): Promise<Producto[]> {
        return await this.productoRepository.filterProductos(filters);
    }

    /**
     * Searches for products by name or brand.
     * This method delegates the search operation to the product repository.
     * 
     * @param {string} search - The search query to apply
     * @returns {Promise<Producto[]>} A promise that resolves to an array of matching products
     */
    async searchProductos(search: string): Promise<Producto[]> {
        return await this.productoRepository.searchProductos(search);
    }


    async getAllProductos(): Promise<Producto[]> {
        return await this.productoRepository.findAll();
    }

    async getProductoById(id: number): Promise<Producto> {
        return await this.productoRepository.findById(id);
    }

    async getProductoByName(nombre: string): Promise<Producto[]> {
        return await this.productoRepository.getProductoByName(nombre);
    }

    async getProductosByCategoria(categoria: string): Promise<Producto[]> {
        return await this.productoRepository.getProductosByCategoria(categoria);
    }

    async getProductoByMarca(marca: string): Promise<Producto[]> {
        return await this.productoRepository.getProductoByMarca(marca);
    }

    async getImgProducto(idProducto: string): Promise<string> {
        return await this.productoRepository.getImgProducto(idProducto);
    }

    public async addProducto(producto: Producto): Promise<boolean> {
        const product = this.productoRepository.save(producto)
        if (product === null || product === undefined) {
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }

    public async updateProducto(id: number, producto: Producto): Promise<boolean> {
        const product = this.productoRepository.update(id, producto)
        if (product === null || product === undefined) {
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }

}

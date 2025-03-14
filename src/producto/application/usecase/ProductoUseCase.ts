import ProductoServiceInterface from "../../domain/interfaces/ProductoServiceInterface";
import ProductoDriverPort from "../../domain/port/driver/producto/ProductoDriver";
import { FiltrarProducto } from "../../domain/producto/interface/FilterInterface";
import { Producto } from "../../domain/producto/Producto";

export default class ProductoUseCase implements ProductoDriverPort {
    private readonly numeroVitrina: number = 12
    constructor(
        private readonly productoService: ProductoServiceInterface
    ) { }
    public async getProductosVitrina(vitrina: number): Promise<Producto[]> {
        try {
            // Validar que el ID de la vitrina sea un número válido
            if (!vitrina || vitrina <= 0) {
                throw new Error("ID de vitrina no válido");
            }
            // Obtener todos los productos
            const productos = await this.getAllProductos();

            const inicio = (vitrina - 1) * this.numeroVitrina;
            const fin = vitrina * this.numeroVitrina;

            return productos.slice(inicio, fin);
        } catch (error) {
            console.error('Error en getProductosVitrina:', error);
            return [];
        }
    }

    /**
     * Filters products based on specified criteria.
     * This method delegates the filtering operation to the product service.
     * 
     * @param {FiltrarProducto} filters - The filter criteria to apply
     * @returns {Promise<Producto[]>} A promise that resolves to an array of filtered products
     */
    public async filterProductos(filters: FiltrarProducto): Promise<Producto[]> {
        try {
            // Validate filter object
            if (!filters || Object.keys(filters).length === 0) {
                // If no filters provided, return all products
                return await this.getAllProductos();
            }

            // Delegate to service layer
            const productos = await this.productoService.filterProductos(filters);

            // Return filtered products or empty array if null/undefined
            return productos || [];
        } catch (error) {
            console.error('Error in filterProductos use case:', error);
            // In case of error, return empty array
            return [];
        }
    }

    /**
     * Searches for products by name or brand.
     * This method delegates the search operation to the product service.
     * 
     * @param {string} search - The search query to apply
     * @returns {Promise<Producto[]>} A promise that resolves to an array of matching products
     */
    public async searchProductos(search: string): Promise<Producto[]> {
        try {
            // Validate search parameter
            if (!search || search.trim() === '') {
                // If no search query provided, return all products
                return await this.getAllProductos();
            }

            // Delegate to service layer
            const productos = await this.productoService.searchProductos(search);

            // Return search results or empty array if null/undefined
            return productos || [];
        } catch (error) {
            console.error('Error in searchProductos use case:', error);
            // In case of error, return empty array
            return [];
        }
    }
    public async addProducto(producto: Producto): Promise<boolean> {
        return await this.productoService.addProducto(producto);
    }

    public async updateProducto(id: number, producto: Producto): Promise<boolean> {
        return await this.productoService.updateProducto(id, producto);
    }

    public async getAllProductos(): Promise<Producto[]> {
        const productos = await this.productoService.getAllProductos();
        console.log(productos)
        return productos;
    }

    public async getProductoById(id: number): Promise<Producto> {
        const producto = await this.productoService.getProductoById(id);
        return producto || ({} as Producto);
    }

    public async getProductoByName(nombre: string): Promise<Producto[]> {
        const productos = await this.productoService.getProductoByName(nombre);
        return productos || [];
    }

    public async getProductosByCategoria(categoria: string): Promise<Producto[]> {
        const productos = await this.productoService.getProductosByCategoria(categoria);
        return productos;
    }

    public async getProductoByMarca(marca: string): Promise<Producto[]> {
        const productos = await this.productoService.getProductoByMarca(marca);
        return productos;
    }

    public async getImgProducto(idProducto: string): Promise<string> {
        const imagen = await this.productoService.getImgProducto(idProducto);
        return imagen || "";
    }


}
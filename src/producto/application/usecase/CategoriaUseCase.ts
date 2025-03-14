import { Categoria } from "../../domain/categoria/Categoria";
import CategoriaServiceInterface from "../../domain/interfaces/CategoriaServiceInterface";
import CategoriaDriverPort from "../../domain/port/driver/producto/CategoriaDriverPort";

import { TipoProducto } from "../../domain/tipoProducto/TipoProducto";

export default class CategoriaUseCase implements CategoriaDriverPort {
    constructor(
        private readonly categoriaService: CategoriaServiceInterface
    ) {}
    public async getCategorias(): Promise<Categoria[]> {
        const categorias = await this.categoriaService.getCategorias();
        
        return categorias;
    }

    public async getCategoriasById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaService.getCategoriasById(id);
        return categoria ; // Retorna un objeto vacío si no se encuentra
    }

    public async getCategoriasByNombre(nombre: string): Promise<Categoria[]> {
        const categorias = await this.categoriaService.getCategoriasByNombre(nombre);
        return categorias.length > 0 ? categorias : [];
    }

    public async getTipoProductos(): Promise<TipoProducto[]> {
        const tipoProductos = await this.categoriaService.getTipoProductos();
        return tipoProductos.length > 0 ? tipoProductos : [];
    }

    public async getTipoProductoById(id: number): Promise<TipoProducto> {
        const tipoProducto = await this.categoriaService.getTipoProductoById(id);
        return tipoProducto ; 
    }

    public async addCategoria(categoria: Categoria): Promise<boolean> {
        return await this.categoriaService.addCategoria(categoria);
    }

    public async addTipoProducto(tipoProducto: TipoProducto): Promise<boolean> {
        return await this.categoriaService.addTipoProducto(tipoProducto);
    }



}
import { Categoria } from "../../domain/categoria/Categoria";
import CategoriaServiceInterface from "../../domain/interfaces/CategoriaServiceInterface";
import CategoriaRepository from "../../domain/port/driven/CategoriaRepositoryPort";
import { TipoProducto } from "../../domain/tipoProducto/TipoProducto";

export default class CategoriaService implements CategoriaServiceInterface {
    constructor(private readonly categoriaRepository: CategoriaRepository) {}

    async getCategorias(): Promise<Categoria[]> {
        return await this.categoriaRepository.findAll();
    }

    async getCategoriasById(id: number): Promise<Categoria> {
        return await this.categoriaRepository.findById(id);
    }

    async getCategoriasByNombre(nombre: string): Promise<Categoria[]> {
        return await this.categoriaRepository.getCategoriasByNombre(nombre);
    }

    async getTipoProductos(): Promise<TipoProducto[]> {
        return await this.categoriaRepository.getTipoProductos();
    }

    async getTipoProductoById(id: number): Promise<TipoProducto> {
        return await this.categoriaRepository.getTipoProductoById(id);
    }

    async addCategoria(categoria: Categoria): Promise<boolean> {
        const cat = this.categoriaRepository.save(categoria)
        if(cat === null || cat  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }

    async addTipoProducto(tipoProducto: TipoProducto): Promise<boolean> {
        return await this.categoriaRepository.addTipoProducto(tipoProducto);
    }
}

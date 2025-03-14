
import CategoriaRepoInterface from "../../../mysql/domain/repository/CategoriaRepoInterface";
import { Categoria } from "../../domain/categoria/Categoria";
import NullCategoria from "../../domain/categoria/NullTypes/NullCategoria";
import CategoriaRepository from "../../domain/port/driven/CategoriaRepositoryPort";
import { TipoProducto } from "../../domain/tipoProducto/TipoProducto";
import MysqlCategoriaToCategoria from "./CategoriaToCategoria";
import MysqlTipoProductoToTipoProducto from "./TipoProdutoToTipoProducto";

export default class CategoriaRepositoryInfraestructure implements CategoriaRepository {

    constructor(
        private readonly mysqlCategoriaRepo: CategoriaRepoInterface,
        private readonly categoriaToCategoria: MysqlCategoriaToCategoria,
        private readonly tipoProductoToTipoProducto: MysqlTipoProductoToTipoProducto
    ) {}

    async getCategoriasByNombre(nombre: string): Promise<Categoria[]> {
        const categorias = await this.mysqlCategoriaRepo.fetchCategoriasByNombre(nombre);
        return await this.categoriaToCategoria.getArray(categorias);
    }

    async getTipoProductos(): Promise<TipoProducto[]> {
        const tipos = await this.mysqlCategoriaRepo.fetchTipoProductos();
        return await this.tipoProductoToTipoProducto.getArray(tipos);
    }

    async getTipoProductoById(id: number): Promise<TipoProducto> {
        const tipo = await this.mysqlCategoriaRepo.fetchTipoProductoById(id);
        return await this.tipoProductoToTipoProducto.get(tipo);
    }

    async addTipoProducto(tipoProducto: TipoProducto): Promise<boolean> {
        const tipoMysql = await this.tipoProductoToTipoProducto.teg(tipoProducto);
        return await this.mysqlCategoriaRepo.addTipoProducto(tipoMysql);
    }

    async findAll(): Promise<Categoria[]> {
        const categorias = await this.mysqlCategoriaRepo.fetchCategorias();
        return await this.categoriaToCategoria.getArray(categorias);
    }

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.mysqlCategoriaRepo.fetchCategoriasById(id);
        return await this.categoriaToCategoria.get(categoria);
    }

    async save(item: Categoria): Promise<Categoria> {
        const itemMysql = await this.categoriaToCategoria.teg(item);
        const savedCategoria = await this.mysqlCategoriaRepo.addCategoria(itemMysql);
        if(savedCategoria === false){
            return new NullCategoria()
        }
        return item;
    }

    async update(_id: number, _item: Categoria): Promise<boolean | Categoria> {
        return Promise.resolve(false);
    }

    async patch(_id: number, _item: Partial<Categoria>): Promise<boolean | Categoria> {
        return Promise.resolve(false);
    }

    async delete(_id: number): Promise<boolean> {
        return Promise.resolve(false);
    }
}

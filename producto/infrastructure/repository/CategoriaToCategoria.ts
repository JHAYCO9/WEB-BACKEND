import { MysqlCategoria } from "../../../mysql/domain/producto/MySQLCategoria";
import MysqlCategoriaRepository from "../../../mysql/infrastructure/db/AuthSQL/MysqlCategoria";
import { Categoria } from "../../domain/categoria/Categoria";
import MysqlTipoProductoToTipoProducto from "./TipoProdutoToTipoProducto";

export default class MysqlCategoriaToCategoria {

    constructor(
        private readonly tipoToTipo : MysqlTipoProductoToTipoProducto,
        private readonly mysqlCategoriaRepo: MysqlCategoriaRepository
    ){}

    public getArray = async (categorias: MysqlCategoria[]): Promise<Categoria[]> => {
        const categoriasTransformadas = await Promise.all(
            categorias.map(async (categoria) => {
                const tipoProducto = await this.mysqlCategoriaRepo.fetchTipoProductoById(categoria.tipo);
                
                return new Categoria({
                    idCategoria: categoria.idCategoria,
                    nombreCategoria: categoria.nombreCategoria,
                    tipo: await this.tipoToTipo.get(tipoProducto) // Convertimos el tipo a objeto de dominio
                });
            })
        );
    
        return categoriasTransformadas;
    };
    
    
    public get = async (categoria: MysqlCategoria): Promise<Categoria> => {
        const tipoProducto = await this.mysqlCategoriaRepo.fetchTipoProductoById(categoria.tipo);
    
        return new Categoria({
            idCategoria: categoria.idCategoria,
            nombreCategoria: categoria.nombreCategoria,
            tipo: await this.tipoToTipo.get(tipoProducto)
        });
    };
    
    
    
    public teg = async (categoria: Categoria): Promise<MysqlCategoria> => {
        return {
            idCategoria: categoria.getIdCategoria(),
            nombreCategoria: categoria.getNombreCategoria(),
            tipo: categoria.getTipo().getIdTipoProducto() // Tomamos solo el ID del tipo
        };
    };
    
    public tegArray = async (categorias: Categoria[]): Promise<MysqlCategoria[]> => {
        const categoriasTransformadas = await Promise.all(
            categorias.map(async (categoria) => {
                return {
                    idCategoria: categoria.getIdCategoria(),
                    nombreCategoria: categoria.getNombreCategoria(),
                    tipo: categoria.getTipo().getIdTipoProducto() // Convertir objeto a ID
                };
            })
        );
        return categoriasTransformadas;
    };
    
}


import ProductoUseCase from "../../../application/usecase/ProductoUseCase";
import ProductoControllerExpress from "../../express/controller/ProductoControllerExpress";
import ProductoRouterExpress from "../router/ProductoRouterExpress";
import RouterExpressInterface from "../../../../express/domain/RouterExpressInterface";
import ProductoService from "../../../application/service/ProductoService";
import ProductoRepositoryInfraestructure from "../../repository/ProductoRepository";
import MysqlProductosToProductos from "../../repository/ProductoToProducto";
import MysqlProductoRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlProducto";
import MysqlDescuentoToDescuento from "../../repository/DescuentoToDecuento";
import MysqlCategoriaToCategoria from "../../repository/CategoriaToCategoria";
import MysqlTipoProductoToTipoProducto from "../../repository/TipoProdutoToTipoProducto";
import MysqlCategoriaRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlCategoria";
import MysqlDescuentoRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlDescuento";
import CategoriaService from "../../../application/service/CategoriaService";
import CategoriaUseCase from "../../../application/usecase/CategoriaUseCase";
import CategoriaRepositoryInfraestructure from "../../repository/CategoriaRepository";
import DescuentoRepositoryInfraestructure from "../../repository/DescuentoRepository";
import DescuentoService from "../../../application/service/DescuentoService";
import DescuentoUseCase from "../../../application/usecase/DescuentoUseCase";

export default class ProductoRouterFactory {
  public static create(): RouterExpressInterface {

    // Instanciar repositorio
    const mysqlProductoRepository = new MysqlProductoRepository();
    const mysqlCategoriaRepository = new MysqlCategoriaRepository();
    const mysqlDescuentoRepository = new MysqlDescuentoRepository();
    

    // Instanciar conversores
    const tipoToTipo = new MysqlTipoProductoToTipoProducto()
    const categoriaToCategoria = new MysqlCategoriaToCategoria(tipoToTipo,mysqlCategoriaRepository )
    const descuentoToDescuento = new MysqlDescuentoToDescuento()
    const productoToProducto = new MysqlProductosToProductos(descuentoToDescuento, categoriaToCategoria, mysqlCategoriaRepository, mysqlDescuentoRepository );
    
    // Repos
    const productoRepository = new ProductoRepositoryInfraestructure(mysqlProductoRepository, productoToProducto);
    const categoriaRepository = new CategoriaRepositoryInfraestructure(mysqlCategoriaRepository, categoriaToCategoria, tipoToTipo);
    const descuentosRepository = new DescuentoRepositoryInfraestructure(mysqlDescuentoRepository, descuentoToDescuento)

    // Crear el servicio y caso de uso
    const productoService = new ProductoService(productoRepository);
    const productoUseCase = new ProductoUseCase(productoService);

    const categoriaService = new CategoriaService(categoriaRepository);
    const categoriaUseCase = new CategoriaUseCase(categoriaService);

    const descuentoService = new DescuentoService(descuentosRepository);
    const descuentoUseCase = new DescuentoUseCase(descuentoService);

    // Crear el controlador ya como se implemntan del mismo
    const productoController = new ProductoControllerExpress(productoUseCase, descuentoUseCase, categoriaUseCase );
    const descuentoController = new ProductoControllerExpress(productoUseCase, descuentoUseCase, categoriaUseCase );
    const categoriaController = new ProductoControllerExpress(productoUseCase, descuentoUseCase, categoriaUseCase );



    // Retornar el router
    return new ProductoRouterExpress(productoController, descuentoController, categoriaController);
  }
}
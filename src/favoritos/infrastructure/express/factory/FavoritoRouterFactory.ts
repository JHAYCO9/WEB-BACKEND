import RouterExpressInterface from "../../../../express/domain/RouterExpressInterface";
import FavoritoRouterExpress from "../router/FavoritoRouterExpress";
import FavoritoControllerExpress from "../controller/FavoritoControllerExpress";
import FavoritoUseCase from "../../../application/usecase/FavoritoUseCase";
import FavoritoRepositoryInfraestructure from "../../repository/FavoritoRepositoryInfraestruucture";
import MysqlFavoritoToFavorito from "../../repository/FavoritotoFavorito";
import MysqlProductoRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlProducto";
import MysqlProductosToProductos from "../../../../producto/infrastructure/repository/ProductoToProducto";
import MysqlTipoProductoToTipoProducto from "../../../../producto/infrastructure/repository/TipoProdutoToTipoProducto";
import MysqlCategoriaToCategoria from "../../../../producto/infrastructure/repository/CategoriaToCategoria";
import MysqlDescuentoToDescuento from "../../../../producto/infrastructure/repository/DescuentoToDecuento";
import MysqlCategoriaRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlCategoria";
import MysqlFavoritoRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlFavorito";
import MysqlDescuentoRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlDescuento";

export default class FavoritoRouterFactory {
  public static create(): RouterExpressInterface {
    
    const favoritoRepo = new MysqlFavoritoRepository();

    const mysqlProductoRepository = new MysqlProductoRepository();
    const mysqlCategoriaRepository = new MysqlCategoriaRepository();
    const mysqlDescuentoRepository = new MysqlDescuentoRepository();

   // Instanciar conversores
    const tipoToTipo = new MysqlTipoProductoToTipoProducto()
    const categoriaToCategoria = new MysqlCategoriaToCategoria(tipoToTipo,mysqlCategoriaRepository )
    const descuentoToDescuento = new MysqlDescuentoToDescuento()
    const productoToProducto = new MysqlProductosToProductos(descuentoToDescuento, categoriaToCategoria, mysqlCategoriaRepository, mysqlDescuentoRepository );
       
    const favoritoToFavorito = new MysqlFavoritoToFavorito(mysqlProductoRepository ,productoToProducto);
    const favoritoRepository = new FavoritoRepositoryInfraestructure(favoritoRepo, favoritoToFavorito);
    const favoritoUseCase = new FavoritoUseCase(favoritoRepository);
    const favoritoController = new FavoritoControllerExpress(favoritoUseCase);

    // Create and return the router
    return new FavoritoRouterExpress(favoritoController);
  }
}
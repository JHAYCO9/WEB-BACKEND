import RouterExpressInterface from '../../../express/domain/RouterExpressInterface'

export default interface ProductoRouterExpressInterface
  extends RouterExpressInterface {
    configureCategoria: () => void;
    configureDescuento: () => void;
    configureProducto: () => void;
    configureProductoVitrina: () => void;
    configureProductosById: () => void;
    configureProductosByMarca: () => void;
    configureProductosByNombre: () => void;
    configureImageProducto: () => void;
    configureDescuentoById: () => void;
    configureDescuentoByNombre: () => void;
    configureAddDescuento: () => void;
    configureUpdateDescuento: () => void;
    configureTipoProductos: () => void;
    configureTipoProductoById: () => void;
    configureCategoriasById: () => void;
    configureCategoriasByNombre: () => void;
    configureAddCategoria: () => void;
    configureAddTipoProducto: () => void;
    configureAddProducto: () => void;
    configureUpdateProducto: () => void;
    configureBusqueda: () => void;
    configureFilter: () => void;
}
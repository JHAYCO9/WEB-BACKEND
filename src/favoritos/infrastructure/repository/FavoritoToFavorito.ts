import { MysqlFavorito } from "../../../mysql/domain/favorito/MsqlFavorito";
import MysqlProductoRepository from "../../../mysql/infrastructure/db/AuthSQL/MysqlProducto";
import { Producto } from "../../../producto/domain/producto/Producto";
import MysqlProductosToProductos from "../../../producto/infrastructure/repository/ProductoToProducto";
import { Favorito } from "../../domain/favorito/Favoritos";

export default class MysqlFavoritoToFavorito {
    constructor(
        private readonly productosSQLRepo: MysqlProductoRepository,
        private readonly productoToProducto: MysqlProductosToProductos
    ) { }
    public async getArray(favoritos: MysqlFavorito[]): Promise<Favorito> {
        const productos: Producto[] = [];

        for (const favorito of favoritos) {
            const producto = await this.productosSQLRepo.fetchProductoById(favorito.producto_id);
            const produ = await this.productoToProducto.get(producto)
            productos.push(produ);
        }

        return new Favorito({ idProducto: productos });
    }

    public async teg(favorito: Favorito, idUsuario: string): Promise<MysqlFavorito[]> {
        const favoritosTransformados: MysqlFavorito[] = [];

        for (const producto of favorito.getIdProducto()) {
            favoritosTransformados.push({
                usuario_id: idUsuario, // Obtener el ID del usuario desde Favorito
                producto_id: producto.getIdProducto(), // Obtener el ID del producto
            });
        }

        return favoritosTransformados;
    }

}


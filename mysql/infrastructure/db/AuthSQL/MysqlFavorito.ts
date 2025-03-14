import FavoritoRepoInterface from "../../../domain/repository/FavoritoRepoInterface";
import { MysqlFavorito } from "../../../domain/favorito/MsqlFavorito";
import Database from "../database";

export default class MysqlFavoritoRepository implements FavoritoRepoInterface {
    private readonly db = Database.getInstance();

    // Obtener todos los favoritos de un usuario
    public async fetchFavorito(id: string): Promise<MysqlFavorito[]> {
        const rows = await this.db.executeQuery(
            "SELECT * FROM BuenaVista_Favoritos WHERE usuario_id = ?",
            [id]
        );
        return rows as MysqlFavorito[];
    }

    // Agregar un producto a favoritos
    public async addFavorito(id: string, productoId: number): Promise<boolean> {
        const result = await this.db.executeQuery(
            "INSERT INTO BuenaVista_Favoritos (usuario_id, producto_id) VALUES (?, ?)",
            [id, productoId]
        );
        return result.affectedRows > 0;
    }

    // Eliminar un producto de favoritos
    public async deleteFavoritos(id: string, productoId: number): Promise<boolean> {
        const result = await this.db.executeQuery(
            "DELETE FROM BuenaVista_Favoritos WHERE usuario_id = ? AND producto_id = ?",
            [id, productoId]
        );
        return result.affectedRows > 0;
    }
}

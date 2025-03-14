import { MysqlFavorito } from "../favorito/MsqlFavorito";

export default interface FavoritoRepoInterface {
    fetchFavorito(id: string): Promise<MysqlFavorito[]>;
    addFavorito(id: string, productoId: number): Promise<boolean>;
    deleteFavoritos(id: string, productoId: number): Promise<boolean>;
}

import { Favorito } from "../../../favorito/Favoritos";

export default interface FavoritoRepositoryInterface{
    getFavoritos(idUsuario: string): Promise<Favorito>;
    addFavoritos(usuarioId: string, productoId: number): Promise<boolean>;
    deleteFavoritos(usuarioId: string, productoId: number): Promise<boolean>;
}

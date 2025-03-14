import FavoritoRepoInterface from "../../../mysql/domain/repository/FavoritoRepoInterface";
import { Favorito } from "../../domain/favorito/Favoritos";
import FavoritoRepositoryInterface from "../../domain/port/driven/favorito/FavoritoRepositoryInterface";
import MysqlFavoritoToFavorito from "./FavoritotoFavorito";

export default class FavoritoRepositoryInfraestructure implements FavoritoRepositoryInterface {

    constructor( 
        private readonly favoritoRepo: FavoritoRepoInterface,
        private readonly favoritoToFacvorito : MysqlFavoritoToFavorito
    ) {}
    async getFavoritos(idUsuario: string): Promise<Favorito> {
        try {
          const mysqlFavoritos = await this.favoritoRepo.fetchFavorito(idUsuario);
          return await this.favoritoToFacvorito.getArray(mysqlFavoritos);
        } catch (error) {
          console.error("Error fetching favoritos:", error);
          throw new Error("Error fetching favoritos");
        }
      }
    
      async addFavoritos(usuarioId: string, productoId: number): Promise<boolean> {
        try {
          return await this.favoritoRepo.addFavorito(usuarioId, productoId);
        } catch (error) {
          console.error("Error adding favorito:", error);
          throw new Error("Error adding favorito");
        }
      }
    
      async deleteFavoritos(usuarioId: string, productoId: number): Promise<boolean> {
        try {
          return await this.favoritoRepo.deleteFavoritos(usuarioId, productoId);
        } catch (error) {
          console.error("Error deleting favorito:", error);
          throw new Error("Error deleting favorito");
        }
      }
}
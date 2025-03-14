import { Favorito } from "../../domain/favorito/Favoritos";
import FavoritoServiceInterface from "../../domain/interfaces/FavoritoServiceInterface";
import FavoritoRepositoryInterface from "../../domain/port/driven/favorito/FavoritoRepositoryInterface";

export default class FavoritoService implements FavoritoServiceInterface{
    constructor (
        private readonly favoritoRepository : FavoritoRepositoryInterface
    ){}

    async getFavoritos(idUsuario: string): Promise<Favorito> {
        if (!idUsuario || idUsuario.length <= 0) {
          throw new Error("El ID del usuario no es válido.");
        }
        return await this.favoritoRepository.getFavoritos(idUsuario);
      }
    
      async addFavoritos(usuarioId: string, productoId: number): Promise<boolean> {
        if (!usuarioId || usuarioId.length <= 0) {
          throw new Error("El ID del usuario no es válido.");
        }
        if (!productoId) {
          throw new Error("El ID del producto no es válido.");
        }
        return await this.favoritoRepository.addFavoritos(usuarioId, productoId);
      }
    
      async deleteFavoritos(usuarioId: string, productoId: number): Promise<boolean> {
        if (!usuarioId || usuarioId.length <= 0) {
          throw new Error("El ID del usuario no es válido.");
        }
        if (!productoId) {
          throw new Error("El ID del producto no es válido.");
        }
        return await this.favoritoRepository.deleteFavoritos(usuarioId, productoId);
      }

}
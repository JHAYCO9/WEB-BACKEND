import { Favorito } from "../../domain/favorito/Favoritos";
import FavoritoServiceInterface from "../../domain/interfaces/FavoritoServiceInterface";
import FavoritosDriverPort from "../../domain/port/driver/favoritos/FavoritosDriver";

export default class FavoritoUseCase implements FavoritosDriverPort {
  constructor(private readonly favoritoService: FavoritoServiceInterface) {}  
  public async getfavoritos(idUsuario: string): Promise<Favorito> {
    const favoritos = await this.favoritoService.getFavoritos(idUsuario);
    return favoritos;
  }

  public async addProdcutoFavoritos(idUsuario: string, productoID: number): Promise<boolean> {
    return await this.favoritoService.addFavoritos(idUsuario, productoID);
  }

  public async deleteProductoFavoritos(idUsuario: string, productoID: number): Promise<boolean> {
    return await this.favoritoService.deleteFavoritos(idUsuario, productoID);
  }
}
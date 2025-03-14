import { Favorito } from "../../../favorito/Favoritos"

export default interface FavoritosDriverPort{
    getfavoritos(token:string ): Promise<Favorito>
    addProdcutoFavoritos(token:string , producto:number): Promise<boolean> 
    deleteProductoFavoritos(token:string , producto:number):Promise<boolean>
}

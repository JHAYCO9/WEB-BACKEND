import { Favoritos } from "../../../favorito/interface/FavoritosInterface"
import { Producto } from "../../../producto/interface/ProductoInterface"

export default interface FavoritosDriverPort{
    getfavoritos(token:string ):Favoritos[]
    addProdcutoFavoritos(token:string ,producto:Producto): boolean 
    deleteProductoFavoritos(token:string ,producto:Producto):boolean
    deleteAllFavoritos():boolean
}

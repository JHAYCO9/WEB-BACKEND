import { Carrito } from "../../../carrito/interface/CarritoInterface";
import { Favoritos } from "../../../favorito/interface/FavoritosInterface";
import { Rol } from "../../../roles/interface/RolInterface";
import { Usuario } from "../../../usuario/interface/UsuarioInterface";

export default interface UsuarioDriverPort{
    getUsuario():Usuario
    getUsuarioByCi(ci:number):Usuario
    getUsuarioByEmail(email:string):Usuario
    getRolUsuario(ci:number):Rol
    getUsuarioCarrito(ci:number):Carrito
    getUsuarioFavorito(ci:number):Favoritos
}

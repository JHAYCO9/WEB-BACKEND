import AbstractUsuario from "../../../../usuario/domain/usuario/AbstractTypes/AbstractUsuario";
import AbstractCarritoProducto from "../AbstractTypes/AbstraItemCarrito";

export interface Carrito {
  idCarrito: number;
  carritoProducto: AbstractCarritoProducto[];
  usuario : AbstractUsuario
  statusCarrito: boolean;
  totalCarrito: number;

}
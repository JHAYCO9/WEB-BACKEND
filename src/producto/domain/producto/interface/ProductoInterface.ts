import AbstractCategoria from "../../categoria/AbstractTypes/AbstractCategoria";
import AbstractDescuento from "../../descuento/AbstractTypes/AbstractDescuento";

export interface Producto {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string ;
  tallaProducto: string ;
  precioProducto: number;
  estadoProducto: boolean;
  imgProducto: string ;
  stockProducto: number;
  marcaProducto: string ;
  categoria_id: AbstractCategoria ;
  descuento_id: AbstractDescuento;
}
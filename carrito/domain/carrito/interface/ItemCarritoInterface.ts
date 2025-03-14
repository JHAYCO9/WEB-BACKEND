import AbstractProducto from "../../../../producto/domain/producto/AbstractTypes/AbstractProducto";

export default interface ItemCarritoInterface {
    idItemCarrito:number
    idProducto: AbstractProducto ;
    cantidad: number;
    subTotal: number
}
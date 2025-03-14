import { Carrito } from "../../../carrito/interface/CarritoInterface"
import CarritoProducto from "../../../carrito/interface/CarritoProductoInterface"
import { FiltrarProducto } from "../../../producto/interface/FilterInterface"
import { Producto } from "../../../producto/interface/ProductoInterface"

export default interface CarritoDriverPort{
    getCarrito(token:string):Carrito
    addProductoCarrito(token:string, producto:Producto):boolean
    deleteProductoCarrito(token:string, producto:Producto):boolean
    changeStatusCarrito(token:string):boolean
    getTotalCarrito(token:string):number
    getCarritoProdcuto(idCarritoProducto:number):CarritoProducto
}

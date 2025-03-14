import { Producto } from "../../../producto/interface/ProductoInterface"

export default interface ProductoDriverPort{
    getAllProductos(): Producto[]
    getProductoById(id: number):Producto
    getProductoByName(nombre:string):Producto
    getProductosByCategoria(categoria:string):Producto[]
    getProductoByMarca(marca:string):Producto[]
    getImgProducto(url:string):string
}

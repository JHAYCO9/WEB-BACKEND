import { FiltrarProducto } from "../../../producto/interface/FilterInterface"
import { Producto } from "../../../producto/interface/ProductoInterface"


export default interface BusquedaDriverPort{
    searchBar(busqueda:string):Producto[]
    filter(filtros: FiltrarProducto): Producto[]
}
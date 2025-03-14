import { FiltrarProducto } from "../../../producto/interface/FilterInterface"
import { Producto } from "../../../producto/interface/ProductoInterface"
import { Usuario } from "../../../usuario/interface/UsuarioInterface"

export default interface BusquedaDriverPort{
    searchBar(busqueda:string):Producto[]
    filter(filtros: FiltrarProducto): Producto[]
}

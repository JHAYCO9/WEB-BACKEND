import AbstractTipoProducto from "../../tipoProducto/AbstractTypes/AbstractTipoProducto";

export interface Categoria {
    idCategoria: number;
    nombreCategoria: string;
    tipo: AbstractTipoProducto;
}
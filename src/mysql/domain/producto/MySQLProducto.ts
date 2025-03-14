export interface MysqlProducto {
    idProducto: number;
    nombreProducto: string;
    descripcionProducto: string;
    tallaProducto: string;
    precioProducto: number;
    estadoProducto: boolean;
    imgProducto: string;
    stockProducto: number;
    marcaProducto: string;
    categoria_id: number;
    descuento_id: number;
}
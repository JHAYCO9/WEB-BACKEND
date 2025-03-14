export interface MysqlDescuento {
    idDescuento: number;
    nombreDescuento: string;
    tipoDescuento?: "porcentaje" | "valor_fijo";
    valorDescuento: number;
    condicionDescuento: string;
    estadoDescuento: boolean;
}
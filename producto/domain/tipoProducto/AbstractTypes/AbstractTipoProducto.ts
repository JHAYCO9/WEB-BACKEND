import { TipoProducto } from "../interface/TipoProductoInterface";

export default abstract class AbstractTipoProducto {
    protected idTipoProducto: number;
    protected nombreTipoProducto: string;

    constructor(tipoProductoAttributes: TipoProducto) {
        this.idTipoProducto = tipoProductoAttributes.idTipoProducto;
        this.nombreTipoProducto = tipoProductoAttributes.nombreTipoProducto;
    }

    public abstract isNull(): boolean;
    public abstract toString(): string;

    // Getters -----------------------------------
    public getIdTipoProducto(): number {
        return this.idTipoProducto;
    }

    public getNombreTipoProducto(): string {
        return this.nombreTipoProducto;
    }

    // Setters con validaciones -------------------
    public setIdTipoProducto(id: number): void {
        if (this.validateNumber(id, 0)) {
            return;
        }
        this.idTipoProducto = id;
    }

    public setNombreTipoProducto(nombre: string): void {
        if (this.validateString(nombre, 3, 50)) {
            return;
        }
        this.nombreTipoProducto = nombre;
    }

    // Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean =>
        value < min || isNaN(value);

    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === "" || value.length > max || value.length < min;
}
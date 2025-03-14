import { Descuento } from "../interface/DescuentosInterface";

export default abstract class AbstractDescuento {
    protected idDescuento: number;
    protected nombreDescuento: string;
    protected estadoDescuento: boolean;
    protected valorDescuento: number;

    constructor(descuentoAttributes: Descuento) {
        this.idDescuento = descuentoAttributes.idDescuento;
        this.nombreDescuento = descuentoAttributes.nombreDescuento;
        this.estadoDescuento = descuentoAttributes.estadoDescuento;
        this.valorDescuento = descuentoAttributes.valorDescuento;
    }

    public abstract isNull(): boolean;
    public abstract toString(): string;

    // Getters -----------------------------------
    public getIdDescuento(): number {
        return this.idDescuento;
    }

    public getNombreDescuento(): string {
        return this.nombreDescuento;
    }

    public getEstadoDescuento(): boolean {
        return this.estadoDescuento;
    }

    public getValorDescuento(): number {
        return this.valorDescuento;
    }

    // Setters con validaciones -------------------
    public setIdDescuento(id: number): void {
        if (this.validateNumber(id, 0)) {
            return;
        }
        this.idDescuento = id;
    }

    public setNombreDescuento(nombre: string): void {
        if (this.validateString(nombre, 2, 25)) {
            return;
        }
        this.nombreDescuento = nombre.trim();
    }

    public setEstadoDescuento(estado: boolean): void {
        this.estadoDescuento = estado;
    }

    public setValorDescuento(valor: number): void {
        if (this.validateNumber(valor, 0)) {
            return;
        }
        this.valorDescuento = valor;
    }

    // Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean =>
        value < min || isNaN(value);

    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === '' || value.length > max || value.length < min;
}


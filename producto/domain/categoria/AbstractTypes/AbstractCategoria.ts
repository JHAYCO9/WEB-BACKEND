import AbstractTipoProducto from "../../tipoProducto/AbstractTypes/AbstractTipoProducto";
import { Categoria } from "../interface/CategoriaInterface";

export default abstract class AbstractCategoria {
    protected idCategoria: number;
    protected nombreCategoria: string;
    protected tipo: AbstractTipoProducto;

    constructor(categoriaAttributes: Categoria) {
        this.idCategoria = categoriaAttributes.idCategoria;
        this.nombreCategoria = categoriaAttributes.nombreCategoria;
        this.tipo = categoriaAttributes.tipo ;
    }

    public abstract isNull(): boolean;
    public abstract toString(): string;

    // Getters -----------------------------------
    public getIdCategoria(): number {
        return this.idCategoria;
    }

    public getNombreCategoria(): string {
        return this.nombreCategoria;
    }

    public getTipo(): AbstractTipoProducto {
        return this.tipo;
    }

    // Setters con validaciones -------------------
    public setIdCategoria(id: number): void {
        if (this.validateNumber(id, 0)) {
            return;
        }
        this.idCategoria = id;
    }

    public setNombreCategoria(nombre: string): void {
        if (this.validateString(nombre, 3, 50)) {
            return;
        }
        this.nombreCategoria = nombre;
    }

    public setTipo(tipo: AbstractTipoProducto): void {
        if (!Array.isArray(tipo)) {
            return;
        }
        this.tipo = tipo;
    }

    // Validación ---------------------
    private readonly validateNumber = (value: number, min: number = 1): boolean =>
        value < min || isNaN(value);

    private readonly validateString = (value: string, min: number, max: number): boolean =>
        value === "" || value.length > max || value.length < min;
}


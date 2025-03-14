
import AbstractProducto from "../../../../producto/domain/producto/AbstractTypes/AbstractProducto";
import CarritoProducto from "../interface/ItemCarritoInterface";

export default abstract class AbstractItemCarrito {
    protected idItemCarrito: number;
    protected idProducto: AbstractProducto;
    protected cantidad: number;
    protected subTotal:number;

    constructor(carritoProductoInterface: CarritoProducto) {
        this.idItemCarrito = carritoProductoInterface.idItemCarrito;
        this.idProducto = carritoProductoInterface.idProducto;
        this.cantidad = carritoProductoInterface.cantidad;
        this.subTotal = carritoProductoInterface.subTotal;
    }

    public abstract isNull(): boolean;

    public  abstract toString(): string ;
      

    //Getters
    public getIdItemCarrito(): number {
        return this.idItemCarrito;
    }

    public getIdProducto(): AbstractProducto {
        return this.idProducto;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getSubTotal(): number {
        return this.subTotal;
    }

    //Setters con validaciones
    public setIdItemCarrito(id: number): void {
        if(this.validateNumber(id, 0)){
            return;
        }
        this.idItemCarrito = id;
    }

    public setIdProducto(producto: AbstractProducto): void {
        this.idProducto = producto;
    }

    public setCantidad(cantidad: number): void {
        if(this.validateNumber(cantidad, 0)){
            return;
        }
        this.cantidad = cantidad;
    }

    public setSubTotal(subTotal: number): void {
        if(this.validateNumber(subTotal, 0)){
            return;
        }
        this.subTotal = subTotal;
    }

    //Validación 
    private readonly validateNumber = (value: number, min: number = 1): boolean => 
        value < min || isNaN(value);

}

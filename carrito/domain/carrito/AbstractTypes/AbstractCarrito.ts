
import AbstractUsuario from "../../../../usuario/domain/usuario/AbstractTypes/AbstractUsuario";
import { Carrito } from "../interface/CarritoInterface";
import AbstractCarritoProducto from "./AbstraItemCarrito";

export default abstract class AbstractCarrito {
  protected idCarrito: number;
  protected statusCarrito: boolean;
  protected carritoProducto: AbstractCarritoProducto[];
  protected usuario : AbstractUsuario
  protected totalCarrito: number;

  constructor(carritoAttributes: Carrito) {
    this.idCarrito = carritoAttributes.idCarrito;
    this.statusCarrito = carritoAttributes.statusCarrito;
    this.usuario = carritoAttributes.usuario;
    this.totalCarrito =carritoAttributes.totalCarrito;
    this.carritoProducto = carritoAttributes.carritoProducto;

  }

  public abstract isNull: () => boolean;
  
  public abstract toString(): string;
  
  //Getters
  public getIdCarrito(): number {
    return this.idCarrito;
  }

  public getStatusCarrito(): boolean {
    return this.statusCarrito;
  }

  public getCarritoProducto(): AbstractCarritoProducto[] {
    return this.carritoProducto;
  }

  public getTotalCarrito(): number {
    return this.totalCarrito;
  }
  public getUsuario(): AbstractUsuario {
    return this.usuario;
  }

  //Setters con validaciones
  public setIdCarrito(id: number): void {
    if(this.validateNumber(id,0)){
      return
    }
    this.idCarrito = id;
  }
  public setUsuario(usuario: AbstractUsuario): void {
    this.usuario = usuario;
  }

  public setStatusCarrito(status: boolean): void {
    this.statusCarrito = status;
  }

  public setCarritoProducto(carritoProducto: AbstractCarritoProducto[]): void {
    this.carritoProducto = (carritoProducto);
  }

  public setTotalCarrito(total: number): void {
    if(this.validateNumber(total,0)){
      return
    }
    this.totalCarrito = (total);
  }

  //Validación
  
  private readonly validateNumber = (value: number, min: number = 1): boolean => 
    value < min || isNaN(value);
  

}

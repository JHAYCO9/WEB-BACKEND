import { Producto } from "../interface/ProductoInterface";
import AbstractCategoria from "../../categoria/AbstractTypes/AbstractCategoria";
import AbstractDescuento from "./../../descuento/AbstractTypes/AbstractDescuento";

export default abstract class AbstractProducto {
  protected idProducto: number;
  protected nombreProducto: string;
  protected descripcionProducto: string;
  protected tallaProducto: string;
  protected precioProducto: number;
  protected estadoProducto: boolean;
  protected imgProducto: string;
  protected stockProducto: number;
  protected marcaProducto: string;
  protected categoria_id: AbstractCategoria;
  protected descuento_id: AbstractDescuento;

  constructor(productoAttributes: Producto) {
    this.idProducto = productoAttributes.idProducto;
    this.nombreProducto = productoAttributes.nombreProducto;
    this.descripcionProducto = productoAttributes.descripcionProducto;
    this.tallaProducto = productoAttributes.tallaProducto;
    this.precioProducto =productoAttributes.precioProducto;
    this.estadoProducto = productoAttributes.estadoProducto;
    this.imgProducto = productoAttributes.imgProducto;
    this.stockProducto = productoAttributes.stockProducto;
    this.marcaProducto = productoAttributes.marcaProducto;
    this.categoria_id = productoAttributes.categoria_id;
    this.descuento_id = productoAttributes.descuento_id;
  }

  public abstract isNull: () => boolean;
  public  abstract toString(): string ;

  // Setters con validaciones
  public setIdProducto(idProducto: number): void {
    if(this.validateNumber(idProducto, 0)) {
      return
    }
    this.idProducto = idProducto;
  }

  public setNombreProducto(nombreProducto: string): void {
    if(this.validateString(nombreProducto, 1, 30)) {
      return
    }
    this.nombreProducto = nombreProducto;
  }

  public setDescripcionProducto(descripcionProducto: string): void {
    if(this.validateString(descripcionProducto, 20,  255)) {
      return
    }
    this.descripcionProducto = descripcionProducto;
  }

  public setTallaProducto(tallaProducto: string): void {
    if(this.validateString(tallaProducto, 1, 5)) {
      return
    }
    this.tallaProducto = tallaProducto;
  }

  public setPrecioProducto(precioProducto: number): void {
    if(this.validateNumber(precioProducto, 0)) {
      return
    }
    this.precioProducto = precioProducto;
  }

  public setEstadoProducto(estadoProducto: boolean): void {
    this.estadoProducto = estadoProducto;
  }

  public setImgProducto(imgProducto: string): void {
    // TODO: Path de la foto
    if(this.validateString(imgProducto, 0, 255)) {
      return
    }
    this.imgProducto = imgProducto;
  }

  public setStockProducto(stockProducto: number): void {
    if(this.validateNumber(stockProducto, 0)) {
      return
    }
    this.stockProducto = stockProducto;
  }

  public setMarcaProducto(marcaProducto: string): void {
    if(this.validateString(marcaProducto, 1, 30)) {
      return
    }
    this.marcaProducto = marcaProducto;
  }

  public setCategoria(categoria_id: AbstractCategoria): void {
    this.categoria_id = categoria_id;
  }

  public setDescuento(descuento_id: AbstractDescuento): void {
    this.descuento_id = descuento_id;
  }

  // Getters
  public getIdProducto(): number {
    return this.idProducto;
  }

  public getNombreProducto(): string {
    return this.nombreProducto;
  }

  public getDescripcionProducto(): string {
    return this.descripcionProducto;
  }

  public getTallaProducto(): string {
    return this.tallaProducto;
  }

  public getPrecioProducto(): number {
    return this.precioProducto;
  }

  public getEstadoProducto(): boolean {
    return this.estadoProducto;
  }

  public getImgProducto(): string {
    return this.imgProducto;
  }

  public getStockProducto(): number {
    return this.stockProducto;
  }

  public getMarcaProducto(): string {
    return this.marcaProducto;
  }

  public getCategoria(): AbstractCategoria {
    return this.categoria_id;
  }

  public getDescuento(): AbstractDescuento {
    return this.descuento_id;
  }

  //Validación

  private readonly validateNumber = (value: number, min: number = 1): boolean => 
    value < min || isNaN(value);


  private readonly validateString = (value: string, min: number, max: number): boolean =>
      value === '' || value.length > max || value.length < min    
//TODO path
  // private readonly validateStringImg= (value:string): boolean => true; //path no exite

}
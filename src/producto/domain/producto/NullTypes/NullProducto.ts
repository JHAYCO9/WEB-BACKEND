import AbstractProducto from '../AbstractTypes/AbstractProducto';
import  NullCategoria  from '../../categoria/NullTypes/NullCategoria';
import  NullDescuento  from '../../descuento/NullTypes/NullDescuento';
import AbstractCategoria from '../../categoria/AbstractTypes/AbstractCategoria';
import AbstractDescuento from '../../descuento/AbstractTypes/AbstractDescuento';

export default class NullProducto extends AbstractProducto {
  constructor() {
    super({
      idProducto: 0,
      nombreProducto: 'Sin Producto',
      descripcionProducto: 'Sin descripción',
      tallaProducto: 'N/A',
      precioProducto: 0,
      estadoProducto: false,
      imgProducto: '',
      stockProducto: 0,
      marcaProducto: 'N/A',
      categoria_id: new NullCategoria(),
      descuento_id: new NullDescuento(),
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };

    public  override setIdProducto(_id: number): void { return }
    public  override setNombreProducto(_nombre: string): void { return }
    public  override setDescripcionProducto(_descripcion: string): void { return }
    public  override setTallaProducto(_talla: string): void { return }
    public  override setPrecioProducto(_precio: number): void { return }
    public  override setEstadoProducto(_estado: boolean): void { return }
    public  override setImgProducto(_img: string): void { return }
    public  override setStockProducto(_stock: number): void { return }
    public  override setMarcaProducto(_marca: string): void { return }
    public  override setCategoria(_categoria_id: AbstractCategoria): void { return }
    public  override setDescuento(_descuento_id: AbstractDescuento): void { return }

    public toString(): string {
        return `NullProducto {
            idProducto: 0,
            nombreProducto: "N/A",
            descripcionProducto: "Sin descripción",
            tallaProducto: "N/A",
            precioProducto: 0,
            estadoProducto: false,
            imgProducto: "N/A",
            stockProducto: 0,
            marcaProducto: "N/A",
            categoria_id: ${this.categoria_id.toString()},
            descuento_id: ${this.descuento_id.toString()}
        }`;
    }
}

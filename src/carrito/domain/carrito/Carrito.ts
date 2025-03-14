import AbstractCarrito from './AbstractTypes/AbstractCarrito';

export class Carrito extends AbstractCarrito {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
  public toString(): string {
    return `Carrito {
      idCarrito: ${this.idCarrito},
      statusCarrito: ${this.statusCarrito},
      carritoProducto: ${this.carritoProducto ? this.carritoProducto.toString() : "null"},
      totalCarrito: ${this.totalCarrito},
    }`;
  }

}

import AbstractItemCarrito from "./AbstractTypes/AbstraItemCarrito";

export class ItemCarrito extends AbstractItemCarrito {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public toString(): string {
    return `ItemCarrito {
        idItemCarrito: ${this.idItemCarrito},
        idProducto: ${this.idProducto.toString()},
        cantidad: ${this.cantidad},
        subTotal: ${this.subTotal}
      }`;
  }
}
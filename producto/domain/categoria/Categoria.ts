import AbstractCategoria from './AbstractTypes/AbstractCategoria';

export class Categoria extends AbstractCategoria {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public override toString(): string {
    const tipoProductoStr = this.tipo ? this.tipo.toString() : "Sin tipo de producto";

    return `Categoria {
        idCategoria: ${this.idCategoria},
        nombreCategoria: "${this.nombreCategoria}",
        tipoProducto: ${tipoProductoStr}
    }`;
  }
}
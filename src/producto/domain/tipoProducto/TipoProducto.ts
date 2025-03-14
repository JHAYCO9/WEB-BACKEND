import AbstractTipoProducto from './AbstractTypes/AbstractTipoProducto';

export class TipoProducto extends AbstractTipoProducto {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public override toString(): string {
    return `TipoProducto {
        idTipoProducto: ${this.idTipoProducto},
        nombreTipoProducto: "${this.nombreTipoProducto}"
    }`;
  }
}
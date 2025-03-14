import AbstractTipoProducto from '../AbstractTypes/AbstractTipoProducto';

export default class NullTipoProducto extends AbstractTipoProducto {
  constructor() {
    super({
      idTipoProducto: 0,
      nombreTipoProducto: "N/A",
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };

  public override setIdTipoProducto(_id: number): void {
    return;
  }

  public override setNombreTipoProducto(_nombre: string): void {
    return;
  }

  public override toString(): string {
    return `NullTipoProducto {
        idTipoProducto: 0,
        nombreTipoProducto: "N/A"
    }`;
  }
}
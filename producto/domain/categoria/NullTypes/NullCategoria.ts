import AbstractTipoProducto from '../../tipoProducto/AbstractTypes/AbstractTipoProducto';
import NullTipoProducto from '../../tipoProducto/NullTypes/NullTipoProducto';
import AbstractCategoria from '../AbstractTypes/AbstractCategoria';

export default class NullCategoria extends AbstractCategoria {
  constructor() {
    super({
      idCategoria: 0,
      nombreCategoria: "N/A",
      tipo: new NullTipoProducto(), // Ahora es un solo objeto
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };

  public override setIdCategoria(_id: number): void {
    return;
  }

  public override setNombreCategoria(_nombre: string): void {
    return;
  }

  public override setTipo(_tipo: AbstractTipoProducto): void {
    return;
  }

  public override toString(): string {
    return `NullCategoria {
        idCategoria: 0,
        nombreCategoria: "N/A",
        tipoProducto: ${this.tipo.toString()}
    }`;
  }
}
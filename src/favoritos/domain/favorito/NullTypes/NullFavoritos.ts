import AbstractProducto from '../../../../producto/domain/producto/AbstractTypes/AbstractProducto';
import NullProducto  from '../../../../producto/domain/producto/NullTypes/NullProducto';
import AbstractFavoritos from '../AbstractTypes/AbstractFavoritos';

export default class NullFavorito extends AbstractFavoritos {

  constructor() {
    super({
      idProducto: [new NullProducto()],
    });
  }
  public override toString(): string {
    return `NullFavoritos {
        idProducto: []
    }`;
  }
  public override isNull(): boolean {
    return true;
  }

  public override setIdProducto(_productos: AbstractProducto[]): void {
      return
  }

}

import AbstractFavoritos from './AbstractTypes/AbstractFavoritos';

export class Favorito extends AbstractFavoritos{
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
  public  override toString(): string {
    return `Favoritos {
        idProducto: [${this.idProducto.map(p => p.toString()).join(", ")}]
    }`;
}

}

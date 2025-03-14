import AbstractProducto from './AbstractTypes/AbstractProducto';

export class Producto extends AbstractProducto {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public toString(): string {
    return `Producto {
        idProducto: ${this.idProducto},
        nombreProducto: "${this.nombreProducto}",
        descripcionProducto: "${this.descripcionProducto}",
        tallaProducto: "${this.tallaProducto}",
        precioProducto: ${this.precioProducto},
        estadoProducto: ${this.estadoProducto},
        imgProducto: "${this.imgProducto}",
        stockProducto: ${this.stockProducto},
        marcaProducto: "${this.marcaProducto}",
        categoria_id: ${this.categoria_id.toString()},
        descuento_id: ${this.descuento_id.toString()}
    }`;
}

}

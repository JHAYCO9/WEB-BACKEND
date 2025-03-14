import AbstractDescuento from './AbstractTypes/AbstractDescuento';


export class Descuento extends AbstractDescuento {
  public override toString(): string {
    return `Descuento {
        idDescuento: ${this.idDescuento},
        nombreDescuento: "${this.nombreDescuento}",
        estadoDescuento: ${this.estadoDescuento},
        valorDescuento: ${this.valorDescuento}
    }`;
}

  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
}
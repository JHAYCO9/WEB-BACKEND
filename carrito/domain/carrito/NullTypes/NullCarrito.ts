import AbstractCarrito from "../AbstractTypes/AbstractCarrito";
import AbstractCarritoProducto from "../AbstractTypes/AbstraItemCarrito";
import NullCarritoProducto from "./NullItemCarrito";
import NullUsuario from "../../../../usuario/domain/usuario/NullTypes/NullUsuario";
import AbstractUsuario from "../../../../usuario/domain/usuario/AbstractTypes/AbstractUsuario";

export default class NullCarrito extends AbstractCarrito {
  constructor() {
    super({
      idCarrito: 0,
      carritoProducto: [new NullCarritoProducto()],
      totalCarrito: 0,
      statusCarrito: false,
      usuario: new NullUsuario()
    });
  }

  public isNull = (): boolean => {
    return true;
  };

  public override toString(): string {
    return "NullCarrito";
  }

  public override setIdCarrito = (_id: number): void => {
    return;
  };

  public override setStatusCarrito = (_estado: boolean): void => {
    return;
  };

  public override setTotalCarrito = (_total: number): void => {
    return;
  };

  public override setUsuario = (_usuario: AbstractUsuario): void => {
    return;
  };

  public override setCarritoProducto(_carritoProducto: AbstractCarritoProducto[]): void {
    return;
  }
}
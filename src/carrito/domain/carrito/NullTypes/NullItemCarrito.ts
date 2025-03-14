import AbstractProducto from "../../../../producto/domain/producto/AbstractTypes/AbstractProducto";
import NullProducto from "../../../../producto/domain/producto/NullTypes/NullProducto";
import AbstractItemCarrito from "../AbstractTypes/AbstraItemCarrito";

export default class NullItemCarrito extends AbstractItemCarrito {
    constructor() {
        super({
            idItemCarrito: 0,
            idProducto: new NullProducto(),
            cantidad: 0,
            subTotal: 0
        });
    }

    public isNull(): boolean {
        return true;
    }

    public override setIdItemCarrito(_id: number): void {
        return;
    }
    
    public override setIdProducto(_producto: AbstractProducto): void {
        return;
    }

    public override setCantidad(_cantidad: number): void {
        return;
    }

    public override setSubTotal(_subTotal: number): void {
        return;
    }

    public override toString(): string {
        return `NullItemCarrito {
            idItemCarrito: ${this.idItemCarrito},
            idProducto: NullProducto,
            cantidad: 0,
            subTotal: 0
        }`;
    }
}
import MYSQLItemCarrito from "../../../../mysql/domain/carrito/MySqlItemCarrito";
import ProductoRepository from "../../../../producto/infrastructure/repository/ProductoRepository";
import { ItemCarrito } from "../../../domain/carrito/ItemCarrito";

export default class ItemCarritoToItemCarrito {

  constructor(private readonly productoRepository: ProductoRepository ) {

  }
  public async getArray(items: MYSQLItemCarrito[]): Promise<ItemCarrito[]> {
    if (!Array.isArray(items)) {
        console.warn("Advertencia: items no es un array, convirtiendo...", items);
        items = [items]; // Convertirlo en un array si es un objeto
    }

    return Promise.all(items.map(async (item) => this.get(item)));
}

  public async get(item: MYSQLItemCarrito): Promise<ItemCarrito> {
    const producto = await this.productoRepository.findById(item.idProducto);
    
    return new ItemCarrito({
      idItemCarrito: item.idItem,
      idProducto: producto,
      cantidad: item.cantidad|| 1,
      subTotal: item.subTotal
    });
  }

}
import { Carrito } from "../../../domain/carrito/Carrito";
import MysqlCarrito from "../../../../mysql/domain/carrito/MysqlCarrito";
import UsuarioRepositoryInterface from "../../../../usuario/domain/port/driven/UsuarioRepositoryPort";
import CarritoRepositoryInterface from "../../../domain/port/driven/CarritoRepositoryInterface";

export default class CarritoToCarrito {
  constructor(
    private readonly usuarioMysql: UsuarioRepositoryInterface,
    private readonly carritoMysql : CarritoRepositoryInterface
  ) {}

  public async getArray(carritos: MysqlCarrito[]): Promise<Carrito[]> {
    return Promise.all(carritos.map(async (carrito) => this.get(carrito)));
  }

  public async get(carrito: MysqlCarrito): Promise<Carrito> {
    // Obtener el usuario completo a partir del ID
    const usuario = await this.usuarioMysql.findById(carrito.usuario_id);
    const productos = await this.carritoMysql.getCarrito(carrito.usuario_id)
    const total = await this. carritoMysql.getTotalCarrito(carrito.usuario_id)
    
    return new Carrito({
      idCarrito: carrito.idCarrito,
      statusCarrito: carrito.estdoCarrito, // Corregido de estdoCarrito a estadoCarrito
      usuario: usuario,
      totalCarrito: total|| 0, // Corregido el acceso a totalCarrito
      carritoProducto: productos
    });
  }

  public async teg(carrito: Carrito): Promise<MysqlCarrito> {
    if (!carrito.getUsuario()) {
        throw new Error("El carrito no tiene un usuario asociado.");
    }

    return {
        idCarrito: carrito.getIdCarrito(),
        estdoCarrito: carrito.getStatusCarrito(), // Verifica que este nombre sea correcto en MYSQLCarrito
        usuario_id: carrito.getUsuario().getCi(), // Asegurar que no sea undefined
    } as MysqlCarrito;
    }

}
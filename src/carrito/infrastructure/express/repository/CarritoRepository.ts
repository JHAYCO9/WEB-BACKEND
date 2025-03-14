import JwtInterface from "../../../../jwt/domain/interfaces/JwtokenInterface";
import CarritoRepoInterface from "../../../../mysql/domain/repository/CarritoRepoInterface";
import { ItemCarrito } from "../../../domain/carrito/ItemCarrito";
import CarritoRepositoryInterface from "../../../domain/port/driven/CarritoRepositoryInterface";
import ItemCarritoToItemCarrito from "./ItemCarritoToItemCarrito";

export default class CarritoRepository implements CarritoRepositoryInterface {
    constructor(private readonly mysqlCarritoRepo: CarritoRepoInterface,
        private readonly itemToItem : ItemCarritoToItemCarrito,
        private readonly jwtToken : JwtInterface
    ) {}

    async getCarrito(token: string): Promise<ItemCarrito[]> {
        const idUser = await this.jwtToken.decodeToken(token)
        const carritoSql = await this.mysqlCarritoRepo.getCarrito(idUser.ci)
        const items =  await this.itemToItem.getArray(carritoSql)
        return items;
    }

    async addProductoCarrito(token: string, producto: number): Promise<boolean> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.addProductoCarrito(idUser.ci, producto);
    }

    async deleteProductoCarrito(token: string, producto: number): Promise<boolean> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.deleteProductoCarrito(idUser.ci, producto);
    }

    async changeStatusCarrito(token: string): Promise<boolean> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.changeStatusCarrito(idUser.ci);
    }

    async getTotalCarrito(token: string): Promise<number> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.getTotalCarrito(idUser.ci);
    }

    async getCarritoProducto(idCarritoProducto: number): Promise<ItemCarrito> {
        const carritoSql = await this.mysqlCarritoRepo.getCarritoProducto(idCarritoProducto)
        const items =  await this.itemToItem.get(carritoSql)
        return items;

    }

    async createCarrito(token: string): Promise<boolean> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.createCarrito(idUser.ci);
    }

    async aumentaCanitadItemProductoCarrito(token: string, producto: number): Promise<boolean> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.aumentaCanitadItemProductoCarrito(idUser.ci, producto);
    }

    async disminuyeCantidadItemProductoCarrito(token: string, producto: number): Promise<boolean> {
        const idUser = await this.jwtToken.decodeToken(token)
        return await this.mysqlCarritoRepo.disminuyeCantidadItemProductoCarrito(idUser.ci, producto);
    }
}

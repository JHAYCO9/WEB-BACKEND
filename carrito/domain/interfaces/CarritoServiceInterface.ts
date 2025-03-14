import { ItemCarrito } from "../carrito/ItemCarrito"

export default interface CarritoServiceInterface{
    getCarrito(token:string):Promise<ItemCarrito[]>
    addProductoCarrito(token:string, producto:number):Promise<boolean>
    deleteProductoCarrito(token:string, producto:number):Promise<boolean>
    changeStatusCarrito(token:string):Promise<boolean>
    getTotalCarrito(token:string):Promise<number>
    getCarritoProdcuto(idCarritoProducto:number):Promise<ItemCarrito>
    createCarrito: (token:string) => Promise<boolean>
    aumentaCanitadItemProductoCarrito: (token:string,producto: number) => Promise<boolean>
    disminuyeCantidadItemProductoCarrito: (token:string, producto: number) => Promise<boolean>
}

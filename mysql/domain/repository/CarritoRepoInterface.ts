import MYSQLItemCarrito from "../carrito/MySqlItemCarrito"

export default interface CarritoRepoInterface{
    getCarrito(token:string):Promise<MYSQLItemCarrito[]>
    addProductoCarrito(token:string, producto:number):Promise<boolean>
    deleteProductoCarrito(token:string, producto:number):Promise<boolean>
    changeStatusCarrito(token:string):Promise<boolean>
    getTotalCarrito(token:string):Promise<number>
    getCarritoProducto(idCarritoProducto:number):Promise<MYSQLItemCarrito>
    createCarrito(token:string) :Promise<boolean>
    aumentaCanitadItemProductoCarrito(token:string, producto: number) : Promise<boolean>
    disminuyeCantidadItemProductoCarrito(token:string, producto:number) : Promise<boolean>
}
export default interface CarritoResumidoInterfazApi {
    products: {
        name: string, 
        quantity: number,
    }[],
    total: number;
}


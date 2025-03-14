import AbstractProducto from "../../../../producto/domain/producto/AbstractTypes/AbstractProducto";
import { Favoritos } from "../interface/FavoritosInterface";

export default abstract class AbstractFavoritos {
    protected idProducto: AbstractProducto[];

    constructor(favoritosAttributes: Favoritos) {
        this.idProducto = favoritosAttributes.idProducto;
    }

    public abstract isNull(): boolean;
    public abstract toString(): string;

  //Getters -----------------------------------
    public getIdProducto(): AbstractProducto[] {
        return this.idProducto;
    }

  //Setters con validaciones -------------------
    public setIdProducto(productos: AbstractProducto[]): void {
      if(this.validateArray(productos)){
        return
      }
        this.idProducto = (productos);
    }

  //Validación ---------------------
  private readonly validateArray = (productos: AbstractProducto[]): boolean => 
    !Array.isArray(productos) ;

}

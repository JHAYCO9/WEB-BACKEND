import { Descuento } from "../../../descuento/interface/DescuentosInterface";

export default interface DescuentoDriverPort{
   getDecuentos():Descuento[]
   getDescuentoById(id:number):Descuento
}

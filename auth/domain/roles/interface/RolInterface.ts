import AbstractPermiso from "../AbstractTypes/AbstractPermiso";

export interface Rol {
  idRol: number;
  nombreRol: string;
  permisos: AbstractPermiso[]
}

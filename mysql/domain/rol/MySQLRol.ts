import { MysqlPermiso } from "./MySQLPermiso";

  export interface MysqlRol {
    idRol: number;
    nombreRol: string;
    descripcion?: string;
    estadoRol?: boolean;
    permisos?: MysqlPermiso[]; // Relación con Permisos
  }
  
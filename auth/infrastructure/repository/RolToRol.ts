import { Rol } from "../../../auth/domain/roles/Rol";
import { MysqlRol } from "../../../mysql/domain/rol/MySQLRol";
import MysqlPermisosToPermisos from "./PermisoToPermiso";

/**
 * Converter class that transforms between MySQL role entities and domain role objects.
 * This class provides bidirectional conversion between the infrastructure layer (MySQL) 
 * and the domain layer role representations, including their associated permissions.
 */
export default class MysqlRolesToRoles {
  /**
   * Creates a new instance of MysqlRolesToRoles.
   * 
   * @param {MysqlPermisosToPermisos} permisoToPermiso - Converter for transforming permission objects
   */
  constructor(
    private readonly permisoToPermiso: MysqlPermisosToPermisos
  ) {}

  /**
   * Converts an array of MySQL role entities to domain role objects.
   * This method also transforms any associated permissions using the permission converter.
   * 
   * @param {MysqlRol[]} roles - Array of MySQL role entities to convert
   * @returns {Promise<Rol[]>} Promise that resolves to an array of domain role objects
   */
  public getArray = async (roles: MysqlRol[]): Promise<Rol[]> => {
    const rolesTransformados = roles.map(async (rol) => {
      return new Rol({
        idRol: rol.idRol,
        nombreRol: rol.nombreRol,
        permisos: await this.permisoToPermiso.getArray(rol.permisos ?? []),
      });
    });

    return Promise.all(rolesTransformados);
  };

  /**
   * Converts a single MySQL role entity to a domain role object.
   * This method also transforms any associated permissions using the permission converter.
   * 
   * @param {MysqlRol} rol - MySQL role entity to convert
   * @returns {Promise<Rol>} Promise that resolves to a domain role object
   */
  public get = async (rol: MysqlRol): Promise<Rol> => {
    return new Rol({
      idRol: rol.idRol,
      nombreRol: rol.nombreRol,
      permisos: await this.permisoToPermiso.getArray(rol.permisos ?? []),
    });
  };

  /**
   * Converts a single domain role object to a MySQL role entity.
   * The reverse operation of get. This method also transforms any associated permissions.
   * 
   * @param {Rol} rol - Domain role object to convert
   * @returns {Promise<MysqlRol>} Promise that resolves to a MySQL role entity
   */
  public teg = async (rol: Rol): Promise<MysqlRol> => {
    return {
        idRol: rol.getIdRol(),
        nombreRol: rol.getNombreRol(),
        permisos: await this.permisoToPermiso.tegArray(rol.getPermisos() ?? [])
    } as MysqlRol;
  };

  /**
   * Converts an array of domain role objects to MySQL role entities.
   * The reverse operation of getArray. This method also transforms any associated permissions.
   * 
   * @param {Rol[]} roles - Array of domain role objects to convert
   * @returns {Promise<MysqlRol[]>} Promise that resolves to an array of MySQL role entities
   */
  public tegArray = async (roles: Rol[]): Promise<MysqlRol[]> => {
    return Promise.all(
      roles.map(async (rol) => ({
        idRol: rol.getIdRol(),
        nombreRol: rol.getNombreRol(),
        permisos: await this.permisoToPermiso.tegArray(rol.getPermisos() ?? []),
      } as MysqlRol))
    );
  };
}
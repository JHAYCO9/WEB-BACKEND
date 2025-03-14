/**
 * Converter class that transforms between MySQL permission entities and domain permission objects.
 * This class provides bidirectional conversion between the infrastructure layer (MySQL) 
 * and the domain layer permission representations.
 */
import { Permiso } from "../../../auth/domain/roles/Permiso";
import { MysqlPermiso } from "../../../mysql/domain/rol/MySQLPermiso";

export default class MysqlPermisosToPermisos {
  /**
   * Converts an array of MySQL permission entities to domain permission objects.
   * 
   * @param {MysqlPermiso[]} permisos - Array of MySQL permission entities to convert
   * @returns {Promise<Permiso[]>} Promise that resolves to an array of domain permission objects
   */
  public getArray = (permisos: MysqlPermiso[]): Promise<Permiso[]> => {
    const permisosTransformados = permisos.map(async (permiso) => {
      return new Permiso({
        idPermiso: permiso.idPermiso,
        nombrePermiso: permiso.nombrePermiso,
        descripcionPermiso: ''
      });
    });

    return Promise.all(permisosTransformados);
  };

  /**
   * Converts a single MySQL permission entity to a domain permission object.
   * 
   * @param {MysqlPermiso} permiso - MySQL permission entity to convert
   * @returns {Promise<Permiso>} Promise that resolves to a domain permission object
   */
  public get = (permiso: MysqlPermiso): Promise<Permiso> => {
    return Promise.resolve(
      new Permiso({
        idPermiso: permiso.idPermiso,
        nombrePermiso: permiso.nombrePermiso,
        descripcionPermiso: ''
      })
    );
  };

  /**
   * Converts an array of domain permission objects to MySQL permission entities.
   * The reverse operation of getArray.
   * 
   * @param {Permiso[]} permisos - Array of domain permission objects to convert
   * @returns {Promise<MysqlPermiso[]>} Promise that resolves to an array of MySQL permission entities
   */
  public tegArray = async (permisos: Permiso[]): Promise<MysqlPermiso[]> => {
    return permisos.map((permiso) => ({
      idPermiso: permiso.getIdPermiso(),
      nombrePermiso: permiso.getNombrePermiso(),
      
    } as MysqlPermiso));
  };

  /**
   * Converts a single domain permission object to a MySQL permission entity.
   * The reverse operation of get.
   * 
   * @param {Permiso} permiso - Domain permission object to convert
   * @returns {Promise<MysqlPermiso>} Promise that resolves to a MySQL permission entity
   */
  public teg = async (permiso: Permiso): Promise<MysqlPermiso> => {
    return {
      idPermiso: permiso.getIdPermiso(),
      nombrePermiso: permiso.getNombrePermiso(),
    } as MysqlPermiso;
  };
}
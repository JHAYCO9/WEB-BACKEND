import { Permiso } from '../../../roles/Permiso';
import { Rol } from '../../../roles/Rol';

/**
 * Driven port interface for role and permission repository operations.
 * This interface defines the contract for role and permission-related operations
 * that the application core expects from its driven adapters (e.g., repositories).
 * It follows the Ports and Adapters (Hexagonal) architecture pattern.
 */
export default interface AuthRolPermisoRepositoryInterface {
  /**
   * Retrieves all roles from the system.
   * 
   * @returns {Promise<Rol[]>} A promise that resolves to an array of role domain objects
   */
  getRoles: () => Promise<Rol[]>;
  
  /**
   * Retrieves all permissions associated with a user's token.
   * 
   * @param {string} token - The authentication token used to identify the user
   * @returns {Promise<Permiso[]>} A promise that resolves to an array of permission domain objects
   */
  getPermiso: (token: string) => Promise<Permiso[]>;
  
  /**
   * Adds a new role to the system.
   * 
   * @param {Rol} rol - The role domain object to add
   * @returns {Promise<boolean>} A promise that resolves to true if the role was successfully added, false otherwise
   */
  addRol(rol: Rol): Promise<boolean>;
  
  /**
   * Adds a new permission to the system.
   * 
   * @param {Permiso} permiso - The permission domain object to add
   * @returns {Promise<boolean>} A promise that resolves to true if the permission was successfully added, false otherwise
   */
  addPermiso(permiso: Permiso): Promise<boolean>;
  
  /**
   * Creates a new relationship between a role and a permission.
   * 
   * @param {number} idRol - The ID of the role
   * @param {string} namePermiso - The name of the permission
   * @returns {Promise<boolean>} A promise that resolves to true if the relationship was successfully created, false otherwise
   */
  addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean>;
  
  /**
   * Removes a relationship between a role and a permission.
   * 
   * @param {number} idRol - The ID of the role
   * @param {string} namePermiso - The name of the permission
   * @returns {Promise<boolean>} A promise that resolves to true if the relationship was successfully removed, false otherwise
   */
  removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean>;
}

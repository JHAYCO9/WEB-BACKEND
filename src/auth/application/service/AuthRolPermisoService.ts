import AuthRolPermisoServiceInterface from "../../domain/interfaces/AuthRolPermisoServiceInterface"
import AuthRolPermisoRepository from "../../domain/port/driven/auth/AuthRolPermisoRepository"
import { Permiso } from "../../domain/roles/Permiso"
import { Rol } from "../../domain/roles/Rol"

/**
 * Service implementation for role and permission management operations.
 * This class implements the AuthRolPermisoServiceInterface and provides the business logic
 * for retrieving, adding, and managing relationships between roles and permissions.
 * It delegates database operations to the AuthRolPermisoRepository.
 * 
 * @implements {AuthRolPermisoServiceInterface} Interface for role and permission service operations
 */
export default class AuthRolPermisoService implements AuthRolPermisoServiceInterface {
  /**
   * Creates a new instance of AuthRolPermisoService.
   * 
   * @param {AuthRolPermisoRepository} authRolPermisoRepo - Repository for role and permission operations
   */
  constructor(
    private readonly authRolPermisoRepo: AuthRolPermisoRepository) {}
    
  /**
   * Retrieves all roles from the system.
   * 
   * @returns {Promise<Rol[]>} A promise that resolves to an array of role domain objects
   */
  async getRoles(): Promise<Rol[]> {
      return this.authRolPermisoRepo.getRoles()
  }
  
  /**
   * Retrieves all permissions associated with a user's token.
   * 
   * @param {string} token - The authentication token used to identify the user
   * @returns {Promise<Permiso[]>} A promise that resolves to an array of permission domain objects
   */
  async getPermisos(token: string): Promise<Permiso[]> {
      return this.authRolPermisoRepo.getPermiso(token)
  }
  
  /**
   * Adds a new role to the system.
   * Validates the repository response and returns a boolean indicating success.
   * 
   * @param {Rol} rol - The role domain object to add
   * @returns {Promise<boolean>} A promise that resolves to true if the role was successfully added, false otherwise
   */
  async addRol(rol: Rol): Promise<boolean> {
      const role = this.authRolPermisoRepo.addRol(rol)
      if(role === null || role === undefined){
          return Promise.resolve(false)
      }
      return Promise.resolve(true)
  }
  
  /**
   * Adds a new permission to the system.
   * Validates the repository response and returns a boolean indicating success.
   * 
   * @param {Permiso} permiso - The permission domain object to add
   * @returns {Promise<boolean>} A promise that resolves to true if the permission was successfully added, false otherwise
   */
  async addPermiso(permiso: Permiso): Promise<boolean> {
      const permi = this.authRolPermisoRepo.addPermiso(permiso)
      if(permi === null || permi === undefined){
          return Promise.resolve(false)
      }
      return Promise.resolve(true)
  }
  
  /**
   * Creates a new relationship between a role and a permission.
   * Validates the repository response and returns a boolean indicating success.
   * 
   * @param {number} idRol - The ID of the role
   * @param {string} namePermiso - The name of the permission
   * @returns {Promise<boolean>} A promise that resolves to true if the relationship was successfully created, false otherwise
   */
  async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
      const addRolPer = this.authRolPermisoRepo.addNewRelationRolPermiso(idRol, namePermiso)
      if(addRolPer === null || addRolPer === undefined){
          return Promise.resolve(false)
      }
      return Promise.resolve(true)
  }
  
  /**
   * Removes a relationship between a role and a permission.
   * Validates the repository response and returns a boolean indicating success.
   * 
   * @param {number} idRol - The ID of the role
   * @param {string} namePermiso - The name of the permission
   * @returns {Promise<boolean>} A promise that resolves to true if the relationship was successfully removed, false otherwise
   */
  async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
      const removeRolPer = this.authRolPermisoRepo.removeRelationRolPermiso(idRol, namePermiso)
      if(removeRolPer === null || removeRolPer === undefined){
          return Promise.resolve(false)
      }
      return Promise.resolve(true)
  }
}

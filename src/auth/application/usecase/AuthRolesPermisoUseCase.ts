import AuthRolPermisoServiceInterface from "../../domain/interfaces/AuthRolPermisoServiceInterface";
import AuthRolPermisoDriverPort from "../../domain/port/driver/auth/AuthRolPermisoDriverPort";
import NullPermiso from "../../domain/roles/NullTypes/NullPermiso";
import NullRol from "../../domain/roles/NullTypes/NullRol";
import { Permiso } from "../../domain/roles/Permiso";
import { Rol } from "../../domain/roles/Rol";

/**
 * Use case implementation for role and permission management operations.
 * This class implements the AuthRolPermisoDriverPort interface and serves as the primary
 * entry point for role and permission-related operations in the application.
 * It delegates operations to the AuthRolPermisoService and handles null cases by returning
 * appropriate null objects.
 * 
 * @implements {AuthRolPermisoDriverPort} Interface for role and permission driver operations
 */
export default class AuthRolesPermisoUseCase implements AuthRolPermisoDriverPort {
    /**
     * Creates a new instance of AuthRolesPermisoUseCase.
     * 
     * @param {AuthRolPermisoServiceInterface} authRolPermisoService - Service for role and permission operations
     */
    constructor(
        private readonly authRolPermisoService: AuthRolPermisoServiceInterface
    ) {}

    /**
     * Retrieves all roles from the system.
     * If no roles are found, returns an array containing a single NullRol object.
     * 
     * @returns {Promise<Rol[]>} A promise that resolves to an array of role domain objects
     */
    public async getRoles(): Promise<Rol[]> {
        const roles = await this.authRolPermisoService.getRoles();
        if (!roles) {
            return [new NullRol()]
        }
        return roles;
    }

    /**
     * Retrieves all permissions associated with a user's token.
     * If no permissions are found, returns an array containing a single NullPermiso object.
     * 
     * @param {string} token - The authentication token used to identify the user
     * @returns {Promise<Permiso[]>} A promise that resolves to an array of permission domain objects
     */
    public async getPermisos(token: string): Promise<Permiso[]> {
        const permisos = await this.authRolPermisoService.getPermisos(token);
        if (!permisos) {
            return [new NullPermiso()];
        }
        return permisos;
    }

    /**
     * Adds a new role to the system.
     * 
     * @param {Rol} rol - The role domain object to add
     * @returns {Promise<boolean>} A promise that resolves to true if the role was successfully added, false otherwise
     */
    public async addRol(rol: Rol): Promise<boolean> {
        const added = await this.authRolPermisoService.addRol(rol);
        return added;
    }

    /**
     * Adds a new permission to the system.
     * 
     * @param {Permiso} permiso - The permission domain object to add
     * @returns {Promise<boolean>} A promise that resolves to true if the permission was successfully added, false otherwise
     */
    public async addPermiso(permiso: Permiso): Promise<boolean> {
        const added = await this.authRolPermisoService.addPermiso(permiso);
        return added;
    }

    /**
     * Creates a new relationship between a role and a permission.
     * 
     * @param {number} idRol - The ID of the role
     * @param {string} namePermiso - The name of the permission
     * @returns {Promise<boolean>} A promise that resolves to true if the relationship was successfully created, false otherwise
     */
    public async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        const relationAdded = await this.authRolPermisoService.addNewRelationRolPermiso(idRol, namePermiso);
        return relationAdded;
    }

    /**
     * Removes a relationship between a role and a permission.
     * 
     * @param {number} idRol - The ID of the role
     * @param {string} namePermiso - The name of the permission
     * @returns {Promise<boolean>} A promise that resolves to true if the relationship was successfully removed, false otherwise
     */
    public async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        const relationRemoved = await this.authRolPermisoService.removeRelationRolPermiso(idRol, namePermiso);
        return relationRemoved;
    }
}


import { Rol } from '../../domain/roles/Rol';
import { Usuario } from '../../../usuario/domain/usuario/Usuario';
import { Permiso } from '../../domain/roles/Permiso';
import AuthRepositoryInterface from '../../domain/port/driven/auth/AuthRepository';
import AuthRolPermisoRepositoryInterface from '../../domain/port/driven/auth/AuthRolPermisoRepository';
import AuthRepoInterface from '../../../mysql/domain/repository/AuthRepoInterface';
import MysqlUsuariosToUsuarios from '../../../usuario/infrastructure/repository/UsuarioToUsuario';
import MysqlRolesToRoles from './RolToRol';
import MysqlPermisosToPermisos from './PermisoToPermiso';
import BycriptInterface from '../../../bycrypt/domain/interfaces/BycriptInterface';
import JwtInterface from '../../../jwt/domain/interfaces/JwtokenInterface';

/**
 * Implementation of the authentication repository interfaces.
 * This class serves as a bridge between the domain layer and the infrastructure layer
 * for authentication, user roles, and permissions management.
 * @implements {AuthRepositoryInterface} Interface for authentication operations
 * @implements {AuthRolPermisoRepositoryInterface} Interface for role and permission operations
 */
export default class AuthRepositoryInfraestructure implements AuthRepositoryInterface, AuthRolPermisoRepositoryInterface {
    /**
     * Creates an instance of AuthRepositoryInfraestructure.
     * @param {AuthRepoInterface} mysqlUsuario - The MySQL repository for user authentication
     * @param {MysqlUsuariosToUsuarios} usuarioToUsuario - Converter from MySQL user to domain user
     * @param {MysqlRolesToRoles} rolesToRoles - Converter from MySQL roles to domain roles
     * @param {MysqlPermisosToPermisos} permisotopermiso - Converter from MySQL permissions to domain permissions
     * @param {BycriptInterface} bycriptInterface - Interface for password encryption operations
     */

    constructor(
        private readonly mysqlUsuario: AuthRepoInterface,
        private readonly usuarioToUsuario: MysqlUsuariosToUsuarios,
        private readonly rolesToRoles: MysqlRolesToRoles,
        private readonly permisotopermiso: MysqlPermisosToPermisos,
        private readonly bycriptInterface: BycriptInterface,
        private readonly jwt: JwtInterface
    ) { }
    async login(ci: string, email: string, idRol: number): Promise<string> {
        const token = this.jwt.generateToken({
            ci: ci,
            email: email,
            idRol: idRol
        });
        return token
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param {string} password - The plain text password to compare
     * @param {string} hashedPassword - The hashed password to compare against
     * @returns {Promise<boolean>} True if passwords match, false otherwise
     */
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return Promise.resolve(await this.bycriptInterface.comparetPwd(password, hashedPassword));
    }



    /**
     * Registers a new user in the system.
     * @param {Usuario} usuario - The user domain object to register
     * @returns {Promise<boolean>} True if registration was successful, false otherwise
     */
    async register(usuario: Usuario): Promise<boolean> {
        const user = await this.usuarioToUsuario.teg(usuario)
        console.log(user)
        return await this.mysqlUsuario.register(user);
    }

    /**
     * Invalidates a user's authentication token.
     * @param {string} token - The authentication token to invalidate
     * @returns {Promise<boolean>} True if logout was successful, false otherwise
     */
    async logout(token: string): Promise<boolean> {
        return await this.mysqlUsuario.logout(token);
    }

    /**
     * Extracts user information from an authentication token.
     * @param {string} token - The authentication token
     * @returns {Promise<Usuario>} The user domain object associated with the token
     */
    async detokenize(token: string): Promise<Usuario> {
        const usuario = await this.jwt.decodeToken(token);
        const user = await this.usuarioToUsuario.fromJWTUserToUsuario(usuario)
        return user;
    }

    /**
     * Verifies if a token has the required permissions.
     * @param {string} token - The authentication token to verify
     * @returns {Promise<boolean>} True if the token has the required permissions, false otherwise
     */
    async verifyPermitions(token: string): Promise<boolean> {
        return await this.mysqlUsuario.verifyPermitions(token);
    }

    /**
     * Changes the roles assigned to a user.
     * @param {string} token - The authentication token of the user making the change
     * @param {string} email - The email of the user whose roles are being changed
     * @param {string} nameRol - The name of the role to assign
     * @returns {Promise<boolean>} True if the role was successfully changed, false otherwise
     */
    async changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean> {
        return await this.mysqlUsuario.changeUserRoles(token, email, nameRol);
    }

    /**
     * Retrieves all roles from the system.
     * @returns {Promise<Rol[]>} Array of role domain objects
     */
    async getRoles(): Promise<Rol[]> {
        const roles = await this.mysqlUsuario.getRoles();
        const rol = await this.rolesToRoles.getArray(roles)
        return rol;
    }

    /**
     * Retrieves all permissions associated with a user's token.
     * @param {string} token - The authentication token
     * @returns {Promise<Permiso[]>} Array of permission domain objects
     */
    async getPermiso(token: string): Promise<Permiso[]> {
        const decoded=  await this.detokenize(token);
        const permisos = await this.mysqlUsuario.getPermiso(decoded.getCi());
        const permi = await this.permisotopermiso.getArray(permisos)
        return permi
    }

    /**
     * Adds a new role to the system.
     * @param {Rol} rol - The role domain object to add
     * @returns {Promise<boolean>} True if the role was successfully added, false otherwise
     */
    async addRol(rol: Rol): Promise<boolean> {
        const roli = await this.rolesToRoles.teg(rol)
        return await this.mysqlUsuario.addRol(roli);
    }

    /**
     * Adds a new permission to the system.
     * @param {Permiso} permiso - The permission domain object to add
     * @returns {Promise<boolean>} True if the permission was successfully added, false otherwise
     */
    async addPermiso(permiso: Permiso): Promise<boolean> {
        const permi = await this.permisotopermiso.teg(permiso)
        return await this.mysqlUsuario.addPermiso(permi);
    }

    /**
     * Creates a new relationship between a role and a permission.
     * @param {number} idRol - The ID of the role
     * @param {string} namePermiso - The name of the permission
     * @returns {Promise<boolean>} True if the relationship was successfully created, false otherwise
     */
    async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        return await this.mysqlUsuario.addNewRelationRolPermiso(idRol, namePermiso);
    }

    /**
     * Removes a relationship between a role and a permission.
     * @param {number} idRol - The ID of the role
     * @param {string} namePermiso - The name of the permission
     * @returns {Promise<boolean>} True if the relationship was successfully removed, false otherwise
     */
    async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        return await this.mysqlUsuario.removeRelationRolPermiso(idRol, namePermiso);
    }
}

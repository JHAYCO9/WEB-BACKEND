
import { Usuario } from "../../../usuario/domain/usuario/Usuario";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import AuthDriverPort from "../../domain/port/driver/auth/AuthUsuario";

/**
 * Use case implementation for authentication operations.
 * This class implements the AuthDriverPort interface and serves as the primary
 * entry point for authentication-related operations in the application.
 * It orchestrates the interaction between the authentication service and JWT token service.
 * 
 * @implements {AuthDriverPort} Interface for authentication driver operations
 */
export default class AuthUseCase implements AuthDriverPort {
    /**
     * Creates a new instance of AuthUseCase.
     * 
     * @param {AuthServiceInterface} authService - Service for authentication operations
     * @param {JwtInterface} jwtToken - Service for JWT token operations
     */
    constructor(
        private readonly authService: AuthServiceInterface,

    ) { }

    /**
     * Authenticates a user and generates an access token.
     * This method validates the input parameters, authenticates the user through the auth service,
     * and generates a JWT token containing user information.
     * 
     * @param {string} usuario - The username or email of the user attempting to log in
     * @param {string} pwd - The password for authentication
     * @returns {Promise<string>} A promise that resolves to the JWT token if authentication is successful, or an empty string if it fails
     */
    public async login(usuario: string, pwd: string): Promise<string> {
        if ((usuario === undefined || usuario === null) || (pwd === undefined || pwd === null)) {
            return "";
        }
        const user = await this.authService.login(usuario, pwd);
        
        if (user.usuario.isNull()) {
            return "";
        }
       
        return user.token
    }

    /**
     * Registers a new user in the system.
     * 
     * @param {Usuario} usuario - The user domain object containing registration information
     * @returns {Promise<boolean>} A promise that resolves to true if registration was successful, false otherwise
     */
    public async register(usuario: Usuario): Promise<boolean> {
        const token = await this.authService.register(usuario);
        return token;
    }

    /**
     * Invalidates a user's authentication token.
     * 
     * @param {string} token - The authentication token to invalidate
     * @returns {Promise<boolean>} A promise that resolves to true if logout was successful, false otherwise
     */
    public async logout(token: string): Promise<boolean> {
        const isLoggedOut = await this.authService.logout(token);
        return isLoggedOut;
    }

    /**
     * Extracts user information from an authentication token.
     * 
     * @param {string} token - The authentication token to decode
     * @returns {Promise<Usuario>} A promise that resolves to the user domain object associated with the token
     * @throws {Error} If the token is invalid
     */
    public async detokenize(token: string): Promise<Usuario> {
        const usuario = await this.authService.detokenize(token);
        if (!usuario) {
            throw new Error("Invalid token");
        }
        return usuario;
    }

    /**
     * Verifies if a token has the required permissions.
     * 
     * @param {string} token - The authentication token to verify
     * @returns {Promise<boolean>} A promise that resolves to true if the token has the required permissions, false otherwise
     */
    public async verifyPermitions(token: string): Promise<boolean> {
        const hasPermission = await this.authService.verifyPermitions(token);
        return hasPermission;
    }

    /**
     * Changes the roles assigned to a user.
     * 
     * @param {string} token - The authentication token of the user making the change
     * @param {string} email - The email of the user whose roles are being changed
     * @param {string} nameRol - The name of the role to assign
     * @returns {Promise<boolean>} A promise that resolves to true if the role was successfully changed, false otherwise
     */
    public async changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean> {
        const roleChanged = await this.authService.changeUserRoles(token, email, nameRol);
        return roleChanged;
    }
}

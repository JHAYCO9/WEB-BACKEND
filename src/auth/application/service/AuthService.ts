import UsuarioRepositoryPort from "../../../usuario/domain/port/driven/UsuarioRepositoryPort";
import NullUsuario from "../../../usuario/domain/usuario/NullTypes/NullUsuario";
import { Usuario } from "../../../usuario/domain/usuario/Usuario";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import AuthRepositoryInterface from "../../domain/port/driven/auth/AuthRepository";

/**
 * Service implementation for authentication operations.
 * This class implements the AuthServiceInterface and provides the business logic
 * for user authentication, registration, token management, and role assignment.
 * It coordinates between the authentication repository and user repository.
 * 
 * @implements {AuthServiceInterface} Interface for authentication service operations
 */
export default class AuthService implements AuthServiceInterface {
  /**
   * Creates a new instance of AuthService.
   * 
   * @param {AuthRepositoryInterface} authRepository - Repository for authentication operations
   * @param {UsuarioRepositoryPort} userRepository - Repository for user operations
   */
  constructor(
    private readonly authRepository: AuthRepositoryInterface,
    private readonly userRepository: UsuarioRepositoryPort
  ) { }

  /**
   * Authenticates a user with the provided credentials.
   * This method retrieves the user by email, verifies the password,
   * and returns the user object if authentication is successful.
   * 
   * @param {string} usuario - The email of the user attempting to log in
   * @param {string} pwd - The password for authentication
   * @returns {Promise<Usuario>} A promise that resolves to the user domain object if authentication is successful,
   *                            or a NullUsuario if the user is not found or the password is incorrect
   */
  async login(usuario: string, pwd: string): Promise<{ usuario: Usuario; token: string }> {
    const userData = await this.userRepository.getUsuarioByEmail(usuario)

    if (userData === undefined || userData === null) {
      return Promise.resolve({ usuario: new NullUsuario(), token: '' });
    }

    const isPasswordCorrect = await this.authRepository.comparePasswords(pwd, userData.getContrasenaUsuario());

    if (!isPasswordCorrect) {
      return Promise.resolve({ usuario: new NullUsuario(), token: '' });
    }
    if (userData.getCi().length > 0 || userData.getCorreoUsuario().length > 0 || userData.getRolUsuario() > 0) {

      const token = await this.authRepository.login(userData.getCi(), userData.getCorreoUsuario(), userData.getRolUsuario());

      if (token === null || token === undefined) {
        return Promise.resolve({ usuario: userData, token: '' });
      }

      return Promise.resolve({ usuario: userData, token: token });
    }else{
      return Promise.resolve({ usuario: new NullUsuario(), token: '' });
    }
  }

  /**
   * Registers a new user in the system.
   * 
   * @param {Usuario} usuario - The user domain object containing registration information
   * @returns {Promise<boolean>} A promise that resolves to true if registration was successful
   * @throws {Error} If registration fails
   */
  async register(usuario: Usuario): Promise<boolean> {
    const token = await this.authRepository.register(usuario);
    if (!token) {
      throw new Error("Registration failed");
    }
    return token;
  }

  /**
   * Invalidates a user's authentication token.
   * 
   * @param {string} token - The authentication token to invalidate
   * @returns {Promise<boolean>} A promise that resolves to true if logout was successful, false otherwise
   */
  async logout(token: string): Promise<boolean> {
    return this.authRepository.logout(token);
  }

  /**
   * Extracts user information from an authentication token.
   * 
   * @param {string} token - The authentication token to decode
   * @returns {Promise<Usuario>} A promise that resolves to the user domain object associated with the token
   * @throws {Error} If the token is invalid
   */
  async detokenize(token: string): Promise<Usuario> {
    const usuario = await this.authRepository.detokenize(token);
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
  async verifyPermitions(token: string): Promise<boolean> {
    return this.authRepository.verifyPermitions(token);
  }

  /**
   * Changes the roles assigned to a user.
   * 
   * @param {string} token - The authentication token of the user making the change
   * @param {string} email - The email of the user whose roles are being changed
   * @param {string} nameRol - The name of the role to assign
   * @returns {Promise<boolean>} A promise that resolves to true if the role was successfully changed, false otherwise
   */
  async changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean> {
    return this.authRepository.changeUserRoles(token, email, nameRol);
  }
}

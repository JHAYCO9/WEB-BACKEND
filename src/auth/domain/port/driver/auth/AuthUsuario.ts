import { Usuario } from "../../../../../usuario/domain/usuario/Usuario"

/**
 * Driver port interface for authentication operations.
 * This interface defines the contract for authentication-related operations
 * that can be performed by the application's driving adapters (e.g., controllers).
 * It follows the Ports and Adapters (Hexagonal) architecture pattern.
 */
export default interface AuthDriverPort {
  /**
   * Authenticates a user and generates an access token.
   * 
   * @param {string} usuario - The username or email of the user attempting to log in
   * @param {string} pwd - The password for authentication
   * @returns {Promise<string>} A promise that resolves to the authentication token if successful
   */
  login(usuario: string, pwd: string): Promise<string>
  
  /**
   * Registers a new user in the system.
   * 
   * @param {Usuario} usuario - The user domain object containing registration information
   * @returns {Promise<boolean>} A promise that resolves to true if registration was successful, false otherwise
   */
  register(usuario: Usuario): Promise<boolean>
  
  /**
   * Invalidates a user's authentication token.
   * 
   * @param {string} token - The authentication token to invalidate
   * @returns {Promise<boolean>} A promise that resolves to true if logout was successful, false otherwise
   */
  logout(token: string): Promise<boolean>
  
  /**
   * Extracts user information from an authentication token.
   * 
   * @param {string} token - The authentication token to decode
   * @returns {Promise<Usuario>} A promise that resolves to the user domain object associated with the token
   */
  detokenize(token: string): Promise<Usuario>
  
  /**
   * Verifies if a token has the required permissions.
   * 
   * @param {string} token - The authentication token to verify
   * @returns {Promise<boolean>} A promise that resolves to true if the token has the required permissions, false otherwise
   */
  verifyPermitions(token: string): Promise<boolean>
  
  /**
   * Changes the roles assigned to a user.
   * 
   * @param {string} token - The authentication token of the user making the change
   * @param {string} email - The email of the user whose roles are being changed
   * @param {string} nameRol - The name of the role to assign
   * @returns {Promise<boolean>} A promise that resolves to true if the role was successfully changed, false otherwise
   */
  changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean>
}

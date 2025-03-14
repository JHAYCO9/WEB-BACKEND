import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

/**
 * Interface for the Express controller handling authentication operations.
 * This interface extends the base ControllerExpressInterface and defines
 * methods for handling HTTP requests related to authentication, user roles,
 * and permissions management.
 * 
 * Each method corresponds to a specific authentication operation and receives
 * Express Request and Response objects to handle the HTTP interaction.
 * 
 * @extends ControllerExpressInterface
 */
export default interface AuthControllerExpressInterface
  extends ControllerExpressInterface {
  /**
   * Handles requests to retrieve all roles from the system.
   * 
   * @param {Request} req - The Express request object
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  getRoles: (req: Request, res: Response) => void
  
  /**
   * Handles requests to retrieve permissions associated with a token.
   * 
   * @param {Request} req - The Express request object containing the token parameter
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  getPermisos: (req: Request, res: Response) => void
  
  /**
   * Handles user authentication requests.
   * 
   * @param {Request} req - The Express request object containing login credentials
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  login: (req: Request, res: Response) => void
  
  /**
   * Handles user registration requests.
   * 
   * @param {Request} req - The Express request object containing user registration data
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  register: (req: Request, res: Response) => void
  
  /**
   * Handles requests to extract user information from a token.
   * 
   * @param {Request} req - The Express request object containing the token
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  detokenize: (req: Request, res: Response) => void
  
  /**
   * Handles user logout requests.
   * 
   * @param {Request} req - The Express request object containing the token to invalidate
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  logout: (req: Request, res: Response) => void
  
  /**
   * Handles requests to verify if a token has the required permissions.
   * 
   * @param {Request} req - The Express request object containing the token to verify
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  verifyPermitions: (req: Request, res: Response) => void
  
  /**
   * Handles requests to change the roles assigned to a user.
   * 
   * @param {Request} req - The Express request object containing token, email, and role data
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  changeUserRoles: (req: Request, res: Response) => void; 
  
  /**
   * Handles requests to add a new role to the system.
   * 
   * @param {Request} req - The Express request object containing role data
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  addRol: (req: Request, res: Response) => void; 
  
  /**
   * Handles requests to add a new permission to the system.
   * 
   * @param {Request} req - The Express request object containing permission data
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  addPermiso: (req: Request, res: Response) => void; 
  
  /**
   * Handles requests to create a relationship between a role and a permission.
   * 
   * @param {Request} req - The Express request object containing role ID and permission name
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  addNewRelationRolPermiso: (req: Request, res: Response) => void; 
  
  /**
   * Handles requests to remove a relationship between a role and a permission.
   * 
   * @param {Request} req - The Express request object containing role ID and permission name
   * @param {Response} res - The Express response object
   * @returns {void}
   */
  removeRelationRolPermiso: (req: Request, res: Response) => void; 
}
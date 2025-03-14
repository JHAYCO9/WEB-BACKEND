import { Request, Response, NextFunction } from 'express';

/**
 * Interface defining the contract for authentication and authorization middleware.
 * Implementations of this interface provide methods to verify user authentication
 * and permissions before allowing access to protected routes.
 */
export default interface AuthMiddlewareInterface {
  /**
   * Middleware to verify if a user is authenticated.
   * Checks if a valid token is present in the request headers.
   * 
   * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} Express middleware function
   */
  isAuthenticated(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
  
  /**
   * Middleware to verify if a user has the required permissions.
   * This should be used after the isAuthenticated middleware.
   * 
   * @param {string[]} requiredPermissions - Array of permission names required for access
   * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} Express middleware function
   */
  hasPermission(requiredPermissions?: string[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
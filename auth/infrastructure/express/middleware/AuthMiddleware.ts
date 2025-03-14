import { Request, Response, NextFunction } from 'express';
import AuthDriverPort from '../../../domain/port/driver/auth/AuthUsuario';
import AuthMiddlewareInterface from './AuthMiddlewareInterface';
import AuthRolPermisoDriverPort from '../../../domain/port/driver/auth/AuthRolPermisoDriverPort';


/**
 * Middleware for authentication and authorization in Express routes.
 * This class provides methods to verify user authentication and permissions
 * before allowing access to protected routes.
 */
export default class AuthMiddleware implements AuthMiddlewareInterface {
  /**
   * Creates a new instance of AuthMiddleware.
   * 
   * @param {AuthDriverPort} authUseCase - Use case for authentication operations
   */
  constructor(private readonly authUseCase: AuthDriverPort,
    private readonly authRolPermiso : AuthRolPermisoDriverPort,

  ) {}

  /**
   * Middleware to verify if a user is authenticated.
   * Checks if a valid token is present in the request headers.
   * 
   * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} Express middleware function
   */
  public isAuthenticated = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const token =  req.headers['user-id'] as string;

        if (token=== null || token === undefined) {
          res.status(401).json({ message: "Authentication required" });
          return;
        }

        try {
          // Verify the token is valid by attempting to decode it
          const user = await this.authUseCase.detokenize(token);
          
          if (!user || user.isNull()) {
            res.status(401).json({ message: "Invalid authentication token" });
            return;
          }

          // Add the user to the request object for use in subsequent middleware or route handlers
          (req as any).user = user;
          (req as any).token = token;
          
          next();
        } catch (error) {
          res.status(401).json({ message: "Invalid authentication token" });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  };

  /**
   * Middleware to verify if a user has the required permissions.
   * This should be used after the isAuthenticated middleware.
   * 
   * @param {string[]} requiredPermissions - Array of permission names required for access
   * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} Express middleware function
   */
  public hasPermission = (requiredPermissions: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        // This middleware should be used after isAuthenticated
        if (!(req as any).token) {
          res.status(401).json({ message: "Authentication required" });
          return;
        }

        const token = (req as any).token;
        
        // Get all permissions for the user
        const permisos = await this.authRolPermiso.getPermisos(token);
        
        if (!permisos || permisos.length === 0) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }
        
        // Check if the user has any of the required permissions
        const userPermissionNames = permisos.map(p => p.getNombrePermiso());
        const hasRequiredPermission = requiredPermissions.some(permission => 
          userPermissionNames.includes(permission)
        );
        
        if (!hasRequiredPermission) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }
        
        next();
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  };
}
import { Request, Response } from 'express'
import AuthControllerExpressInterface from '../../../domain/interfaces/AuthControllerExpressInterface'

import AuthRolesPermisoUseCase from '../../../application/usecase/AuthRolesPermisoUseCase';
import AuthDriverPort from '../../../domain/port/driver/auth/AuthUsuario';
import { Usuario as UsuarioIn } from '../../../../usuario/domain/usuario/interface/UsuarioInterface';
import { Usuario } from '../../../../usuario/domain/usuario/Usuario';


/**
 * Express controller implementation for authentication-related operations.
 * This controller handles HTTP requests for user authentication, role management,
 * and permission management through Express.js routes.
 * 
 * @implements {AuthControllerExpressInterface} Interface defining required controller methods
 */
export default class AuthControllerExpress
  implements AuthControllerExpressInterface {

    /**
     * Creates a new instance of AuthControllerExpress.
     * 
     * @param {AuthDriverPort} authUseCase - Use case for authentication operations
     * @param {AuthRolesPermisoUseCase} authRolPermisoUsecase - Use case for role and permission operations
     */
    constructor(
      private readonly authUseCase: AuthDriverPort,
      private readonly authRolPermisoUsecase: AuthRolesPermisoUseCase,
    ) {}

    /**
     * Retrieves all roles from the system.
     * 
     * @param {Request} _req - Express request object (unused)
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public getRoles = async (_req: Request, res: Response): Promise<void> => {
      try {
        const roles = await this.authRolPermisoUsecase.getRoles();
       
        if (roles === null || roles === undefined) {
          res.status(404).json({ message: "Roles not found" });
          return Promise.resolve();
        }
  
        res.status(200).json({ roles: roles });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Retrieves all permissions associated with a token.
     * 
     * @param {Request} req - Express request object containing the token parameter
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */

    /**
     * Retrieves all permissions associated with a token.
     * If the token is missing or invalid, returns a 403 Forbidden status
     * indicating insufficient permissions.
     * 
     * @param {Request} req - Express request object containing the user-id header
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public getPermisos = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }
    
        const permisos = await this.authRolPermisoUsecase.getPermisos(token);
    
        if (!permisos || permisos.length === 0) {
          res.status(404).json({ message: "Permisos not found" });
          return;
        }
    
        res.status(200).json({ permisos });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };

    
    /**
     * Adds a new role to the system.
     * 
     * @param {Request} req - Express request object containing the role data in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public addRol = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }

        const rol = req.body;
        const success = await this.authRolPermisoUsecase.addRol(rol);
        if (!success) {
          res.status(400).json({ message: "Failed to add role" });
          return;
        }
        res.status(201).json({ message: "Role added successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Adds a new permission to the system.
     * 
     * @param {Request} req - Express request object containing the permission data in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public addPermiso = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }
        const permiso = req.body;
        const success = await this.authRolPermisoUsecase.addPermiso(permiso);
        if (!success) {
          res.status(400).json({ message: "Failed to add permission" });
          return;
        }
        res.status(201).json({ message: "Permission added successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Creates a new association between a role and a permission.
     * 
     * @param {Request} req - Express request object containing idRol and idPermiso in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public addNewRelationRolPermiso = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }

        const { idRol, idPermiso } = req.body;
        const success = await this.authRolPermisoUsecase.addNewRelationRolPermiso(idRol, idPermiso);
        if (!success) {
          res.status(400).json({ message: "Failed to associate role with permission" });
          return;
        }
        res.status(201).json({ message: "Role and permission associated successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Removes an association between a role and a permission.
     * 
     * @param {Request} req - Express request object containing idRol and idPermiso in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public removeRelationRolPermiso = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        } 

        const { idRol, idPermiso } = req.body;
        const success = await this.authRolPermisoUsecase.removeRelationRolPermiso(idRol, idPermiso);
        if (!success) {
          res.status(400).json({ message: "Failed to remove role-permission association" });
          return;
        }
        res.status(200).json({ message: "Role-permission association removed successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };

    /**
     * Authenticates a user and generates an access token.
     * 
     * @param {Request} req - Express request object containing email and password in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public login = async (req: Request, res: Response): Promise<void> => {
      try {
        const { email, password } = req.body;
        
        const token = await this.authUseCase.login(email, password);

        if (token === null || token === undefined) {
          res.status(401).json({ message: "Invalid credentials" });
          return Promise.resolve();
        }
    
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Registers a new user in the system.
     * 
     * @param {Request} req - Express request object containing user data in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public register = async (req: Request, res: Response): Promise<void> => {
      try {     
        const userData = req.body as UsuarioIn;
        if(userData === null || userData === undefined){
          res.status(400).json({ message: "Registration failed" });
          return Promise.resolve();
        }
        const userObj= new Usuario(userData)

        const user = await this.authUseCase.register(userObj);
        console.log(user)
        if (user === null || user === undefined) {
          res.status(400).json({ message: "Registration failed" });
          return Promise.resolve();
        }
  
        res.status(201).json({ message: "User registered successfully", user });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Extracts user information from an authentication token.
     * 
     * @param {Request} req - Express request object containing the token in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public detokenize = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(403).json({ message: "Insufficient permissions" });
          return;
        }
  
        res.status(200).json({  });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    /**
     * Invalidates a user's authentication token.
     * 
     * @param {Request} req - Express request object containing the token parameter
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public logout = async (req: Request, res: Response): Promise<void> => {
      try {
        const token = req.headers['user-id'] as string;
    
        if (token === null || token === undefined) {
          res.status(401).json({ message: "Invalid token" });
          return Promise.resolve();
        }
    
    
        const logout = await this.authUseCase.logout(token);
        res.status(200).json({ message: "Logged out successfully", logout });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
      
    /**
     * Verifies if a token has the required permissions.
     * 
     * @param {Request} req - Express request object containing the token parameter
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public verifyPermitions = async (req: Request, res: Response): Promise<void> => {
      try {
        let token = req.params['token'];
    
        if (!token) {
          token = "3"; 
        }
    
        const verify = await this.authUseCase.verifyPermitions(token);
        res.status(200).json({ message: "Permission verification successful", verify });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };

    /**
     * Changes the roles assigned to a user.
     * 
     * @param {Request} req - Express request object containing token, email, and nameRol in the body
     * @param {Response} res - Express response object
     * @returns {Promise<void>} Promise that resolves when the response is sent
     */
    public changeUserRoles = async (req: Request, res: Response): Promise<void> => {
      try {
        const { token, email, nameRol } = req.body;
        const success = await this.authUseCase.changeUserRoles(token, email, nameRol);
        if (!success) {
          res.status(400).json({ message: "Failed to change user role" });
          return;
        }
        res.status(200).json({ message: "User role updated successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
}
import AuthUseCase from "../../../application/usecase/AuthUseCase";
import AuthRolesPermisoUseCase from "../../../application/usecase/AuthRolesPermisoUseCase";
import AuthControllerExpress from "../../express/controller/AuthControllerExpress";
import AuthRouterExpress from "../router/AuthRouterExpress";
import RouterExpressInterface from "../../../../express/domain/RouterExpressInterface";
import AuthService from "../../../application/service/AuthService";
import AuthRepositoryInfraestructure from "../../repository/AuthRepositoryInfraestructure";
import MysqlRolesToRoles from "../../repository/RolToRol";
import MysqlPermisosToPermisos from "../../repository/PermisoToPermiso";
import MysqlAuthRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlAuth";
import MysqlUsuariosToUsuarios from "../../../../usuario/infrastructure/repository/UsuarioToUsuario";
import AuthRolPermisoService from "../../../application/service/AuthRolPermisoService";
import ByCriptRepo from "../../../../bycrypt/infrastructure/security/ByCriptRepo";
import UserRepositoryInfraestructure from "../../../../usuario/infrastructure/repository/UsuarioRepository";
import MysqlUsuarioRepository from "../../../../mysql/infrastructure/db/AuthSQL/MysqlUsuarioI";
import JwtRepo from "../../../../jwt/infrastructure/tokken/JwtokenRepo";
import AuthMiddleware from "../middleware/AuthMiddleware";

/**
 * Factory class responsible for creating and wiring together all components
 * required for the authentication module.
 * 
 * This factory implements the Factory Method pattern to encapsulate the creation
 * logic of the authentication router and all its dependencies, including:
 * - Data converters (between MySQL and domain entities)
 * - Repositories (for authentication, users, etc.)
 * - Services (for authentication and role/permission management)
 * - Use cases (for business logic)
 * - Controllers (for handling HTTP requests)
 * - Routers (for defining API endpoints)
 */
export default class AuthRouterFactory {
  /**
   * Creates and configures a complete authentication router with all its dependencies.
   * 
   * This method implements the dependency injection pattern by:
   * 1. Creating data converters for permissions, roles, and users
   * 2. Instantiating repositories for authentication and users
   * 3. Creating services that implement business logic
   * 4. Creating use cases that orchestrate the application flow
   * 5. Creating a controller to handle HTTP requests
   * 6. Creating and returning a router with the configured controller
   * 
   * @returns {RouterExpressInterface} A fully configured Express router for authentication endpoints
   */
  public static create(): RouterExpressInterface {
    // Instantiate converters
    const permisoToPermiso = new MysqlPermisosToPermisos();
    const rolToRol = new MysqlRolesToRoles(permisoToPermiso);
    const usuarioToUsuario = new MysqlUsuariosToUsuarios();
    
    // Instantiate repositories
    const mysqlAuthRepository = new MysqlAuthRepository();
    const bycriptInterface = new ByCriptRepo();
    const jwtRepo = new JwtRepo()
    const mysqlUsuario = new MysqlUsuarioRepository
    
    // Create the user repository
    const usuarioRepo = new UserRepositoryInfraestructure(
      mysqlUsuario, // MySQL repository for users
      usuarioToUsuario,    // User converter
      rolToRol             // Role converter
    );
    
    // Create the authentication repository
    const authRepository = new AuthRepositoryInfraestructure(
      mysqlAuthRepository, 
      usuarioToUsuario, 
      rolToRol, 
      permisoToPermiso, 
      bycriptInterface,
      jwtRepo
    );
    
    // Create services
    const authService = new AuthService(authRepository, usuarioRepo);
    const authRolPermisoService = new AuthRolPermisoService(authRepository);
    
    // Create use cases
    const authRolesPermisoUseCase = new AuthRolesPermisoUseCase(authRolPermisoService);
    const authUseCase = new AuthUseCase(authService);
    
    // Create the controller
    const authController = new AuthControllerExpress(authUseCase, authRolesPermisoUseCase);
    
    // Create the middleware
    const authMiddleware = new AuthMiddleware(authUseCase,authRolesPermisoUseCase ); // Assuming AuthMiddleware is the correct class

    // Return the router
    return new AuthRouterExpress(authController, authMiddleware);
  }
}
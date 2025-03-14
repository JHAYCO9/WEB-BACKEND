import UsuarioUseCase from "../../application/usecase/UsuarioUseCase";
import UsuarioControllerExpress from "../express/controller/UserControllerExpress";
import UsuarioRouterExpress from "../express/router/UserRouterExpress";
import RouterExpressInterface from "../../../express/domain/RouterExpressInterface";
import UsuarioService from "../../application/service/UsuarioService";
import UserRepositoryInfraestructure from "../repository/UsuarioRepository";
import MysqlUsuariosToUsuarios from "../repository/UsuarioToUsuario";
import MysqlRolesToRoles from "../../../auth/infrastructure/repository/RolToRol";
import MysqlPermisosToPermisos from "../../../auth/infrastructure/repository/PermisoToPermiso";
import MysqlUsuarioRepository from "../../../mysql/infrastructure/db/AuthSQL/MysqlUsuarioI";
import UsuarioAuthService from "../../application/service/UsuarioAuthService";
import UsuarioCRUDService from "../../application/service/UsurioCRUDService";

export default class UsuarioRouterFactory {
  public static create(): RouterExpressInterface {
    // Instanciar conversores
    const permisoToPermiso = new MysqlPermisosToPermisos();
    const rolToRol = new MysqlRolesToRoles(permisoToPermiso);
    const usuarioToUsuario = new MysqlUsuariosToUsuarios();

    // Instanciar repositorio
    const mysqlUsuarioRepository = new MysqlUsuarioRepository();
    const userRepository = new UserRepositoryInfraestructure(mysqlUsuarioRepository, usuarioToUsuario, rolToRol);

    // Crear el servicio y caso de uso
    const usuarioService = new UsuarioService(userRepository);
    const usuarioAuthService = new UsuarioAuthService(userRepository);
    const usuarioCRUDService = new UsuarioCRUDService(userRepository)
    const usuarioUseCase = new UsuarioUseCase(usuarioService, usuarioAuthService, usuarioCRUDService);

    // Crear el controlador
    const usuarioController = new UsuarioControllerExpress(usuarioUseCase);

    // Retornar el router
    return new UsuarioRouterExpress(usuarioController);
  }
}

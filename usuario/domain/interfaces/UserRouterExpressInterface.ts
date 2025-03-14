import RouterExpressInterface from '../../../express/domain/RouterExpressInterface'

export default interface UserRouterExpressInterface
  extends RouterExpressInterface {
    
    configureGetUsuarios: () => void;
    configureGetUsuarioByCi: () => void;
    configureGetUsuarioByEmail: () => void;

    configureCreateUsuario: () => void;
    configureUpdateUsuario: () => void;
    configureDeleteUsuario: () => void;

    configureChangePassword: () => void;
    configureGetRolUsuario: () => void;
}
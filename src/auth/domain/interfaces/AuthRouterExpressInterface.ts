import RouterExpressInterface from '../../../express/domain/RouterExpressInterface'

export default interface MovieRouterExpressInterface
  extends RouterExpressInterface {
    configureRoles: () => void;
    configurePermisos: () => void;
    configureLogin: () => void;
    configureRegister: () => void;
    configureDetokenize: () => void;
    configureLogout: () => void;
    configureVerifyPermitions: () => void;
    configureChangeUserRoles: () => void;
    configureAddRol: () => void;
    configureAddPermiso: () => void;
    configureAddNewRelationRolPermiso: () => void;
    configureRemoveRelationRolPermiso: () => void;
  }
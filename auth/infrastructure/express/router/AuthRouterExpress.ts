import { Router } from 'express';
import AuthRouterExpressInterface from '../../../domain/interfaces/AuthRouterExpressInterface';
import AuthControllerExpressInterface from '../../../domain/interfaces/AuthControllerExpressInterface';
import AuthMiddlewareInterface from '../middleware/AuthMiddlewareInterface';

export default class AuthRouterExpress implements AuthRouterExpressInterface {
  router: Router;
  path: string;

  constructor(
    private readonly authController: AuthControllerExpressInterface,
    private readonly authMiddleWare: AuthMiddlewareInterface
  ) {
    this.router = Router();
    this.path = '/auth/v1.0';
    this.routes();
  }

  public routes = (): void => {
    this.configureRoles();
    this.configurePermisos();
    this.configureLogin();
    this.configureRegister();
    this.configureDetokenize();
    this.configureLogout();
    this.configureVerifyPermitions();
    this.configureChangeUserRoles();
    this.configureAddRol();
    this.configureAddPermiso();
    this.configureAddNewRelationRolPermiso();
    this.configureRemoveRelationRolPermiso();
  };

  public configureRoles = (): void => {
    this.router.get(
      '/roles',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['GetRoles']),
      this.authController.getRoles.bind(this.authController)
    );
  };

  public configurePermisos = (): void => {
    this.router.get(
      '/permisos',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['GetPermisos']),
      this.authController.getPermisos.bind(this.authController)
    );
  };

  public configureLogin = (): void => {
    this.router.post('/login', this.authController.login.bind(this.authController));
  };

  public configureRegister = (): void => {
    this.router.post(
      '/register',
      this.authController.register.bind(this.authController)
    );
  };

  public configureDetokenize = (): void => {
    this.router.post(
      '/detokenize',
      this.authController.detokenize.bind(this.authController)
    );
  };

  public configureLogout = (): void => {
    this.router.post(
      '/logout',
      this.authMiddleWare.isAuthenticated(),
      this.authController.logout.bind(this.authController)
    );
  };

  public configureVerifyPermitions = (): void => {
    this.router.get(
      '/verify',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['VerifyPermissions']),
      this.authController.verifyPermitions.bind(this.authController)
    );
  };

  public configureChangeUserRoles = (): void => {
    this.router.post(
      '/change-role/update',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['ChangeUserRole']),
      this.authController.changeUserRoles.bind(this.authController)
    );
  };

  public configureAddRol = (): void => {
    this.router.post(
      '/roles/add',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['AddRole']),
      this.authController.addRol.bind(this.authController)
    );
  };

  public configureAddPermiso = (): void => {
    this.router.post(
      '/permisos/create',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['AddPermission']),
      this.authController.addPermiso.bind(this.authController)
    );
  };

  public configureAddNewRelationRolPermiso = (): void => {
    this.router.post(
      '/roles-permisos/create',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['AddRolePermission']),
      this.authController.addNewRelationRolPermiso.bind(this.authController)
    );
  };

  public configureRemoveRelationRolPermiso = (): void => {
    this.router.delete(
      '/roles-permisos/remove',
      this.authMiddleWare.isAuthenticated(),
      this.authMiddleWare.hasPermission(['RemoveRolePermission']),
      this.authController.removeRelationRolPermiso.bind(this.authController)
    );
  };
}

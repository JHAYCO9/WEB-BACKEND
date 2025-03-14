
import { Router } from "express";
import UserRouterExpressInterface from "../../../domain/interfaces/UserRouterExpressInterface";
import UserControllerExpressInterface from "../../../domain/interfaces/UserControllerExpressInterface";

export default class UserRouterExpress implements UserRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly userController: UserControllerExpressInterface) {
    this.router = Router();
    this.path = "/users/v1.0";
    this.routes();
  }

  public routes = (): void => {
    this.configureGetUsuarios();
    this.configureGetUsuarioByCi();
    this.configureGetUsuarioByEmail();
    this.configureCreateUsuario();
    this.configureUpdateUsuario();
    this.configureDeleteUsuario();
    this.configureChangePassword();
    this.configureGetRolUsuario();
  };

  public configureGetUsuarios = (): void => {
    this.router.get("/users", this.userController.getUsuarios.bind(this.userController));
  };


  public configureGetUsuarioByCi = (): void => {
    this.router.get("/user/ci/:ci", this.userController.getUsuarioByCi.bind(this.userController));
  };

  public configureGetUsuarioByEmail = (): void => {
    this.router.get("/user/email/:email", this.userController.getUsuarioByEmail.bind(this.userController));
  };

  public configureCreateUsuario = (): void => {
    this.router.post("/user", this.userController.crearUsuario.bind(this.userController));
  };

  public configureUpdateUsuario = (): void => {
    this.router.put("/user/:ci", this.userController.actualizarUsuario.bind(this.userController));
  };

  public configureDeleteUsuario = (): void => {
    this.router.delete("/user/:ci", this.userController.eliminarUsuario.bind(this.userController));
  };

  public configureChangePassword = (): void => {
    this.router.put("/user/password", this.userController.cambiarContrasena.bind(this.userController));
  };

  public configureGetRolUsuario = (): void => {
    this.router.get("/user/rol/:idRol", this.userController.getRolUsuario.bind(this.userController));
  };
}


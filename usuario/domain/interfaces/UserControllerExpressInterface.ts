import { Request, Response } from "express";
import ControllerExpressInterface from "../../../express/domain/ControllerExpressInterface";

export default interface UserControllerExpressInterface extends ControllerExpressInterface {
  getUsuarios: (req: Request, res: Response) => Promise<void>;
  getUsuarioByCi: (req: Request, res: Response) => Promise<void>;
  getUsuarioByEmail: (req: Request, res: Response) => Promise<void>;
  getRolUsuario: (req: Request, res: Response) => Promise<void>;
  crearUsuario: (req: Request, res: Response) => Promise<void>;
  actualizarUsuario: (req: Request, res: Response) => Promise<void>;
  eliminarUsuario: (req: Request, res: Response) => Promise<void>;
  cambiarContrasena: (req: Request, res: Response) => Promise<void>;
  
}
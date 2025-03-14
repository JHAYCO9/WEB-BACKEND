import { Request, Response } from 'express';
import UserControllerExpressInterface from '../../../domain/interfaces/UserControllerExpressInterface';
import UserUseCasePort from '../../../domain/port/driver/usuario/UsuarioDriverPort';
import { Rol } from '../../../../auth/domain/roles/Rol';


export default class UserControllerExpress implements UserControllerExpressInterface {
  constructor(private readonly userUseCase: UserUseCasePort) {}

  public getUsuarios = async (_req: Request, res: Response): Promise<void> => {
    const usuarios = await this.userUseCase.getUsuarios();
    if (!usuarios || usuarios.length === 0) {
      res.status(404).json({ message: 'Usuarios not found' });
      return Promise.resolve();
    }
    res.status(200).json({ usuarios: usuarios });
  };


  public getUsuarioByCi = async (req: Request, res: Response): Promise<void> => {
    const ci = req.params['ci'];
    if (!ci) {
      res.status(400).json({ message: 'ciNotValid' });
      return Promise.resolve();
    }
    const usuario = await this.userUseCase.getUsuarioByCi(ci);
    if (!usuario) {
      res.status(404).json({ message: 'Usuario not found' });
      return;
    }
    res.status(200).json({ usuario: usuario});
  };

  public getUsuarioByEmail = async (req: Request, res: Response): Promise<void> => {
    const email = req.params['email'];
    if (!email) {
      res.status(400).json({ message: 'emailNotValid' });
      return Promise.resolve();
    }
    const usuario = await this.userUseCase.getUsuarioByEmail(email);
    if (!usuario) {
      res.status(404).json({ message: 'Usuario not found' });
      return Promise.resolve();
    }
    res.status(200).json({ usuario: usuario });
  };


  public getRolUsuario = async (req: Request, res: Response): Promise<void> => {
    const idRol = Number(req.params['idRol']);
    if (!idRol) {
      res.status(400).json({ message: 'idRolNotValid' });
      return Promise.resolve();
    }
    const rol: Rol = await this.userUseCase.getRolUsuario(idRol);
    if (!rol) {
      res.status(404).json({ message: 'Rol not found' });
      return Promise.resolve();
    }
    res.status(200).json({ rol });
  };

  public crearUsuario = async (req: Request, res: Response): Promise<void> => {
    const usuario = req.body;
    const success = await this.userUseCase.crearUsuario(usuario);
    if (!success) {
      res.status(400).json({ message: 'Error creating user' });
      return Promise.resolve();
    }
    res.status(201).json({ message: 'Usuario created successfully' });
  };

  public actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    const ci = req.params['ci'];
    const usuario = req.body;
    if(ci === null || ci=== undefined || usuario=== null || usuario === undefined){
      res.status(402).json({ message: 'Error in the arguments' });
      return Promise.resolve();
    }
    const success = await this.userUseCase.actualizarUsuario(ci, usuario);
    if (!success) {
      res.status(400).json({ message: 'Error updating user' });
      return Promise.resolve();
    }
    res.status(200).json({ message: 'Usuario updated successfully' });
  };

  public eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
    const ci = req.params['ci'];
    if(ci === null || ci=== undefined ){
      res.status(402).json({ message: 'Error in the arguments' });
      return Promise.resolve();
    }
    const success = await this.userUseCase.eliminarUsuario(ci);
    if (!success) {
      res.status(400).json({ message: 'Error deleting user' });
      return Promise.resolve();
    }
    res.status(200).json({ message: 'Usuario deleted successfully' });
  };

  public cambiarContrasena = async (req: Request, res: Response): Promise<void> => {
    const { email, nuevaPwd } = req.body;
    const success = await this.userUseCase.cambiarContrasena(email, nuevaPwd);
    if (!success) {
      res.status(400).json({ message: 'Error changing password' });
      return Promise.resolve();
    }
    res.status(200).json({ message: 'Password changed successfully' });
  };
}
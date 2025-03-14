import { Rol } from '../../../../auth/domain/roles/Rol';
import RepositoryInterface from '../../../../repository/domain/RepositoryInterface'
import { Usuario } from '../../usuario/Usuario'

export default interface UsuarioRepositoryInterface
  extends RepositoryInterface<string, Usuario > {
  getUsuarioByEmail: (email: string)=> Promise<Usuario> ;
  getRolUsuario: (idRol: number)=> Promise<Rol>;
  cambiarContrasena: (email: string, nuevaPwd: string)=> Promise<boolean>;
}
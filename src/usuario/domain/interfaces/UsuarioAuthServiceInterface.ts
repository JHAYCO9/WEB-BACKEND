import { Rol } from "../../../auth/domain/roles/Rol";

export default interface UsuarioAuthServiceInterface {
  cambiarContrasena(email: string, nuevaPwd: string): Promise<boolean>;
  getRolUsuario(idRol: number): Promise<Rol>;
}
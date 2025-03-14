import { Usuario } from "../usuario/Usuario"

export default interface UsuarioCRUDServiceInterface {

  crearUsuario(usuario: Usuario): Promise<boolean>;
  actualizarUsuario(ci: string, usuario: Usuario): Promise<boolean>;
  eliminarUsuario(ci: string): Promise<boolean>;

}
import { Usuario } from "../usuario/Usuario"

export default interface UsuarioServiceInterface {
  getUsers():Promise<Usuario[]>
  getUsuarioByCi(ci: string): Promise<Usuario>;
  getUsuarioByEmail(email: string): Promise<Usuario>;
}

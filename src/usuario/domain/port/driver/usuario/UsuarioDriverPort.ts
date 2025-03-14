import { Rol } from "../../../../../auth/domain/roles/Rol";
import { Usuario } from "../../../usuario/Usuario";

export default interface UsuarioDriverPort {
    getUsuarios(): Promise<Usuario[]>;
    getUsuarioByCi(ci: string): Promise<Usuario> ;
    getUsuarioByEmail(email: string): Promise<Usuario> ;
    getRolUsuario(idRol: number): Promise<Rol>;
    crearUsuario(usuario: Usuario): Promise<boolean>;
    actualizarUsuario(ci: string, usuario: Usuario): Promise<boolean>;
    eliminarUsuario(ci: string): Promise<boolean>;
    cambiarContrasena(email: string, nuevaPwd: string): Promise<boolean>;
    
}

import NullRol from "../../../auth/domain/roles/NullTypes/NullRol";
import { Rol } from "../../../auth/domain/roles/Rol";
import UsuarioAuthServiceInterface from "../../domain/interfaces/UsuarioAuthServiceInterface";
import UsuarioCRUDServiceInterface from "../../domain/interfaces/UsuarioCRUDServiceInterface";
import UsuarioServiceInterface from "../../domain/interfaces/UsuarioServiceInterface";
import UsuarioDriverPort from "../../domain/port/driver/usuario/UsuarioDriverPort";
import NullUsuario from "../../domain/usuario/NullTypes/NullUsuario";
import { Usuario } from "../../domain/usuario/Usuario";

export default class UsuarioUseCase implements UsuarioDriverPort {
    constructor(
        private readonly usuarioService: UsuarioServiceInterface,
        private readonly usuarioAuthService: UsuarioAuthServiceInterface,
        private readonly usuarioCRUDService: UsuarioCRUDServiceInterface
    ) {}

    public async getUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioService.getUsers()

        if (usuarios.length === 0) {
        return [new NullUsuario()]
        }

        return usuarios
    }
    public async getUsuarioByCi(ci: string): Promise<Usuario> {
        const usuario = await this.usuarioService.getUsuarioByCi(ci)

        if (usuario === null || usuario === undefined) {
            return new NullUsuario()
        }

        return usuario
    }
    public async getUsuarioByEmail(email: string): Promise<Usuario> {
        const usuario = await this.usuarioService.getUsuarioByEmail(email)

        if (usuario === null || usuario === undefined) {
            return new NullUsuario()
        }

        return usuario
    }
    public async getRolUsuario(ci: number): Promise<Rol> {
        const rol = await this.usuarioAuthService.getRolUsuario(ci)

        if (rol === null || rol === undefined) {
            return new NullRol()
        }

        return rol
    }
    public async crearUsuario(usuarioE: Usuario): Promise<boolean> {
        const usuario = await this.usuarioCRUDService.crearUsuario(usuarioE)

        if (usuario === false) {
            return false;
        }

        return usuario
    }
    public async actualizarUsuario(ci: string, usuario: Usuario): Promise<boolean> {
        const usuarioUPD = await this.usuarioCRUDService.actualizarUsuario(ci,usuario)

        if (usuarioUPD === false) {
            return false;
        }

        return usuarioUPD
    }
    public async eliminarUsuario(ci: string): Promise<boolean> {
        const usuario = await this.usuarioCRUDService.eliminarUsuario(ci)

        if (usuario === false) {
            return false;
        }

        return usuario
    }
    public async cambiarContrasena(email: string, nuevaPwd: string): Promise<boolean> {
        const cambio = await this.usuarioAuthService.cambiarContrasena(email, nuevaPwd)

        if (cambio === false) {
            return false;
        }

        return cambio
    }

}
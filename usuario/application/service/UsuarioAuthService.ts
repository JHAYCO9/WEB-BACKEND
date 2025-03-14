import { Rol } from '../../../auth/domain/roles/Rol'
import UsuarioAuthServiceInterface from '../../domain/interfaces/UsuarioAuthServiceInterface'
import UsuarioRepositoryInterface from '../../domain/port/driven/UsuarioRepositoryPort'

export default class UsuarioAuthService implements UsuarioAuthServiceInterface {
  constructor(
    private readonly usuarioRepository: UsuarioRepositoryInterface) {}

    async cambiarContrasena(email: string, nuevaPwd: string): Promise<boolean> {
        return this.usuarioRepository.cambiarContrasena(email,nuevaPwd)
    }
    async getRolUsuario(idRol: number): Promise<Rol> {
        return this.usuarioRepository.getRolUsuario(idRol)
    }

}

import UsuarioCRUDServiceInterface from '../../domain/interfaces/UsuarioCRUDServiceInterface'
import UsuarioRepositoryInterface from '../../domain/port/driven/UsuarioRepositoryPort'
import { Usuario } from '../../domain/usuario/Usuario'

export default class UsuarioCRUDService implements UsuarioCRUDServiceInterface {
  constructor(
    private readonly usuarioRepository: UsuarioRepositoryInterface) {}

    async crearUsuario(usuario: Usuario): Promise<boolean> {
        const user = this.usuarioRepository.save(usuario)
        if(user === null || user  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
    async actualizarUsuario(ci: string, usuario: Usuario): Promise<boolean> {
        const user = this.usuarioRepository.update(ci,usuario)
        if(user === null || user  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
    async eliminarUsuario(ci: string): Promise<boolean> {
        return this.usuarioRepository.delete(ci)
    }

}
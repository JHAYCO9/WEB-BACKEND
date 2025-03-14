import UsuarioServiceInterface from '../../domain/interfaces/UsuarioServiceInterface'
import UsuarioRepositoryInterface from '../../domain/port/driven/UsuarioRepositoryPort'
import { Usuario } from '../../domain/usuario/Usuario'

export default class UsuarioService implements UsuarioServiceInterface {
  constructor(
    private readonly usuarioRepository: UsuarioRepositoryInterface) {}
    async getUsers(): Promise<Usuario[]> {
        return this.usuarioRepository.findAll()
    }
    async getUsuarioByCi(ci: string): Promise<Usuario> {
        return this.usuarioRepository.findById(ci)
    }
    async getUsuarioByEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.getUsuarioByEmail(email)
    }

}
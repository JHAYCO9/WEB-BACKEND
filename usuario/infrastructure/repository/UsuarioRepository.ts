
import NullRol from '../../../auth/domain/roles/NullTypes/NullRol';
import { Rol } from '../../../auth/domain/roles/Rol';
import MysqlRolesToRoles from '../../../auth/infrastructure/repository/RolToRol';
import UsuarioRepoInterface from '../../../mysql/domain/repository/UsuarioRepoInterface';
import UsuarioRepositoryPort from '../../domain/port/driven/UsuarioRepositoryPort';
import NullUsuario from '../../domain/usuario/NullTypes/NullUsuario';
import { Usuario } from '../../domain/usuario/Usuario'
import MysqlUsuariosToUsuarios from './UsuarioToUsuario';


export default class UserRepositoryInfraestructure implements UsuarioRepositoryPort {

    constructor(
        private readonly mysqlUsuario : UsuarioRepoInterface,
        private readonly mysqlUserToUser: MysqlUsuariosToUsuarios,
        private readonly mysqlRolToRol : MysqlRolesToRoles
    ){}


    public findAll = async (): Promise<Usuario[]> => {
        const usuarios = await this.mysqlUsuario.fetchUsuarios();
    
        if (!usuarios || usuarios.length === 0) {
          return [];
        }
        const user = this.mysqlUserToUser.getArray(usuarios)
        return Promise.resolve(user);
      };
    
      public findById = async (id: string): Promise<Usuario> => {
        const usuario = await this.mysqlUsuario.fetchUsuarioByCi(id);
        
        if (!usuario) {
          return Promise.resolve(new NullUsuario());
        }
        const user = this.mysqlUserToUser.get(usuario)
        return Promise.resolve(user);
      };

      public save = async (usuario: Usuario): Promise<Usuario> => {
        const mysqlUsuario = await this.mysqlUserToUser.teg(usuario);
        const created = await this.mysqlUsuario.createUsuario(mysqlUsuario);
    
        if (!created) {
            return new NullUsuario();
        }
    
        return usuario;
    };
    
    public update = async (id: string, usuario: Usuario): Promise<boolean | Usuario> => {
        const mysqlUsuario = await this.mysqlUserToUser.teg(usuario);
        const updated = await this.mysqlUsuario.updateUsuario(id, mysqlUsuario);
    
        if (!updated) {
            return false;
        }
    
        return usuario;
    };
    

      public patch= async (_id: string, _item: Partial<Usuario>):  Promise<boolean | Usuario> => {
        return Promise.resolve(false);
      };
    
      public delete = async (id: string): Promise<boolean> => {
        const deleted = await this.mysqlUsuario.deleteUsuario(id);
    
        return Promise.resolve(deleted);
      };
    
      public getUsuarioByEmail = async (email: string): Promise<Usuario> => {
        const usuario = await this.mysqlUsuario.fetchUsuarioByEmail(email);
        
        if (!usuario) {
          return Promise.resolve(new NullUsuario());
        }
    
        const user = this.mysqlUserToUser.get(usuario)
        return Promise.resolve(user);
      };
    
      public getRolUsuario = async (idRol: number): Promise<Rol> => {
        const rol = await this.mysqlUsuario.fetchRolUsuario(idRol);
    
        if (!rol) {
          return Promise.resolve(new NullRol());
        }
        const role = this.mysqlRolToRol.get(rol)
        return Promise.resolve(role);
      };
    
      public cambiarContrasena = async (email: string, nuevaPwd: string): Promise<boolean> => {
        const updated = await this.mysqlUsuario.forgotPwd(email, nuevaPwd);
    
        return Promise.resolve(updated);
      };


}

import { MysqlRol } from "../rol/MySQLRol";
import { MysqlUsuario } from "../usuario/MySQLUsuario";

export default interface UsuarioRepoInterface {

    fetchUsuarios(): Promise<MysqlUsuario[]>;
    fetchUsuarioByCi(ci: string): Promise<MysqlUsuario> ;
    fetchUsuarioByEmail(email: string): Promise<MysqlUsuario> ;
    fetchRolUsuario(idRol: number): Promise<MysqlRol>;
    createUsuario(usuario: MysqlUsuario): Promise<boolean>;
    updateUsuario(ci: string, usuario: MysqlUsuario): Promise<boolean>;
    deleteUsuario(ci: string): Promise<boolean>;
    forgotPwd(email: string, nuevaPwd: string): Promise<boolean>;
       
}
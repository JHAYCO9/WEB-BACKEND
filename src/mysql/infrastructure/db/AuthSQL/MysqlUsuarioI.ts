
import UsuarioRepoInterface from "../../../domain/repository/UsuarioRepoInterface";
import { MysqlRol } from "../../../domain/rol/MySQLRol";
import { MysqlUsuario } from "../../../domain/usuario/MySQLUsuario";
import Database from "../database";

export default class MysqlUsuarioRepository implements UsuarioRepoInterface {

  private readonly db = Database.getInstance();

  public fetchUsuarios = async (): Promise<MysqlUsuario[]> => {
    const rows = await this.db.executeQuery(
      `SELECT ci, nombreUsuario, apellidoUsuario, correoUsuario, 
              IF(estadoUsuario = 1, TRUE, FALSE) AS estadoUsuario, rol_id
       FROM BuenaVista_Usuarios`
    );

    if (!rows || rows.length === 0) {
      return Promise.reject(new Error("No se encontraron usuarios"));
    }

    return rows as MysqlUsuario[];
  };

  public fetchUsuarioByCi = async (ci: string): Promise<MysqlUsuario > => {
    const rows = await this.db.executeQuery(
      `SELECT ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario,
              IF(estadoUsuario = 1, TRUE, FALSE) AS estadoUsuario, rol_id
       FROM BuenaVista_Usuarios WHERE ci = ?`,
      [ci]
    );
    console.log(rows[0])
    if (!rows || rows.length === 0) {
        return Promise.reject(new Error('no data found'));
    }

    return rows[0] as MysqlUsuario;
  };

  public fetchUsuarioByEmail = async (email: string): Promise<MysqlUsuario > => {
    const rows = await this.db.executeQuery(
      `SELECT ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, 
              IF(estadoUsuario = 1, TRUE, FALSE) AS estadoUsuario, rol_id
       FROM BuenaVista_Usuarios WHERE correoUsuario = ?`,
      [email]
    );

    if (!rows || rows.length === 0) {
        return Promise.reject(new Error('no data found'));
    }

    return rows[0] as MysqlUsuario;
  };

  public fetchRolUsuario = async (idRol: number): Promise<MysqlRol> => {
    const rows = await this.db.executeQuery(
      `SELECT idRol, nombreRol, descripcion, 
              IF(estadoRol = 1, TRUE, FALSE) AS estadoRol 
       FROM BuenaVista_Roles WHERE idRol = ?`,
      [idRol]
    );

    if (!rows || rows.length === 0) {
      return Promise.reject(new Error('no data found'));
    }

    return rows[0] as MysqlRol;
  };

  public deleteUsuario = async (ci: string): Promise<boolean> => {
    const result = await this.db.executeQuery(
      `DELETE FROM BuenaVista_Usuarios WHERE ci = ?`,
      [ci]
    );

    if (!result || result.affectedRows === 0) {
      return false;
    }

    return true;
  };

  public forgotPwd = async (email: string, nuevaPwd: string): Promise<boolean> => {
    const result = await this.db.executeQuery(
      `UPDATE BuenaVista_Usuarios SET contrasenaUsuario = ? WHERE correoUsuario = ?`,
      [nuevaPwd, email]
    );

    if (!result || result.affectedRows === 0) {
      return false;
    }

    return true;
  };

  public createUsuario = async (usuario: MysqlUsuario): Promise<boolean> => {
    const result = await this.db.executeQuery(
      `INSERT INTO BuenaVista_Usuarios (ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario.ci,
        usuario.nombreUsuario,
        usuario.apellidoUsuario,
        usuario.correoUsuario,
        usuario.contrasenaUsuario,
        usuario.estadoUsuario ? 1 : 0, // Convierte booleano a número
        usuario.rol
      ]
    );
  
    if (!result || result.affectedRows === 0) {
      return false;
    }
  
    return true;
  };
  
  public updateUsuario = async (ci: string, usuario: MysqlUsuario): Promise<boolean> => {
    const result = await this.db.executeQuery(
      `UPDATE BuenaVista_Usuarios 
       SET nombreUsuario = ?, apellidoUsuario = ?, correoUsuario = ?, contrasenaUsuario = ?, estadoUsuario = ?, rol_id = ?
       WHERE ci = ?`,
      [
        usuario.nombreUsuario,
        usuario.apellidoUsuario,
        usuario.correoUsuario,
        usuario.contrasenaUsuario,
        usuario.estadoUsuario ? 1 : 0, // Convierte booleano a número
        usuario.rol,
        ci
      ]
    );
  
    if (!result || result.affectedRows === 0) {
      return false;
    }
  
    return true;
  };
  
}

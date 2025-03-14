import AuthRepoInterface from "../../../domain/repository/AuthRepoInterface";
import { MysqlPermiso } from "../../../domain/rol/MySQLPermiso";
import { MysqlRol } from "../../../domain/rol/MySQLRol";
import { MysqlUsuario } from "../../../domain/usuario/MySQLUsuario";
import Database from "../database";

export default class MysqlAuthRepository implements AuthRepoInterface {
    private readonly db = Database.getInstance();
  
    public async register(usuario: MysqlUsuario): Promise<boolean> {
      try {
        // Verificar si el correo ya existe
        const existingUser = await this.db.executeQuery(
          `SELECT ci FROM BuenaVista_Usuarios WHERE correoUsuario = ?`,
          [usuario.correoUsuario]
        );
    
        if (existingUser.length > 0) {
          throw new Error("El correo ya está registrado.");
        }
    
        // Insertar nuevo usuario
        const result = await this.db.executeQuery(
          `INSERT INTO BuenaVista_Usuarios (ci, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            usuario.ci,
            usuario.nombreUsuario,
            usuario.apellidoUsuario,
            usuario.correoUsuario,
            usuario.contrasenaUsuario,
            usuario.estadoUsuario ? 1 : 0,
            usuario.rol
          ]
        );
    
        return result.affectedRows > 0;
      } catch (error) {
        console.error("Error en register:", error);
        throw new Error("Error al registrar usuario.");
      }
    }
    
  
    public async logout(_token: string): Promise<boolean> {
      // Aquí puedes implementar la invalidación del token
      return true;
    }

  
    public async verifyPermitions(_token: string): Promise<boolean> {
      // Verificar permisos del usuario a partir del token
      throw new Error("Method not implemented.");
    }
  
    public async changeUserRoles(_token: string, email: string, nameRol: string): Promise<boolean> {
      const rol = await this.db.executeQuery(
        `SELECT idRol FROM BuenaVista_Roles WHERE nombreRol = ?`,
        [nameRol]
      );
  
      if (!rol || rol.length === 0) {
        throw new Error("Rol no encontrado.");
      }
  
      const result = await this.db.executeQuery(
        `UPDATE BuenaVista_Usuarios SET rol_id = ? WHERE correoUsuario = ?`,
        [rol[0].idRol, email]
      );
  
      return result.affectedRows > 0;
    }
  
    public async getRoles(): Promise<MysqlRol[]> {
      const rows = await this.db.executeQuery(
        `SELECT idRol, nombreRol, descripcion, estadoRol FROM BuenaVista_Roles`
      );
  
      return rows as MysqlRol[];
    }
  
    public async getPermiso(ci: string): Promise<MysqlPermiso[]> {
      try {
        const permisos = await this.db.executeQuery(
          `SELECT p.* FROM BuenaVista_Permisos p
           JOIN BuenaVista_Roles_Permisos rp ON p.idPermiso = rp.idPermisos
           JOIN BuenaVista_Usuarios u ON rp.idRol = u.rol_id
           WHERE u.ci = ?`,
          [ci]
        );
    
        return permisos as MysqlPermiso[];
      } catch (error) {
        console.error("Error al obtener permisos del usuario:", error);
        throw new Error("No se pudieron recuperar los permisos del usuario.");
      }
    }
    
  
    public async addRol(rol: MysqlRol): Promise<boolean> {
      const result = await this.db.executeQuery(
        `INSERT INTO BuenaVista_Roles (nombreRol, descripcion, estadoRol) VALUES (?, ?, ?)`,
        [rol.nombreRol, rol.descripcion, rol.estadoRol ? 1 : 0]
      );
  
      return result.affectedRows > 0;
    }
  
    public async addPermiso(permiso: MysqlPermiso): Promise<boolean> {
      const result = await this.db.executeQuery(
        `INSERT INTO BuenaVista_Permisos (nombrePermiso, tipo, estadoPermiso) VALUES (?, ?, ?)`,
        [permiso.nombrePermiso, permiso.tipo, permiso.estadoPermiso ? 1 : 0]
      );
  
      return result.affectedRows > 0;
    }
  
    public async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
      const permiso = await this.db.executeQuery(
        `SELECT idPermiso FROM BuenaVista_Permisos WHERE nombrePermiso = ?`,
        [namePermiso]
      );
  
      if (!permiso || permiso.length === 0) {
        throw new Error("Permiso no encontrado.");
      }
  
      const result = await this.db.executeQuery(
        `INSERT INTO BuenaVista_Roles_Permisos (idRol, idPermisos) VALUES (?, ?)`,
        [idRol, permiso[0].idPermiso]
      );
  
      return result.affectedRows > 0;
    }
  
    public async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
      const permiso = await this.db.executeQuery(
        `SELECT idPermiso FROM BuenaVista_Permisos WHERE nombrePermiso = ?`,
        [namePermiso]
      );
  
      if (!permiso || permiso.length === 0) {
        throw new Error("Permiso no encontrado.");
      }
  
      const result = await this.db.executeQuery(
        `DELETE FROM BuenaVista_Roles_Permisos WHERE idRol = ? AND idPermisos = ?`,
        [idRol, permiso[0].idPermiso]
      );
  
      return result.affectedRows > 0;
    }
}
  




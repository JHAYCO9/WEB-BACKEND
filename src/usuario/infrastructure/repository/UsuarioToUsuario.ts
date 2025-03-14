import { Usuario } from "../../../usuario/domain/usuario/Usuario";
import { MysqlUsuario } from "../../../mysql/domain/usuario/MySQLUsuario";
import JWTUser from "../../../jwt/domain/interfaces/JwtUser";


export default class MysqlUsuariosToUsuarios {


  public getArray = (usuarios: MysqlUsuario[]): Promise<Usuario[]> => {
    const usuariosTransformados = usuarios.map(async (usuario) => {
      return new Usuario({
        ci: usuario.ci,
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario,
        correoUsuario: usuario.correoUsuario,
        contrasenaUsuario: usuario.contrasenaUsuario,
        estadoUsuario: usuario.estadoUsuario,
        rolUsuario: usuario.rol
      });
    });

    return Promise.all(usuariosTransformados);
  };

  public get = (usuario: MysqlUsuario): Promise<Usuario> => {
    return Promise.resolve(
      new Usuario({
        ci: usuario.ci,
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario,
        correoUsuario: usuario.correoUsuario,
        contrasenaUsuario: usuario.contrasenaUsuario,
        estadoUsuario: usuario.estadoUsuario,
        rolUsuario: usuario.rol
      }));

  };

  public teg = (usuario: Usuario): Promise<MysqlUsuario> => {
    const mysqlUser: MysqlUsuario = {
      ci: usuario.getCi(),
      nombreUsuario: usuario.getNombreUsuario(),
      apellidoUsuario: usuario.getApellidoUsuario(),
      correoUsuario: usuario.getCorreoUsuario(),
      contrasenaUsuario: usuario.getContrasenaUsuario(),
      estadoUsuario: usuario.getEstadoUsuario(),
      rol: usuario.getRolUsuario()
    };

    return Promise.resolve(mysqlUser);
  };

  public fromJWTUserToUsuario = (jwtUser: JWTUser): Promise<Usuario> => {
    return Promise.resolve(
      new Usuario({
        ci: jwtUser.ci,
        nombreUsuario: "",  // No está en JWTUser, puedes obtenerlo de otro lado si es necesario
        apellidoUsuario: "",
        correoUsuario: jwtUser.email,
        contrasenaUsuario: "", // No se incluye en JWTUser por seguridad
        estadoUsuario: true, // Asumimos que está activo por defecto
        rolUsuario: jwtUser.idRol
      })
    );
  };


}



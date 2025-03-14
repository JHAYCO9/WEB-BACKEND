import { Permiso } from "../../../roles/interface/PermisoInterface"
import { Rol } from "../../../roles/interface/RolInterface"
import { Usuario } from "../../../usuario/interface/UsuarioInterface"

export default interface RolDriverPort{
    getRolPermiso(user:Usuario): boolean
    getRoles():Rol
    getPermiso():Permiso[]
}

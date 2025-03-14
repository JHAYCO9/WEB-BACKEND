import { Usuario } from "../../../usuario/interface/UsuarioInterface"

export default interface AuthDriverPort{
  login(usuario:string, pwd: string): string // devolvera token logeo
  register(usuario: Usuario): string //devolvera el token
  logout(token:string): boolean
  detokenize(token:string ):void
} 
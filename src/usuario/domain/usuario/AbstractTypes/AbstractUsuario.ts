import { Usuario } from "../interface/UsuarioInterface";

export default abstract class AbstractUsuario {
  protected ci: string;
  protected nombreUsuario: string;
  protected apellidoUsuario: string;
  protected correoUsuario: string;
  protected contrasenaUsuario: string;
  protected estadoUsuario: boolean;
  protected rolUsuario: number;

  constructor(usuarioAttributes: Usuario) {
    this.ci = usuarioAttributes.ci;
    this.nombreUsuario =usuarioAttributes.nombreUsuario;
    this.apellidoUsuario = usuarioAttributes.apellidoUsuario;
    this.correoUsuario = usuarioAttributes.correoUsuario;
    this.contrasenaUsuario = usuarioAttributes.contrasenaUsuario; 
    this.estadoUsuario = usuarioAttributes.estadoUsuario;
    this.rolUsuario = usuarioAttributes.rolUsuario;

  }

  public abstract isNull(): boolean;
  public abstract toString(): string;

  //Getters -----------------------------------
  public getCi(): string {
    return this.ci;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  public getApellidoUsuario(): string {
    return this.apellidoUsuario;
  }

  public getCorreoUsuario(): string {
    return this.correoUsuario;
  }

  public getContrasenaUsuario(): string {
    return this.contrasenaUsuario;
  }

  public getEstadoUsuario(): boolean {
    return this.estadoUsuario;
  }

  public getRolUsuario(): number {
    return this.rolUsuario;
  }



  //Setters con validaciones -------------------
  public setCi(ci: string): void {
    if(this.validateCi(ci)) {
      console.error('El CI debe contener solo números.')
      return
  }
    this.ci = ci;
  }

  public setNombreUsuario(nombre: string): void {
    if(this.validateString(nombre, 2, 30)) {
      console.error(`Verificar Nombre del usuario`)
      return
  }
    this.nombreUsuario = nombre;
  }

  public setApellidoUsuario(apellido: string): void {
    if(this.validateString(apellido, 2, 25)) {
      console.error(`Verificar Apellido del usuario`)
      return
  }
    this.apellidoUsuario = apellido;
  }

  public setCorreoUsuario(correo: string): void {
    if(this.validateEmail(correo)) {
      console.error('Correo no valido')
      return
  }
    this.correoUsuario = correo;
  }

  // TODO: Verificar contraseñas encriptadas
  public setContrasenaUsuario(contrasena: string): void {
    this.contrasenaUsuario = contrasena; 
  }

  public setEstadoUsuario(estado: boolean): void {
    this.estadoUsuario = estado;
  }

  public setRolUsuario(rol: number): void {
    this.rolUsuario = rol;
  }


  //Validación ---------------------
  private readonly validateCi = (ci: string): boolean => !/^\d+$/.test(ci);

  private readonly validateEmail = (email: string): boolean => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regexCorreo.test(email);
  };
  /*
  private validateArray= (objeto: AbstractCarrito[]| AbstractFavoritos[]): boolean =>
    !Array.isArray(objeto)
  */

  private readonly validateString = (value: string, min: number, max: number): boolean =>
    value === '' || value.length > max || value.length < min  

}

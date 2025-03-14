import AbstractUsuario from '../AbstractTypes/AbstractUsuario';

export default class NullUsuario extends AbstractUsuario {
  public override isNull(): boolean {
    return true;
  }
  constructor() {
    super({
      ci: '',
      nombreUsuario: '',
      apellidoUsuario: '',
      correoUsuario: '',
      contrasenaUsuario: '',
      estadoUsuario: false,
      rolUsuario: 0,
    });
  }


    public override setCi(_ci: string): void { return }
    public override setNombreUsuario(_nombre: string): void { return }
    public override setApellidoUsuario(_apellido: string): void { return }
    public override setCorreoUsuario(_correo: string): void { return }
    public override setContrasenaUsuario(_contrasena: string): void { return }
    public override setEstadoUsuario(_estado: boolean): void { return }
    public override setRolUsuario(_rol: number): void { return }


    public toString(): string {
        return `NullUsuario {
            ci: "0000000000",
            nombreUsuario: "N/A",
            apellidoUsuario: "N/A",
            correoUsuario: "N/A",
            estadoUsuario: false,
            rolUsuario:' 0 ',

        }`;
    }
}



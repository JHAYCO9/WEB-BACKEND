import AbstractRol from './AbstractTypes/AbstractRol';

/**
 * Concrete implementation of the AbstractRol class.
 * This class represents a valid role in the authentication system.
 * Unlike NullRol, this class represents an actual role with valid data.
 * 
 * @extends AbstractRol
 */
export class Rol extends AbstractRol {
  /**
   * Determines if this role is a null object.
   * This implementation always returns false since this is a valid role object.
   * 
   * @returns {boolean} Always returns false
   * @override
   */
  public isNull = (): boolean => {
    return false; // This object is not null.
  };

  /**
   * Returns a string representation of the role.
   * The representation includes the role's ID, name, and a list of its permissions.
   * Each permission is represented by its own toString() method.
   * 
   * @returns {string} A string representation of this role
   * @override
   */
  public override toString(): string {
    return `Rol {
        idRol: ${this.idRol},
        nombreRol: "${this.nombreRol}",
        permisos: [${this.permisos.map(p => p.toString()).join(", ")}]
    }`;
  }
}

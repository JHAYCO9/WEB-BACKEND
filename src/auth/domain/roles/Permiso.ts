import AbstractPermiso from './AbstractTypes/AbstractPermiso';

/**
 * Concrete implementation of the AbstractPermiso class.
 * This class represents a valid permission in the authentication system.
 * Unlike NullPermiso, this class represents an actual permission with valid data.
 * 
 * @extends AbstractPermiso
 */
export class Permiso extends AbstractPermiso {
  /**
   * Determines if this permission is a null object.
   * This implementation always returns false since this is a valid permission object.
   * 
   * @returns {boolean} Always returns false
   * @override
   */
  public isNull = (): boolean => {
    return false; // This object is not null.
  };

  /**
   * Returns a string representation of the permission.
   * The representation includes the permission's ID, name, and description.
   * 
   * @returns {string} A string representation of this permission
   * @override
   */
  public override toString(): string {
    return `Permiso {
        idPermiso: ${this.idPermiso},
        nombrePermiso: "${this.nombrePermiso}",
        descripcionPermiso: "${this.descripcionPermiso}",
    }`;
  }
}

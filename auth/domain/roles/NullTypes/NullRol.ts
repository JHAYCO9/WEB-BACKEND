import AbstractPermiso from '../AbstractTypes/AbstractPermiso';
import AbstractRol from '../AbstractTypes/AbstractRol';
import NullPermiso from './NullPermiso';

/**
 * Implementation of the Null Object pattern for roles.
 * This class represents a null or invalid role object that can be used
 * instead of null references to avoid null pointer exceptions.
 * 
 * The NullRol always identifies itself as null through the isNull() method,
 * ignores any attempts to modify its state, and provides default "N/A" values
 * in its string representation.
 * 
 * @extends AbstractRol
 */
export default class NullRol extends AbstractRol {
  /**
   * Identifies this object as a null role.
   * This method always returns true for NullRol instances.
   * 
   * @returns {boolean} Always returns true
   * @override
   */
  public override isNull(): boolean {
    return true;
  }
  
  /**
   * Creates a new NullRol instance with default values.
   * All properties are initialized with empty or zero values,
   * and permissions are set to contain a single NullPermiso.
   */
  constructor() {
    super({
      idRol: 0,
      nombreRol: '',
      permisos: [new NullPermiso()]
    });
  }

  /**
   * Overrides the setIdRol method to do nothing.
   * This prevents modification of the null object's state.
   * 
   * @param {number} _id - The ID parameter (ignored)
   * @override
   */
  public override setIdRol(_id: number): void { return }
  
  /**
   * Overrides the setNombreRol method to do nothing.
   * This prevents modification of the null object's state.
   * 
   * @param {string} _nombre - The name parameter (ignored)
   * @override
   */
  public override setNombreRol(_nombre: string): void { return }
  
  /**
   * Overrides the setPermisos method to do nothing.
   * This prevents modification of the null object's state.
   * 
   * @param {AbstractPermiso[]} _permisos - The permissions array (ignored)
   * @override
   */
  public override setPermisos(_permisos: AbstractPermiso[]): void { return }

  /**
   * Returns a string representation of the null role.
   * The representation uses "N/A" for string fields, 0 for numeric fields,
   * false for boolean fields, and includes string representations of any permissions.
   * 
   * @returns {string} A string representation of this null role
   * @override
   */
  public toString(): string {
      return `NullRol {
          idRol: 0,
          nombreRol: "N/A",
          descripcionRol: "N/A",
          estadoRol: false,
          permisos: [${this.permisos.map(p => p.toString()).join(", ")}]
      }`;
  }
}
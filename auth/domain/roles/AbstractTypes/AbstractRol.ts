import { Rol } from "../interface/RolInterface";
import AbstractPermiso from "./AbstractPermiso";

/**
 * Abstract base class for role objects in the authentication system.
 * This class defines the common structure and behavior for all role types,
 * providing validation, getters, and setters for role attributes.
 * 
 * Concrete implementations must define the isNull and toString methods.
 */
export default abstract class AbstractRol {
  /**
   * The unique identifier for the role.
   */
  protected idRol: number;
  
  /**
   * The name of the role.
   * Must be between 2 and 25 characters.
   */
  protected nombreRol: string;
  
  /**
   * The collection of permissions associated with this role.
   */
  protected permisos: AbstractPermiso[];

  /**
   * Creates a new AbstractRol instance.
   * 
   * @param {Rol} rolAttributes - The attributes to initialize the role with
   */
  constructor(rolAttributes: Rol) {
    this.idRol = rolAttributes.idRol;
    this.nombreRol = rolAttributes.nombreRol;
    this.permisos = rolAttributes.permisos;
  }

  /**
   * Determines if this role is a null object.
   * Implementations should return true if the role represents a null or invalid state.
   * 
   * @returns {boolean} True if this is a null role, false otherwise
   */
  public abstract isNull(): boolean;
  
  /**
   * Returns a string representation of the role.
   * 
   * @returns {string} A string representation of this role
   */
  public abstract toString(): string;

  //Getters -----------------------------------
  /**
   * Gets the role's unique identifier.
   * 
   * @returns {number} The role ID
   */
  public getIdRol(): number {
    return this.idRol;
  }

  /**
   * Gets the role's name.
   * 
   * @returns {string} The role name
   */
  public getNombreRol(): string {
    return this.nombreRol;
  }

  /**
   * Gets the permissions associated with this role.
   * 
   * @returns {AbstractPermiso[]} Array of permissions assigned to this role
   */
  public getPermisos(): AbstractPermiso[] {
    return this.permisos;
  }

  //Setters con validaciones -------------------
  /**
   * Sets the role's ID after validation.
   * The ID must be a positive number.
   * 
   * @param {number} id - The ID to set
   */
  public setIdRol(id: number): void {
    if(this.validateNumber(id,0)){
      return
    }
    this.idRol = id;
  }

  /**
   * Sets the role's name after validation.
   * The name must be between 2 and 25 characters.
   * 
   * @param {string} nombre - The name to set
   */
  public setNombreRol(nombre: string): void {
    if(this.validateString(nombre, 2, 25)){
      return
    }
    this.nombreRol = nombre;
  }

  /**
   * Sets the permissions associated with this role after validation.
   * The value must be a valid array of AbstractPermiso objects.
   * 
   * @param {AbstractPermiso[]} permisos - The permissions to assign to this role
   */
  public setPermisos(permisos: AbstractPermiso[]): void {
    if(this.validateArray(permisos)){
      return
    }
    this.permisos = permisos;
  }

  //Validación ---------------------
  /**
   * Validates that the provided value is a valid array of permissions.
   * 
   * @param {AbstractPermiso[]} permisos - The permissions array to validate
   * @returns {boolean} True if validation fails, false if validation passes
   * @private
   */
  private readonly validateArray = (permisos : AbstractPermiso[]): boolean => 
    !Array.isArray(permisos) ;

  /**
   * Validates that a number is greater than or equal to the specified minimum.
   * 
   * @param {number} value - The number to validate
   * @param {number} min - The minimum allowed value (default: 1)
   * @returns {boolean} True if validation fails, false if validation passes
   * @private
   */
  private readonly validateNumber = (value: number, min: number = 1): boolean => 
    value < min || isNaN(value);

  /**
   * Validates that a string's length is within the specified range.
   * 
   * @param {string} value - The string to validate
   * @param {number} min - The minimum allowed length
   * @param {number} max - The maximum allowed length
   * @returns {boolean} True if validation fails, false if validation passes
   * @private
   */
  private readonly validateString = (value: string, min: number, max: number): boolean =>
      value === '' || value.length > max || value.length < min   
}

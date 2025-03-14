import { Permiso } from "../interface/PermisoInterface";

/**
 * Abstract base class for permission objects in the authentication system.
 * This class defines the common structure and behavior for all permission types,
 * providing validation, getters, and setters for permission attributes.
 * 
 * Concrete implementations must define the isNull and toString methods.
 */
export default abstract class AbstractPermiso {
    /**
     * The unique identifier for the permission.
     */
    protected idPermiso: number;
    
    /**
     * The name of the permission.
     * Must be between 3 and 10 characters.
     */
    protected nombrePermiso: string;
    
    /**
     * The description of the permission.
     * Must be between 2 and 25 characters.
     */
    protected descripcionPermiso: string;

    /**
     * Creates a new AbstractPermiso instance.
     * 
     * @param {Permiso} permisoAttributes - The attributes to initialize the permission with
     */
    constructor(permisoAttributes: Permiso) {
        this.idPermiso = permisoAttributes.idPermiso;
        this.nombrePermiso = permisoAttributes.nombrePermiso;
        this.descripcionPermiso = permisoAttributes.descripcionPermiso;
    }

    /**
     * Determines if this permission is a null object.
     * Implementations should return true if the permission represents a null or invalid state.
     * 
     * @returns {boolean} True if this is a null permission, false otherwise
     */
    public abstract isNull(): boolean;
    
    /**
     * Returns a string representation of the permission.
     * 
     * @returns {string} A string representation of this permission
     */
    public abstract toString(): string;

    //Getters -----------------------------------
    /**
     * Gets the permission's unique identifier.
     * 
     * @returns {number} The permission ID
     */
    public getIdPermiso(): number {
        return this.idPermiso;
    }

    /**
     * Gets the permission's name.
     * 
     * @returns {string} The permission name
     */
    public getNombrePermiso(): string {
        return this.nombrePermiso;
    }

    /**
     * Gets the permission's description.
     * 
     * @returns {string} The permission description
     */
    public getdescripcionPermiso(): string {
        return this.descripcionPermiso;
    }


    //Setters con validaciones -------------------
    /**
     * Sets the permission's ID after validation.
     * The ID must be a positive number.
     * 
     * @param {number} id - The ID to set
     */
    public setIdPermiso(id: number): void {        
        if(this.validateNumber(id,0)){
            return
        }
        this.idPermiso = id;
    }

    /**
     * Sets the permission's name after validation.
     * The name must be between 3 and 10 characters.
     * 
     * @param {string} nombre - The name to set
     */
    public setNombrePermiso(nombre: string): void {
        if(this.validateString(nombre,3,10)){
            return
        }
        this.nombrePermiso = nombre;
    }

    /**
     * Sets the permission's description after validation.
     * The description must be between 2 and 25 characters.
     * 
     * @param {string} descripcionPermiso - The description to set
     */
    public setdescripcionPermiso(descripcionPermiso: string): void {
        if(this.validateString(descripcionPermiso,2,25)){
            return
        }
        this.descripcionPermiso = descripcionPermiso;
    }


    //Validación ---------------------
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

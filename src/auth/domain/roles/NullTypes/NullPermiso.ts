import AbstractPermiso from "../AbstractTypes/AbstractPermiso";
/**
 * Implementation of the Null Object pattern for permissions.
 * This class represents a null or invalid permission object that can be used
 * instead of null references to avoid null pointer exceptions.
 * 
 * The NullPermiso always identifies itself as null through the isNull() method,
 * ignores any attempts to modify its state, and provides default "N/A" values
 * in its string representation.
 * 
 * @extends AbstractPermiso
 */
export default class NullPermiso extends AbstractPermiso {
    /**
     * Creates a new NullPermiso instance with default values.
     * All properties are initialized with empty or zero values.
     */
    constructor() {
        super({
        idPermiso: 0,
        nombrePermiso: '',
        descripcionPermiso: ''
        });
    }

    /**
     * Identifies this object as a null permission.
     * This method always returns true for NullPermiso instances.
     * 
     * @returns {boolean} Always returns true
     * @override
     */
    public override isNull(): boolean {
        return true;
    }

    /**
     * Overrides the setIdPermiso method to do nothing.
     * This prevents modification of the null object's state.
     * 
     * @param {number} _id - The ID parameter (ignored)
     * @override
     */
    public override setIdPermiso(_id: number): void { return }
    
    /**
     * Overrides the setNombrePermiso method to do nothing.
     * This prevents modification of the null object's state.
     * 
     * @param {string} _nombre - The name parameter (ignored)
     * @override
     */
    public override setNombrePermiso(_nombre: string): void { return }

    /**
     * Returns a string representation of the null permission.
     * The representation uses "N/A" for string fields and 0 for numeric fields.
     * 
     * @returns {string} A string representation of this null permission
     * @override
     */
    public toString(): string {
        return `NullPermiso {
            idPermiso: 0,
            nombrePermiso: "N/A",
            descripcion: "N/A",
        }`;
    }
}
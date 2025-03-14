/**
 * BycriptInterface defines the contract for password encryption and comparison.
 */
export default interface BycriptInterface{
    /**
     * @method encyptPwd
     * Encrypts a plain text password.
     * 
     * @param {string} pwd - The plain text password to be encrypted.
     * @returns {Promise<string>} - A promise that resolves to the hashed password.
     */
    encyptPwd(pwd:string): Promise<string> ;

    /**
     * @method comparetPwd
     * Compares a plain text password with a hashed password to verify if they match.
     * 
     * @param {string} pwd - The plain text password to compare.
     * @param {string} hash - The hashed password to compare against.
     * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
     */
    comparetPwd(pwd: string, hash: string): Promise<boolean> ;
}
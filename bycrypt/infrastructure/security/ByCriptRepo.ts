/**
 * ByCriptRepo is a class that implements the BycriptInterface for handling password encryption and comparison using bcrypt.
 */
import bcrypt from "bcrypt";
import BycriptInterface from "../../domain/interfaces/BycriptInterface";

/**
 * @implements BycriptInterface
 */
export default class ByCriptRepo implements BycriptInterface{
    /**
     * @property {number} RAMDOM_STATE - A static constant used as the salt rounds for hashing.
     */
    private static readonly RAMDOM_STATE = 10;

    /**
     * @property {number} RAMDOM_STATE - A static constant used as the salt rounds for hashing.
     * 
     * @method encyptPwd
     * Encrypts a plain text password using bcrypt.
     * 
     * @param {string} pwd - The plain text password to be encrypted.
     * @returns {Promise<string>} - A promise that resolves to the hashed password.
     */
    public async encyptPwd(pwd: string): Promise<string> {
        return bcrypt.hash(pwd, ByCriptRepo.RAMDOM_STATE);
    }
    /**
     * @method comparetPwd
     * Compares a plain text password with a hashed password to verify if they match.
     * 
     * @param {string} pwd - The plain text password to compare.
     * @param {string} hash - The hashed password to compare against.
     * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
     */
    public async comparetPwd(pwd: string, hash:string): Promise<boolean> {
        return bcrypt.compare(pwd, hash);
    }
    
}
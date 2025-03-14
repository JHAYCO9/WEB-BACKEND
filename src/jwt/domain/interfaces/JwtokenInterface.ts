import JWTUser from "./JwtUser";

/**
 * JwtInterface defines the contract for handling JSON Web Tokens (JWT).
 */
export default interface JwtInterface {
    /**
     * @method generateToken
     * Creates a new JWT with a given payload and optional expiration.
     * @param {JWTUser} payload - The data to be encoded in the token.
     * @param {JWTUser} [options] - Optional settings such as expiration time.
     * @returns {Promise<string>} - A promise that resolves to the generated JWT string.
     */
    generateToken(payload: JWTUser): Promise<string>;
    /**
     * 
     * @method verifyToken
     * Verifies the validity of a given JWT.
     * 
     * @param {string} token - The JWT string to verify.
     * @returns {Promise<JWTUser>} - A promise that resolves to the decoded payload if the token is valid.
     */
    verifyToken(token: string): Promise<JWTUser>;
    /**
     * @method decodeToken
     * Decodes a JWT without verifying its signature.
     * 
     * @param {string} token - The JWT string to decode.
     * @returns {JWTUser} - The decoded payload.
     */
    decodeToken(token: string): Promise<JWTUser>;
}

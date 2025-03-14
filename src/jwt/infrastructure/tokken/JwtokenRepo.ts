import jwt from 'jsonwebtoken';
import JwtInterface from '../../domain/interfaces/JwtokenInterface';
import JWTProvider from '../provider/JwtProvider';
import JWTUser from '../../domain/interfaces/JwtUser';

/**
 * JwtRepo is a class that implements the JwtInterface for handling JSON Web Tokens (JWT).
 * 
 * @implements JwtInterface
 */
export default class JwtRepo implements JwtInterface {
    private readonly secretKey: string;

    constructor() {
        this.secretKey = JWTProvider.getSECRET_KEY();
    }

    /**
     * Creates a new JWT with a given payload and optional expiration.
     * 
     * @param {JWTUser} payload - The data to be encoded in the token.
     * @param {JWTUser} [options] - Optional settings such as expiration time.
     * @returns {Promise<string>} - A promise that resolves to the generated JWT string.
     */
    public async generateToken(payload: JWTUser): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secretKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token as string);
                }
            });
        });
    }

    /**
     * Verifies the validity of a given JWT.
     * 
     * @param {string} token - The JWT string to verify.
     * @returns {Promise<JWTUser>} - A promise that resolves to the decoded payload if the token is valid.
     */
    public async verifyToken(token: string): Promise<JWTUser> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded as JWTUser);
                }
            });
        });
    }

    /**
     * Decodes a JWT without verifying its signature.
     * 
     * @param {string} token - The JWT string to decode.
     * @returns {JWTUser} - The decoded payload.
     */

    public async decodeToken(token: string): Promise<JWTUser> {
        const decoded = jwt.decode(token);

        if (!decoded) {
            return Promise.resolve({ ci: '', email: '', idRol: 0 }); // Retorna una interfaz vacía en caso de error
        }

        return Promise.resolve(decoded as JWTUser);
    }

} 
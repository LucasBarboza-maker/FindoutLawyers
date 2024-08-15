import { ENV } from '@/server/config/env';
import bcryptjs from 'bcryptjs';

/**
 * @description encrypt a text with salt
 * @param {String} text
 * @param {Number} [length=10]
 */

export async function Encrypt_CryptSalt(
    text: string,
    length = 10
): Promise<string> {
    const salt = await bcryptjs.genSalt(length);
    const hashPassword = await bcryptjs.hash(text, salt);
    return hashPassword;
}

/**
 * @desc Compare the cipher
 * Likely the hash can be the encrypted password and text the password from client
 */

export async function Encrypt_CompareSalt(
    text: string,
    hash: string
): Promise<boolean> {
    const compare = await bcryptjs.compare(text, hash);
    return compare;
}

/**
 * @description unique identifier for the token
 */

export function Encrypt_GenerateJTI() {
    let jti = '';
    let possibleCharset =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
        jti += possibleCharset.charAt(
            Math.floor(Math.random() * possibleCharset.length)
        );
    }

    return jti;
}

/**
 * @description generates a unique ID for stripe
 */

export async function Encrypt_GenerateHash(useSecret = false) {
    const jti = Encrypt_GenerateJTI();
    const timeout = gen_date_code(16);
    const secret = ENV.ROLE_SECRET;
    return `${jti}_${timeout}`;
}

export function Encrypt_GenerateHashSecret(hash: string) {
    const secret = ENV.ROLE_SECRET;
    return `${hash}.${secret}`;
}

/**
 * @description generates unique code
 */

export function gen_date_code(radix = 16): string {
    return Date.now().toString(radix);
}

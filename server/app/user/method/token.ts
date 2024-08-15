import { Encrypt_GenerateJTI } from '@/libraries/utils/encrypt';
import { ENV } from '@/server/config/env';
import jwt from 'jsonwebtoken';

/**
 * @description create the user access token
 */

export function User_Method_CreateAccessToken(): string {
   const secret = !!ENV.JWT_SECRET ? ENV.JWT_SECRET : '';
   const sign: string = jwt.sign(
      {
         exp: Math.floor(Date.now() / 1000) + 60 * 60,
         sub: 'lalaland|gonto',
         jti: Encrypt_GenerateJTI(),
         alg: 'HS256',
      },
      secret
   );
   return sign;
}

/**
 * @description create user token
 * @param {String} email from user
 */

export function User_Method_CreateToken(email: string): string {
   const secret = !!ENV.JWT_SECRET ? ENV.JWT_SECRET : '';
   const sign = jwt.sign({ email }, secret, { expiresIn: 604800 });
   return sign;
}

/**
 * @description verify the token
 */

interface UserMethodVerifyTokenResult {
   email: string;
}

export async function User_Method_VerifyToken(
   token: string
): Promise<UserMethodVerifyTokenResult | null> {
   const secret = !!ENV.JWT_SECRET ? ENV.JWT_SECRET : '';
   const decodedToken = jwt.verify(token, secret) as Record<any, any>;
   return decodedToken && decodedToken.email ? {
      email: decodedToken.email
   } : null;
}

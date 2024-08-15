import { ENV } from '../env';

/**
 * ! important to when developing in mod test, use the 'PUBLIC' version.
 */

const PSTRIPE_KEY_LOCAL = ENV.STRIPE_PUBLIC_DEV_KEY;
const PSTRIPE_KEY_PROD = ENV.STRIPE_PUBLIC_PROD_KEY;
export const PSTRIPE_KEY = PSTRIPE_KEY_PROD;

const SSTRIPE_KEY_LOCAL = ENV.STRIPE_SECRET_DEV_KEY;
const SSTRIPE_KEY_PROD = ENV.STRIPE_SECRET_PROD_KEY;
export const SSTRIPE_KEY = SSTRIPE_KEY_PROD;

/**
 * @description references to the DOMAIN of 'success' and 'error'.
 */

const STRIPE_WEBOOK_DEV ='Hey whatcha doing here?'
const STRIPE_WEBOOK_PROD = ENV.STRIPE_WEBHOOK_PROD;

export const STRIPE_WEBOOK = STRIPE_WEBOOK_PROD;

/**
 * @description references to the DOMAIN of 'success' and 'error'.
 * ! DEV: http://localhost:3000
 * ? BUILD: https://findoutlawyers.vercel.app
 */

const STRIPE_DOMAIN_LOCAL = 'http://localhost:3000';
const STRIPE_DOMAIN_PROD = 'https://findoutlawyers.com';

export const STRIPE_DOMAIN = STRIPE_DOMAIN_PROD;

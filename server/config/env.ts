/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import dotenv from 'dotenv';
dotenv.config();

/*
:--------------------------------------------------------------------------
: ENVs Variables
:--------------------------------------------------------------------------
*/

export const ENV = {
    /**
     * Domain variables
     */

    DOMAIN_PORT: process.env.DOMAIN_PORT,
    DOMAIN_LOCAL_PORT: process.env.DOMAIN_LOCAL_PORT,
    DOMAIN_HOST: process.env.DOMAIN_HOST,
    DOMAIN_LOCAL_HOST: process.env.DOMAIN_LOCAL_HOST,

    /**
     * Deployment
     */

    NODE_ENV: process.env.NODE_ENV,
    PRODUCTION: process.env.PRODUCTION,
    BUNDLE_ANALIZE: process.env.BUNDLE_ANALIZE,
    ONLY_SERVER: process.env.ONLY_SERVER,

    /**
     * Redis
     */
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,

    /**
     * Secrets
     */
    JWT_SECRET: process.env.JWT_SECRET,
    ROLE_SECRET: process.env.ROLE_SECRET,

    /**
     * Email
     */

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_SMTP_SERVER: process.env.EMAIL_SMTP_SERVER,
    EMAIL_SMTP_PORT: process.env.EMAIL_SMTP_PORT,
    EMAIL_MAIN_ACCOUNT: process.env.EMAIL_MAIN_ACCOUNT,

    /**
     * Stripe
     */

    STRIPE_PUBLIC_DEV_KEY: process.env.STRIPE_PUBLIC_DEV_KEY || '',
    STRIPE_SECRET_DEV_KEY: process.env.STRIPE_SECRET_DEV_KEY || '',
    STRIPE_PUBLIC_PROD_KEY: process.env.STRIPE_PUBLIC_PROD_KEY || '',
    STRIPE_SECRET_PROD_KEY: process.env.STRIPE_SECRET_PROD_KEY || '',
    STRIPE_WEBHOOK_PROD: process.env.STRIPE_WEBHOOK_PROD || '',
};

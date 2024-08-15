/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import StripeBootstraper, { Stripe } from 'stripe';
import { SSTRIPE_KEY } from '.';

/*
:--------------------------------------------------------------------------
: Default Config
:--------------------------------------------------------------------------
*/

declare global {
    namespace NodeJS {
        interface Global {
            stripe: Stripe;
        }
    }
}

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

const stripe: Stripe =
    global.stripe ||
    new StripeBootstraper(SSTRIPE_KEY || '', {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'findoutlawyers',
            version: '0.1.0',
        },
    });

if (process.env.NODE_ENV === 'development') global.stripe = stripe;

export { stripe };

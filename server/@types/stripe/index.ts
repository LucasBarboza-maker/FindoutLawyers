import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

export type StripeWebhookEventHandlerProps = {
    prisma: PrismaClient;
    event: Stripe.Event;
};

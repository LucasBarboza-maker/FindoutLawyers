import { STRIPE_PRODUCT_PROMOTION_TYPE } from '@/server/config/stripe/sign';
import { FastifySchema } from 'fastify';

export type BodySchema = {
    product: STRIPE_PRODUCT_PROMOTION_TYPE;
    cancel_url?: string;
    success_url?: string;
};

export const schema: FastifySchema = {
    body: {
        type: ['object', 'string'],
        properties: {
            product: {
                type: 'string',
                enum: ['BANNER', 'SEARCH'],
            },
        },
        required: ['product'],
    },
    headers: {
        type: 'object',
        properties: {
            'x-user-token': {
                type: 'string',
            },
        },
        required: ['x-user-token'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                success_url: { type: 'string' },
                cancel_url: { type: 'string' },
            },
        },
    },
};

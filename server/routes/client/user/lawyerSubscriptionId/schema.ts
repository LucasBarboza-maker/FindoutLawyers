import { FastifySchema } from 'fastify';

export type BodySchema = {
    lawyerSubscriptionId?: string;
    lawyerOrdemUrl?: string;
};

export const schema: FastifySchema = {
    headers: {
        type: 'object',
        properties: {
            'x-user-token': {
                type: 'string',
            },
        },
        required: ['x-user-token'],
    },
};

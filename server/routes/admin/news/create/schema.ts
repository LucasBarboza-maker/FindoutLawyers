import { FastifySchema } from 'fastify';

export type BodySchema = {
    title: string;
    source: string;
    description: string;
    link: string;
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

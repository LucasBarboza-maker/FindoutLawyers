import { FastifySchema } from 'fastify';

export type BodySchema = {
    ids: string[];
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
    body: {
        type: ['object', 'string'],
        required: ['ids'],
        properties: {
            ids: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
        },
    },
};

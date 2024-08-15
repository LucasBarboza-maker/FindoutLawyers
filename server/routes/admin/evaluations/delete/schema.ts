import { FastifySchema } from 'fastify';

export type QuerySchema = {
    id: string;
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
    querystring: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
        },
        required: ['id'],
    },
};

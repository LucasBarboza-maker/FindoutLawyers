import { FastifySchema } from 'fastify';

export type QuerySchema = {
    pageIndex?: number;
    perPage?: number;
    name?: string;
    surname?: string;
    email?: string;
    country?: string;
    city?: string;
    state?: string;
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
            pageIndex: {
                type: 'integer',
                minimum: 0,
            },
            perPage: {
                type: 'integer',
                minimum: 1,
            },
        },
    },
};

import { FastifySchema } from 'fastify';

export type QuerySchema = {
    pageIndex?: number;
    perPage?: number;
    title?: string;
    source?: string;
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
                type: 'number',
            },
            perPage: {
                type: 'number',
            },
            title: {
                type: 'string',
            },
            source: {
                type: 'string',
            },
        },
    },
};

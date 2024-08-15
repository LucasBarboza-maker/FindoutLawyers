import { FastifySchema } from 'fastify';

export type QuerySchema = {};

export const schema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {},
    },
};

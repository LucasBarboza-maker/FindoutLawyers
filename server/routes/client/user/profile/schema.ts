import { FastifySchema } from 'fastify';

export interface IRouteClient_UserProfile_SchemaQuerystring {
    type: 'complete' | 'basic' | null;
}

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
            type: {
                type: ['string', 'null'],
                enum: ['complete', 'basic'],
            },
        },
    },
};

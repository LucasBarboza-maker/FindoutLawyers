import { FastifySchema } from 'fastify';

export interface IRouteClient_Blog_Create_SchemaQuerystring {
    title: string;
    rawMessage: string;
    description: string;
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
};

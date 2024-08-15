import { FastifySchema } from 'fastify';

export interface IRouteClient_Blog_Edit_SchemaBody {
    id: string;
    title?: string;
    rawMessage?: string;
    tags?: string;
    description?: string;
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

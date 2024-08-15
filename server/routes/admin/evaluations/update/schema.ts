import { FastifySchema } from 'fastify';

export type BodySchema = {
    isChecked: boolean;
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
    body: {
        type: ['object', 'string'],
        properties: {
            id: {
                type: 'string',
            },
            isChecked: {
                type: 'boolean',
            },
        },
        required: ['id', 'isChecked'],
    },
};

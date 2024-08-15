import { FastifySchema } from 'fastify';

export type BodySchema = {
    id: string;
    isChecked?: boolean;
    isBlockedToAccess?: boolean;
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
        required: ['id'],
        properties: {
            id: { type: 'string' },
            isChecked: { type: 'boolean' },
            isBlockedToAccess: { type: 'boolean' },
        },
    },
};

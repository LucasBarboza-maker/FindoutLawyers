import { BannersPage } from '.prisma/client';
import { FastifySchema } from 'fastify';

export type BodySchema = {
    page: BannersPage;
    isVisible?: boolean;
    link?: string;
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
};

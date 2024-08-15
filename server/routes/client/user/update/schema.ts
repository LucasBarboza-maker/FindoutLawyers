import { UserWorkFields } from '.prisma/client';
import { FastifySchema } from 'fastify';

export type BodySchema = {
    name?: string;
    surname?: string;
    contactCellphone?: string;
    contactCity?: string;
    contactState?: string;
    contactCountry?: string;
    lawyerSubscriptionId?: string;
    highlightedWorkFields?: UserWorkFields[];
    workFields?: UserWorkFields[];
    contactEmail?: string;
    contactWebsite?: string;
    description?: string;
    resume?: string;
};

export const schema: FastifySchema = {
    body: {
        type: ['object', 'string'],
        properties: {
            description: { type: 'string' },
            resume: { type: 'string' },
            contactWebsite: { type: 'string' },
            contactCellphone: { type: 'string' },
            name: { type: 'string' },
            contactCity: { type: 'string' },
            contactState: { type: 'string' },
            contactCountry: { type: 'string' },
            lawyerSubscriptionId: { type: 'string' },
            workFields: { type: 'array', items: { type: 'string' } },
            highlightedWorkFields: { type: 'array', items: { type: 'string' } },
        },
    },
};

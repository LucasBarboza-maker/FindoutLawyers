import { FastifySchema } from 'fastify';

export interface IRouteClient_Blog_EditCover_SchemaBody {
   id: string;
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

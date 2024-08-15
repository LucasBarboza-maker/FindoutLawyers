import { FastifySchema } from 'fastify';

export interface IRouteClient_Blog_Delete_SchemaBody {
   id: string;
   password: string;
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
   body: {
      type: ['object', 'string'],
      required: ['id', 'password'],
      properties: {
         id: {
            type: 'string',

         },
         password: {
            type: 'string',
         },
      },
   },
};

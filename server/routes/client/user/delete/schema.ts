import { FastifySchema } from 'fastify';

export interface IRouteClient_UserDelete_SchemaBody {
   password: string;
   checkPassword: string;
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
      required: ['password'],
      properties: {
         password: {
            type: 'string'
         },
      }
   }
};

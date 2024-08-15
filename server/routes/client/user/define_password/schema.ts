import { FastifySchema } from 'fastify';

export interface IRouteClient_UserDefinePassword_SchemaBody {
   password: string;
   checkPassword: string;
   oldPassword: string;
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
      required: ['password', 'checkPassword', 'oldPassword'],
      properties: {
         password: {
            type: 'string'
         },
         checkPassword: {
            type: 'string'
         },
         oldPassword: {
            type: 'string'
         }
      }
   }
};

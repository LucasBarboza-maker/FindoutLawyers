import { FastifySchema } from 'fastify';

export interface IRouteAdmin_User_Delete_SchemaBody {
   emails: string[];
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
      required: ['emails', 'password'],
      properties: {
         emails: {
            type: 'array',
            items: {
               type: 'string',
               format: 'email',
            },
         },
         password: {
            type: 'string',
         },
      },
   },
};

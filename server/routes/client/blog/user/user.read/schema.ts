import { FastifySchema } from 'fastify';

export interface IRouteBlog_BlogUser_Read_SchemaQuerystring {
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
   querystring: {
      type: 'object',
      required: ['id'],
      properties: {
         id: { type: 'string' }
      },

   },
};

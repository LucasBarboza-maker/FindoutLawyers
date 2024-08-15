import { BlogTopicActionCategory } from '.prisma/client';
import { FastifySchema } from 'fastify';

export interface IRouteBlog_BlogUser_Actions_BodySchema {
   id: string;
   category: BlogTopicActionCategory
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
      required: ['id', 'category'],
      properties: {
         id: { type: 'string' },
         category: { type: 'string', enum: ['NONE', 'LIKE', 'DISLIKE'] }
      },

   },
};

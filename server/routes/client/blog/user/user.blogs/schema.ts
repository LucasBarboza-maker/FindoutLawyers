import { FastifySchema } from 'fastify';

export interface IRouteAdmin_BlogUser_Blogs_SchemaBody {
   pageIndex: number;
   perPage: number;
   title?: string;
   tags?: string[];
   cacheIds: string[]
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
      properties: {
         pageIndex: {
            type: 'integer',
            minimum: 0,
         },
         perPage: {
            type: 'integer',
            minimum: 1,
         },
         cacheIds: {
            type: 'array',
            items: { type: 'string' }
         }
      },
      required: ['pageIndex', 'perPage', 'cacheIds'],
   },
};

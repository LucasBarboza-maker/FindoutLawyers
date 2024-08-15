import { FastifySchema } from 'fastify';

export interface IRouteClient_BlogReplies_Replies_SchemaBody {
   pageIndex: number;
   perPage: number;
   blogId: string;
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
         blogId: {
            type: 'string',
         },
         cacheIds: {
            type: 'array',
            items: { type: 'string' }
         }
      },
      required: ['pageIndex', 'perPage', 'blogId', 'cacheIds'],
   },
};

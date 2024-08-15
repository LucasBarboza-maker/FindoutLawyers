import { FastifySchema } from 'fastify';

export interface IRouteClient_BlogReplies_Create_SchemaBody {
   blogId: string;
   message: string;
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
         message: {
            type: 'string',
         },
         blogId: {
            type: 'string',
         }
      },
      required: ['message', 'blogId'],
   },
};

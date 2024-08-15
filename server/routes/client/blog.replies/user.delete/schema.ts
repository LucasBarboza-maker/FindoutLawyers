import { FastifySchema } from 'fastify';

export interface IRouteClient_BlogReplies_UserDelete_SchemaQuerystring {
   replyId: string;
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
      properties: {

         replyId: {
            type: 'string',
         }
      },
      required: ['replyId'],
   },
};

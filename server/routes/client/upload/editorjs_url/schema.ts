import { FastifySchema } from 'fastify';

export interface IRouteClient_UploadEditorJS_URL_BodyProps {
   imageUrl: string;
}

export const schema: FastifySchema = {
   // headers: {
   //    type: 'object',
   //    properties: {
   //       'x-user-token': {
   //          type: 'string',
   //       },
   //    },
   //    required: ['x-user-token'],
   // },
   body: {
      type: ['object', 'string'],
      required: ['imageUrl'],
      properties: {
         imageUrl: { type: 'string' }
      }
   }
};

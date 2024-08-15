import { UserRole } from '@prisma/client';
import { FastifySchema } from 'fastify';

export interface IRouteClient_UserCheckout_SchemaQuerystring {
   role: UserRole & 'ALL'
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
         role: {
            type: 'string',
            enum: ['ADMIN', 'CLIENT', 'ALL', 'DEVELOPER', 'MODERATOR']
         }
      }
   }
};

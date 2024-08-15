import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status'


export const ReplyUserSystem_ErrorGeneric = (reply: FastifyReply) => reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
   category: 'SYSTEM',
   code: 'USER.ERROR',
   status: false,
   field: 'USER'
} as RouteReplyContext)


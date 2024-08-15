import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status'


export const ReplyBlogSystem_ErrorGeneric = (reply: FastifyReply) => reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
   category: 'SYSTEM',
   code: 'ERROR',
   status: false,
   field: 'BLOG'
} as RouteReplyContext)


import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status'


export const ReplyNewsDB_NotFound = (reply: FastifyReply) => reply.status(HttpStatusCode.NOT_FOUND).send({
   category: 'DB',
   code: 'NOT_FOUND',
   status: false,
   field: 'NEWS'
} as RouteReplyContext)

export const ReplyNewsDB_Created = (reply: FastifyReply) => reply.status(HttpStatusCode.CREATED).send({
   category: 'DB',
   code: 'CREATED',
   status: true,
   field: 'NEWS'
} as RouteReplyContext)

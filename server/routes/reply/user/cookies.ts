import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status'


export const ReplyUserCookies_ErrorRetrieveXUserToken = (reply: FastifyReply) => reply.status(HttpStatusCode.NOT_FOUND).send({
   category: 'COOKIES',
   code: 'NOT_FOUND.X-USER-TOKEN',
   status: false,
   field: 'USER'
} as RouteReplyContext)

export const ReplyUserCookies_ErrorInvalidXUserToken = (reply: FastifyReply) => reply.status(HttpStatusCode.BAD_REQUEST).send({
   category: 'COOKIES',
   code: 'INVALID.X-USER-TOKEN',
   status: false,
   field: 'USER'
} as RouteReplyContext)

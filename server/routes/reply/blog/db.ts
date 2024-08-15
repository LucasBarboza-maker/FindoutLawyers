import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status'


export const ReplyBlogDB_NotFound = (reply: FastifyReply) => reply.status(HttpStatusCode.NOT_FOUND).send({
   category: 'DB',
   code: 'NOT_FOUND',
   status: false,
   field: 'BLOG'
} as RouteReplyContext)

export const ReplyBlogDB_Deleted = (reply: FastifyReply) => reply.status(HttpStatusCode.OK).send({
   category: 'DB',
   code: 'DELETED',
   status: true,
   field: 'BLOG'
} as RouteReplyContext)

export const ReplyBlogDB_Created = (reply: FastifyReply, id?: string) => reply.status(HttpStatusCode.CREATED).send({
   category: 'DB',
   code: 'CREATED',
   status: true,
   field: 'BLOG',
   id
} as RouteReplyContext)

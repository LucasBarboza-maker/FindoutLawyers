import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status'


export const ReplyUserAccount_Banned = (reply: FastifyReply) => reply.status(HttpStatusCode.UNAUTHORIZED).send({
   category: 'ACCOUNT',
   code: 'BANNED',
   status: false,
   field: 'USER'
} as RouteReplyContext)

export const ReplyUserAccount_UnathorizedRole = (reply: FastifyReply) => reply.status(HttpStatusCode.UNAUTHORIZED).send({
   category: 'ACCOUNT',
   code: 'UNAUTHORIZED.ROLE',
   status: false,
   field: 'USER'
} as RouteReplyContext)

export const ReplyUserAccount_InvalidPassword = (reply: FastifyReply) => reply.status(HttpStatusCode.UNAUTHORIZED).send({
   category: 'ACCOUNT',
   code: 'INVALID.PASSWORD',
   status: false,
   field: 'USER'
} as RouteReplyContext)

export const ReplyUserAccount_PasswordIsDefined = (reply: FastifyReply) => reply.status(HttpStatusCode.UNAUTHORIZED).send({
   category: 'ACCOUNT',
   code: 'DEFINED.PASSWORD',
   status: false,
   field: 'USER'
} as RouteReplyContext)

export const ReplyUserAccount_ErrorLogin = (reply: FastifyReply) => reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
   category: 'ACCOUNT',
   code: 'ERROR.LOGIN',
   status: false,
   field: 'USER'
} as RouteReplyContext)


export const ReplyUserAccount_RegisterAccountSuccess = (reply: FastifyReply, token?: string) => reply.status(HttpStatusCode.CREATED).send({
   category: 'ACCOUNT',
   code: 'REGISTRED',
   status: true,
   field: 'USER',
   token
} as RouteReplyContext)


export const ReplyUserAccount_RegisterAccountError = (reply: FastifyReply) => reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
   category: 'ACCOUNT',
   code: 'ERROR.REGISTER',
   status: false,
   field: 'USER'
} as RouteReplyContext)

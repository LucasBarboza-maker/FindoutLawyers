import { RouteReplyContext } from '@/server/@types/routes';
import { FastifyReply } from 'fastify';
import { HttpStatusCode } from '@/routes/reply/status';

export const ReplyUserDB_InvalidAccount = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.NOT_FOUND).send({
        category: 'DB',
        code: 'USER.NOT_FOUND',
        status: false,
        field: 'USER',
    } as RouteReplyContext);

export const ReplyUserDB_InvalidEmail = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.NOT_FOUND).send({
        category: 'DB',
        code: 'EMAIL.NOT_FOUND',
        status: false,
        field: 'USER',
    } as RouteReplyContext);

export const ReplyUserDB_ErrorExistEmail = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.OK).send({
        category: 'DB',
        code: 'EMAIL.IN_USE',
        status: false,
        field: 'USER',
    } as RouteReplyContext);

export const ReplyUserDB_ErrorPassword = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.OK).send({
        category: 'DB',
        code: 'PASSWORD.NOT_SAME',
        status: false,
        field: 'USER',
    } as RouteReplyContext);

export const ReplyUserDB_ErrorExistUsername = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.OK).send({
        category: 'DB',
        code: 'USERNAME.IN_USE',
        status: false,
        field: 'USER',
    } as RouteReplyContext);

export const ReplyUserDB_IsCheckoutValid = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.OK).send({
        category: 'DB',
        code: 'CHECKOUT',
        status: true,
        field: 'USER',
    } as RouteReplyContext);

export const ReplyUserDB_IsCheckoutInvalid = (reply: FastifyReply) =>
    reply.status(HttpStatusCode.BAD_REQUEST).send({
        category: 'DB',
        code: 'CHECKOUT.ERROR',
        status: false,
        field: 'USER',
    } as RouteReplyContext);

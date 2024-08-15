
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { RedisClient } from 'redis';

export interface IBootstrap_Routes {
   fastify: FastifyInstance;
   prisma: PrismaClient;
   redis: RedisClient;
   socket: Server;
}


export type RouteReplyContextCategory = 'COOKIES' | 'DB' | 'ACCOUNT' | 'SYSTEM'
export type RouteReplyContextField = 'USER' | 'SEARCH' | 'NEWS' | 'EMAIL' |
   'NOTIFICATION' | 'INBOX' | 'SYSTEM' | 'COMMUNITY' | 'BLOG'

export interface RouteReplyContext {
   status: boolean;
   message?: string;
   code: string;
   category: RouteReplyContextCategory;
   field: RouteReplyContextField
}

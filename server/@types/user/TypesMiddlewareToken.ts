import { PrismaClient, UserRole, Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';
export type MiddlewareRoleUser = UserRole | 'ALL';

export interface UserMiddlewareTokenProps {
   request: any;
   reply: FastifyReply;
   prisma: PrismaClient;
   isRawHeader?: Boolean;
   role?: MiddlewareRoleUser;
   retrieve?: null;
   onlyGet?: boolean;
   include?: Prisma.UserInclude | null | undefined;
}

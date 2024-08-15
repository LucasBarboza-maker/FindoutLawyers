import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, QuerySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteAdmin_News_News({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/news/news',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const admin = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                    role: 'ADMIN',
                });

                const { pageIndex, perPage, title, source } =
                    request.query as QuerySchema;

                const [data, total] = await prisma.$transaction([
                    prisma.news.findMany({
                        where: {
                            title: title ? { contains: title } : undefined,
                            source: title ? { contains: source } : undefined,
                        },
                        take: perPage,
                        skip: pageIndex,

                        orderBy: {
                            createdAt: 'desc',
                        },
                    }),
                    prisma.news.count({
                        where: {
                            title: title ? { contains: title } : undefined,
                            source: title ? { contains: source } : undefined,
                        },
                    }),
                ]);

                return reply.send({
                    pageIndex,
                    perPage,
                    total,
                    data,
                });
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}

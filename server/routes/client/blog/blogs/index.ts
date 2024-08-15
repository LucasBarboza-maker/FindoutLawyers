import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_Blog_Blogs_SchemaBody } from './schema';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Blog_Blogs({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/blog/blogs',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    prisma,
                    reply,
                    request,
                });

                const { pageIndex, perPage, tags, title, cacheIds, userId } =
                    request.body as IRouteClient_Blog_Blogs_SchemaBody;

                const [data, total] = await prisma.$transaction([
                    prisma.blogTopic.findMany({
                        where: {
                            title: title ? { startsWith: title } : undefined,
                            tags: tags
                                ? {
                                      hasSome: tags,
                                  }
                                : undefined,

                            id: { notIn: cacheIds },
                            User: userId
                                ? {
                                      id: userId,
                                  }
                                : undefined,
                            isBlocked: false,
                        },
                        take: perPage || 99,
                        skip: pageIndex || 0,
                        include: {
                            User: {
                                select: {
                                    id: true,
                                    category: true,
                                    imageCover: true,
                                    name: true,
                                    surname: true,
                                    role: true,
                                },
                            },
                        },
                        orderBy: { createdAt: 'desc' },
                    }),
                    prisma.blogTopic.count({
                        where: {
                            title: title ? { startsWith: title } : undefined,
                            tags: tags
                                ? {
                                      hasSome: tags,
                                  }
                                : undefined,
                            User: userId
                                ? {
                                      id: userId,
                                  }
                                : undefined,
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
                return ReplyBlogSystem_ErrorGeneric(reply);
            }
        },
    });
}

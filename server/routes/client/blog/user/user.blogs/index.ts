import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteAdmin_BlogUser_Blogs_SchemaBody } from './schema';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { parseJsonBody } from '@/libraries/utils/routes';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogUser_Blogs({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/blog/user/blogs',
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

                const { pageIndex, perPage, tags, title, cacheIds } =
                    request.body as IRouteAdmin_BlogUser_Blogs_SchemaBody;

                const [data, total] = await prisma.$transaction([
                    prisma.blogTopic.findMany({
                        where: {
                            title: title ? { startsWith: title } : undefined,
                            tags: tags
                                ? {
                                      hasSome: tags,
                                  }
                                : undefined,

                            User: {
                                id: user?.id,
                            },
                            id: {
                                notIn: cacheIds,
                            },
                        },
                        take: perPage || 99,
                        skip: pageIndex || 0,
                        select: {
                            id: true,
                            createdAt: true,
                            updatedAt: true,
                            title: true,
                            imageCover: true,
                            rawMessage: true,
                            description: true,
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
                            User: {
                                id: user?.id,
                            },
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

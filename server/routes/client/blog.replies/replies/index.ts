import { parseJsonBody } from '@/libraries/utils/routes';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_BlogReplies_Replies_SchemaBody } from './schema';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_BlogReplies_Replies({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/blog/reply/replies',
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

                const { pageIndex, perPage, blogId, cacheIds } =
                    request.body as IRouteClient_BlogReplies_Replies_SchemaBody;

                const [data, total] = await prisma.$transaction([
                    prisma.blogTopicReplies.findMany({
                        where: {
                            id: {
                                notIn: cacheIds,
                            },
                            BlogTopic: {
                                id: blogId,
                            },
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
                    prisma.blogTopicReplies.count({
                        where: {
                            BlogTopic: {
                                id: blogId,
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

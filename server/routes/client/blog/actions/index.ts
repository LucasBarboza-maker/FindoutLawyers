import { User_Middleware_Token } from '@/app/user/middleware/token';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyBlogSystem_ErrorGeneric } from '@/routes/reply/blog/system';
import { parseJsonBody } from '@/libraries/utils/routes';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Blog_Actions({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/blog/actions',
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

                const { id, cacheIds, pageIndex, perPage } =
                    request.body as BodySchema;

                const [data, total, userHasLiked] = await prisma.$transaction([
                    prisma.blogTopicActions.findMany({
                        where: {
                            id: {
                                notIn: cacheIds,
                            },
                            BlogTopic: {
                                id,
                            },
                        },
                        take: perPage || 99,
                        skip: pageIndex || 0,
                        select: {
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
                            category: true,
                            userId: true,
                            createdAt: true,
                        },
                        orderBy: { createdAt: 'desc' },
                    }),
                    prisma.blogTopicActions.count({
                        where: {
                            id: {
                                notIn: cacheIds,
                            },
                            BlogTopic: {
                                id,
                            },
                        },
                    }),
                    prisma.blogTopicActions.findFirst({
                        where: {
                            BlogTopic: {
                                id,
                            },
                            userId: user?.id,
                        },
                    }),
                ]);

                return reply.send({
                    pageIndex,
                    perPage,
                    total,
                    data,
                    userHasLiked: !!userHasLiked,
                });
            } catch (error) {
                return ReplyBlogSystem_ErrorGeneric(reply);
            }
        },
    });
}

import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_Statics({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/user/statics',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const [blogs, reports, evaluations] = await prisma.$transaction(
                    [
                        prisma.blogTopic.count({
                            where: {
                                User: {
                                    id: user?.id,
                                },
                            },
                        }),
                        prisma.userReports.count({
                            where: {
                                User: {
                                    id: user?.id,
                                },
                            },
                        }),
                        prisma.userEvaluations.count({
                            where: {
                                UserEvaluation: {
                                    User: {
                                        some: {
                                            id: user?.id,
                                        },
                                    },
                                },
                            },
                        }),
                    ]
                );

                return reply.status(200).send({
                    blogs,
                    reports,
                    evaluations,
                });
            } catch (error) {
                return ReplyUserDB_InvalidAccount(reply);
            }
        },
    });
}

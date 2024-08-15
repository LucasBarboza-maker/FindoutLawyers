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

export function RouteAdmin_Evaluations_Evaluations({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/evaluations/evaluations',
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

                const { pageIndex, perPage, isChecked } =
                    request.query as QuerySchema;

                const [data, total] = await prisma.$transaction([
                    prisma.userEvaluations.findMany({
                        where: {
                            isChecked,
                        },
                        take: perPage,
                        skip: pageIndex,
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                    name: true,
                                    contactCountry: true,
                                    contactCity: true,
                                },
                            },
                            UserEvaluation: {
                                select: {
                                    id: true,
                                    User: {
                                        select: {
                                            category: true,
                                            id: true,
                                            email: true,
                                            imageCover: true,
                                            role: true,
                                            name: true,
                                            surname: true,
                                            isChecked: true,
                                        },
                                    },
                                },
                            },
                        },
                        orderBy: {
                            isChecked: 'desc',
                        },
                    }),
                    prisma.userEvaluations.count({
                        where: {
                            isChecked,
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

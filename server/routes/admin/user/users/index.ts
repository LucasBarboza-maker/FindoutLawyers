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

export function RouteAdmin_User_Users({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/admin/user/users',
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

                const {
                    pageIndex,
                    perPage,
                    name,
                    surname,
                    country,
                    email,
                    state,
                    city,
                } = request.query as QuerySchema;

                const [data, total] = await prisma.$transaction([
                    prisma.user.findMany({
                        where: {
                            name: name ? { startsWith: name } : undefined,
                            surname: surname
                                ? { startsWith: surname }
                                : undefined,
                            contactCountry: country
                                ? { startsWith: country }
                                : undefined,
                            contactCity: city
                                ? { startsWith: city }
                                : undefined,
                            contactState: state
                                ? { startsWith: state }
                                : undefined,
                            email: email ? { startsWith: email } : undefined,
                            role: 'LAWYER',
                        },
                        take: perPage,
                        skip: pageIndex,
                        select: {
                            category: true,
                            id: true,
                            contactCity: true,
                            contactCountry: true,
                            contactEmail: true,
                            contactState: true,
                            createdAt: true,
                            updatedAt: true,
                            email: true,
                            imageCover: true,
                            isBlockedToAccess: true,
                            isRequestingToAccess: true,
                            isRequestingToDefinePassword: true,
                            role: true,
                            name: true,
                            surname: true,
                            isChecked: true,
                            lawyerCardBack: true,
                            lawyerCardFront: true,
                            lawyerOrdemUrl: true,
                            lawyerSubscriptionId: true,
                            payaments: {
                                select: {
                                    id: true,
                                    isActive: true,
                                    status: true,
                                    currentPeriodStart: true,
                                    currentPeriodEnd: true,
                                    interval: true,
                                    intervalCount: true,
                                    unitAmount: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }),
                    prisma.user.count({
                        where: {
                            name: name ? { startsWith: name } : undefined,
                            surname: surname
                                ? { startsWith: surname }
                                : undefined,
                            contactCountry: country
                                ? { startsWith: country }
                                : undefined,
                            contactCity: city
                                ? { startsWith: city }
                                : undefined,
                            contactState: state
                                ? { startsWith: state }
                                : undefined,
                            email: email ? { startsWith: email } : undefined,
                            role: 'LAWYER',
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

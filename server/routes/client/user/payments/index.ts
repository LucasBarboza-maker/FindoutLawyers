import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, QuerySchema } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { OmitKeys } from '@/libraries/utils/object';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_Payments({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/user/payments',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                    include: {
                        payaments: {
                            select: {
                                isActive: true,
                                billingAdress: true,
                                canceledAt: true,
                                cardBrand: true,
                                cardCountry: true,
                                cardLast4: true,
                                category: true,
                                created: true,
                                currentPeriodEnd: true,
                                currentPeriodStart: true,
                                interval: true,
                                intervalCount: true,
                                status: true,
                                unitAmount: true,
                            },
                        },
                    },
                });

                const status = !!user && !!user.payaments;

                return reply.status(200).send({
                    status,
                    data: status ? user.payaments : undefined,
                });
            } catch (error) {
                return ReplyUserDB_InvalidAccount(reply);
            }
        },
    });
}

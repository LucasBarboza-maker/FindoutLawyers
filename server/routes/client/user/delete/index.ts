import { parseJsonBody } from '@/libraries/utils/routes';
import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';
import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, IRouteClient_UserDelete_SchemaBody } from './schema';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { User_Method_IsPasswordValid } from '@/app/user/method/password';
import { ReplyUserAccount_InvalidPassword } from '@/routes/reply/user/account';
import { EMAIL_MAIN_ACCOUNT } from '@/config/email/config';
import { stripe } from '@/server/config/stripe/stripe';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_User_Delete({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/user/delete',
        method: 'PUT',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                    include: {
                        payaments: {
                            select: {
                                id: true,
                                stripeCustomerId: true,
                            },
                        },
                    },
                });

                if (!user || user.email === EMAIL_MAIN_ACCOUNT) {
                    return reply.status(404).send({ status: false });
                }

                const body = <IRouteClient_UserDelete_SchemaBody>request.body;

                const isPasswordValid = await User_Method_IsPasswordValid(
                    body.password,
                    user?.password || ''
                );

                if (!isPasswordValid) {
                    return ReplyUserAccount_InvalidPassword(reply);
                }

                if (!!user && user.payaments?.stripeCustomerId) {
                    const customer = await stripe.customers.del(
                        user.payaments.stripeCustomerId,
                        {}
                    );
                }

                await prisma.$transaction([
                    prisma.blogTopicActions.deleteMany({
                        where: { User: { id: user?.id } },
                    }),
                    prisma.blogTopicReplies.deleteMany({
                        where: { User: { id: user?.id } },
                    }),
                    prisma.blogTopic.deleteMany({
                        where: { User: { id: user.id } },
                    }),
                    prisma.userPayaments.deleteMany({
                        where: { id: user.payaments?.id },
                    }),
                    prisma.userEvaluations.deleteMany({
                        where: {
                            UserEvaluation: { User: { some: { id: user.id } } },
                        },
                    }),
                    prisma.userEvaluation.deleteMany({
                        where: { User: { some: { id: user.id } } },
                    }),
                    prisma.user.delete({ where: { id: user?.id } }),
                ]);

                return reply
                    .status(200)
                    .send({ status: true, code: 'DELETED' });
            } catch (error) {
                return ReplyUserDB_InvalidAccount(reply);
            }
        },
    });
}

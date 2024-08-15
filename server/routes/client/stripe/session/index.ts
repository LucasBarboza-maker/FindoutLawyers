import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, QuerySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { stripe } from '@/server/config/stripe/stripe';
import { User_Middleware_Token } from '@/app/user/middleware/token';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Stripe_Session({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/stripe/session',
        method: 'GET',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const { sessionId } = request.query as QuerySchema;

                const customer = user?.stripeCustomerId || '';

                const session = await stripe.checkout.sessions.retrieve(
                    sessionId
                );

                return reply.send({ status: true, session });
            } catch (error) {
                console.error(error);
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}

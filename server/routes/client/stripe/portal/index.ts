import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { stripe } from '@/server/config/stripe/stripe';
import { STRIPE_PRODUCTS } from '@/server/config/stripe/sign';
import { STRIPE_DOMAIN } from '@/server/config/stripe';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { parseJsonBody } from '@/libraries/utils/routes';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Stripe_Portal({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/stripe/portal',
        method: 'POST',
        schema,
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const customer = user?.stripeCustomerId || '';

                const { url } = await stripe.billingPortal.sessions.create({
                    customer,
                    return_url: `${STRIPE_DOMAIN}/profile/setup`,
                });

                return reply.send({ url });
            } catch (error) {
                console.error(error);
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}

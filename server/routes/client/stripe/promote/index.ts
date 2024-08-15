import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, BodySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { stripe } from '@/server/config/stripe/stripe';
import { STRIPE_PRODUCT_PROMOTION } from '@/server/config/stripe/sign';
import { STRIPE_DOMAIN } from '@/server/config/stripe';
import { User_Middleware_Token } from '@/app/user/middleware/token';
import { parseJsonBody } from '@/libraries/utils/routes';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Stripe_Promote({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/stripe/promote',
        method: 'POST',
        schema,
        preHandler: [parseJsonBody],
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const user = await User_Middleware_Token({
                    request: request as any,
                    reply,
                    prisma,
                });

                const body = request.body as BodySchema;

                let stripeCustomerId = user?.stripeCustomerId;

                if (!stripeCustomerId && user) {
                    const customer = await stripe.customers.create({
                        email: user.email,
                        name: `${user.name} ${user.surname}`,
                        metadata: {
                            id: user.id,
                        },
                    });

                    stripeCustomerId = customer.id;

                    await prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            stripeCustomerId: customer.id,
                        },
                    });
                }

                const session = await stripe.checkout.sessions.create({
                    mode: 'subscription',
                    payment_method_types: ['card'],
                    billing_address_collection: 'required',
                    allow_promotion_codes: true,
                    line_items: [
                        {
                            price: STRIPE_PRODUCT_PROMOTION[body.product],
                            quantity: 1,
                        },
                    ],
                    success_url: body.success_url
                        ? body.success_url
                        : `${STRIPE_DOMAIN}/profile/setup?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: body.cancel_url
                        ? body.cancel_url
                        : `${STRIPE_DOMAIN}/checkout/error`,
                    customer: !!stripeCustomerId ? stripeCustomerId : undefined,
                });

                return reply.send(session);
            } catch (error) {
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}

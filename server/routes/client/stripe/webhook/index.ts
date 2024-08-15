import { IBootstrap_Routes } from '@/types/routes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { schema, QuerySchema } from './schema';
import { ReplyUserSystem_ErrorGeneric } from '@/routes/reply/user/system';
import { stripe } from '@/server/config/stripe/stripe';
import { STRIPE_WEBOOK } from '@/server/config/stripe';
import { webhookEvents } from './event';

/*
:--------------------------------------------------------------------------
: Route
:--------------------------------------------------------------------------
*/

export function RouteClient_Stripe_Webhook({
    fastify,
    redis,
    prisma,
    socket,
}: IBootstrap_Routes) {
    return fastify.route({
        url: '/api/client/stripe/webhook',
        method: 'POST',
        schema,
        config: {
            rawBody: true,
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                const signature = request.headers['stripe-signature'];
                let event;

                const payload = request.rawBody;

                //  console.log('sig', sig, !!body);

                try {
                    event = stripe.webhooks.constructEvent(
                        payload || '',
                        signature || '',
                        STRIPE_WEBOOK
                    );
                    //   console.log('worked', event.type);

                    await webhookEvents({ event, prisma });
                } catch (err: any) {
                    //   console.error(err);
                    reply.status(400).send({
                        status: false,
                        message: `Webhook Error: ${err.message}`,
                    });
                    return;
                }

                return reply.send({ status: true });
            } catch (error) {
                console.error(error);
                return ReplyUserSystem_ErrorGeneric(reply);
            }
        },
    });
}

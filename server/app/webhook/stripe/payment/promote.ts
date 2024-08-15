import { unixDateTime } from '@/libraries/utils/time';

import { StripeWebhookEventHandlerProps } from '@/server/@types/stripe';
import { stripe } from '@/server/config/stripe/stripe';
import { JobsEmail } from '@/server/jobs/email';
import Stripe from 'stripe';
import { stripeIntervalGetCategory } from '../getCategory';

export async function PaymentPromote({
    event,
    prisma,
}: StripeWebhookEventHandlerProps): Promise<any> {
    try {
        const session = event.data.object as Stripe.Checkout.Session;

        const { customer_details, payment_intent } = session;

     
        const product = await stripe.paymentIntents.retrieve(
            payment_intent?.toString() || ''
        );



        const item = product;

        if(product.amount != 8900){
            return;
        }

        const productId = item.id;

        if (!!item.customer) {
            let stripeCustomerId: string | undefined;

            if (typeof item.customer === 'string') {
                stripeCustomerId = item.customer;
            } else {
                stripeCustomerId = item.customer.id;
            }

            const isBanner = { isPromotedToBanner: true, isPromotedToSearch: true };

            const user = await prisma.user.findFirst({
                where: {
                    stripeCustomerId,
                },
            });

            if (!user) {
                return;
            }

            const userUpdated = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    ...isBanner,
                },
            });

            JobsEmail.Promote({
                user,
                category: isBanner ? 'BANNER' : 'SEARCH',
            });
        }
    } catch (error) {
        console.error(error);
    }
}

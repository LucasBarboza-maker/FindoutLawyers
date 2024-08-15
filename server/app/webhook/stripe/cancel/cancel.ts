import { unixDateTime } from '@/libraries/utils/time';

import { StripeWebhookEventHandlerProps } from '@/server/@types/stripe';
import { stripe } from '@/server/config/stripe/stripe';
import Stripe from 'stripe';
import { string } from 'yup/lib/locale';
import { stripeIntervalGetCategory } from '../getCategory';

export async function Cancel({
    event,
    prisma,
}: StripeWebhookEventHandlerProps): Promise<any> {
    try {
        const session = event.data.object as Stripe.Invoice;

        const {
            subscription: id,
            customer_email,
            customer,
        } = session;


        const user = await prisma.user.findFirst({
            where: {
                premiumSubId: session.id,
            },
            select: {
                id: true,
                detachSubId: true
            }
        })


        if (user != null) {

            if (user.detachSubId != '') {
                let result = await stripe.subscriptions.del(user.detachSubId);

                const updateUser = await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        detachSubId: '',
                        isPromotedToBanner: false,
                        isPromotedToSearch: false
                    },
                });
            }

            const updateUser = await prisma.user.updateMany({
                where: {
                    id: user.id
                },
                data: {
                    category: 'COMMON',
                    premiumSubId: ''
                },
            });

        } else {

                if (session.customer) {
                    const updateUser = await prisma.user.updateMany({
                        where: {
                            detachSubId: session.id,
                        },
                        data: {
                            detachSubId: '',
                            isPromotedToBanner: false,
                            isPromotedToSearch: false
                        },
                    });
                }
            

        }


        // if(user?.premiumSubId && user.premiumSubId === 'string'){
        //     const result = await stripe.subscriptions.del(user?.premiumSubId)
        // }

        // const subscription = await stripe.subscriptions.retrieve(
        //     subscriptionId?.toString() || '',
        //     {
        //         expand: ['default_payment_method'],
        //     }
        // );

        // const item = subscription.items.data[0];
        // const productId = item.id;

        // if (!!customer_email) {
        //     const default_payment_method = subscription.default_payment_method;

        //     let billingAdress: string | undefined;
        //     let cardBrand: string | undefined;
        //     let cardLast4: string | undefined;
        //     let cardCountry: string | undefined;

        //     if (
        //         typeof default_payment_method !== 'string' &&
        //         !!default_payment_method
        //     ) {
        //         const address = default_payment_method.billing_details.address;

        //         billingAdress = `${address?.country}/${address?.state}, ${address?.postal_code}, ${address?.line1}, ${address?.line2}`;

        //         cardBrand = default_payment_method.card?.brand;
        //         cardLast4 = default_payment_method.card?.last4;
        //         cardCountry =
        //             default_payment_method.card?.country === null
        //                 ? undefined
        //                 : default_payment_method.card?.country;
        //     }

        //     const status = subscription.status;
        //     const category = stripeIntervalGetCategory(
        //         item.plan.interval,
        //         item.plan.interval_count
        //     );

        //     const updateUser = await prisma.user.update({
        //         where: {
        //             email: customer_email,
        //         },
        //         data: {
        //             category: 'COMMON',
        //             premiumSubId: subscription.id,

        //         },
        //     });
        // }
    } catch (error) { }
}

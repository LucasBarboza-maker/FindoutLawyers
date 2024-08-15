import { unixDateTime } from '@/libraries/utils/time';

import { StripeWebhookEventHandlerProps } from '@/server/@types/stripe';
import { stripe } from '@/server/config/stripe/stripe';
import Stripe from 'stripe';
import { stripeIntervalGetCategory } from '../getCategory';

export async function SessionCompleted({
    event,
    prisma,
}: StripeWebhookEventHandlerProps): Promise<any> {
    try {
        const session = event.data.object as Stripe.Checkout.Session;

        const { subscription: subscriptionId, customer_details } = session;

        const subscription = await stripe.subscriptions.retrieve(
            subscriptionId?.toString() || '',
            {
                expand: ['default_payment_method'],
            }
        );

        const item = subscription.items.data[0];
        const productId = item.id;

        if (!!customer_details && customer_details.email) {
            const default_payment_method = subscription.default_payment_method;

            let billingAdress: string | undefined;
            let cardBrand: string | undefined;
            let cardLast4: string | undefined;
            let cardCountry: string | undefined;

            if (
                typeof default_payment_method !== 'string' &&
                !!default_payment_method
            ) {
                const address = default_payment_method.billing_details.address;

                billingAdress = `${address?.country}/${address?.state}, ${address?.postal_code}, ${address?.line1}, ${address?.line2}`;

                cardBrand = default_payment_method.card?.brand;
                cardLast4 = default_payment_method.card?.last4;
                cardCountry =
                    default_payment_method.card?.country === null
                        ? undefined
                        : default_payment_method.card?.country;
            }

            const status = subscription.status;
            const category = stripeIntervalGetCategory(
                item.plan.interval,
                item.plan.interval_count
            );

            const updateUser = await prisma.user.update({
                where: {
                    email: customer_details.email,
                },
                data: {
                    category: status === 'active' ? 'PREMIUM' : 'COMMON',
                    payaments: {
                        update: {
                            status,
                            productId,
                            metadata: JSON.stringify(subscription.metadata),
                            cancelAt: subscription.cancel_at
                                ? unixDateTime(subscription.cancel_at)
                                : undefined,
                            canceledAt: subscription.canceled_at
                                ? unixDateTime(subscription.canceled_at)
                                : undefined,
                            currentPeriodEnd: subscription.current_period_end
                                ? unixDateTime(subscription.current_period_end)
                                : undefined,
                            currentPeriodStart:
                                subscription.current_period_start
                                    ? unixDateTime(
                                          subscription.current_period_start
                                      )
                                    : undefined,
                            endedAt: subscription.ended_at
                                ? unixDateTime(subscription.ended_at)
                                : undefined,
                            created: subscription.created
                                ? unixDateTime(subscription.created)
                                : undefined,
                            isActive: status === 'active',
                            intervalCount: item.plan.interval_count,
                            category,
                            currency: item.plan.currency,
                            unitAmount: item.plan.amount ? item.plan.amount : 0,
                            billingAdress,
                            cardBrand,
                            cardCountry,
                            cardLast4,
                        },
                    },
                },
            });
        }
    } catch (error) {}
}

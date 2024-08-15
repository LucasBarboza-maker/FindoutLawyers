import { UserPayamentsCategory } from '.prisma/client';
import Stripe from 'stripe';

export function stripeIntervalGetCategory(
    interval: Stripe.Plan.Interval,
    intervalCount: number
): UserPayamentsCategory {
    if (interval !== 'month') return 'NONE';
    if (intervalCount === 1) {
        return 'MONTHLY';
    } else if (intervalCount === 3) {
        return 'QUARTERLY';
    } else if (intervalCount === 6) {
        return 'SEMESTERLY';
    } else if (intervalCount === 12) {
        return 'ANNUALLY';
    } else {
        return 'NONE';
    }
}

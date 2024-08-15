import { WebhookStripeCheckout } from '@/app/webhook/stripe/checkout';
import { WebhookStripeInvoice } from '@/app/webhook/stripe/invoice';
import { WebhookStripePayment } from '@/app/webhook/stripe/payment';
import {WebhookStripeCancel} from '@/app/webhook/stripe/cancel';
import { StripeWebhookEventHandlerProps } from '@/server/@types/stripe';

export async function webhookEvents(props: StripeWebhookEventHandlerProps) {
    // Handle the event
    switch (props.event.type) {
        case 'account.updated':
            // const account = event.data.object;
            // Then define and call a function to handle the event account.updated
            break;
        case 'account.external_account.created':
            // const externalAccount = event.data.object;
            // Then define and call a function to handle the event account.external_account.created
            break;
        case 'account.external_account.deleted':
            // const externalAccount = event.data.object;
            // Then define and call a function to handle the event account.external_account.deleted
            break;
        case 'account.external_account.updated':
            // const externalAccount = event.data.object;
            // Then define and call a function to handle the event account.external_account.updated
            break;
        case 'charge.captured':
            // const charge = event.data.object;
            // Then define and call a function to handle the event charge.captured
            break;
        case 'charge.expired':
            // const charge = event.data.object;
            // Then define and call a function to handle the event charge.expired
            break;
        case 'charge.failed':
            // const charge = event.data.object;
            // Then define and call a function to handle the event charge.failed
            break;
        case 'charge.pending':
            // const charge = event.data.object;
            // Then define and call a function to handle the event charge.pending
            break;
        case 'charge.refunded':
            // const charge = event.data.object;
            // Then define and call a function to handle the event charge.refunded
            break;
        case 'charge.succeeded':
            // const charge = event.data.object;
            await WebhookStripePayment.PaymentPromote(props);
            // Then define and call a function to handle the event charge.succeeded
            break;
        case 'charge.updated':
            // const charge = event.data.object;
            // Then define and call a function to handle the event charge.updated
            break;
        case 'charge.dispute.closed':
            // const dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.closed
            break;
        case 'charge.dispute.created':
            // const dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.created
            break;
        case 'charge.dispute.funds_reinstated':
            // const dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.funds_reinstated
            break;
        case 'charge.dispute.funds_withdrawn':
            // const dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.funds_withdrawn
            break;
        case 'charge.dispute.updated':
            // const dispute = event.data.object;
            // Then define and call a function to handle the event charge.dispute.updated
            break;
        case 'charge.refund.updated':
            // const refund = event.data.object;
            // Then define and call a function to handle the event charge.refund.updated
            break;
        case 'checkout.session.async_payment_failed':
            // const session = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
        case 'checkout.session.async_payment_succeeded':
            // const session = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
        case 'checkout.session.completed':
            // console.table(props.event.data);
            // await WebhookStripeCheckout.SessionCompleted(props);
            // Then define and call a function to handle the event checkout.session.completed
            break;
        case 'checkout.session.expired':
            // const session = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            break;
        case 'coupon.created':
            // const coupon = event.data.object;
            // Then define and call a function to handle the event coupon.created
            break;
        case 'coupon.deleted':
            // const coupon = event.data.object;
            // Then define and call a function to handle the event coupon.deleted
            break;
        case 'coupon.updated':
            // const coupon = event.data.object;
            // Then define and call a function to handle the event coupon.updated
            break;
        case 'customer.created':
            // const customer = event.data.object;
            // Then define and call a function to handle the event customer.created
            break;
        case 'customer.deleted':
            // const customer = event.data.object;
            // Then define and call a function to handle the event customer.deleted
            break;
        case 'customer.updated':
            // const customer = event.data.object;
            // Then define and call a function to handle the event customer.updated
            break;
        case 'customer.discount.created':
            // const discount = event.data.object;
            // Then define and call a function to handle the event customer.discount.created
            break;
        case 'customer.discount.deleted':
            // const discount = event.data.object;
            // Then define and call a function to handle the event customer.discount.deleted
            break;
        case 'customer.discount.updated':
            // const discount = event.data.object;
            // Then define and call a function to handle the event customer.discount.updated
            break;
        case 'customer.source.created':
            // const source = event.data.object;
            // Then define and call a function to handle the event customer.source.created
            break;
        case 'customer.source.deleted':
            // const source = event.data.object;
            // Then define and call a function to handle the event customer.source.deleted
            break;
        case 'customer.source.expiring':
            // const source = event.data.object;
            // Then define and call a function to handle the event customer.source.expiring
            break;
        case 'customer.source.updated':
            // const source = event.data.object;
            // Then define and call a function to handle the event customer.source.updated
            break;
        case 'customer.subscription.created':
            // const subscription = event.data.object;
            await WebhookStripeCheckout.SessionCompleted(props);
            // Then define and call a function to handle the event customer.subscription.created
            break;
        case 'customer.subscription.deleted':
            // const subscription = event.data.object;
            await WebhookStripeCancel.Cancel(props);
            // Then define and call a function to handle the event customer.subscription.deleted
            break;
        case 'customer.subscription.pending_update_applied':
            // const subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.pending_update_applied
            break;
        case 'customer.subscription.pending_update_expired':
            // const subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.pending_update_expired
            break;
        case 'customer.subscription.trial_will_end':
            // const subscription = event.data.object;
            // Then define and call a function to handle the event customer.subscription.trial_will_end
            break;
        case 'customer.subscription.updated':
            // const subscription = event.data.object;
            await WebhookStripeCheckout.SessionCompleted(props);
            // Then define and call a function to handle the event customer.subscription.updated
            break;
        case 'customer.tax_id.created':
            // const taxId = event.data.object;
            // Then define and call a function to handle the event customer.tax_id.created
            break;
        case 'customer.tax_id.deleted':
            // const taxId = event.data.object;
            // Then define and call a function to handle the event customer.tax_id.deleted
            break;
        case 'customer.tax_id.updated':
            // const taxId = event.data.object;
            // Then define and call a function to handle the event customer.tax_id.updated
            break;
        case 'identity.verification_session.canceled':
            // const verificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.canceled
            break;
        case 'identity.verification_session.created':
            // const verificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.created
            break;
        case 'identity.verification_session.processing':
            // const verificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.processing
            break;
        case 'identity.verification_session.redacted':
            // const verificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.redacted
            break;
        case 'identity.verification_session.requires_input':
            // const verificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.requires_input
            break;
        case 'identity.verification_session.verified':
            // const verificationSession = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.verified
            break;
        case 'invoice.created':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.created
            break;
        case 'invoice.deleted':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.deleted
            break;
        case 'invoice.finalization_failed':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.finalization_failed
            break;
        case 'invoice.finalized':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.finalized
            break;
        case 'invoice.marked_uncollectible':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.marked_uncollectible
            break;
        case 'invoice.paid':
            // const invoice = event.data.object;
            await WebhookStripeInvoice.Paid(props);
            // Then define and call a function to handle the event invoice.paid
            break;
        case 'invoice.payment_action_required':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.payment_action_required
            break;
        case 'invoice.payment_failed':
            // const invoice = event.data.object;
            await WebhookStripeInvoice.Paid(props);
            // Then define and call a function to handle the event invoice.payment_failed
            break;
        case 'invoice.payment_succeeded':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.payment_succeeded
            break;
        case 'invoice.sent':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.sent
            break;
        case 'invoice.upcoming':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.upcoming
            break;
        case 'invoice.updated':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.updated
            break;
        case 'invoice.voided':
            // const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.voided
            break;
        case 'issuing_transaction.created':
            // const issuingTransaction = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.created
            break;
        case 'issuing_transaction.updated':
            // const issuingTransaction = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.updated
            break;
        case 'order.created':
            // const order = event.data.object;
            // Then define and call a function to handle the event order.created
            break;
        case 'order.payment_failed':
            // const order = event.data.object;
            // Then define and call a function to handle the event order.payment_failed
            break;
        case 'order.payment_succeeded':
            // const order = event.data.object;
            // Then define and call a function to handle the event order.payment_succeeded
            break;
        case 'order.updated':
            // const order = event.data.object;
            // Then define and call a function to handle the event order.updated
            break;
        case 'payment_intent.amount_capturable_updated':
            // const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.amount_capturable_updated
            break;
        case 'payment_intent.canceled':
            // const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.canceled
            break;
        case 'payment_intent.created':
            // const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.created
            break;
        case 'payment_intent.payment_failed':
            // const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        case 'payment_intent.processing':
            // const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.processing
            break;
        case 'payment_intent.requires_action':
            // const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.requires_action
            break;
        case 'payment_intent.succeeded':
            // const paymentIntent = props.data.object;

            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        case 'payout.canceled':
            // const payout = event.data.object;
            // Then define and call a function to handle the event payout.canceled
            break;
        case 'payout.created':
            // const payout = event.data.object;
            // Then define and call a function to handle the event payout.created
            break;
        case 'payout.failed':
            // const payout = event.data.object;
            // Then define and call a function to handle the event payout.failed
            break;
        case 'payout.paid':
            // const payout = event.data.object;
            // Then define and call a function to handle the event payout.paid
            break;
        case 'payout.updated':
            // const payout = event.data.object;
            // Then define and call a function to handle the event payout.updated
            break;
        case 'person.created':
            // const person = event.data.object;
            // Then define and call a function to handle the event person.created
            break;
        case 'person.deleted':
            // const person = event.data.object;
            // Then define and call a function to handle the event person.deleted
            break;
        case 'person.updated':
            // const person = event.data.object;
            // Then define and call a function to handle the event person.updated
            break;
        case 'plan.created':
            // const plan = event.data.object;
            // Then define and call a function to handle the event plan.created
            break;
        case 'plan.deleted':
            // const plan = event.data.object;
            // Then define and call a function to handle the event plan.deleted
            break;
        case 'plan.updated':
            // const plan = event.data.object;
            // Then define and call a function to handle the event plan.updated
            break;
        case 'subscription_schedule.aborted':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.aborted
            break;
        case 'subscription_schedule.canceled':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.canceled
            break;
        case 'subscription_schedule.completed':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.completed
            break;
        case 'subscription_schedule.created':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.created
            break;
        case 'subscription_schedule.expiring':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.expiring
            break;
        case 'subscription_schedule.released':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.released
            break;
        case 'subscription_schedule.updated':
            // const subscriptionSchedule = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.updated
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${props.event.type}`);
    }
}

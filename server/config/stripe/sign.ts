/**
 * @description Keys for Sign products from Stripe
 */

export type STRIPE_PRODUCTS_TYPE =
    | 'MONTHLY'
    | 'QUARTERLY'
    | 'SEMESTERLY'
    | 'ANNUALLY';

export const STRIPE_PRODUCTS: Record<STRIPE_PRODUCTS_TYPE, string> = {
    MONTHLY:'price_1KIvTXK4UaRll8Q0VMMyZnGg',       //'price_1Julr3K4UaRll8Q0jhWRW9G9' -> Test Price  |  price_1KIvTXK4UaRll8Q0VMMyZnGg -> Production Price
    QUARTERLY:'price_1KIvTXK4UaRll8Q0HFpLCjZ0',     //'price_1JulrTK4UaRll8Q01jMbu6Nm' -> Test Price  |  price_1KIvTXK4UaRll8Q0HFpLCjZ0 -> Production Price
    SEMESTERLY:'price_1KIvTXK4UaRll8Q0cqvcKDUr',    //'price_1JulrcK4UaRll8Q0YmA68HTq' -> Test Price  |  price_1KIvTXK4UaRll8Q0cqvcKDUr -> Production Price
    ANNUALLY:'price_1KIvTXK4UaRll8Q0TwZDw0yS'       //'price_1JulrkK4UaRll8Q0fKWUTnjN' -> Test Price  |  price_1KIvTXK4UaRll8Q0TwZDw0yS -> Production Price
};

export const STRIPE_PRODUCTS_LABEL: Record<STRIPE_PRODUCTS_TYPE, string> = {
    ANNUALLY: 'Anual',
    MONTHLY: 'Mensal',
    QUARTERLY: 'Trimestral',
    SEMESTERLY: 'Semestral',
};

export type STRIPE_PRODUCT_PROMOTION_TYPE = 'BANNER' | 'SEARCH';

export const STRIPE_PRODUCT_PROMOTION: Record<
    STRIPE_PRODUCT_PROMOTION_TYPE,
    string
> = {
    BANNER:  'price_1KIvYhK4UaRll8Q0uw1PCFZ8', // price_1KI1leK4UaRll8Q0nDdz5W1L  Production --> price_1KIvYhK4UaRll8Q0uw1PCFZ8
    SEARCH: 'price_1KIvYhK4UaRll8Q0uw1PCFZ8' // price_1KI1leK4UaRll8Q0nDdz5W1L Production --> price_1KIvYhK4UaRll8Q0uw1PCFZ8
};

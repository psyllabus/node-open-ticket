import Stripe from 'stripe';

import { PaymentIntegration } from './interface';

export class StripePayment implements PaymentIntegration {
    apiKey: string;
    stripe: Stripe;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.stripe = new Stripe(apiKey);
    }

    pay(amount: number, currency: string, description: string, token: string) {
        return this.stripe.charges.create({
            amount: amount,
            currency: currency,
            description: description,
            source: token
        }).then(charge => charge.id);
    }
}

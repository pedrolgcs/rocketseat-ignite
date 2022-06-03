import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_API_KEY || 'default';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'ignews',
    version: '0.1.0',
  },
});

export { stripe };

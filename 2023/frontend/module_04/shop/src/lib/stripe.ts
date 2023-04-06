import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '@/constants/environments';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'Ignite Shop',
  },
});

export { stripe };

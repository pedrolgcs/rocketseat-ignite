// app
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const APP_API_URL = `${APP_URL}/api`;

// Stripe
export const STRIPE_PUBLIC_KEY =
  process.env.STRIPE_PUBLIC_KEY || 'STRIPE_PUBLIC_KEY';
export const STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || 'STRIPE_SECRET_KEY';

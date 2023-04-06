import { NextApiRequest, NextApiResponse } from 'next';
import { APP_URL } from '@/constants/environments';
import { stripe } from '@/lib/stripe';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;

  switch (method) {
    case 'POST':
      const { priceId } = request.body;

      const checkoutSession = await stripe.checkout.sessions.create({
        success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}/`,
        mode: 'payment',
        line_items: [{ price: priceId, quantity: 1 }],
      });

      return response.status(201).json({
        checkoutUrl: checkoutSession.url,
      });

    default:
      response.setHeader('Allow', ['GET']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
}

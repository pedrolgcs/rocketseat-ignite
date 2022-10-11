import Stripe from 'stripe';
import { api } from '@/lib/axios';
import { stripe } from '@/lib/stripe';

export type GetProductsResponse = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  defaultPriceId: string;
  imagesUrl: String[];
};

export async function getProducts(): Promise<GetProductsResponse[]> {
  const { data: stripeProducts } = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = stripeProducts.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: price.unit_amount || 0,
      defaultPriceId: price.id,
      imagesUrl: product.images,
    };
  });

  return products;
}

// ------------------------------------------------------------------

type GetProductByIdParams = {
  id: string;
};

export type GetProductByIdResponse = {
  id: string;
  name: string;
  price: number;
  defaultPriceId: string;
  description: string | null;
  imagesUrl: String[];
};

export async function getProductById({
  id,
}: GetProductByIdParams): Promise<GetProductByIdResponse> {
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  const parsedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: price.unit_amount || 0,
    defaultPriceId: price.id,
    imagesUrl: product.images,
  };

  return parsedProduct;
}

// ------------------------------------------------------------------

type CreateCheckoutParams = {
  priceId: string;
};

type CreateCheckoutResponse = {
  checkoutUrl: string;
};

export async function createCheckout(params: CreateCheckoutParams) {
  const { data } = await api.post<CreateCheckoutResponse>('/checkout', params);

  return data;
}

// ------------------------------------------------------------------

type GetSessionByIdParams = {
  id: string;
};

export type GetSessionByIdResponse = {
  customer: {
    name: string;
  };
  product: {
    name: string;
    imageUrl: string;
  };
};

export async function getSessionById({
  id,
}: GetSessionByIdParams): Promise<GetSessionByIdResponse> {
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  const parsedSession = {
    customer: {
      name: session.customer_details?.name || 'Cliente',
    },
    product: {
      name: product.name,
      imageUrl: product.images[0],
    },
  };

  return parsedSession;
}

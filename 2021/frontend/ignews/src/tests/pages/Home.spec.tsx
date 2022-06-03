import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

// services
import { stripe } from '../../services/stripe';

// components
import Home, { getStaticProps } from '../../pages';

// mocks
jest.mock('next/router');

jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock('../../services/stripe');

const MOCK_HOME_PROPS = {
  product: {
    priceId: 'fake-price-id',
    amount: '$10,00',
  },
};

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home {...MOCK_HOME_PROPS} />);

    expect(screen.getByText(/\$10,00/i)).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const retrieveStripeMocked = mocked(stripe.prices.retrieve);

    retrieveStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: 'fake-price-id', amount: '$10.00' } },
      })
    );
  });
});

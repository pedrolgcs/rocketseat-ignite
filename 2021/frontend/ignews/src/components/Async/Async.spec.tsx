import { render, screen, waitFor } from '@testing-library/react';

// component
import { Async } from './index';

describe('Async component', () => {
  it('renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    // expect(await screen.findByText('Button')).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByText('Button')).toBeInTheDocument();
    });

    // screen.logTestingPlaygroundURL();
  });
});

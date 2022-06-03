import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';

// component
import { SignInButton } from './index';

// mocks
jest.mock('next-auth/client');

const MOCK_USER = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
};

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const userSessionMocked = mocked(useSession);
    userSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const userSessionMocked = mocked(useSession);
    userSessionMocked.mockReturnValueOnce([{ user: MOCK_USER }, false]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

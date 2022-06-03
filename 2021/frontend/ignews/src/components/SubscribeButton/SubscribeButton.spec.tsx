import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

// component
import { SubscribeButton } from './index';

// mocks
jest.mock('next-auth/client');
jest.mock('next/router');

const MOCK_USER = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
};

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const userSessionMocked = mocked(useSession);

    userSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const userSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    userSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has subscription', () => {
    const userSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    const pushMock = jest.fn();

    userSessionMocked.mockReturnValueOnce([
      { user: MOCK_USER, activeSubscription: 'fake-active-subscription' },
      false,
    ]);
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});

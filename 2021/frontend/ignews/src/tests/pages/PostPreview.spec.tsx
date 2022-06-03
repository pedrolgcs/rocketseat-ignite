import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

// services
import { getPrismicClient } from '../../services/prismic';

// components
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';

// mocks
jest.mock('next-auth/client');

jest.mock('next/router');

jest.mock('../../services/prismic');

const MOCK_POSTS_PROPS = {
  post: {
    slug: 'fake-slug',
    title: 'fake-title',
    content: '<p>fake-content</p>',
    updatedAt: 'fake-updatedAt',
  },
};

describe('Post Preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post {...MOCK_POSTS_PROPS} />);

    expect(screen.getByText('fake-title')).toBeInTheDocument();
    expect(screen.getByText('fake-content')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post when user have a active subscribe', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false,
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post {...MOCK_POSTS_PROPS} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/fake-slug');
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'My new post',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'Post content',
            },
          ],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: 'fake-slug',
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'fake-slug',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021',
          },
        },
      })
    );
  });
});

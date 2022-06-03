import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getSession } from 'next-auth/client';

// services
import { getPrismicClient } from '../../services/prismic';

// components
import Post, { getServerSideProps } from '../../pages/posts/[slug]';

// mocks
jest.mock('next-auth/client');

jest.mock('../../services/prismic');

const MOCK_POSTS_PROPS = {
  post: {
    slug: 'fake-slug',
    title: 'fake-title',
    content: '<p>fake-content</p>',
    updatedAt: 'fake-updatedAt',
  },
};

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post {...MOCK_POSTS_PROPS} />);

    expect(screen.getByText('fake-title')).toBeInTheDocument();
    expect(screen.getByText('fake-content')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      params: {
        slug: 'fake-slug',
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: `/posts/preview/fake-slug`,
          permanent: false,
        },
      })
    );
  });

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    });

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

    const response = await getServerSideProps({
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

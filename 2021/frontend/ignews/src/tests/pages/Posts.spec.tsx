import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

// services
import { getPrismicClient } from '../../services/prismic';

// components
import Posts, { getStaticProps } from '../../pages/posts';

// mocks
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock('../../services/prismic');

const MOCK_POSTS_PROPS = {
  posts: [
    {
      slug: 'fake-slug',
      title: 'fake-title',
      excerpt: 'fake-text',
      updatedAt: 'fake-updatedAt',
    },
  ],
};

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts {...MOCK_POSTS_PROPS} />);

    expect(screen.getByText('fake-title')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
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
                  text: 'Post excerpt',
                },
              ],
            },
            last_publication_date: '04-01-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2021',
            },
          ],
        },
      })
    );
  });
});

import { useState, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { Document } from '@prismicio/client/types/documents';

// services
import { getPrismicClient } from '../services/prismic';

// utils
import { PostFormatter } from '../utils/PostFormatter';

// styles
import commonStyles from '../styles/common.module.scss';
import styles from '../styles/pages/home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home: NextPage<HomeProps> = ({ postsPagination }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    setPosts(postsPagination.results);
    setNextPage(postsPagination.next_page);
  }, [postsPagination.next_page, postsPagination.results]);

  async function handlePagination(): Promise<void> {
    const response = await fetch(nextPage);
    const parseToJson = await response.json();

    const formattedData = parseToJson.results.map((post: Document) =>
      PostFormatter.Preview(post)
    );

    setPosts([...posts, ...formattedData]);
    setNextPage(parseToJson.next_page);
  }

  return (
    <main className={commonStyles.container}>
      {posts.map(post => (
        <div className={styles.postContainer} key={post.uid}>
          <Link href={`/post/${post.uid}`}>
            <a>
              <h1>{post.data.title}</h1>
              <p>{post.data.subtitle}</p>
              <div className={styles.postInfo}>
                <span>
                  <FiCalendar />
                  {PostFormatter.ParseDate(post.first_publication_date)}
                </span>
                <span>
                  <FiUser />
                  {post.data.author}
                </span>
              </div>
            </a>
          </Link>
        </div>
      ))}

      {nextPage && (
        <button
          type="button"
          className={styles.buttonLoader}
          onClick={handlePagination}
        >
          Carregar mais posts
        </button>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => PostFormatter.Preview(post));

  const { next_page } = postsResponse;

  return {
    props: {
      postsPagination: {
        next_page,
        results: posts,
      },
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default Home;

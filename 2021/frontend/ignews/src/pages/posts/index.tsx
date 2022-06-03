import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useSession } from 'next-auth/client';

// services
import { getPrismicClient } from '../../services/prismic';

// utils
import { Formatters } from '../../utils/Formatters';

// styles
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              href={
                !!session?.activeSubscription
                  ? `/posts/${post.slug}`
                  : `/posts/preview/${post.slug}`
              }
              key={post.slug}
            >
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 20,
    }
  );

  const posts = response.results.map((post) => ({
    slug: post.uid as string,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find(
        (content: { type: string; text: string }) =>
          content.type === 'paragraph'
      )?.text ?? '',
    updatedAt: Formatters.date(post.last_publication_date as string),
  }));

  return {
    props: {
      posts,
    },
  };
};

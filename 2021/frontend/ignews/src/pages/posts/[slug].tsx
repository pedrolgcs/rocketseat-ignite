import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';

// services
import { getPrismicClient } from '../../services/prismic';

// utils
import { Formatters } from '../../utils/Formatters';

// styles
import styles from './post.module.scss';

type Post = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

type PostProps = {
  post: Post;
};

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params as { slug: string };
  const session = (await getSession({ req })) as Session;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('post', slug, {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: Formatters.date(response.last_publication_date as string),
  };

  return {
    props: {
      post,
    },
  };
};

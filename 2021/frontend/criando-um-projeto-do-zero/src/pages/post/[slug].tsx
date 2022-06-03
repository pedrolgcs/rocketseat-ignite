import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

// services
import { getPrismicClient } from '../../services/prismic';

// utils
import { PostFormatter } from '../../utils/PostFormatter';

// styles
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  const amountWordsTotalOfContent = RichText.asText(
    post.data.content.reduce((total, { body }) => [...total, ...body], [])
  ).split(' ').length;

  const readingTime = Math.ceil(amountWordsTotalOfContent / 200);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {post.data.banner.url && (
        <section className={styles.banner}>
          <img src={post.data.banner.url} alt="Banner" />
        </section>
      )}

      <main className={commonStyles.container}>
        <div className={styles.content}>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <span>
              <FiCalendar />
              {PostFormatter.ParseDate(post.first_publication_date)}
            </span>
            <span>
              <FiUser />
              {post.data.author}
            </span>
            <span>
              <FiClock />
              {`${readingTime} min`}
            </span>
          </div>
          <div className={styles.postContent}>
            {post.data.content.map(({ heading, body }) => (
              <div key={heading}>
                {heading && <h2>{heading}</h2>}

                <div
                  className={styles.postBody}
                  dangerouslySetInnerHTML={{ __html: RichText.asHtml(body) }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    { pageSize: 20, orderings: '[document.last_publication_date desc]' }
  );

  const paths = posts.results.map(result => {
    return {
      params: {
        slug: result.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const post = PostFormatter.Complete(response);

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};

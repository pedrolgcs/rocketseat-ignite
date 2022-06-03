import { GetStaticProps } from 'next';
import type { NextPage } from 'next';
import Head from 'next/head';

// components
import { SubscribeButton } from '../components/SubscribeButton';

// services
import { stripe } from '../services/stripe';

// utils
import { Formatters } from '../utils/Formatters';

// styles
import styles from '../styles/pages/home.module.scss';

type HomeProps = {
  product: {
    priceId: string;
    amount: string;
  };
};

const Home: NextPage<HomeProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(
    process.env.STRIPE_SUBSCRIBE_PRODUCT_ID as string
  );

  const amount = price.unit_amount
    ? Formatters.currency(price.unit_amount / 100)
    : '$0.0';

  const product = {
    priceId: price.id,
    amount,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;

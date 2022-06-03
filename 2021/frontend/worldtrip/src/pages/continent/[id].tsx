import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Flex, Heading } from '@chakra-ui/react';

// services
import { api } from '../../services/api';

// components
import { Content } from '../../components/Continent/Content';
import { Banner } from '../../components/Continent/Banner';
import { Cities } from '../../components/Continent/Cities';

type Continent = {
  id: number;
  name: string;
  description: string;
  img_url: string;
};

type ContinentProps = {
  continent: Continent;
};

export default function Continent({ continent }: ContinentProps) {
  return (
    <Flex direction="column">
      <Head>
        <title>WorldTrip - {continent.name}</title>

        <meta property="og:title" content={`WorldTrip ${continent.name}`} />
        <meta property="og:description" content={continent.description} />
        <meta name="twitter:title" content={`WorldTrip ${continent.name}`} />

        <meta name="twitter:image" content={continent.img_url} />
        <meta name="twitter:image:src" content={continent.img_url} />
        <meta property="og:image" content={continent.img_url} />
        <meta property="og:image:secure_url" content={continent.img_url} />
      </Head>

      <Banner continent={continent} />
      <Content continent={continent} />

      <Cities />
    </Flex>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const { data: continent } = await api.get(`/continents/${id}`);

    return {
      props: {
        continent,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};

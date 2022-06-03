import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Flex, Heading } from '@chakra-ui/react';

// services
import { api } from '../services/api';

// components
import { Banner } from '../components/Banner';
import { TravelTypes } from '../components/TravelTypes';
import { Separator } from '../components/Separator';
import { Slider } from '../components/Slider';

// types
type Continent = {
  id: number;
  name: string;
  description: string;
  img_url: string;
};

type HomeProps = {
  continents: Array<Continent>;
};

const Home: NextPage<HomeProps> = ({ continents }) => {
  return (
    <Flex direction="column">
      <Head>
        <title>Home</title>
      </Head>

      <Banner />

      <TravelTypes />

      <Separator />

      <Heading
        textAlign="center"
        fontWeight="500"
        fontSize={['lg', '3xl', '4xl']}
      >
        Vamos nessa?
        <br />
        Então escolha seu continente
      </Heading>

      <Slider continents={continents} />
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: continents } = await api.get('/continents');

  return {
    props: {
      continents,
    },

    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;

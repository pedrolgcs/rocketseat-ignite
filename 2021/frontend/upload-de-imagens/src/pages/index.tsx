import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import Head from 'next/head';

// components
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

// services
import { api } from '../services/api';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type IInfiniteQueryResponse = {
  after: number | null;
  data: Card[];
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<unknown, unknown, IInfiniteQueryResponse>(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get('api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: (nextPage: { after: number }) => nextPage.after,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  const formattedData = useMemo(() => {
    const imgsData = data?.pages.map(page => page.data).flat();
    return imgsData;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>UpFi</title>
        <link rel="shortcut icon" href="logo.svg" />
      </Head>

      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button mt={8} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}

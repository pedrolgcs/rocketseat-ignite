import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSessionById, GetSessionByIdResponse } from '@/requests/products';
import * as S from '@/styles/pages/success.styles';

type SuccessProps = {
  session: GetSessionByIdResponse;
};

export default function Success({ session }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <S.SuccessContainer>
        <h1>Compra efetuada</h1>

        <S.ImageContainer>
          <Image
            src={session.product.imageUrl}
            alt={session.product.name}
            width={120}
            height={110}
          />
        </S.ImageContainer>

        <p>
          Uhuul <strong>{session.customer.name}</strong>, sua{' '}
          <strong>{session.product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
          <a>Voltar ao catálogo</a>
        </Link>
      </S.SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.session_id;

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const session = await getSessionById({ id: String(sessionId) });

  return {
    props: {
      session,
    },
  };
};

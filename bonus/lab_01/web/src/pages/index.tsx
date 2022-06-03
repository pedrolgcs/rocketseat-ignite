/* eslint-disable @next/next/no-html-link-for-pages */
import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

const Index = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  console.log(session?.accessToken);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    }
  }
};

export default Index;

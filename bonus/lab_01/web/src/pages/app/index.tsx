import { NextPage } from 'next';
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello {user?.name}</h1>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {},
    };
  },
});

export default Home;

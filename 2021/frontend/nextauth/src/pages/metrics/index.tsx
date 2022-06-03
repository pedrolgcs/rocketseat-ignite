import { GetServerSideProps } from 'next';

// utils
import { withSSRAuth } from '../../utils/auth/withSSRAuth';

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  { roles: ['administrator'] }
);

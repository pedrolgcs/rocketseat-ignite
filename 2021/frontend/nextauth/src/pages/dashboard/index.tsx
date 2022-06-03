import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

// components
import { Can } from '../../components/Can';

// contexts
import { useAuth } from '../../contexts/AuthContext';

// services
import { setupAPIClient, browserClient } from '../../services/api';

// utils
import { withSSRAuth } from '../../utils/auth/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    browserClient
      .get('/me')
      .then((response) => console.table(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>
      <button onClick={signOut}>sign out</button>

      <Can permissions={['users.list', 'users.create']}>
        <h1>Métricas</h1>
      </Can>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    await apiClient.get('/me');

    return {
      props: {},
    };
  }
);

import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

// contexts
import { useAuth } from '../contexts/AuthContext';

// utils
import { withSSRGuest } from '../utils/auth/withSSRGuest';

// styles
import styles from '../styles/pages/home.module.scss';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await signIn({ email, password });
  }

  return (
    <>
      <Head>
        <title>Home | nextAuth</title>
      </Head>

      <main className={styles.container}>
        <h1>Ignite</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});

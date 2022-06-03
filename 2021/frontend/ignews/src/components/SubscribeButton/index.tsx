import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

// services
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

// styles
import styles from './styles.module.scss';

function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      return router.push('/posts');
    }

    try {
      const response = await api.post('/stripe/subscribe');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
      alert('Deu ruim!');
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}

export { SubscribeButton };

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { query as q } from 'faunadb';

// db
import { fauna } from '../../../services/fauna';

type User = {
  email: string;
  image: string;
  name: string;
};

type Subscription = {
  user: User;
  data: {
    id: string;
    price_id: string;
    status: string;
  };
  expires: string;
};

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query<Subscription>(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user?.email as string)
                    )
                  )
                )
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },

    async signIn({ user, account, profile, email, credentials }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(email as string))
              )
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(
              q.Match(q.Index('user_by_email'), q.Casefold(email as string))
            )
          )
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

import { ApolloClient, InMemoryCache } from '@apollo/client';
import env from '../config/environments';

export const client = new ApolloClient({
  uri: env.graphcms_url,
  headers: {
    Authorization: `Bearer ${env.graphcms_api_access_token}`,
  },
  cache: new InMemoryCache(),
});

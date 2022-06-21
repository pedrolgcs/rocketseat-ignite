import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o48m7i0ijg01z7534j1nvp/master',
  cache: new InMemoryCache(),
});

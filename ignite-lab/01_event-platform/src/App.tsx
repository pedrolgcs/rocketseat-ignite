import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { client } from './lib/apollo';
import { Router } from './routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export { App };

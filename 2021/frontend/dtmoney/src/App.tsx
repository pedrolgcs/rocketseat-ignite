import { Toaster } from 'react-hot-toast';

// styles
import { GlobalStyle } from './styles/global';

// contexts
import { AppProvider } from './contexts';

// services
import './services/fakes/mirage';

// pages
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster />
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </>
  );
}

export { App };

import { BrowserRouter as Router } from 'react-router-dom';

// routes
import Routes from './routes';

// styles
import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;

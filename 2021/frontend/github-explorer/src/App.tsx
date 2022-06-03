import { BrowserRouter } from 'react-router-dom';

// routes
import Routes from './routes';

// styles
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;

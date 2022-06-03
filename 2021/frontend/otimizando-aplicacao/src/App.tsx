// components
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

// contexts
import { AppProvider } from './contexts';

// styles
import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  return (
    <AppProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <Content />
      </div>
    </AppProvider>
  );
}

import { Header, Post, Sidebar } from './components';
import styles from './styles/app.module.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post />
        </main>
      </div>
    </div>
  );
}

export default App;

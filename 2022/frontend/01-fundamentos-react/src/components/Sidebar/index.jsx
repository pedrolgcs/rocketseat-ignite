import { PencilLine } from 'phosphor-react';
import { Avatar } from '..';
import styles from './styles.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40"
      />
      <div className={styles.profile}>
        <Avatar url="https://github.com/pedrolgcs.png" />
        <strong>Pedro Henrique</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}

export { Sidebar };

import * as React from 'react';
import logoImg from '../../../assets/logo.svg';
import styles from './styles.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logoImg} alt="todo-app" />
    </header>
  );
};

export { Header };

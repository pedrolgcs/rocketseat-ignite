import * as React from 'react';
import styles from './styles.module.css';

type BadgeProps = {
  children: React.ReactNode;
};

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return <span className={styles.badge}>{children}</span>;
};

export { Badge };

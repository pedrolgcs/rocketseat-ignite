import { NextPage } from 'next';
import Link from 'next/link';

// styles
import styles from './header.module.scss';

const Header: NextPage = () => {
  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <img src="logo.svg" alt="logo" />
        </a>
      </Link>
    </header>
  );
};

export default Header;

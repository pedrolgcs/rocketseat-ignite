// components
import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

// styles
import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}

export { Header };

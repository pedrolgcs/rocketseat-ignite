import styles from './styles.module.css';
import igniteLogo from '../../assets/ignite-logo.svg';

function Header() {
  return (
    <div className={styles.header}>
      <img src={igniteLogo} alt="" />
      <strong>ignite Feed</strong>
    </div>
  );
}

export { Header };

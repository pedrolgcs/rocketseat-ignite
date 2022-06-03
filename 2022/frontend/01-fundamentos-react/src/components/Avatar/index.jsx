import styles from './styles.module.css';

function Avatar({ hasBorder = true, url }) {
  return (
    <img
      src={url}
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    />
  );
}

export { Avatar };

import styles from './styles.module.css';

type AvatarProps = {
  hasBorder?: boolean;
  url: string;
};

function Avatar({ hasBorder = true, url }: AvatarProps) {
  return (
    <img
      src={url}
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    />
  );
}

export { Avatar };

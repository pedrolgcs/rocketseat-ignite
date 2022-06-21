import * as React from 'react';
import styles from './styles.module.css';

type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  hasBorder?: boolean;
  src: string;
};

function Avatar({ hasBorder = true, src }: AvatarProps) {
  return (
    <img
      src={src}
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    />
  );
}

export { Avatar };

import * as React from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export type TextProps = {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
};

function Text({ children, asChild, size = 'md' }: TextProps) {
  const Component = asChild ? Slot : 'span';

  return (
    <Component
      className={clsx('text-gray-100 font-sans', {
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
        'text-md': size === 'lg',
      })}
    >
      {children}
    </Component>
  );
}

export default Text;

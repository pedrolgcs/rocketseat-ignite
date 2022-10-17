import * as React from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export type HeadingProps = {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
};

function Heading({ children, asChild, size = 'md' }: HeadingProps) {
  const Component = asChild ? Slot : 'h2';

  return (
    <Component
      className={clsx('text-gray-100 font-sans font-bold', {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg',
      })}
    >
      {children}
    </Component>
  );
}

export default Heading;

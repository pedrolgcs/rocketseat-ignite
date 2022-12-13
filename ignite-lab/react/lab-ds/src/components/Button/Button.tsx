import * as React from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export type ButtonProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

function Button({ children, asChild }: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={clsx(
        'py-4 px-3 rounded bg-cyan-500 font-semibold text-black text-sm w-full flex items-center justify-center hover:bg-cyan-300 transition-colors focus:ring-2 ring-gray-400'
      )}
    >
      {children}
    </Component>
  );
}

export default Button;

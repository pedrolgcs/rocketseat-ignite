import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

export type TextInputRootProps = {
  children: React.ReactNode;
};

function TextInputRoot({ children }: TextInputRootProps) {
  return (
    <div
      className={clsx(
        'flex items-center h-12 gap-3 py-4 px-3 w-full rounded bg-gray-800  focus-within:ring-2 ring-cyan-300'
      )}
    >
      {children}
    </div>
  );
}

export type TextInputIconProps = {
  children: React.ReactNode;
};

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-gray-400">{children}</Slot>;
}

export type TextInputInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {};

function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className="bg-transparent flex-1 text-gray-100 text-xs outline-none placeholder:text-gray-400"
      {...props}
    />
  );
}

export default {
  Root: TextInputRoot,
  Input: TextInputInput,
  InputIcon: TextInputIcon,
};

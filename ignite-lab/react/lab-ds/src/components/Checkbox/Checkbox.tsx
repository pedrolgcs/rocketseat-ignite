import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { Text } from '@/components';

export type CheckboxRootProps = {
  children: React.ReactNode;
};

function CheckboxRoot({ children }: CheckboxRootProps) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export type CheckboxProps = {};

function CheckboxInput(props: CheckboxProps) {
  return (
    <RadixCheckbox.Root className="w-6 h-6 p-[2px] bg-gray-800 rounded">
      <RadixCheckbox.Indicator asChild>
        <Check weight="bold" className="h-5 w-5 text-cyan-500" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}

export type CheckboxLabelProps = {
  children: string;
};

function CheckboxLabel({ children }: CheckboxLabelProps) {
  return <Text size="sm">{children}</Text>;
}

export default {
  Root: CheckboxRoot,
  Input: CheckboxInput,
  Label: CheckboxLabel,
};

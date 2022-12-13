import { Meta, StoryObj } from '@storybook/react';
import Checkbox, { CheckboxRootProps } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
  args: {
    children: <Checkbox.Input />,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  // decorators: [
  //   (Story) => {
  //     return (
  //       <div className="flex items-center gap-2">
  //         {Story()}
  //         <Text size="sm">Lembrar-me de mim por 30 dias</Text>
  //       </div>
  //     );
  //   },
  // ],
} as Meta<CheckboxRootProps>;

export const Default: StoryObj<CheckboxRootProps> = {
  args: {},
};

export const WithLabel: StoryObj<CheckboxRootProps> = {
  args: {
    children: [
      <Checkbox.Input />,
      <Checkbox.Label>Lembrar-me de mim por 30 dias</Checkbox.Label>,
    ],
  },
};

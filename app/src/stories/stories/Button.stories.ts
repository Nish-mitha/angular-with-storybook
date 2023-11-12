import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../../app/shared/button/button.component';
import { buttonColor } from 'src/app/shared/common/enum';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    color: {
      control: 'select', options: buttonColor
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Confirm',
    color: buttonColor.PRIMARY
  },
};

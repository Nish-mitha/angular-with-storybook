import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../app/shared/button/button.component';
import { buttonColor } from 'src/app/shared/common/enum';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    design: {
        type: 'figma',
        url: "https://www.figma.com/file/CR3xtX6GNEOJ76eOIq8ABH/APP?type=design&node-id=0%3A1&mode=design&t=bq2ImKnHKa3JcR3u-1"
    }
  },
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    color: {
      control: 'select', options: buttonColor
    },
    newEvent: {
      action: 'clicked'
    }
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primay',
    color: buttonColor.PRIMARY,
    loggerText: "This is a primary button",
    dataTestId: "primaryBtn"
  },
};

Primary.play = async ({ canvasElement }) => {
  let canvas = within(canvasElement);
  let button = await canvas.getByTestId("primaryBtn");
  await userEvent.click(button);
}

export const Accent: Story = {
  args: {
    label: 'Accent',
    color: buttonColor.ACCENT,
    loggerText: "This is a accent button",
    dataTestId: "accentBtn"
  },
};

Accent.play = async ({ canvasElement }) => {
  let canvas = within(canvasElement);
  let button = await canvas.getByTestId("accentBtn");
  await userEvent.click(button);
}

export const Warn: Story = {
  args: {
    label: 'Warn',
    color: buttonColor.WARN,
    loggerText: "This is a warn button",
    dataTestId: "warnBtn"
  },
};

Warn.play = async ({ canvasElement }) => {
  let canvas = within(canvasElement);
  let button = await canvas.getByTestId("warnBtn");
  await userEvent.click(button);
}
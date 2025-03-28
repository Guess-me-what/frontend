import Button from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const StyeldButton: Story = {
  args: {
    backgroudnColorType: 'Main',
    border: false,
    text: 'Title',
  },
}

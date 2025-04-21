import { Meta, StoryObj } from '@storybook/react'
import { Input } from '.'

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const StyledInput: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요.',
    type: 'text',
    value: '',
    name: 'email',
    id: 'email',
    onChange: (e) => console.log(e.target.value),
    onKeyDown: (e) => console.log(e.key),
  },
}

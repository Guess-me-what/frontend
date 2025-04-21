import React from 'react'
import * as S from './style'

interface InputProps {
  label: string
  placeholder: string
  type: string
  value: string
  name: string
  id: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: string | ((e: React.KeyboardEvent<HTMLInputElement>) => void)
}

export const Input = ({ ...props }: InputProps) => {
  return (
    <S.InputWrap>
      <span>{props.label}</span>
      <S.InputContainer
        id={props.id}
        name={props.name}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        onKeyDown={(e) => {
          if (typeof e === 'string') {
            document.getElementById(e)?.focus()
          } else {
            if (typeof props.onKeyDown === 'function') {
              props.onKeyDown(e)
            }
          }
        }}
      />
    </S.InputWrap>
  )
}

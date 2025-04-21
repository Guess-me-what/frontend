'use client'

import React from 'react'
import * as S from './style'
import { BackIcon } from '@/assets/icon/Back'
import { Input } from '@/components/common/Input'
import { useAuth } from '@/hooks/auth/useAuth'
import Button from '@/components/common/Button'

const Signup = () => {
  const { ...auth } = useAuth()
  return (
    <S.SignupWrap>
      <BackIcon />
      <S.SignupContainer>
        <S.SignupTitle>
          서비스를 이용하기 위해
          <br />
          회원가입을 진행해 주세요.
        </S.SignupTitle>
        <S.SignupForm>
          <Input
            type='text'
            value={auth.authData.nickname}
            name='nickname'
            id='nickname'
            label='닉네임'
            placeholder='6자 이하'
            onChange={auth.handleSignupChange}
            onKeyDown='email'
          />
          <Input
            type='text'
            value={auth.authData.email}
            name='email'
            id='email'
            label='이메일'
            placeholder='영문 소문자, 숫자 포함'
            onChange={auth.handleSignupChange}
            onKeyDown={'password'}
          />
          <Input
            type='password'
            value={auth.authData.password}
            name='password'
            id='password'
            label='비밀번호'
            placeholder='최소 8자 이상'
            onChange={auth.handleSignupChange}
            onKeyDown={'password'}
          />
        </S.SignupForm>
      </S.SignupContainer>
      <Button
        backgroudnColorType='Main'
        text='회원가입 하기'
        onClick={auth.onSignupSubmit}
      />
    </S.SignupWrap>
  )
}

export default Signup

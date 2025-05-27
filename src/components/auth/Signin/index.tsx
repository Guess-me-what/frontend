'use client'

import React from 'react'
import * as S from './style'
import { BackIcon } from '@/assets/icon/Back'
import { Input } from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useAuth } from '@/hooks/auth/useAuth'
import { useRouter } from 'next/navigation'

const Signin = () => {
  const { ...auth } = useAuth()
  const router = useRouter()
  return (
    <S.SignupWrap>
      <BackIcon onClick={() => router.push('/auth/signup')} />
      <S.SignupContainer>
        <S.SignupTitle>로그인을 진행해 주세요.</S.SignupTitle>
        <S.SignupForm>
          <Input
            type='text'
            value={auth.signinData.email}
            name='email'
            id='email'
            label='이메일'
            placeholder='영문 소문자, 숫자 포함'
            onChange={auth.handleSigninChange}
            onKeyDown='email'
          />
          <Input
            type='password'
            value={auth.signinData.password}
            name='password'
            id='password'
            label='비밀번호'
            placeholder='8자 이상'
            onChange={auth.handleSigninChange}
            onKeyDown={''}
          />
        </S.SignupForm>
      </S.SignupContainer>
      <Button
        backgroudnColorType='Main'
        text='로그인 하기'
        onClick={auth.onSigninSubmit}
      />
    </S.SignupWrap>
  )
}

export default Signin

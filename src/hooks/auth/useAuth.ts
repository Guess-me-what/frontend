import { useSigninMutation, useSignupMutation } from '@/queries/auth/auth.query'
import { AuthType } from '@/types/auth/auth.type'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { useQuizStore } from '@/store/quiz'
import Token from '@/libs/token/tokens'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/token/token.constants'

export const useAuth = () => {
  const [authData, setAuthData] = useState<AuthType>({
    nickname: '',
    email: '',
    password: '',
  })
  const [signinData, setSigninData] = useState<Omit<AuthType, 'nickname'>>({
    email: '',
    password: '',
  })

  const router = useRouter()
  const { setNickname } = useQuizStore()

  const handleSigninChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setSigninData((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [setSigninData]
  )

  const handleSignupChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setAuthData((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [setAuthData]
  )

  const signupMutation = useSignupMutation()
  const onSignupSubmit = () => {
    signupMutation.mutate(authData, {
      onSuccess: () => {
        setNickname(authData.nickname)
        alert('회원가입 성공')
        router.push('/auth/signin')
      },
      onError: (error) => {
        alert((error as AxiosError).message)
      },
    })
  }

  const signinMutation = useSigninMutation()
  const onSigninSubmit = () => {
    signinMutation.mutate(signinData, {
      onSuccess: (response) => {
        try {
          const { accessToken, refreshToken, nickname } = response.data
          
          // 토큰 저장
          Token.setToken(ACCESS_TOKEN_KEY, accessToken)
          Token.setToken(REFRESH_TOKEN_KEY, refreshToken)
          
          // 서버에서 받은 닉네임 설정
          if (nickname) {
            setNickname(nickname)
          }
          
          alert('로그인 성공')
          router.push('/quiz')
        } catch (error) {
          console.error('로그인 처리 중 오류 발생:', error)
          Token.clearToken() // 토큰 초기화
          alert('로그인 처리 중 오류가 발생했습니다.')
        }
      },
      onError: (error) => {
        console.error('로그인 실패:', error)
        alert((error as AxiosError).message)
      },
    })
  }

  return {
    authData,
    signinData,
    handleSignupChange,
    handleSigninChange,
    onSignupSubmit,
    onSigninSubmit,
  }
}

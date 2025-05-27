import { useSigninMutation, useSignupMutation } from '@/queries/auth/auth.query'
import { AuthType } from '@/types/auth/auth.type'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useCallback, useState } from 'react'

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

  const handleSigninChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setSigninData((prev) => ({
        ...prev,
        [name]: value,
      }))

      console.log(signinData)
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
      onSuccess: () => {
        alert('로그인 성공')
        router.push('/')
      },
      onError: (error) => {
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

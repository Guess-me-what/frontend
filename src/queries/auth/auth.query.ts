import authRepository from '@/repositories/auth/auth.repository'
import { AuthType } from '@/types/auth/auth.type'
import { useMutation } from '@tanstack/react-query'
import { QUERY_KEYS } from '../queryKeys'

export const useSignupMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: AuthType) => authRepository.signup(data),
  })

  return mutation
}

export const useSigninMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: Omit<AuthType, 'nickname'>) =>
      authRepository.signin(data),
  })

  return mutation
}

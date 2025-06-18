import { InternalAxiosRequestConfig } from 'axios'
import Token from '../token/tokens'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from '../../constants/token/token.constants'

const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (typeof window !== 'undefined') {
    const accessToken = Token.getToken(ACCESS_TOKEN_KEY)
    const refreshToken = Token.getToken(REFRESH_TOKEN_KEY)

    // 로그인/회원가입 요청인 경우 토큰 체크를 건너뜁니다
    if (config.url?.includes('/auth/signin') || config.url?.includes('/auth/signup')) {
      return config
    }

    if (!accessToken || !refreshToken) {
      console.error('Access token or refresh token not found.')
      window.location.href = '/auth/signin'
    } else {
      config.headers[REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`
    }
  }

  return config
}

export default requestInterceptor

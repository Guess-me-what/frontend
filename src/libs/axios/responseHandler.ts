import { AxiosError } from 'axios'
import Token from '../token/tokens'
import guessMeWhatAxios from './customAxios'
import {
  REQUEST_TOKEN_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '../../constants/token/token.constants'

let isRefreshing = false
let refreshSubscribers: ((accessToken: string) => void)[] = []

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken))
  refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback)
}

const ResponseHandler = async (error: AxiosError) => {
  const { config: originalRequest, response } = error

  if (response) {
    const { status } = response

    const usingAccessToken = Token.getToken(ACCESS_TOKEN_KEY)
    const usingRefreshToken = Token.getToken(REFRESH_TOKEN_KEY)

    if (
      status === 401 &&
      usingAccessToken !== undefined &&
      usingRefreshToken !== undefined &&
      !isRefreshing
    ) {
      isRefreshing = true

      try {
        const { data: newAccessToken } = await guessMeWhatAxios.post(
          '/auth/refresh',
          {
            refreshToken: usingRefreshToken,
          }
        )

        guessMeWhatAxios.defaults.headers.common[
          REQUEST_TOKEN_KEY
        ] = `Bearer ${newAccessToken}`

        Token.setToken(ACCESS_TOKEN_KEY, newAccessToken)

        isRefreshing = false
        onTokenRefreshed(newAccessToken)

        return new Promise((resolve) => {
          addRefreshSubscriber((accessToken: string) => {
            originalRequest!.headers![
              REQUEST_TOKEN_KEY
            ] = `Bearer ${accessToken}`
            resolve(guessMeWhatAxios(originalRequest!))
          })
        })
      } catch (error) {
        console.error('Failed to refresh access token:', error)
        Token.clearToken()
        window.alert('세션이 만료되었습니다.')
        window.location.href = '/login'
      }
    }

    if (status === 401 && isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber((accessToken: string) => {
          originalRequest!.headers![REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`
          resolve(guessMeWhatAxios(originalRequest!))
        })
      })
    }
  }

  return Promise.reject(error)
}

export default ResponseHandler

import axios, { AxiosRequestConfig } from 'axios'
import CONFIG from '@/config/config.json'
import {
  ACCESS_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from '@/constants/token/token.constants'
import token from '../token/tokens'
import requestInterceptor from './requestInterceptor'
import ResponseHandler from './responseHandler'

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: CONFIG.SERVER,
  withCredentials: true,
}

const guessMeWhatAxios = axios.create(axiosRequestConfig)
guessMeWhatAxios.interceptors.request.use(requestInterceptor as any, (err) =>
  Promise.reject(err)
)
guessMeWhatAxios.interceptors.response.use((res) => res, ResponseHandler)

export default guessMeWhatAxios

export const setAccessToken = (token: string) => {
  guessMeWhatAxios.defaults.headers[REQUEST_TOKEN_KEY] = `Bearer ${token}`
}

import { AuthType } from '@/types/auth/auth.type'
import axios from 'axios'
import CONFIG from '@/config/config.json'

interface SigninResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    nickname: string;
  };
}

const authRepository = {
  async signup(data: AuthType) {
    await axios.post(`${CONFIG.SERVER}/auth/signup`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  async signin(data: Omit<AuthType, 'nickname'>): Promise<SigninResponse> {
    try {
      const response = await axios.post(`${CONFIG.SERVER}/auth/signin`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || '로그인에 실패했습니다.')
      }
      throw error
    }
  }
}

export default authRepository

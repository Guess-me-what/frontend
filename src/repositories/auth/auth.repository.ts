import { AuthType } from '@/types/auth/auth.type'
import axios from 'axios'
import CONFIG from '@/config/config.json'

class AuthRepository {
  public async signup(data: AuthType) {
    await axios.post(`${CONFIG.SERVER}/auth/signup`, data, {
      withCredentials: true,
    })
  }

  public async signin(data: Omit<AuthType, 'nickname'>) {
    await axios.post(`${CONFIG.SERVER}/auth/signin`, data)
  }
}

const authRepository = new AuthRepository()

export default authRepository

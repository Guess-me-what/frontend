import { AxiosError } from 'axios'

const ResponseHandler = (error: AxiosError) => {
  return Promise.reject(error)
}

export default ResponseHandler

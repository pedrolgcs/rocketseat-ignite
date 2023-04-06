import axios, { AxiosError, AxiosInstance } from 'axios'
import { AppError } from '@/utils/Error'

export type AxiosErrorData = {
  friendlyMessage: string
  errors?: Array<{
    message: string
  }>
}

const createAxiosInstance = (
  callback: (axiosInstance: AxiosInstance) => AxiosInstance,
) => {
  const api = axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  })

  return callback(api)
}

const api = createAxiosInstance((axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.baseURL = '/api'
      return config
    },

    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (err: AxiosError<AxiosErrorData>) => {
      const friendlyMessage = err.response?.data.friendlyMessage
      const statusCode = err.response?.status
      const error = err

      return Promise.reject(new AppError(friendlyMessage, statusCode, error))
    },
  )

  return axiosInstance
})

export { api }

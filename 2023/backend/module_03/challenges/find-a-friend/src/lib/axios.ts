import axios, { AxiosInstance } from 'axios'

const axiosCreateInstance = (
  callback: (axiosInstance: AxiosInstance) => AxiosInstance,
) => {
  const api = axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use((request) => {
    return request
  })

  api.interceptors.response.use((response) => {
    return response
  })

  return callback(api)
}

const viaCepAPI = axiosCreateInstance((axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    config.baseURL = 'https://viacep.com.br/ws'
    return config
  })

  return axiosInstance
})

export { viaCepAPI }

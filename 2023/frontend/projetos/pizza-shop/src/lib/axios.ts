import axios from 'axios'

import { env } from '@/env'

const api = axios.create({
  withCredentials: true,
  baseURL: env.VITE_API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response?.status
    const code = error.response?.data.code

    if (status === 401 && code === 'UNAUTHORIZED') {
      window.location.replace('/sign-in')
    }

    return error
  },
)

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 2000)),
    )
    return config
  })
}

export { api }

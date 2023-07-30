import path from 'node:path'
import { env } from '@/env'

type DriverConfig = Record<string, unknown> & {
  baseURL: string
}

interface UploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string
  publicFolder: string
  disk: DriverConfig
  aws: DriverConfig

  getPathFolder(folder: string): string
}

const uploadConfig = {
  driver: env.STORAGE_DRIVER,

  tmpFolder: path.resolve('tmp'),

  publicFolder: path.resolve('public'),

  disk: {
    baseURL: 'http://localhost:3333/public',
  },

  aws: {
    baseURL: '',
  },

  getPathFolder(folder: string): string {
    return path.resolve(folder)
  },
} as UploadConfig

export { uploadConfig }

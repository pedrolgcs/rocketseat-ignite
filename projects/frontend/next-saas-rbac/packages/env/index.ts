import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH__CLIENT_REDIRECT_URI: z.string().url(),
    MAIL_PROVIDER: z.enum(['mailtrap', 'ses']),
  },

  client: {},

  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    GITHUB_OAUTH__CLIENT_REDIRECT_URI:
      process.env.GITHUB_OAUTH__CLIENT_REDIRECT_URI,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    MAIL_PROVIDER: process.env.MAIL_PROVIDER,
  },
})

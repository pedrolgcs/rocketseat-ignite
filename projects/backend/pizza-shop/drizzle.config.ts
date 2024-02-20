import type { Config } from 'drizzle-kit'

import { env } from '@/infra/env'
export default {
  schema: './src/infra/db/schema/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config

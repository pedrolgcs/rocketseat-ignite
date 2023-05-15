import { config } from 'dotenv'
import { z } from 'zod'

// load env file
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

// schema validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  APP_PORT: z.coerce.number().default(3333),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DATABASE_URL: z.string().default('./db/app.db'),
})

const env = envSchema.parse(process.env)

export { env }

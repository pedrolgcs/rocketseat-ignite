import 'dotenv/config'
import { z } from 'zod'

// schema validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  APP_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
})

const env = envSchema.parse(process.env)

export { env }

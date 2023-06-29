import 'dotenv/config'
import { z } from 'zod'

// schema validation
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  APP_PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

const env = _env.data

export { env }

import Elysia from 'elysia'
import { z } from 'zod'

import { ZodValidationError } from '@/infra/http/errors'

const bodySchema = z.object({
  email: z.string().email(),
})

export const sendAuthLinkRouter = new Elysia().post(
  '/authenticate',
  async ({ body, set }) => {
    const parseBody = bodySchema.safeParse(body)

    if (!parseBody.success) {
      throw new ZodValidationError({ error: parseBody.error })
    }

    const { email } = parseBody.data
  },
)

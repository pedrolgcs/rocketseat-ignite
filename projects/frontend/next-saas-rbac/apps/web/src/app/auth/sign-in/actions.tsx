'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithPassword } from '@/http/requests'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid email address.' }),
  password: z.string().min(1, { message: 'Please, provide a password.' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    console.log(token)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Something went wrong. Please, try again later.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}

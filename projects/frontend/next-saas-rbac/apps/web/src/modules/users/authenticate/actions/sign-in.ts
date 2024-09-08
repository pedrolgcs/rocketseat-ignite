'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { actionClient } from '@/lib/safe-action'

import { signInWithPassword } from '../http/requests/sign-in-with-password'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid email address.' }),
  password: z.string().min(1, { message: 'Please, provide a password.' }),
})

export const signInAction = actionClient.schema(schema).action(
  async (data) => {
    const {
      parsedInput: { email, password },
    } = data

    const { token } = await signInWithPassword({
      email,
      password,
    })

    cookies().set('@saas:token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  },
  {
    onSuccess: () => {
      redirect('/')
    },
  },
)

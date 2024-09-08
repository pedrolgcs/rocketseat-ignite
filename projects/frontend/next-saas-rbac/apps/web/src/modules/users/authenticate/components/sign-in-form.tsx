'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInAction } from '../actions/sign-in'
import { GithubOauth } from './github-oauth'
import { InputErro } from './ui/input-error'

const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid email address.' }),
  password: z.string().min(1, { message: 'Please, provide a password.' }),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const { hasErrored, result, isPending, executeAsync } =
    useAction(signInAction)

  const { register, handleSubmit, formState } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  const handleSignIn = async (data: SignInForm) => {
    const { email, password } = data

    await executeAsync({
      email,
      password,
    })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        {hasErrored && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed</AlertTitle>
            <AlertDescription>
              <p>{result.serverError}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" {...register('email')} />

          {formState.errors.email?.message && (
            <InputErro error={formState.errors.email?.message} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" {...register('password')} />

          {formState.errors.password?.message && (
            <InputErro error={formState.errors.password.message} />
          )}

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {isPending ? (
          <Button type="submit" className="w-full" disabled={isPending}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign in with e-mail
          </Button>
        )}

        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <GithubOauth label="Sign in with github" />
    </div>
  )
}

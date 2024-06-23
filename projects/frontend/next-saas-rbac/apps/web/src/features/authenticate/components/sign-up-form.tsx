'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signUp } from '../actions'
import { GithubOauth } from './github-oauth'

export function SignUpForm() {
  const router = useRouter()

  function onSuccessForm() {
    toast.success('Sign up successful!')
    router.push('/auth/sign-in')
  }

  const [state, handleSubmit, isPending] = useFormState(signUp, onSuccessForm)

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!state.success && state.message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed</AlertTitle>
            <AlertDescription>
              <p>{state.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" type="text" id="name" />

          {state.errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />

          {state.errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />

          {state.errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />

          {state.errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.password_confirmation[0]}
            </p>
          )}
        </div>

        {isPending ? (
          <Button type="submit" className="w-full" disabled={isPending}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full ">
            Create account
          </Button>
        )}

        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <GithubOauth label="Sign up with github" />
    </div>
  )
}

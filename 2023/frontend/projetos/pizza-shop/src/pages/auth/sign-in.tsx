import { Helmet } from 'react-helmet-async'

import { SignInForm } from '@/features/authentication'
import { cn } from '@/lib/utils'

export function SignInPage() {
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div
          className={cn(
            'flex flex-col justify-center gap-6',
            'md:w-[450px]',
            'lg:w-[350px]',
          )}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <SignInForm />
        </div>
      </div>
    </>
  )
}

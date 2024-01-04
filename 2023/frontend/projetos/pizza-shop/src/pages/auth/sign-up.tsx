import { Helmet } from 'react-helmet-async'

import { SignUpForm } from '@/features/authentication'
import { cn } from '@/lib/utils'

export function SignUpPage() {
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <div
          className={cn(
            'flex w-full flex-col justify-center gap-6',
            'md:w-[450px]',
            'lg:w-[350px]',
          )}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </>
  )
}

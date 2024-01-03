import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Email obrigatório' })
    .email('Email inválido'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignInPage() {
  const { toast } = useToast()

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSignIn = async (data: SignInForm) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: 'Email enviado',
      description: 'Enviamos um link de autenticação para seu e-mail.',
      action: (
        <ToastAction
          altText="Reenviar"
          onClick={form.handleSubmit(handleSignIn)}
        >
          Reenviar
        </ToastAction>
      ),
    })
  }

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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignIn)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu e-mail</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={form.formState.isSubmitting} className="w-full">
                Acessar painel
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/sign-up">Novo estabelecimento</Link>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

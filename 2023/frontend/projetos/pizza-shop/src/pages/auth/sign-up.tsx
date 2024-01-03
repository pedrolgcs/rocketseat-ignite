import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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

const signUpFormSchema = z.object({
  restaurantName: z
    .string({ required_error: 'Nome obrigatório' })
    .min(3, { message: 'Nome deve ter pelo menos 3 letras' }),
  managerName: z
    .string({ required_error: 'Nome obrigatório' })
    .min(3, { message: 'Nome deve ter pelo menos 3 letras' }),
  phone: z
    .string({ required_error: 'Telefone obrigatório' })
    .min(10, { message: 'Telefone inválido' }),
  email: z.string().email('Email inválido'),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUpPage() {
  const navigate = useNavigate()

  const { toast } = useToast()

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      managerName: '',
      restaurantName: '',
      email: '',
      phone: '',
    },
  })

  const handleSignUp = async (data: SignUpForm) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: 'Sucesso!',
      description: 'Restaurante cadastrado com sucesso.',
      action: (
        <ToastAction altText="Login" onClick={() => navigate('/sign-in')}>
          Login
        </ToastAction>
      ),
    })
  }

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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do estabelecimento</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="managerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu celular</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={form.formState.isSubmitting} className="w-full">
                Finalizar cadastro
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/sign-in">Fazer login</Link>
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com nossos{' '}
                <a href="#" className="underline underline-offset-2">
                  termos de serviço
                </a>{' '}
                e{' '}
                <a href="#" className="underline underline-offset-2">
                  políticas de privacidade
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

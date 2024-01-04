import { zodResolver } from '@hookform/resolvers/zod'
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

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Email obrigatório' })
    .email('Email inválido'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignInForm() {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
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
  )
}

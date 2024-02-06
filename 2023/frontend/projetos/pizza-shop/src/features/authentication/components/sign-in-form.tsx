import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
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

import { useSignInMutation } from '../hooks/use-sign-in-mutation'

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Email obrigatório' })
    .email('Email inválido'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { mutateAsync: authenticate } = useSignInMutation()

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const handleSignIn = async (data: SignInForm) => {
    try {
      await authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            handleSignIn(data)
          },
        },
      })
    } catch (error) {
      toast.error('Email inválido ou inexistente.', {
        action: {
          label: 'Novo cadastro',
          onClick: () => navigate(`/sign-up?email=${data.email}`),
        },
      })
    }
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

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          Acessar painel
        </Button>

        <Button variant="outline" className="w-full" asChild>
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
      </form>
    </Form>
  )
}

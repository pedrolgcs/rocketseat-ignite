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

import { useRegisterRestaurantMutation } from '../hooks/useRegisterRestaurantMutation.ts'

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

export function SignUpForm() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { mutateAsync: registerRestaurant } = useRegisterRestaurantMutation()

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      managerName: '',
      restaurantName: '',
      email: searchParams.get('email') ?? '',
      phone: '',
    },
  })

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await registerRestaurant({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
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
  )
}

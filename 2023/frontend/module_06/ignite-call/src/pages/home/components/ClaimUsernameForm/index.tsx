import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput, Text } from '@pedrolgcs-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as S from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens',
    })
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

function ClaimUsernameForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit(handleClaimUsername)}>
        <S.FormContent>
          <TextInput
            size="sm"
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          <Button size="sm" type="submit" disabled={isSubmitting}>
            Reservar
            <ArrowRight />
          </Button>
        </S.FormContent>
      </S.Form>

      <S.FormAnnotation>
        <Text>
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </S.FormAnnotation>
    </>
  )
}

export { ClaimUsernameForm }

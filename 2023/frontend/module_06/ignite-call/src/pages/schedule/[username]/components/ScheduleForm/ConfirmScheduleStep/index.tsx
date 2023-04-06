import * as React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@pedrolgcs-ignite-ui/react'
import dayjs from 'dayjs'
import { CalendarBlank, Clock, SignIn } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutationCreateScheduling } from '@/hooks/useScheduleMutation'
import * as S from './styles'

const confirmScheduleFormSchema = z.object({
  observations: z.string().nullable(),
})

type ConfirmScheduleFormSchema = z.infer<typeof confirmScheduleFormSchema>

type ConfirmScheduleStepProps = {
  schedulingDate: Date
  onResetConfirmation: () => void
}

function ConfirmScheduleStep({
  schedulingDate,
  onResetConfirmation,
}: ConfirmScheduleStepProps) {
  const { register, handleSubmit } = useForm<ConfirmScheduleFormSchema>({
    resolver: zodResolver(confirmScheduleFormSchema),
  })

  const router = useRouter()
  const session = useSession()

  const username = String(router.query.username)
  const isSignedIn = session.status === 'authenticated'

  const { mutate: createScheduling, isLoading: isLoadingCreateScheduling } =
    useMutationCreateScheduling(username)

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  const handleConfirmScheduling = async (data: ConfirmScheduleFormSchema) => {
    const { observations } = data

    createScheduling(
      {
        name: session.data?.user.name!,
        email: session.data?.user.email!,
        observations,
        date: schedulingDate,
      },
      {
        onSuccess: () => {
          onResetConfirmation()
        },
      },
    )
  }

  if (!isSignedIn) {
    return (
      <S.NotAuthenticatedBox>
        <S.NotAuthenticatedError as="h3">
          Realize o login para continuar o agendamento
        </S.NotAuthenticatedError>

        <Button type="button" variant="secondary" onClick={() => signIn()}>
          Entrar
          <SignIn />
        </Button>
      </S.NotAuthenticatedBox>
    )
  }

  return (
    <S.FormBox>
      <S.ConfirmForm onSubmit={handleSubmit(handleConfirmScheduling)}>
        <S.FormHeader>
          <Text>
            <CalendarBlank />
            {describeDate}
          </Text>

          <Text>
            <Clock />
            {describeTime}
          </Text>
        </S.FormHeader>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput name="name" value={session.data.user.name} disabled />
        </label>

        <label>
          <Text size="sm">Endereço de e-mail</Text>
          <TextInput
            name="email"
            type="email"
            disabled
            value={session.data.user.email}
          />
        </label>

        <label>
          <Text size="sm">Observações</Text>
          <TextArea {...register('observations')} />
        </label>

        <S.FormActions>
          <Button
            type="button"
            variant="tertiary"
            onClick={onResetConfirmation}
          >
            Cancelar
          </Button>

          <Button type="submit" disabled={isLoadingCreateScheduling}>
            Confirmar
          </Button>
        </S.FormActions>
      </S.ConfirmForm>
    </S.FormBox>
  )
}

export { ConfirmScheduleStep }

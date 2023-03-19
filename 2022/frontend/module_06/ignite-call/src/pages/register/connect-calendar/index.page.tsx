import * as React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Heading, MultiStep, Text } from '@pedrolgcs-ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { SignInError } from '@/components'
import * as S from './styles'

export default function Register() {
  const router = useRouter()
  const session = useSession()

  const isSignedIn = session.status === 'authenticated'
  const signInError = router.query.error
  const hasAuthError = !!signInError && !isSignedIn

  async function handleConnectCalendar() {
    await signIn('google')
  }

  function handleNavigateToNextStage() {
    router.push('/register/time-intervals')
  }

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </S.Header>

      <S.ConnectBox>
        <S.ConnectItem>
          <Text>Google Calendar</Text>

          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </S.ConnectItem>

        {hasAuthError && (
          <S.AuthErrorContainer>
            <SignInError error={signInError.toString()} />
          </S.AuthErrorContainer>
        )}

        <Button
          type="button"
          disabled={!isSignedIn}
          onClick={handleNavigateToNextStage}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </S.Container>
  )
}

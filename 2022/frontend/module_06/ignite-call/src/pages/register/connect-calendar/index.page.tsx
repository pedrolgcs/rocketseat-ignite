import * as React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Heading, MultiStep, Text } from '@pedrolgcs-ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import * as S from './styles'

const authErrors = (error: string) => {
  switch (error) {
    case 'OAuthAccountNotLinked':
      return 'Falha ao se conectar ao Google, conta já utilizada'
    case 'OAuthPermissions':
      return 'Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar.'
    case 'OAuthCreateAccount':
      return 'Falha ao se conectar ao Google, por favor tente criar uma nova conta na aplicação'
    default:
      return 'Falha ao se conectar ao Google, por favor tente novamente'
  }
}

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
          <S.AuthError size="sm">
            {authErrors(signInError.toString())}
          </S.AuthError>
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

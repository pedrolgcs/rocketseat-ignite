import * as React from 'react'
import * as S from './styles'

const EXPECTED_ERRORS: Record<string, () => React.ReactElement> = {
  OAuthAccountNotLinked: () => {
    return <>Falha ao se conectar ao Google, conta já utilizada.</>
  },
  OAuthPermissions: () => {
    return (
      <>
        Falha ao se conectar ao Google, verifique se você habilitou as
        permissões de acesso ao Google Calendar.
      </>
    )
  },
  OAuthCreateAccount: () => {
    return (
      <>
        Falha ao se conectar, usuário não possui cadastro ativo no sistema, por
        favor realize-o clicando
        <S.RedirectLink href="/register">aqui</S.RedirectLink>
      </>
    )
  },
  OAuthDefault: () => {
    return <>Falha ao se conectar ao Google, por favor tente novamente</>
  },
}

type SignInErrorProps = {
  error: string
}

function SignInError({ error }: SignInErrorProps) {
  const Error = React.useMemo(() => {
    if (error in EXPECTED_ERRORS) {
      return EXPECTED_ERRORS[error]
    }

    return EXPECTED_ERRORS.OAuthDefault
  }, [error])

  return (
    <S.Container size="sm">
      <Error />
    </S.Container>
  )
}

export { SignInError }

import * as React from 'react'
import * as S from './styles'

const authErros = (error: string) => {
  switch (error) {
    case 'OAuthAccountNotLinked':
      return <>Falha ao se conectar ao Google, conta já utilizada.</>
    case 'OAuthPermissions':
      return (
        <>
          Falha ao se conectar ao Google, verifique se você habilitou as
          permissões de acesso ao Google Calendar.
        </>
      )
    case 'OAuthCreateAccount':
      return (
        <>
          Falha ao se conectar, usuário não possui cadastro ativo no sistema,
          por favor realize-o clicando
          <S.RedirectLink href="/register">aqui</S.RedirectLink>
        </>
      )
    default:
      return <>Falha ao se conectar ao Google, por favor tente novamente.</>
  }
}

type SignInErrorProps = {
  error: string
}

function SignInError({ error }: SignInErrorProps) {
  const errorMessage = React.useMemo(() => {
    return authErros(error)
  }, [error])

  return <S.Container size="sm">{errorMessage}</S.Container>
}

export { SignInError }

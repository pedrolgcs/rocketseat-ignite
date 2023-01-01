import Image from 'next/image'
import { Heading, Text } from '@pedrolgcs-ignite-ui/react'
import { ClaimUsernameForm } from './components'
import * as S from './styles'

export default function Home() {
  return (
    <S.Container>
      <S.Hero>
        <Heading as="h1" size={'4xl'}>
          Agendamento descomplicado
        </Heading>

        <Text size={'xl'}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </S.Hero>

      <S.Preview>
        <Image
          quality={100}
          priority
          width={700}
          height={400}
          alt="Calendário simbolizando aplicação funcionando"
          src="/images/logo.svg"
        />
      </S.Preview>
    </S.Container>
  )
}

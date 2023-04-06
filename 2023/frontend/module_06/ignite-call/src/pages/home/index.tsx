import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Heading, Text } from '@pedrolgcs-ignite-ui/react'
import { ClaimUsernameForm } from './components'
import * as S from './styles'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <S.Container>
        <S.Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>

          <Text size="xl">
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
            src="/images/app-preview.png"
          />
        </S.Preview>
      </S.Container>
    </>
  )
}

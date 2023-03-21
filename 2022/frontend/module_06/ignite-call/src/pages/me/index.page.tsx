import * as React from 'react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { Heading, Text } from '@pedrolgcs-ignite-ui/react'
import { useQuerySchedulesByUser } from '@/hooks/useScheduleQuery'
import { withSSRAuth } from '@/utils/auth/with-ssr-auth'
import * as S from './styles'

export default function Me() {
  const session = useSession()

  const { data } = useQuerySchedulesByUser(session.data?.user.username!)

  console.log(data?.schedules)

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Olá Pedro Henrique</Heading>

        <Text>Front-end developer at @ioasys</Text>
      </S.Header>
    </S.Container>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx, session) => {
    return {
      props: {
        session,
      },
    }
  },
)

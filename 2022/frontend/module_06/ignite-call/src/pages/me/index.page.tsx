import * as React from 'react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { Heading, Text } from '@pedrolgcs-ignite-ui/react'
import dayjs from 'dayjs'
import { useQuerySchedulesByUser } from '@/hooks/useScheduleQuery'
import { withSSRAuth } from '@/utils/auth/with-ssr-auth'
import * as S from './styles'

export default function Me() {
  const session = useSession()

  const { data } = useQuerySchedulesByUser(session.data?.user.username!)

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Olá Pedro Henrique</Heading>

        <Text>Front-end developer at @ioasys</Text>
      </S.Header>

      <S.Ul>
        {data?.schedules &&
          Object.entries(data.schedules).map((schedule) => {
            const [day, schedules] = schedule

            return (
              <S.Li key={day}>
                <Heading as="h3">{dayjs(day).format('DD[ de ]MMMM')}</Heading>

                {schedules.map((schedule) => (
                  <S.Schedule key={schedule.id}>
                    <S.ScheduleDescription>
                      <Text>{schedule.name}</Text>
                      <Text>{schedule.email}</Text>
                      <Text>{schedule.observations}</Text>
                    </S.ScheduleDescription>

                    <S.ScheduleTime as="time">
                      {dayjs(schedule.date).format('h:mm A')}
                    </S.ScheduleTime>
                  </S.Schedule>
                ))}
              </S.Li>
            )
          })}
      </S.Ul>
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

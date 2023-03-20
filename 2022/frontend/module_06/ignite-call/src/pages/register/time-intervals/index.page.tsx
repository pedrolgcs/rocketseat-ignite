import * as React from 'react'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Heading,
  Text,
  MultiStep,
  Checkbox,
  TextInput,
  Button,
} from '@pedrolgcs-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { withSSRAuth } from '@/utils/auth/with-ssr-auth'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { AppError } from '@/utils/Error'
import { getWeekDays } from '@/utils/get-week-days'
import * as S from './styles'

const timeIntervalFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled === true),
    )
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia na semana!',
    })
    .transform((intervals) =>
      intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      }),
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        ),
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início!',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalFormSchema>

export default function TimeIntervals() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields: intervals } = useFieldArray({
    name: 'intervals',
    control,
  })

  const watchIntervals = watch('intervals')

  const weekDays = getWeekDays({ short: false })

  async function handleSetTimeIntervals(data: unknown) {
    const { intervals } = data as TimeIntervalsFormOutput

    try {
      await api.post<void>('/users/time-intervals', {
        intervals,
      })

      router.push('/register/update-profile')
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.friendlyMessage)
      }
    }
  }

  return (
    <>
      <NextSeo title="Selecione sua disponibilidade | Ignite Call" noindex />

      <S.Container>
        <S.Header>
          <Heading as="strong">Quase lá!</Heading>
          <Text>
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>

          <MultiStep size={4} currentStep={3} />
        </S.Header>

        <S.IntervalBox>
          <S.IntervalForm onSubmit={handleSubmit(handleSetTimeIntervals)}>
            <S.IntervalContainer>
              {intervals.map((field, index) => (
                <S.IntervalItem key={field.id}>
                  <S.IntervalDay>
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )}
                    />
                    <Text>{weekDays[field.weekDay]}</Text>
                  </S.IntervalDay>
                  <S.IntervalInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={watchIntervals[index].enabled === false}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={watchIntervals[index].enabled === false}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </S.IntervalInputs>
                </S.IntervalItem>
              ))}
            </S.IntervalContainer>

            {errors.intervals && (
              <S.FormError size="sm">{errors.intervals.message}</S.FormError>
            )}

            <Button type="submit" disabled={isSubmitting}>
              Próximo passo <ArrowRight />
            </Button>
          </S.IntervalForm>
        </S.IntervalBox>
      </S.Container>
    </>
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

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCycles } from '@/contexts'
import { ICycle } from '@/entities/cycle'
import {
  NewCycleForm,
  Countdown,
  newCycleFormValidationSchema,
  NewCycleFormData,
} from './components'
import * as S from './Home.styles'

const Home: React.FC = () => {
  const { interruptCurrentCycle, addNewCycle, setSecondsPassed, activeCycle } =
    useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  // auxiliary variables
  const task = watch('task')
  const isSubmitDisabled = !task

  function onSubmit(data: NewCycleFormData) {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    addNewCycle(newCycle)
    reset()
  }

  function handleInterruptCycle() {
    interruptCurrentCycle()
    setSecondsPassed(0)
  }

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}

export default Home

import * as React from 'react'
import { differenceInSeconds } from 'date-fns'
import { useCycles } from '@/contexts'
import * as S from './Countdown.styles'

function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  } = useCycles()

  const totalCycleSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle
    ? totalCycleSeconds - amountSecondsPassed
    : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const formattedMinutes = String(minutesAmount).padStart(2, '0')
  const formattedSeconds = String(secondsAmount).padStart(2, '0')

  React.useEffect(() => {
    let interval: ReturnType<typeof setTimeout>

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (secondsDifference >= totalCycleSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalCycleSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    activeCycle,
    totalCycleSeconds,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ])

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer - ${formattedMinutes}:${formattedSeconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [formattedMinutes, formattedSeconds, activeCycle])

  return (
    <S.CountdownContainer>
      <span>{formattedMinutes[0]}</span>
      <span>{formattedMinutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{formattedSeconds[0]}</span>
      <span>{formattedSeconds[1]}</span>
    </S.CountdownContainer>
  )
}

export default Countdown

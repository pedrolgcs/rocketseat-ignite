import * as React from 'react'
import { differenceInSeconds } from 'date-fns'
import { ICycle } from '@/entities/cycle'
import * as actions from './actions'
import { inicialState, cyclesReducer } from './reducer'

type createNewCycleData = Pick<ICycle, 'task' | 'minutesAmount'>

type CyclesContextData = {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  amountSecondsPassed: number
  createNewCycle: (cycle: createNewCycleData) => void
  markCurrentCycleAsFinished: () => void
  interruptCurrentCycle: () => void
  setSecondsPassed: (seconds: number) => void
}

const CyclesContext = React.createContext<CyclesContextData>({
  cycles: [],
  activeCycle: undefined,
  amountSecondsPassed: 0,
  createNewCycle: () => {},
  markCurrentCycleAsFinished: () => {},
  interruptCurrentCycle: () => {},
  setSecondsPassed: () => {},
})

type CyclesProviderProps = {
  children: React.ReactNode
}

function CyclesProvider({ children }: CyclesProviderProps) {
  const [{ cycles, activeCycleId }, dispatch] = React.useReducer(
    cyclesReducer,
    inicialState,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycleId) {
      return differenceInSeconds(new Date(), new Date(activeCycle!.startedAt))
    }

    return 0
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const createNewCycle = React.useCallback((data: createNewCycleData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    dispatch(actions.createNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }, [])

  const markCurrentCycleAsFinished = React.useCallback(() => {
    dispatch(actions.finishedCurrentCycleAction())
  }, [])

  const interruptCurrentCycle = React.useCallback(() => {
    dispatch(actions.interruptCurrentCycleAction())
  }, [])

  const setSecondsPassed = React.useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds)
  }, [])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        createNewCycle,
        markCurrentCycleAsFinished,
        interruptCurrentCycle,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

function useCycles() {
  const context = React.useContext(CyclesContext)

  if (!context) {
    throw new Error('useCycles must be used within an Cycles provider')
  }

  return context
}

export { CyclesProvider, useCycles }

import * as React from 'react'
import { differenceInSeconds } from 'date-fns'
import { ICycle } from '@/entities/cycle'

type CreateNewCycle = Pick<ICycle, 'task' | 'minutesAmount'>

type CyclesContextData = {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  amountSecondsPassed: number
  createNewCycle: (cycle: CreateNewCycle) => void
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
  const [cycles, setCycles] = React.useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycleId) {
      return differenceInSeconds(new Date(), new Date(activeCycle!.startedAt))
    }

    return 0
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const createNewCycle = React.useCallback((data: CreateNewCycle) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
  }, [])

  const markCurrentCycleAsFinished = React.useCallback(() => {
    const currentCycleIndex = cycles.findIndex((cycle) => {
      return cycle.id === activeCycleId
    })

    if (currentCycleIndex >= 0) {
      setActiveCycleId(null)
      cycles[currentCycleIndex].finishedDate = new Date()
    }
  }, [activeCycleId, cycles])

  const interruptCurrentCycle = React.useCallback(() => {
    const currentCycleIndex = cycles.findIndex((cycle) => {
      return cycle.id === activeCycleId
    })

    if (currentCycleIndex >= 0) {
      setActiveCycleId(null)
      setAmountSecondsPassed(0)
      cycles[currentCycleIndex].startedAt = new Date()
    }
  }, [activeCycleId, cycles])

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

import * as React from 'react'
import { differenceInSeconds } from 'date-fns'
import { ICycle } from '@/entities/cycle'

type CyclesContextData = {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  amountSecondsPassed: number
  addNewCycle: (cycle: ICycle) => void
  markCurrentCycleAsFinished: () => void
  interruptCurrentCycle: () => void
  setSecondsPassed: (seconds: number) => void
}

const CyclesContext = React.createContext<CyclesContextData>({
  cycles: [],
  activeCycle: undefined,
  amountSecondsPassed: 0,
  addNewCycle: () => {},
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

  const addNewCycle = React.useCallback((cycle: ICycle) => {
    setCycles((state) => [...state, cycle])
    setActiveCycleId(cycle.id)
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
        addNewCycle,
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

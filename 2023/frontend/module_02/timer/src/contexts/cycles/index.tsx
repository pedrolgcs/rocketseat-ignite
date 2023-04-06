import * as React from 'react'
import { differenceInSeconds } from 'date-fns'
import { ICycle } from '@/entities/cycle'
import { ActionTypes } from './actions'
import { getInitialState, cyclesReducer, CyclesState } from './reducer'

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

function CyclesProvider({ children }: React.PropsWithChildren<void>) {
  const [{ cycles, activeCycleId }, dispatch] = React.useReducer(
    cyclesReducer,
    getInitialState(),
    (state) => {
      const parsedValues = state.cycles.map((cycle) => ({
        ...cycle,
        startedAt: new Date(cycle.startedAt),
        interruptedDate: cycle.interruptedDate
          ? new Date(cycle.interruptedDate)
          : undefined,
        finishedDate: cycle.finishedDate
          ? new Date(cycle.finishedDate)
          : undefined,
      }))

      return {
        activeCycleId: state.activeCycleId,
        cycles: parsedValues,
      }
    },
  )

  const activeCycle = cycles?.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycleId) {
      return differenceInSeconds(new Date(), activeCycle!.startedAt)
    }

    return 0
  })

  const createNewCycle = React.useCallback((data: createNewCycleData) => {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    dispatch({
      type: ActionTypes.CREATE_NEW_CYCLE,
      payload: {
        cycle: newCycle,
      },
    })

    setAmountSecondsPassed(0)
  }, [])

  const markCurrentCycleAsFinished = React.useCallback(() => {
    dispatch({
      type: ActionTypes.FINISHED_CURRENT_CYCLE,
    })
  }, [])

  const interruptCurrentCycle = React.useCallback(() => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    })
  }, [])

  const setSecondsPassed = React.useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds)
  }, [])

  /**
   * Update cycles in localStorage
   */
  React.useEffect(() => {
    const stateJSON = JSON.stringify({
      cycles,
      activeCycleId,
    })

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cycles, activeCycleId])

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

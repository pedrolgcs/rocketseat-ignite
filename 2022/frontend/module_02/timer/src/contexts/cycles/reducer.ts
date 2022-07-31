import { produce } from 'immer'
import { ICycle } from '@/entities/cycle'
import { ActionTypes, ReduceActions } from './actions'

export type CyclesState = {
  cycles: ICycle[]
  activeCycleId: string | null
}

export const inicialState: CyclesState = {
  cycles: [],
  activeCycleId: null,
}

export const getInitialState = (): CyclesState => {
  const storageStateAsJson = localStorage.getItem(
    '@ignite-timer:cycles-state-1.0.0',
  )

  if (storageStateAsJson) {
    return JSON.parse(storageStateAsJson)
  }

  return inicialState
}

export const cyclesReducer = (state: CyclesState, action: ReduceActions) => {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.cycle)
        draft.activeCycleId = action.payload.cycle.id
      })

    case ActionTypes.FINISHED_CURRENT_CYCLE:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })

        if (currentCycleIndex < 0) {
          return state
        }

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })

        if (currentCycleIndex < 0) {
          return state
        }

        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })

    default:
      return state
  }
}

import { ICycle } from '@/entities/cycle'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  FINISHED_CURRENT_CYCLE = 'FINISHED_CURRENT_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
}

type CreateNewCycleAction = {
  type: ActionTypes.CREATE_NEW_CYCLE
  payload: {
    cycle: ICycle
  }
}

type FinishedCurrentCycleAction = {
  type: ActionTypes.FINISHED_CURRENT_CYCLE
}

type InterruptCurrentCycleAction = {
  type: ActionTypes.INTERRUPT_CURRENT_CYCLE
}

export type ReduceActions =
  | CreateNewCycleAction
  | FinishedCurrentCycleAction
  | InterruptCurrentCycleAction

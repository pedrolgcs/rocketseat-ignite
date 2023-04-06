interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export type { ICycle }

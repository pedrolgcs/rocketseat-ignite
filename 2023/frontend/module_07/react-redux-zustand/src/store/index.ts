import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { player } from './player'

const store = configureStore({
  reducer: {
    player,
  },
})

type RootState = ReturnType<typeof store.getState>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, useAppSelector }

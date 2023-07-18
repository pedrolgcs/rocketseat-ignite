import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { player } from './player'

const store = configureStore({
  reducer: {
    player,
  },
})

type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useAppDispatch: () => AppDispatch = useDispatch

export { store, useAppSelector, useAppDispatch }

import { create } from 'zustand'
import { usePlayerSlice, PlayerSlice } from './player/player'

type Store = PlayerSlice

const useStore = create<Store>()((...params) => ({
  ...usePlayerSlice(...params),
}))

export { useStore }

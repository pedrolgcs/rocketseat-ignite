import { create } from 'zustand'
import { usePlayerSlice, PlayerSlice } from './player/player'

const useStore = create<PlayerSlice>()((...params) => ({
  ...usePlayerSlice(...params),
}))

export { useStore }

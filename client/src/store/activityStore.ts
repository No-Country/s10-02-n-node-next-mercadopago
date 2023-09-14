import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Activity {
  movements: object[]
  setMovements: (data: object) => void
}

export const useActivity = create<Activity>((set) => ({
  movements: [],
  setMovements: (data: any) =>
    set((state: any) => ({
      movements: [data, ...state.movements],
    })),
}))

import { create } from 'zustand'

interface Activity {
  movements: object[]
  setMovements: (data: object) => void
}

export const useActivity = create<Activity>((set) => ({
  movements: [{ detail: 'Ingreso de dinero', amount: 1000 }],
  setMovements: (data: any) =>
    set((state: any) => ({
      movements: [...state.movements, data],
    })),
}))

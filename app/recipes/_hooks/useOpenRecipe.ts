import { create } from 'zustand'

interface UseOpenRecipeState {
  isOpen: boolean
  setOpen: (isOpen: boolean, id?: number) => void
  setClose: () => void
}

export const useOpenRecipe = create<UseOpenRecipeState>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => {
    set({ isOpen })
  },
  setClose: () => {
    set({ isOpen: false })
  }
}))

interface UseEditRecipeSheetState {
  id?: number
  isOpen: boolean
  setOpen: (id?: number) => void
  setClose: () => void
}

export const useEditRecipeSheet = create<UseEditRecipeSheetState>((set) => ({
  id: undefined,
  isOpen: false,
  setOpen: (id?: number) => {
    set({ isOpen: true, id })
  },
  setClose: () => {
    set({ isOpen: false, id: undefined })
  }
}))

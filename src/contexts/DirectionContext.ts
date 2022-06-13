import { useContext, createContext } from 'react'

export interface DirectionContextProps {
  dir: 'rtl' | 'ltr'
  toggleDirection(): void
}

export const DirectionContext = createContext({} as DirectionContextProps)

export function useDirectionContext() {
  return useContext(DirectionContext)
}

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

interface LayoutState {
  dir: 'ltr' | 'rtl'
}

const slice = createSlice({
  name: 'user',
  initialState: { dir: 'ltr' } as LayoutState,
  reducers: {
    toggleDirection(state) {
      state.dir = state.dir === 'ltr' ? 'rtl' : 'ltr'
    },
  },
})

export const { toggleDirection } = slice.actions

export default slice.reducer

export const selectLayout = (store: RootState) => store.layout

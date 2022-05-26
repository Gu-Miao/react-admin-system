import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  username: string
  userId: string
}

const slice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    userId: ''
  } as UserState,
  reducers: {
    setUserInfo(state, { payload }: { payload: UserState }) {
      state.username = payload.username
      state.userId = payload.userId
    }
  }
})

export const { setUserInfo } = slice.actions

export default slice.reducer

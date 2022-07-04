import { createSlice } from '@reduxjs/toolkit'
import store, { Store } from '.'
import forage from '@/utils/forage'

interface UserState {
  username?: string
  id?: string
  roles?: string[]
}

interface UserStore extends UserState {
  expiry: number
}

const SEVEN_DAYS = 7 * 24 * 3600 * 1000

// Initialize user store
forage.getItem('user').then(result => {
  const { expiry, ...userInfo } = (result as UserStore) ?? {}
  if (Date.now() - (expiry ?? 0) < SEVEN_DAYS) {
    store.dispatch(setUserInfo({ ...userInfo }))
  } else {
    forage.removeItem('user')
  }
})

const slice = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setUserInfo(state, { payload = {} }: { payload: Partial<UserState> | undefined }) {
      state.username = payload.username
      state.id = payload.id
      state.roles = payload.roles
    }
  }
})

export const { setUserInfo } = slice.actions

export default slice.reducer

export const selectUser = (store: Store) => store.user

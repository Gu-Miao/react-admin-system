import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Store } from '.'
import { SEVEN_DAYS_MS } from '@/common/constants'
import forage from '@/utils/forage'

interface UserState {
  username?: string
  id?: string
  roles?: string[]
  initializing: boolean
}
interface UserForage extends UserState {
  expiry: number
}

/**
 * Iniialze user info if we can get user info from local forage
 */
export const initUserInfo = createAsyncThunk('user/initUserInfo', async (_, { dispatch }) => {
  const userForage = (await forage.getItem('user')) as UserForage | null
  if (!userForage) return {}
  const { expiry, ...userInfo } = userForage
  if (expiry + SEVEN_DAYS_MS > Date.now()) {
    dispatch(setUserInfo(userInfo))
  } else {
    forage.removeItem('user')
  }
})

const slice = createSlice({
  name: 'user',
  initialState: { initializing: true } as UserState,
  reducers: {
    setUserInfo(state, { payload = {} }: { payload: Partial<UserState> | undefined }) {
      state.username = payload.username
      state.id = payload.id
      state.roles = payload.roles
    }
  },
  extraReducers(builder) {
    builder
      .addCase(initUserInfo.pending, state => {
        state.initializing = true
      })
      .addCase(initUserInfo.fulfilled, state => {
        state.initializing = false
      })
  }
})

export const { setUserInfo } = slice.actions

export default slice.reducer

export const selectUser = (store: Store) => store.user

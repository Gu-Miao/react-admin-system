import { configureStore } from '@reduxjs/toolkit'
import user, { initUserInfo } from './user'
import layout from './layout'

const store = configureStore({
  reducer: {
    user,
    layout,
  },
})

store.dispatch(initUserInfo())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

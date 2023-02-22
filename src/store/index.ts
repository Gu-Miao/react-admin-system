import { configureStore } from '@reduxjs/toolkit'
import user, { initUserInfo } from './user'

const store = configureStore({
  reducer: {
    user,
  },
})

store.dispatch(initUserInfo())

export type Store = ReturnType<typeof store.getState>

export default store

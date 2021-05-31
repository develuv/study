import { configureStore } from '@reduxjs/toolkit'
import history from './history'
import users from './users'
import user from './user'

export default configureStore({
  reducer: {
    history,
    users,
    user
  }
})
